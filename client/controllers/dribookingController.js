angular.module('mycabApp').controller('dribookingController', function($scope,$http,$filter,$cookies) {
var drivercar=[];
$scope.b="";
$scope.bookedcab=false;
var socket = io();
    $scope.initMap = function() {
    	
    	  // $(document).ready(function() {
    	  // 	alert("hi");
    	  // 	var socket = io();
    	  // 	socket.emit('SendLocation', {
       //              myMessage: msg
       //          });
    	  // });

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(p) {
                var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                var mapOptions = {
                    center: LatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                 var geocoder = new google.maps.Geocoder;
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                 geocodeLatLng(geocoder, map, LatLng);

});
}
}

function deleteMarkers(markersArray) {
  // $(document).ready(function() {                      // console.log(markersArray);
markersArray.setMap(null);
console.log("from delete markers function");
                        // for (var i = 0; i < markersArray.length; i++) {
                        //     markersArray[i].setMap(null);
                        // }
                        // markersArray = [];
                        // console.log("from delete markers function");
                        // console.log(markersArray);
                    }

function geocodeLatLng(geocoder, map, latlngStr) {
$(document).ready(function() { 
        
        var latlng = {
            lat: parseFloat(latlngStr.lat()),
            lng: parseFloat(latlngStr.lng())
        };
        geocoder.geocode({
            'location': latlng
        }, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    map.setZoom(15);
                    // var marker = new google.maps.Marker({
                    //     position: latlng,
                    //     draggable: true,
                    //     map: map
                    // });
 //var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
var imag = {
    url: "../public/images/redcar.png", // url
    scaledSize: new google.maps.Size(30,30), // scaled size
    
     // anchor
};

var marker = new google.maps.Marker({
    position: latlng,
    map: map,
     icon: imag,
     draggable: true,
  });
drivercar.push(marker);
			
            var driver = $cookies.getObject('driverdet');
                    //console.log(cust);
			
			  	socket.emit('SendLocation', {
                    position: latlng,
                    drivermobile:driver
                // });
    
  });


    //console.log($scope.b);



google.maps.event.addListener(marker, 'dragend', function(event) {
	//deleteMarkers(marker);
	console.log(marker);
	console.log(drivercar);
                        var lat = parseFloat(this.getPosition().lat());
                        var long = parseFloat(this.getPosition().lng());
                        var driver = $cookies.getObject('driverdet');
                        var latlng = {
                            lat: lat,
                            lng: long
                        };
                        geocoder.geocode({
                            'location': latlng
                        }, function(results, status) {
                            if (results[0]) {
                            		var socket = io();
    	  	socket.emit('SendLocation', {
                    position: latlng,
                    drivermobile:driver
                });

                                // infowindow.setContent(results[0].formatted_address);
                                
                                var mytext = latlng.lat + "," + latlng.lng;
                                console.log(mytext);
                                //infowindow.open(map, marker);
                            } else {
                                window.alert('No results found');
                            }
                        });
                    });



}
}
});
});
}


    socket.on('check', function(data) {
        $scope.det=data.dridet;
    console.log(data.status);
    if(data.status==true){
      $scope.bookedcab=true;  
    }
  
     document.getElementById("pick").innerHTML="Pickup From :"+data.dridet.pickup;
    document.getElementById("drop").innerHTML="Destination at :"+data.dridet.drop;
     document.getElementById("fare").innerHTML="Fare: Rs "+data.dridet.fare;
     document.getElementById("cname").innerHTML="Customer Name :"+data.dridet.customername;
     document.getElementById("cnum").innerHTML="Customer Number: Rs "+data.dridet.customernum;
   
    $("#drivermodal").modal();
console.log($scope.bookedcab);
//$scope.bookedcab=true;
    socket.emit('bookedcust', {
            cabdet:data.dridet
    });
            //$('#messagePanel').append(data.dridet + '<br/><br/>');
        });

    $scope.hi=function(){
        //$scope.bookedcab=true; 
        if(!document.getElementById("pick").innerHTML==""&&$scope.det!=undefined){
            $("#drivermodal").modal();

        }
        else{
            alert("no Current booking");
        }

    }
    
});





               