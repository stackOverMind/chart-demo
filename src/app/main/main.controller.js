(function() {
  'use strict';

  angular
    .module('chartDemo')
    .controller('LineCtrl',["$scope","$wilddogArray",function($scope,$wilddogArray){



  $scope.data = {};
  $scope.onShow = function(url){
    var ref = new Wilddog(url);
    var newData = $wilddogArray(ref).$loaded().then(function(data){
      data.forEach(function(obj,index){
        console.log(obj,index);
        if(typeof obj["$value"] != 'object'){
          if($scope.data[obj.$id] == null){
            initSerial($scope.data,obj.$id);

            setInterval(function(){
              $scope.$apply(function(){
                var value = obj["$value"];
                $scope.data[obj.$id].data[0].unshift(value);
                $scope.data[obj.$id].data[0].pop();
                console.log($scope.data)
              });

            },3000);
          }
        }
      })
    })
  }

  var initSerial = function(data,key){
    data[key] = {"labels":[],"series":[key],"data":[[]]};
    for(var i=0;i<100;i++){
      data[key].labels.push(i);
      data[key].data[0].push(0);
    }
  }

/*  $scope.series = ['temperature','humidity','pm2.5'];
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
*/
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

}]);

})()

  