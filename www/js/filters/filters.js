app.filter('error',function(Errors){
    return function(name,customerMessages){
        var errors = angular.extend({},Errors,customerMessages);
        return messages[name] || name;
    }
});
