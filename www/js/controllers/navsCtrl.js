'use strict';
app.controller('navsCtrl',function($scope,$ionicSideMenuDelegate){
    $scope.toggleLeft = function(){
        $ionicSideMenuDelegate.toggleLeft();
    }
});