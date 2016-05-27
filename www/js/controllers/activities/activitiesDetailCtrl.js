'use strict';
app.controller('activitiesDetailCtrl',function($scope,httpService,curUserService,$stateParams){
    var curUser = curUserService.getCurUser();
    $scope.usingAccount = curUser.account;
    $scope.usingAvatar = curUser.avatar;
    $scope.usingName = curUser.name;

    var loadActivities = function(){
        httpService.get('/app/findOrdersByAccount',$stateParams.account)
            .success(function(data){
               var list = data.data;
                if(list){
                    var activities = [];
                    for(var i=0;i<list.length;i++) {
                        httpService.get("/app/ActivitiesById", list[i].activityId)
                            .success(function (data) {
                                activities.push(data.data);
                            });
                    }
                    $scope.activities = activities;
                }
            });
    }
    loadActivities();

});