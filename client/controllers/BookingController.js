angular.module('mycabApp').controller('BookingController', function($scope, $http, $filter, $cookies) {
   $scope.pickupLocation = "";
   $scope.dropLocation = "";
   var markersArray = [];
   var drivercar = [];
   $scope.Tariff = '';
   $scope.IsVisible = false;
   $scope.check = false;
   $scope.flag=0;
   var morkm;
   $scope.rideestimate=false;
   $(document).ready(function() {
      $('#rl').click(function() {
         $("#rideLaterr").modal();
      });
   });
    var locchange = function() {
                  console.log("so i here");
                  $scope.check = false;
               }
   $scope.initMap = function() {
      if (navigator.geolocation) {
         $scope.IsVisible = false;
         $scope.check = false;
         navigator.geolocation.getCurrentPosition(function(p) {
            var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
            var mapOptions = {
               center: LatLng,
               zoom: 13,
               mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            console.log(p.coords.latitude);
            console.log(p.coords.longitude);
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            var geocoder = new google.maps.Geocoder;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(map);
            var socket = io();
            var imag = {
               url: "../public/images/redcar.png", // url
               scaledSize: new google.maps.Size(30, 30),
            };
            //var imag=;
            var infowindow = new google.maps.InfoWindow;
            var bounds = new google.maps.LatLngBounds;
            geocodeLatLng(geocoder, map, infowindow, LatLng);
            socket.on('SendtoAll', function(data) {
               console.log("dirver logged in customer");
               $scope.cablocation = data.location;
               $scope.drimob = data.drimob;
               console.log(data);
               deleteMarkers(drivercar);
               drivercar = [];
               var mar = new google.maps.Marker({
                  position: data.location,
                  map: map,
                  icon: imag,
               });
               drivercar.push(mar);
               console.log(drivercar);
            });
            socket.on('disconnect', function() {
               console.log('you have been disconnected');
               //mar.setVisible(false);
            });
            socket.on('driverleft', function(data) {
               deleteMarkers(drivercar);
            });
            $scope.bookcab = function() {
               console.log($scope.cablocation);
               if ($scope.cablocation != undefined) {
                  console.log($scope.cablocation);
                  var finish = document.getElementById('autocomplete').value;
                  console.log(finish);
                  var start = document.getElementById('pickup').text;
                  var end = $scope.cablocation.lat + "," + $scope.cablocation.lng;
                  var cust = $cookies.getObject('userdet');
                  console.log(cust);
                  calculateAndDisplayRoute(directionsService, directionsDisplay);
                  var start = document.getElementById('pickup').text;
                  // var end = document.getElementById('autocomplete').value;
                  var end = $scope.cablocation.lat + "," + $scope.cablocation.lng;
                  var service = new google.maps.DistanceMatrixService;
                  service.getDistanceMatrix({
                     origins: [
                        start
                     ],
                     destinations: [
                        end
                     ],
                     travelMode: 'DRIVING',
                     unitSystem: google.maps.UnitSystem.METRIC,
                     avoidHighways: false,
                     avoidTolls: false
                  }, function(response, status) {
                     if (status !== 'OK') {
                        alert('Error was: ' + status);
                     } else {
                        var originList = response.originAddresses;
                        var destinationList = response.destinationAddresses;
                        console.log(response);
                        console.log(destinationList);
                        var showGeocodedAddressOnMap = function(asDestination) {
                           //var icon = asDestination ? destinationIcon : originIcon;
                           return function(results, status) {
                              if (status === 'OK') {
                                 map.fitBounds(bounds.extend(results[0].geometry.location));
                              } else {
                                 alert('Geocode was not successful due to: ' + status);
                              }
                           };
                        };
                        for (var i = 0; i < originList.length; i++) {
                           var results = response.rows[i].elements;
                           geocoder.geocode({
                              'address': originList[i]
                           }, showGeocodedAddressOnMap(false));
                           for (var j = 0; j < results.length; j++) {
                              geocoder.geocode({
                                 'address': destinationList[j]
                              }, showGeocodedAddressOnMap(true));
                              console.log(results[j].distance.text);
                               tota = results[j].distance.text.split(" ", 2);
                               console.log(tota);
                              totalkm = results[j].distance.text.split(" ", 2)[0];
                              morkm = results[j].distance.text.split(" ", 2)[1];
                              console.log(morkm);
                              if(morkm=='m'){
                               totalkm =totalkm/1000;  
                              }
                              //if (user.role =='driver') {
                              $(document).ready(function() {
                                 $('#hi').click(function() {
                                    $http.get('/driver/searchCab/' + $scope.drimob.mobileNum)
                                       .then(function(response) {
                                          console.log(response.data[0].cabType);
                                          console.log($scope.carselected);
                                          console.log(totalkm);
                                          $http.get('/driver/SearchUser/' +
                                             $scope.drimob.mobileNum).then(
                                             function(res) {
                                                console.log(response);
                                                $scope.dname = {
                                                   firstName: res.data[0].firstName +
                                                      " " + res.data[0].lastName,
                                                }
                                                if (response.data[0].cabType ==
                                                   $scope.carselected &&
                                                   totalkm <= 1.0) {
                                                   console.log(
                                                      "cab available");
                                                   $scope.bookeddriver = {
                                                      customername: cust.firstName,
                                                      customernum: cust.mobileNum,
                                                      drivername: $scope.dname
                                                         .firstName,
                                                      driverpic: response.data[
                                                         0].driverPhoto,
                                                      pickup: originList[0],
                                                      drop: finish,
                                                      cab: response.data[0]
                                                         .carMake,
                                                      mob: response.data[0]
                                                         .driverMobile,
                                                      fare: rate
                                                   }
                                                   socket.emit('bookedcab', {
                                                      hi: $scope.bookeddriver,
                                                      status: true
                                                   });
                                                   socket.on('customer',
                                                      function(data) {
                                                         console.log(data.custdet);
                                                         $("#cusmodal").modal();
                                                      });
                                                   console.log($scope.driname);
                                                   console.log($scope.newride);
                                                   $http.post(
                                                      '/driver/addRide',
                                                      $scope.newride).then(
                                                      function(response) {
                                                         console.log(
                                                            'Data Saved Successfully'
                                                         );
                                                         alert(
                                                            'Data for ride history Saved Successfully'
                                                         );
                                                      });
                                                   $scope.pickupLocation = "";
                                                   $scope.dropLocation = "";
                                                   $scope.check = false;
                                                } else {
                                                   alert("cab not available")
                                                }
                                             });
                                       });
                                 });
                              });
                              //}
                              console.log(totalkm);
                              if (totalkm < 1.0) {
                                 console.log("bookcab");
                              }
                           }
                        }
                     }
                  });
               } else {
                  alert("no driver logged in");
               }
            }
            $scope.addridelater = function() {
               var today = new Date();
               var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
               var h = today.getHours(),
                  m = today.getMinutes();
               a = m < 10 ? ("0" + m) : (m);
               var mytime = ((h > 12) ? (h - 12 + ':' + a + ' PM') : (h + ':' + a + ' AM'));
               var cust = $cookies.getObject('userdet');
               var dri = $cookies.getObject('driverdet');
               var ldate = $filter('date')($scope.laterdate, 'dd/MM/yyyy');
               var l = $filter('date')($scope.laterdate, 'yyyy-MM-dd');
               var ltime = $filter('date')($scope.latertime, 'h:mm a');
               //var ltime = $filter('date')($scope.latertime, 'h:mm a');
               var ha = ldate + " " + ltime;
               console.log(ha);
               var choosendate = new Date(l + " " + ltime);
               console.log($scope.latertime + (60 * 60 * 12 * 1000));
               var start = today.getTime() + (60 * 60 * 12 * 1000);
               var end = today.getTime() + (60 * 60 * 48 * 1000);
               var advancetimestart = Date.parse($filter('date')
                  (start, 'dd/MM/yyyy h:mm a'));
               var advancetimeend = Date.parse($filter('date')
                  (end, 'dd/MM/yyyy h:mm a'));
               console.log(start);
               console.log(end);
               console.log(advancetimeend);
               var deadLineStart = Date.parse(ldate + " " + ltime);
               if (start < choosendate && end > choosendate) {
                  $scope.ridelaterdetails = {
                     custmob: cust.mobileNum,
                     drimob: 'all',
                     pickup: $scope.pickupLocation,
                     drop: $scope.dropLocation,
                     ridedate: ldate,
                     ridingtime: ltime,
                     distance: $scope.mydist,
                     status: 'Ride Later',
                     totalfare: $scope.myrate,
                  }
                  console.log($scope.ridelaterdetails);
                  $http.post('/driver/addRide', $scope.ridelaterdetails).then(function(response) {
                     console.log('Data Saved Successfully');
                     alert('Data for ride later  Saved Successfully');
                  });
                  $scope.pickupLocation = "";
                  $scope.dropLocation = "";
                  $scope.check = false;
               } else {
                  alert(
                     "hi you cant advance book,make sure it is greater than 12 hourse from now and less than 48 hours"
                  );
               }
            }
            $scope.ridenow = function() {
              $scope.rideestimate=true;
               gettariff();
               if($scope.flag==0){
                  alert("tariff nor entered")
               }else {
               $scope.IsVisible = true;
               $scope.pickupLocation = document.getElementById('pickup').value;
               $scope.dropLocation = document.getElementById('autocomplete').value;
               calculateAndDisplayRoute(directionsService, directionsDisplay);
               deleteMarkers(markersArray);
               console.log("from ride now function");
               console.log(markersArray);
               markersArray = [];
               var start = document.getElementById('pickup').text;
               var end = document.getElementById('autocomplete').value;
               var service = new google.maps.DistanceMatrixService;
               service.getDistanceMatrix({
                  origins: [
                     start
                  ],
                  destinations: [
                     end
                  ],
                  travelMode: 'DRIVING',
                  unitSystem: google.maps.UnitSystem.METRIC,
                  avoidHighways: false,
                  avoidTolls: false
               }, function(response, status) {
                  if (status !== 'OK') {
                     alert('Error was: ' + status);
                  } else {
                     var originList = response.originAddresses;
                     var destinationList = response.destinationAddresses;
                     var outputDiv = document.getElementById('output');
                     outputDiv.innerHTML = '';
                     deleteMarkers(markersArray);
                     console.log(response);
                     var showGeocodedAddressOnMap = function(asDestination) {
                        //var icon = asDestination ? destinationIcon : originIcon;
                        return function(results, status) {
                           if (status === 'OK') {
                              map.fitBounds(bounds.extend(results[0].geometry.location));
                              // markersArray.push(new google.maps.Marker({
                              //   map: map,
                              //   position: results[0].geometry.location,
                              //  // icon: icon
                              // }));
                           } else {
                              alert('Geocode was not successful due to: ' + status);
                           }
                        };
                     };
                     for (var i = 0; i < originList.length; i++) {
                        var results = response.rows[i].elements;
                        geocoder.geocode({
                           'address': originList[i]
                        }, showGeocodedAddressOnMap(false));
                        for (var j = 0; j < results.length; j++) {
                           geocoder.geocode({
                              'address': destinationList[j]
                           }, showGeocodedAddressOnMap(true));
                           totalkm = results[j].distance.text.split(" ", 1)[0];
                           //totalkm=km[0]
                           outputDiv.innerHTML += "Estimated Distance :" + results[j].distance.text +
                              '<br>' + "Estimated Time :" + results[j].duration.text + '<br>';
                           $scope.st = $filter('date')
                              ($scope.Tariff.startpeakTime, 'h:mm a');
                           $scope.et = $filter('date')
                              ($scope.Tariff.endpeakTime, 'h:mm a');
                           var a = totalkm;
                           console.log($scope.rate);
                           var today = new Date();
                           var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' +
                              today.getFullYear();
                           console.log(date);
                           //document.getElementById('cost').value = getTimeStamp();
                           var booktime = getTimeStamp();
                           //document.getElementById('cost').innerHTML =rate;
                           var cust = $cookies.getObject('userdet');
                           //var dri = $cookies.getObject('driverdet');
                           console.log(cust);
                           var tariffstarttime = Date.parse("01/01/2017 " + $scope.st);
                           var bookingtime = Date.parse("01/01/2017 " + booktime);
                           var tariffendtime = Date.parse("01/01/2017 " + $scope.et);
                           console.log($scope.Tariff.baseRate);
                           console.log(parseInt($scope.Tariff.baseRate) + totalkm * parseInt(
                              $scope.Tariff.normalRate));
                           console.log(totalkm * $scope.Tariff.normalRate);
                           if (bookingtime > tariffstarttime && bookingtime < tariffendtime) {
                              rate = parseInt($scope.Tariff.baseRate) + totalkm * parseInt(
                                 $scope.Tariff.peakRate);
                              document.getElementById('cost').innerHTML = "Estimated Cost :Rs " +rate;
                           } else {
                              rate = parseInt($scope.Tariff.baseRate) + totalkm * parseInt(
                                 $scope.Tariff.normalRate);
                              document.getElementById('cost').innerHTML = "Estimated Cost :Rs " +
                                 rate;
                           }
                           $scope.mydist = results[j].distance.text
                           $scope.myrate = rate;
                           $scope.newride = {
                              custmob: cust.mobileNum,
                              drimob: $scope.drimob.mobileNum,
                              pickup: originList[0],
                              drop: destinationList[0],
                              ridedate: date,
                              ridingtime: booktime,
                              distance: results[j].distance.text,
                              status: 'Current',
                              totalfare: rate,
                           }
                        }
                     }
                  }
               });
}
               console.log($scope.rate);
            }
            var onChangeHandler = function() {
               calculateAndDisplayRoute(directionsService, directionsDisplay);
            };

            function calculateAndDisplayRoute(directionsService, directionsDisplay) {
               var start = document.getElementById('pickup').text;
               console.log(start);
               var end = document.getElementById('autocomplete').value;
               directionsService.route({
                  origin: start,
                  destination: end,
                  travelMode: 'DRIVING'
               }, function(response, status) {
                  console.log(status);
                  console.log(response);
                  if (status === 'OK') {
                     directionsDisplay.setDirections(response);
                  } else {
                     window.alert('Directions request failed due to ' + status);
                  }
               });
            }
         });
      } else {
         alert('Geo Location feature is not supported in this browser.');
      }
   }

   function deleteMarkers(markersArray) {
      console.log(markersArray);
      for (var i = 0; i < markersArray.length; i++) {
         markersArray[i].setMap(null);
      }
      markersArray = [];
      console.log("from delete markers function");
      console.log(markersArray);
   }

   function geocodeAddress(geocoder, resultsMap) {
      //       var address = document.getElementById('autocomplete');
      //        var autocomplete = new google.maps.places.Autocomplete(adress);
      // autocomplete.bindTo('bounds', map);
      var places = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
      // google.maps.event.addListener(places, 'place_changed', function () {
      console.log(places);
      //var places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'));
      google.maps.event.addListener(places, 'place_changed', function() {
         alert("hey there");
          locchange();

         $scope.check = false;
         var place = places.getPlace();
         console.log(place);
         var address = place.formatted_address;
         geocoder.geocode({
            'address': address
         }, function(results, status) {
            if (status === 'OK') {
               resultsMap.setCenter(results[0].geometry.location);
               var marker = new google.maps.Marker({
                  map: resultsMap,
                  position: results[0].geometry.location
               });
               markersArray.push(marker);
            } else {
               alert('Geocode was not successful for the following reason: ' + status);
            }
         });
      });
   }
   $scope.myname = function(event) {
      $scope.check = false;
$scope.flag=0;
for (let x in $scope.cartariff) {
            if (event.target.id == $scope.cartariff[x].carType) {
               console.log(event.target.id + "is same as " + $scope.cartariff[x].carType);
               $scope.Tariff = $scope.cartariff[x];
               //$scope.Tariffet = response.data[x];
               $scope.flag=1;
            }
         }console.log($scope.flag);
         if($scope.flag==1){
      $scope.carselected = event.target.id;
      if (document.getElementById('pickup').value == '' || document.getElementById('autocomplete').value == '') {
         alert("enter pick up and drop  location");
         $scope.check = false;
      } else {
         $scope.check = true;
      }
   }else {
      alert("Tariff for this car type is not available");
   }
      //        if(event.target.id!=$scope.Tariff.carType){
      // alert("tariff for this car is not defined");
      //     }
   }
   $scope.initAutocomplete = function() {
      autocomplete = new google.maps.places.Autocomplete(
         (document.getElementById('autocomplete')), {
            types: ['geocode']
         });
      autocomplete.addListener('place_changed', fillInAddress);
   }
   $scope.initAutocompletea = function() {
      // autocomplete = new google.maps.places.Autocomplete(
      //     (document.getElementById('pickup')), {
      //         types: ['geocode']
      //     });
      // autocomplete.addListener('place_changed', fillInAddress);
   }

   function getTimeStamp() {
      //        var now = new Date();
      //        return (now.getHours() + ':'+ ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())));
      // }
      var dt = new Date();
      var h = dt.getHours(),
         m = dt.getMinutes();
      a = m < 10 ? ("0" + m) : (m);
      return ((h > 12) ? (h - 12 + ':' + a + ' PM') : (h + ':' + a + ' AM'));
   }
   // function setTime() {
   //     document.getElementById('cost').value = getTimeStamp();
   // }
   function fillInAddress() {
      console.log("triggered");
       locchange();
      $scope.check=false;
      var place = autocomplete.getPlace();
      // console.log(place.formatted_address);
   }
   var gettariff = function() {
      $http.get('/tariff/getTariff').then(function(response) {
         $scope.cartariff=response.data;
         // for (let x in response.data) {
         //    if ($scope.carselected == response.data[x].carType) {
         //       console.log($scope.carselected + "is same as " + response.data[x].carType);
         //       $scope.Tariff = response.data[x];
         //       //$scope.Tariffet = response.data[x];
         //    }
         // }
      });
   }
   $scope.changepickup = function() {}

   function geocodeLatLng(geocoder, map, infowindow, latlngStr) {
      var input = document.getElementById('pickup');
      var autocomplete = new google.maps.places.Autocomplete(input);
      var latlng = {
         lat: parseFloat(latlngStr.lat()),
         lng: parseFloat(latlngStr.lng())
      };
      geocoder.geocode({
         'location': latlng
      }, function(results, status) {
         if (status === 'OK') {
            if (results[0]) {
               // map.setZoom(11);
               var marker = new google.maps.Marker({
                  position: latlng,
                  draggable: true,
                  map: map
               });
               markersArray.push(marker);
               console.log(markersArray);
               // infowindow.setContent(results[0].formatted_address);
               //infowindow.open(map, marker);
               document.getElementById("pickup").value = results[0].formatted_address;
               document.getElementById("pickup").text = latlng.lat + "," + latlng.lng;
               //document.getElementById('pickup').innerHTML="hi";
               //$scope.pickupLocation=results[0].formatted_address;
               console.log($scope.pickupLocation);
               //infowindow.close();
               //autocomplete.bindTo('bounds', map);
               //var infowindow = new google.maps.InfoWindow();
               //var infowindowContent = document.getElementById('infowindow-content');
               //infowindow.setContent(infowindowContent);
               //marker.setVisible(false);
              
               autocomplete.addListener('place_changed', function() {
                  console.log("auto complete chnaged");
                  locchange();
                  //infowindow.close();
                  // marker.setVisible(false);
                  // document.getElementById('e').style.display = "none";;
                  deleteMarkers(markersArray);
                  var marker = new google.maps.Marker({
                     draggable: true,
                     map: map,
                     anchorPoint: new google.maps.Point(0, -29)
                  });
                  markersArray.push(marker);
                  var place = autocomplete.getPlace();
                  if (!place.geometry) {
                     // User entered the name of a Place that was not suggested and
                     // pressed the Enter key, or the Place Details request failed.
                     window.alert("No details available for input: '" + place.name + "'");
                     return;
                  }
                  // If the place has a geometry, then present it on a map.
                  if (place.geometry.viewport) {
                     map.fitBounds(place.geometry.viewport);
                  } else {
                     map.setCenter(place.geometry.location);
                     map.setZoom(17); // Why 17? Because it looks good.
                  }
                  marker.setPosition(place.geometry.location);
                  marker.setVisible(true);
                  var address = '';
                  if (place.address_components) {
                     address = [
                        (place.address_components[0] && place.address_components[0].short_name ||
                           ''), (place.address_components[1] && place.address_components[1].short_name ||
                           ''), (place.address_components[2] && place.address_components[2].short_name ||
                           '')
                     ].join(' ');
                  }
                  document.getElementById("pickup").text = address;
                  if (!document.getElementById("autocomplete").value == "") {
                     console.log("not null");
                     $scope.ridenow();
                  }
                  // infowindowContent.children['place-icon'].src = place.icon;
                  // infowindowContent.children['place-name'].textContent = place.name;
                  // infowindowContent.children['place-address'].textContent = address;
                  // infowindow.open(map, marker);
               });
               google.maps.event.addListener(marker, 'dragend', function(event) {
                  var lat = parseFloat(this.getPosition().lat());
                  var long = parseFloat(this.getPosition().lng());
                  var latlng = {
                     lat: lat,
                     lng: long
                  };
                  geocoder.geocode({
                     'location': latlng
                  }, function(results, status) {
                     if (results[0]) {
                        // infowindow.setContent(results[0].formatted_address);
                        document.getElementById("pickup").value = results[0].formatted_address;
                        document.getElementById("pickup").text = latlng.lat + "," + latlng.lng;
                        //infowindow.open(map, marker);
                     } else {
                        window.alert('No results found');
                     }
                  });
               });
            } else {
               window.alert('No results found');
            }
         } else {
            window.alert('Geocoder failed due to: ' + status);
         }
      });
   }
   gettariff();
});
