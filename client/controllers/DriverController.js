angular.module('mycabApp').controller('DriverController', function($scope, $rootScope, $http,$filter,Upload) {
    

       $scope.AddCab = function(file) {
       
        console.log(file);
        Upload.upload({
            url:'http://localhost:3000/driver/imageupload',
            data:{
                file:file
            }
        }).then(function(response){
            if(response.data.error_code===0){
                console.log("data saved");
            }else {
                console.log("problem in upload");
            }
        })

       $http.post('/driver/addCab', $scope.newDriver).then(function(response) {
            console.log('Data Saved Successfully');
            alert('data for driver saved is Saved Successfully');

            $http.post('/driver/addUser', $scope.newDriver).then(function(response) {
            console.log('Data Saved Successfully');
            alert('data for cab saved is Saved Successfully');
        });
        });
        GetCab();
    }

// var link = document.createElement('a');
// var getsrc= document.getElementById("blah").src;
// //link.href = '/Users/aishwaryak/Desktop/bookmycab/client/public/images/'+getsrc;
// link.href = getsrc;
// console.log(link.href );
// link.download = "file-" + d + ".png";
// document.body.appendChild(link);
// link.click();

    

//     function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;

//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     var dataURL = canvas.toDataURL("image/png");

//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

//   function readURL(input) {
//         if (input.files && input.files[0]) {
//             var reader = new FileReader();
            
//             reader.onload = function (e) {
//                 $('#blah').attr('src', e.target.result);
//             }
            
//             reader.readAsDataURL(input.files[0]);
//         }
//     }
    
//     $("#imgInp").change(function(){
//         readURL(this);
//     });



    var GetCab = function() {
        $http.get('/driver/getUser').then(function(response) {
        $scope.user = response.data;
         $http.get('/driver/getCab').then(function(response) {
        $scope.cabdetails=response.data;
for(let x in $scope.user){
        for(let m in $scope.cabdetails){

            if($scope.cabdetails[m].driverMobile==$scope.user[x].mobileNum){
                $scope.photosrc=$scope.cabdetails[m].driverPhoto;
                console.log( $scope.photosrc);
        }
}
}
        });
         console.log($scope.cabdetails);
        
        });
        
  

   
     }


   
    $scope.SearchUser = function(Driver) {

        $http.get('/driver/SearchUser/' + Driver.mobileNum).then(function(response) {
            console.log(response);
    $scope.newDriverr = {
    _id:response.data[0]._id,
    firstName:response.data[0].firstName,
    EmailID:response.data[0].EmailID,
    mobileNum:response.data[0].mobileNum,

            }
            });
        console.log($scope.newDriverr);

        $http.get('/driver/searchCab/' + Driver.mobileNum).then(function(response) {
            console.log(response);
    $scope.newDrivers = {
    _id:response.data[0]._id,
    mobileNum:response.data[0].driverMobile,
            }
        });
        console.log($scope.newDrivers);
  
    }
     //       


    //     $http.get('/driver/searchCab/' + Driver.mobileNum).then(function(response) {
    //         console.log(response);
    // $scope.newDriverr = {
    // _id:response.data[0]._id,
    // mobileNum:response.data[0].driverMobile,

    //         }
             
         
    //     });
    //     });


    $scope.updateUser = function() {  
        console.log($scope.newDrivers);
        $http.put('/driver/updateUser/' + $scope.newDriverr._id, $scope.newDriverr).then(function(response) {
            console.log('Data Updated');
       
         });
           $http.put('/driver/updateCab/' +$scope.newDrivers._id, $scope.newDriverr).then(function(response) {
            console.log('Data Updated in cab details');
        });
       

    
        GetCab();
    } 


    $scope.deleteUser = function(Driver) {
        $http.delete('/driver/deleteUser/' + Driver.mobileNum).then(function(response) {
            console.log('Driver Removed Successfully');
        $http.delete('/driver/deleteCab/' + Driver.mobileNum).then(function(response) {
            console.log('cab details Removed Successfully');
        });
    });
        GetCab();
    }

GetCab();


    });