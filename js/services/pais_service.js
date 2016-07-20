'use strict';

App.factory('PaisService', ['$http', '$q', function($http, $q){

    return {
        fetchAllPaises: function() {
            return $http.get('http://localhost:8080/hunza/paises')
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while fetching paises');
                        return $q.reject(errResponse);
                    }
                );
        },

        createPais: function(pais){
            return $http.post('http://localhost:8080/hunza/paises', pais)
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while creating pais');
                        return $q.reject(errResponse);
                    }
                );
        },

        updatePais: function(pais, id){
            return $http.put('http://localhost:8080/paises/'+id, pais)
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while updating pais');
                        return $q.reject(errResponse);
                    }
                );
        },

        deletePais: function(id){
            return $http.delete('http://localhost:8080/hunza/paises/'+id)
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while deleting pais');
                        return $q.reject(errResponse);
                    }
                );
        }

    };

}]);