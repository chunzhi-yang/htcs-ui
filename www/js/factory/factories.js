'use strict';
app.factory('myHttpInterceptor',['$q', '$injector',function($q, $injector){
    return {
        request: function (config) {
            //TODO 带上未知属性会产生一个options请求问题
            var requestUrl = config.url;
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

            return response;
        },
        responseError: function(rejection) {
            var $state = $injector.get('$state');
            if(rejection.status === 401){
                $state.go("login.signin");
            }else if(rejection.status === 500) {
                var data=rejection.data;
                if(data.error){
                    try{
                        swal("系统错误");

                    }catch(e){}
                }else{
                    $state.go('error.500');
                }
            }else if(rejection.status === 404){
                try{
                    swal('页面不存在','您要访问的页面不存在');

                }catch(e){}
            }else{
               $state.go('login.signin');
           }
            return $q.reject(rejection);
        }
    };
}]);

