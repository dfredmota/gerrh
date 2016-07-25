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


angular
    .module('myApp', [])
    .directive('capitalize', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    });