'use strict';
app.controller('referredQueryCtrl',['$scope','httpService','$ionicSideMenuDelegate','config',,'curUserService',
    function($scope,httpService,$ionicSideMenuDelegate,$ionicTabsDelegate,config,curUserService){
var curUser = curUserService.getCurUser();
   var loadInfo= function(){
       var sceQueryReq = httpService.get('/app/getAllSceneriesRecommendations');
       sceQueryReq.then(function(data){
           for(var i=0;i<data.data.length;i++){
               var sceUnit = data.data[i];
               if(sceUnit.coverPhoto!= undefined){
                   sceUnit.coverPhoto = config.photoPrefix+sceUnit.coverPhoto;
               }
           }
           $scope.sceneries = data.data;
           console.log(data);
       },function(data){
           console.log("请求推荐景点列表失败："+data.data);
       });
       var actQueryReq = httpService.get('/app/getAllActivitiesRecommendations');
       actQueryReq.then(function(data){
           $scope.activities = data.data;
       },function(data){
           console.log("请求推荐活动列表失败："+data.data);
       });
   }
    loadInfo();
    $scope.doJoin = function(id){

                var modalInstance = $uibModal.open({
                    templateUrl : 'newOrder.html',
                    controller : 'orderModalCtrl',
                    size : {
                        width:80,
                        height:60
                    }, //大小配置
                    resolve : {
                        account:curUser.account,
                        activityId : id
                    }
                });
                modalInstance.result.then(function(result){
                    console.log(result);
                    if(result == 0){
                        sweetAlert("报名","报名成功","success");
                        $state.go("tab.referred");
                    }

                });
                loadInfo();

    }
}]);
app.controller('orderModalCtrl',['httpService','$scope','account','$uibModalInstance','activityId',function(httpService,$scope,account,$uibModalInstance,activityId){

    $scope.newOrder = function( ){

        var params = {activityId:activityId,account:account,num:$scope.orderForm.peopleNum,name:$scope.orderForm.personName};
        httpService.post('/app/addActivityParticipantNumber',{id:id,numebr:params.num})
            .success(function(data){
                if(data.data == 0){
                    var commentReq = httpService.post('/app/newOrder',params);
                    commentReq.then(function(data){

                        $uibModalInstance.close(data.data);

                    },function(data){
                        $uibModalInstance.close(data.data);
                        console.log('报名失败，原因：'+data);
                    });
                }
            }).error(function(data){
                console.log("报名失败"+data);
            });


    }
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
}]);