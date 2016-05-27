'use strict';
app.controller('messagesDetailCtrl',['$scope','httpService','$state','curUserService','config','$stateParams','$uibModal',function($scope,httpService,$state,curUserService,config,$stateParams,$uibModal){
    var curUser = curUserService.getCurUser();

    $scope.usingAvatar = curUser.avatar;
    $scope.usingName = curUser.name;
    $scope.usingAccount = curUser.account;

    $scope.deleteMsg - function(id){
        var msgDelete = httpService.post('/app/deleteMessageByMsgId',id);
        msgDelete.then(function(data){
            console.log(data);
            if(data.data == 0){
                swal('删除成功');
            }
        },function(data){
           swal('删除失败',data);
        });
    }

var loadMsgs = function() {
    var msgQuery = httpService.post('/app/getMessagesByAccountAndType',{account:$stateParams.account,type:$stateParams.type});
    msgQuery.then(function (data) {
        console.log(data.data);
        for (var i = 0; i < data.data.length; i++) {
            var msg = data.data[i];
            for (var j = 0; j < msg.favors.length; j++) {
                var favor = msg.favors[j];
                favor.avatar = config.avatarPrefix + favor.avatar;

            }
            for (var k = 0; k < msg.comments.length; k++) {
                var comment = msg.comments[k];
                comment.avatarUrl = config.avatarPrefix + comment.avatarUrl;

            }
            var photos = [];
            for (var t = 0; t < msg.imgUrls.length; t++) {
                var photo = msg.imgUrls[t];
                photos.push(config.photoPrefix + photo);
            }
            msg.imgUrls = photos;
        }
        $scope.messages = data.data;
    }, function (data) {
        console.log('动态加载失败' + data);
    });
}
    loadMsgs();
    $scope.doFavor = function(id){
        var params = {msgId:id,account:curUser.account};
        var favorReq = httpService.post('/app/newFavor',params);
        favorReq.then(function(data){
            if(data.data == 0){
                console.log('点赞成功');
                loadMsgs();
            }
        },function(data){
           console.log('点赞失败，原因：'+data);
        });
    }

    $scope.doComment = function(id) {
        var modalInstance = $uibModal.open({
            templateUrl : 'newComments.html',
            controller : 'commentsModalCtrl',
            size : {
                width:80,
                height:10
            }, //大小配置
            resolve : {
                account:curUser.account,
                msgId : id
            }
        });
        modalInstance.result.then(function(result){
            console.log(result);
            loadMsgs();
        });

    }

}]);

app.controller('commentsModalCtrl',['httpService','$scope','account','$uibModalInstance','msgId',function(httpService,$scope,account,$uibModalInstance,msgId){

    $scope.newComment = function( ){
        console.log($scope.comment);
        var params = {msgId:msgId,account:account,content:$scope.commentForm.content};
        var commentReq = httpService.post('/app/newComment',params);
        commentReq.then(function(data){
            if(data.data == 0){
                console.log('评论成功');
                $uibModalInstance.close(data.data);
            }
        },function(data){
            console.log('评论失败，原因：'+data);
        });

    }
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
}]);
