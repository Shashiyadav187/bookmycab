angular.module('mycabApp').controller('BookingController', function($scope) {
    $scope.pickupLocation="";
    $scope.dropLocation="";

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

                geocodeLatLng(geocoder, map, infowindow, LatLng);




       

    

          var onChangeHandler = function() {
          
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('pickup').addEventListener('change', onChangeHandler);
        document.getElementById('autocomplete').addEventListener('change', onChangeHandler);
      

          function calculateAndDisplayRoute(directionsService, directionsDisplay) {
         
        var start = document.getElementById('pickup').value;
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


     function geocodeAddress(geocoder, resultsMap) {  
         
  //       var address = document.getElementById('autocomplete');
  //        var autocomplete = new google.maps.places.Autocomplete(adress);
  // autocomplete.bindTo('bounds', map);

            var places = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  // google.maps.event.addListener(places, 'place_changed', function () {
                console.log(places);
                //var places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'));
            google.maps.event.addListener(places, 'place_changed', function () {
           alert("hey there");
                    var place = places.getPlace();
                    
                    console.log(place);
                var address = place.formatted_address;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
       
      });
    });
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

    function fillInAddress() {
        //console.log("triggered");
        var place = autocomplete.getPlace();
       // console.log(place.formatted_address);

    }

    $scope.changepickup=function(){
      
            }

    function geocodeLatLng(geocoder, map, infowindow, latlngStr) {
       var input = document.getElementById('pickup');
       var autocomplete  = new google.maps.places.Autocomplete(input);
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
                   // infowindow.setContent(results[0].formatted_address);
                    //infowindow.open(map, marker);
                    document.getElementById("pickup").value = results[0].formatted_address;
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

         
          var marker = new google.maps.Marker({
          draggable: true,
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });


         

          var place= autocomplete.getPlace();
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
            map.setZoom(17);  // Why 17? Because it looks good.
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

});