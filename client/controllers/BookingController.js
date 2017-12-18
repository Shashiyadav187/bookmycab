angular.module('mycabApp').controller('BookingController', function($scope,$http,$filter) {
    $scope.pickupLocation = "";
    $scope.dropLocation = "";
    var markersArray = [];

    $scope.initMap = function() {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(p) {
                var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                var mapOptions = {
                    center: LatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                var geocoder = new google.maps.Geocoder;

                var directionsDisplay = new google.maps.DirectionsRenderer;
                var directionsService = new google.maps.DirectionsService;
                directionsDisplay.setMap(map);

                var infowindow = new google.maps.InfoWindow;
                var bounds = new google.maps.LatLngBounds;
                geocodeLatLng(geocoder, map, infowindow, LatLng);


                $scope.ridenow = function() {

            gettariff();


                    calculateAndDisplayRoute(directionsService, directionsDisplay);
                    deleteMarkers(markersArray);
                    console.log("from ride now function");
                    console.log(markersArray);
                    markersArray = [];
                    var start = document.getElementById('pickup').text;
                    var end = document.getElementById('autocomplete').value;
                    var service = new google.maps.DistanceMatrixService;
                    service.getDistanceMatrix({
                        origins: [start],
                        destinations: [end],
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
                                    },
                                    showGeocodedAddressOnMap(false));
                                for (var j = 0; j < results.length; j++) {
                                    geocoder.geocode({
                                            'address': destinationList[j]
                                        },
                                        showGeocodedAddressOnMap(true));
                                    totalkm=results[j].distance.text.split(" ",1)[0];
                                    //totalkm=km[0]
                                    outputDiv.innerHTML += "Estimated Distance :" +
                                        results[j].distance.text + '<br>' + "Estimated Time :"+
                                        results[j].duration.text + '<br>';

                                                      $scope.st=$filter('date')($scope.Tariff.startpeakTime, 'h:mm a');
         $scope.et=$filter('date')($scope.Tariff.endpeakTime, 'h:mm a');
              var a=  totalkm;
              console.log($scope.rate);
                    //document.getElementById('cost').value = getTimeStamp();
        var booktime=getTimeStamp();
        //document.getElementById('cost').innerHTML =rate;


        var tariffstarttime=Date.parse("01/01/2017 "+$scope.st);
        var bookingtime=Date.parse("01/01/2017 "+booktime);
        var tariffendtime=Date.parse("01/01/2017 "+$scope.et);
        console.log($scope.Tariff.baseRate);
        console.log(parseInt($scope.Tariff.baseRate)+totalkm*parseInt($scope.Tariff.normalRate));
        console.log(totalkm*$scope.Tariff.normalRate);


        if (bookingtime>tariffstarttime&&bookingtime<tariffendtime)
        {
           rate=parseInt($scope.Tariff.baseRate)+totalkm*parseInt($scope.Tariff.peakRate);
           document.getElementById('cost').innerHTML =rate;
        }
        else
        {
            rate=parseInt($scope.Tariff.baseRate)+totalkm*parseInt($scope.Tariff.normalRate);
            document.getElementById('cost').innerHTML ="Estimated Cost :Rs "+rate;
        }
                                }
                            }
                        }
                    });
      

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
gettariff();
$scope.carselected=event.target.id;
   
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
    var h =  dt.getHours(), m = dt.getMinutes();
    a= m<10?("0" + m) : (m);
    return((h > 12) ? (h-12 + ':' + a +' PM') : (h + ':' + a +' AM'));
    

}

// function setTime() {
//     document.getElementById('cost').value = getTimeStamp();
// }

    function fillInAddress() {
        //console.log("triggered");
        var place = autocomplete.getPlace();
        // console.log(place.formatted_address);

    }


    var gettariff=function(){ 
        $http.get('/tariff/getTariff').then(function(response) {
            for(let x in response.data){

           if($scope.carselected==response.data[x].carType){
            console.log($scope.carselected+"is same as "+response.data[x].carType);
            $scope.Tariff = response.data[x];
            //$scope.Tariffet = response.data[x];
        }
        }
        });
}

    $scope.changepickup = function() {

    }

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
                    document.getElementById("pickup").text =  latlng.lat + "," + latlng.lng;
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
                        //infowindow.close();
                        // marker.setVisible(false);
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
                                (place.address_components[0] && place.address_components[0].short_name || ''),
                                (place.address_components[1] && place.address_components[1].short_name || ''),
                                (place.address_components[2] && place.address_components[2].short_name || '')
                            ].join(' ');
                        }

                
                document.getElementById("pickup").text =address;
                if(!document.getElementById("autocomplete").value==""){
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