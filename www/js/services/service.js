'use strict';

app.factory('httpService',function($http,$q,config){
	var rootPath=config.httpUrl;;
    function getUrl(url){
    	if(url.startWith('http')){
    		return url;
    	}
    	return rootPath+url;
    }

    return{
        post: function (url, param, config) {
            url = getUrl(url);
            return $http.post(url, $.param(param || {}), config || {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        },
        get: function (url, config) {
            url = getUrl(url);
            return $http.get(url, config || {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        },
        put: function (url, param) {
            url = getUrl(url);
            return $http.put(url, param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        },
        'delete': function (url) {
            url = getUrl(url);
            return $http['delete'](url, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        },
        createObject: function (url, param) {

            url = getUrl(url);
            var defer = $q.defer();
            $http.post(url, JSON.stringify(param), {headers: {'Content-Type': 'application/json'}}).then(function (d) {
                if (d.data != 0) {
                    defer.resolve(d);
                } else {
                    defer.reject('0行记录被添加');
                }
            }, function (e) {
                //defer.reject(e);
            });
            return defer.promise;
        },
        updateObject: function (url, param) {
            url = getUrl(url);
            var defer = $q.defer();
            $http.put(url, JSON.stringify(param), {headers: {'Content-Type': 'application/json'}}).then(function (d) {
                if (d.data != 0) {
                    defer.resolve(d);
                } else {
                    defer.reject('0行记录被修改');
                }
            }, function (e) {
                //defer.reject(e);
            });
            return defer.promise;
        },
        deleteObject: function (url) {
            url = getUrl(url);
            var defer = $q.defer();
            $http['delete'](url, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (d) {
                if (d.data != 0) {
                    defer.resolve(d);
                } else {
                    defer.reject('0行记录被删除');
                }
            }, function (e) {
                //defer.reject(e);
            });
            return defer.promise;
        }
     }
});

