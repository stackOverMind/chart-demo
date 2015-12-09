(function() {
  'use strict';

  angular
    .module('chartDemo')
    .controller('LineCtrl',["$scope","$wilddogObject",function($scope,$wilddogObject){

  //$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.labels = [];
  $scope.data = [[],[],[]];
  for(var i=0;i<100;i++){
    $scope.labels.push(i);
    $scope.data[0].push(0);
    $scope.data[1].push(0);
    $scope.data[2].push(0);
  }
  $scope.series = ['temperature','humidity','pm2.5'];
  var ref = new Wilddog('https://sky.wilddogio.com');
  var newData = $wilddogObject(ref).$loaded().then(function(data){
    
    setInterval(function(){
      var newT = data["temperature"];
      var newP = data["PM25"]
      var newH = data["humidity"]
      $scope.$apply(function(){
        $scope.data[0].push(newT);
        $scope.data[1].push(newH);
        $scope.data[2].push(newP*100);
        $scope.data[0].shift()
        $scope.data[1].shift()
        $scope.data[2].shift() 
        console.log($scope.data);
      });
    },3000);
  })

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

}]);

})()

  