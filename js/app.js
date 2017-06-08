'use strict';


var App = angular.module('hunzaApp',['ngRoute']);

App.config(function($routeProvider){
   $routeProvider

        .when('/secretarias',{
        templateUrl : 'partials/secretarias/secretarias.html',
        controller : 'SecretariaController'
    })

       .when('/simbologias',{
           templateUrl : 'partials/simbologias/cargos.html',
           controller : 'SimbologiaController'
       })

       .when('/unidades',{
       templateUrl : 'partials/unidades/unidades.html',
       controller : 'UnidadeController'
   });
});


App.directive('capitalize', function() {
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

App=angular.module('hunzaApp',['mgcrea.ngStrap']);
var Data = {
    tabPrefix: 'tab_',
    newTab: function(u, t,a){

        var tabJaExiste = false;

        for(var i = 0; i < Data.tabs.length; i++){

            if(Data.tabs[i].url === u){
                tabJaExiste = true;
                Data.tabs.splice(Data.tabs[i].i, 1);
                Data.tabIndex = Data.tabs.push({title:t||'...',i: Data.tabs.length, url: u}) - 1;
                break;
            }
        }

        if(!tabJaExiste)
        Data.tabIndex = Data.tabs.push({title:t||'...',i: Data.tabs.length, url: u}) - 1;

        Data.parametro = a;


    },
    closeTab: function(i){
        var l = Data.tabs.length-1, c = Data.tabIndex;
        //return console.log(i);
        Data.tabs.splice(i, 1);
        var n=0;
        for (var n = Data.tabs.length - 1; n >= 0; n--) {
            Data.tabs[n].i=n;
        };
        if(c > i || c==l){
            Data.tabIndex--;
        }
    }
};
App.controller('Form', function($scope){
    $scope.SelfTab = 3;
    $scope.parametro='a';
});
App.directive('swGo', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, controllers) {
            var ctr = controllers;
            element.bind("click", function(){
                scope.$watch(function(){
                    Data.newTab(attrs.href, attrs.title);
                });
            })
        }
    };
});
App.service('SW', function(){
    this.teste = function(){
        console.log('SW.teste');
        return 'asf';
    };
});
App.controller('Tabs', ['$scope', 'SW', function($scope, SW){

    $scope.Data = Data;
    Data.tabs = [
        {title:'Home', url: 'home.html', i:'home', fix:true}
    ];
    Data.tabIndex = Data.tabs[0].i;

    //this.$setActive(0);



}]);


App.controller('TopBar', ['$scope', '$http', function($scope, $http){
    $scope.Data=Data;
    $http({method: "GET", url: 'conf.json'}).
    success(function(data, status) {
        $scope.status = status;
        Data.conf = data;
    }).
    error(function(data, status) {
            $scope.status = status;
        }
    );
    //alert(Data.menus.menu1[0].dpdown);
}]);