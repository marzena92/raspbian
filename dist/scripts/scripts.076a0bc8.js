"use strict";angular.module("rasp2App",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("rasp2App").controller("MainCtrl",["$scope","$http","$q",function(a,b,c){a.linia=5070,a.exist=!1,a.nrlinii="51",a.nastprzystanek="Wieża RTV",a.przysp="-10",a.opoz=3;var d=[];d.push("501"),d.push("502"),d.push("560"),d.push("561"),d.push("580"),d.push("582"),d.push("590"),d.push("591"),d.push("592"),d.push("595"),d.push("596"),d.push("597"),d.push("598"),a.odswiez=function(){for(var e=[],f=0;f<d.length;f++)e.push(b.get("http://iplaner.pl:8096/api/v1/key/f78a2e9a/agency/20/command/vehiclesDetails?r="+d[f]+"&format=json"));c.all(e).then(function(b){a.exist=!1,a.opoz=3;for(var c=0;c<b.length;c++)for(var d=0;d<b[c].data.vehicles.length;d++){const e=b[c].data.vehicles[d];e.id==a.linia&&(a.exist=!0,a.nrlinii=e.routeId,a.nastprzystanek=e.nextStopName,a.kierunek=e.headsign,a.przysp=e.schAdhStr.toString().slice(0,-7),parseInt(e.schAdh)>0&&(a.opoz=2),parseInt(e.schAdh)<0&&(a.opoz=1),0==parseInt(e.schAdh)&&(a.opoz=1))}})},setInterval(function(){a.odswiez()},3e3)}]),angular.module("rasp2App").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);