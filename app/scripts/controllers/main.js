'use strict';

/**
 * @ngdoc function
 * @name rasp2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rasp2App
 */
angular.module('rasp2App')
  .controller('MainCtrl', function ($scope, $http, $q) {

      $scope.linia = 5070;


      $scope.exist = false;
      $scope.nrlinii = "51";
      $scope.nastprzystanek = "Wieża RTV";
      $scope.przysp = "-10";

      $scope.opoz = 3;
      var linie = [];
      linie.push("501");//5039
      linie.push("502");//5098
      linie.push("560");
      linie.push("561");
      linie.push("580");
      linie.push("582");
      linie.push("590");
      linie.push("591");
      linie.push("592");
      linie.push("595");
      linie.push("596");
      linie.push("597");
      linie.push("598");

      $scope.odswiez = function(){
      var prom = [];
      for ( var i = 0 ; i < linie.length ; i++ ){
          prom.push($http.get("http://iplaner.pl:8096/api/v1/key/f78a2e9a/agency/20/command/vehiclesDetails?r="+linie[i]+"&format=json"));
        }
      $q.all(prom).then(function(results){
          $scope.exist = false;
          $scope.opoz = 3;
          for ( var i = 0 ; i < results.length ; i++ ){
              for ( var j = 0 ; j < results[i].data.vehicles.length ; j++ ){
                  const vehicle = results[i].data.vehicles[j];
                  if ( vehicle.id == $scope.linia ){
                      $scope.exist = true;
                      $scope.nrlinii = vehicle.routeId;
                      $scope.nastprzystanek = vehicle.nextStopName;
                      $scope.kierunek = vehicle.headsign;
                      $scope.przysp = vehicle.schAdhStr.toString().slice(0, -7);;
                      if ( parseInt(vehicle.schAdh) > 0 )
                        $scope.opoz = 2;
                      if ( parseInt(vehicle.schAdh) < 0 )
                        $scope.opoz = 1;
                      if ( parseInt(vehicle.schAdh) == 0 )
                        $scope.opoz = 1;
                  }
              }
          }
      });
    }
    setInterval(function(){
      $scope.odswiez();
}, 3000);

  });
