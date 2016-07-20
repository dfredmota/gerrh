'use strict';

App.factory('EstadoService', ['$http', '$q', function($http, $q){

    return {
        fetchAllEstados: function() {
            return $http.get('http://localhost:3000/states')
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while fetching states');
                        return $q.reject(errResponse);
                    }
                );
        },

        createEstado: function(state){
            return $http.post('http://localhost:3000/states', state)
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while creating state');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateEstado: function(state, id){
            return $http.put('http://localhost:3000/states/'+id, state)
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while updating state');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteEstado: function(id){
            return $http.delete('http://localhost:3000/states/'+id)
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while deleting state');
                        return $q.reject(errResponse);
                    }
                );
        }

    };

}]);