angular.module('hunzaApp.services', []).factory('Municipio', function($resource) {
    return $resource('http://localhost:3000/municipios/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});