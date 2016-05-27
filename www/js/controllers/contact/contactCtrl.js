app.controller('contactCtrl',['$scope','cordova.plugins.barcodeScanner',function($scope,barcodeScanner){
	
	var loadPhonePic = function(){
			barcodeScanner.encode(barcodeScanner.Encode.TXT_TYPE,
			 "136508976566", function(success) {
          
         	console.log("生成成功");
          }, function(fail) {
            console.log("生成失败");
          }
        );
	}
	loadPhonePic();
}]);