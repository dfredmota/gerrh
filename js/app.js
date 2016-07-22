'use strict';

var App = angular.module('hunzaApp',['ngRoute']);

App.config(function($routeProvider){
   $routeProvider

       .when('/municipios',{
           templateUrl : 'partials/municipios/municipios.html',
           controller : 'MunicipioController'
       })

       .when('/estados',{
           templateUrl : 'partials/estados/estados.html',
           controller : 'EstadoController'
       })

       .when('/paises',{
           templateUrl : 'partials/paises/paises.html',
           controller : 'PaisController'
       });
});