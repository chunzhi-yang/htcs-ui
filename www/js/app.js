'use strict';
var app = angular.module('tabApp',['ionic','ngCordova']);
app.run(['$ionicPlatform','$rootScope',function ($ionicPlatform,$rootScope) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
    $rootScope.app = {
        name: 'HTCS', // name of your project
        author: 'chunzhi', // author's name or company name
        description: '', // brief description
        version: '1.0', // current version
        year: ((new Date()).getFullYear())
    };
    $rootScope.user ={
      name:'perry',
        id:'1111',
        sex:'女',
        imgSrc:'img/perry.png',
        account:'yyyyy'
    };
}]).config(['$stateProvider', '$urlRouterProvider','$ionicConfigProvider','$httpProvider',
    function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$httpProvider) {
        $httpProvider.interceptors.push(['$q', '$injector',function($q, $injector){
            return {
                request: function (config) {
                    //TODO 带上未知属性会产生一个options请求问题
                    var requestUrl = config.url;
                    //  config.headers['X-Access-Session'] = $window.sessionStorage.sessionId||'123';
                    //config.headers['X-Access-Token'] = $window.sessionStorage.token||'asdasd';
                    var $location = $injector.get('$location');
                    var absUrl = $location.absUrl();
                    //  config.headers['X-Access-Url'] = absUrl;
                    //  config.headers['Cookie'] = 'JSESSIONID=901A45116F7EFC0253F6F30CE023A740';
                    return config;
                },
                requestError: function(rejection) {
                    return $q.reject(rejection);
                },
                response: function (response) {
                    return response || $q.when(response);
                },
                responseError: function(rejection) {
                    var $state = $injector.get('$state');
                    if(rejection.status === 401) {
                        $state.go('login.signin');
                    }else  if(rejection.status === 500) {
                        var data=rejection.data;
                        if(data.error){
                            try{
                              alert("系统错误");

                            }catch(e){}
                        }else{
                            $state.go('error.500');
                        }
                    }else if(rejection.status === 404){
                        try{
                            $state.go('error.404');

                        }catch(e){}
                    }
                    return $q.reject(rejection);
                }
            };
        }]);

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        $stateProvider
           .state('error',{
                url:'/error',
                abstract:'true',
                template:'<div ui-view></div>'
            })
           .state('error.403', {
                url: '/403',
                templateUrl: '403.html'
            })
            .state('error.404', {
                url: '/404',
                templateUrl: '404.html'
            })
            .state('error.500', {
                url: '/500',
                templateUrl: '500.html'

            })
            .state('login', {
                url: '/login',
                abstract:'true',
                template: '<div ui-view></div>'
            })
            .state('login.signin', {
                url: '/signin',
                templateUrl: 'login.html',
                controller: 'loginCtrl'
            })
            .state('login.forget', {
                url: '/forget',
                templateUrl: ' login_forget.html',
                controller: 'loginCtrl'
            })
            .state('login.regist', {
                url: '/regist',
                templateUrl: ' login_regist.html',
                controller: 'loginCtrl'
            })
            .state('tab', {
                url: '/tab',
                templateUrl: ' views/tabs.html',
                controller:'navsCtrl'
            })
            .state('tab.activities', {
                url: '/activities',
                views: {
                    'tab_activities': {
                        templateUrl: ' views/activities/activities-index.html',
                        controller: 'activitiesQueryCtrl'
                    }
                }
            })
            .state('tab.activities.add', {
                url: '/activities/add',
                templateUrl: ' views/activities/activities-detail.html',
                controller: 'activitiesEditCtrl'
            })
            .state('tab.messages', {
                url: '/messages/:type',
                views: {
                    'tab_messages': {
                        templateUrl: ' views/messages/messages-index.html',
                        controller: 'messagesQueryCtrl'
                    }
                }
            })

            .state('tab.messages.view', {
                url: '/messages/view',
                templateUrl: ' views/messages/messages-detail.html',
                controller: 'messagesEditCtrl'
            })
            .state('tab.messages.add', {
                url: '/messages/add',
                templateUrl: ' views/messages/messages-add.html',
                controller: 'messagesEditCtrl'

            })
            .state('tab.messages.edit', {
                url: '/messages/edit',
                templateUrl: ' views/messages/messages-add.html',
                controller: 'messagesEditCtrl'


            })
            .state('tab.user', {
                url: '/user',
                views: {
                    'tab_user': {
                        templateUrl: ' views/user/user-info.html',
                        controller: 'userCtrl'
                    }
                }
            })
            .state('tab.user.edit', {
                url: '/user/edit/:id',
                templateUrl: ' views/user/user-add.html',
                controller: 'userEditCtrl'
            })
            .state('tab.friends', {
                url: '/friends',
                views: {
                    'tab_friends': {
                        templateUrl: ' views/friends-close/friends-index.html',
                        controller: 'friendsCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/tab/user');

    }]);


