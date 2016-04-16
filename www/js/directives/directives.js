//输入校验
app.directive('bfFieldError',function bfFieldError($compile){
   return{
       restrict:'A',//attribute方式
       required:'ngModel',
       link:function(scope,element,attrs,ngModel){
           var subScope = scope.$new(true);
           subScope.hasError = function(){
               return ngModel.$invalid && ngModel.$dirty;
           };
           subScope.errors = function(){
               return ngModel.$error;
           };
           subScope.customerMessages = $scope.$eval(attrs.bfFieldError);
           var hint = $compile('<ul ng-if="hasError()"><li ng-repeat="(name,wrong) in errors()" ng-if="wrong">{{name|error:customerErrorMessages}}{{errors()}}</li></ul>')(subScope);
           element.after(hint);

       }
   }
});
app.directive('bfAssertEquals',function bfAssertEquals(){
   return{
       restrict:'A',
       require:'ngModel',
       link:function(scope,element,attrs,ngModel){
           var isSame=function(value){
               var second = scope.$eval(attrs.bfAssertEquals);
               return value == second;
           }
           ngModel.$parsers.push(function(value){
              ngModel.$setValidity('same',isSame(value));
              return isSame(value)?value:undefined;
           });
           scope.$watch(
               function(){
                   return scope.$eval(attrs.bfAssertEquals);
               },function(){
                   ngModel.$setValidity('same',isSame(ngModel.$modelValue));
               }
           );
       }
   }
});
app.directive('bfCaptcha',function captcha(){
    return{
        restrict:'A',
        link:function(scope,element){
            var changeSrc = function(){
                element.attr('src','/api/captcha.jpg?random='
                    + new Date().getTime());
            };
            changeSrc();
            element.on('click',function(){
                changeSrc();
            });
        }

    }
});