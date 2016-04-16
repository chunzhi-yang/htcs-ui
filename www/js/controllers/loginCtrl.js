'use strict';
app.controller('loginCtrl',['$scope','$state','$http',  function ($scope,$state,$http){

    $scope.doLogin=function(){
        var promise =  $http({url:'http://172.18.13.113:8080/app/login',method:'POST',params:$scope.login});
        promise.then(function(data){
            console.log(data);
        });



        $state.go("login.signin");

    };
    $scope.doCreate = function(){
        $state.go("error.404");
    }
}]);