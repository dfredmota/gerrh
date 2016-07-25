'use strict';

App.factory('MunicipioService', ['$http', '$q', function($http, $q){

    return {

        fetchAllMunicipios: function() {
            return $http.get('http://localhost:8080/hunza/municipios')
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while fetching municipios');
                        return $q.reject(errResponse);
                    }
                );
        },

        createMunicipio: function(municipio){
            return $http.post('http://localhost:8080/hunza/municipios/create', municipio)
                .then(
                    function(response){
                        alert("Municipio Incluído com sucesso!");
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while creating municipio');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateMunicipio: function(municipio, id){
            return $http.put('http://localhost:8080/hunza/municipios/update/'+id, municipio)
                .then(
                    function(response){
                        alert("Municipio alterado com sucesso!");
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while updating municipio');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteMunicipio: function(id){
            return $http.delete('http://localhost:8080/hunza/municipios/destroy/'+id)
                .then(
                    function(response){
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while deleting municipio');
                        return $q.reject(errResponse);
                    }
                );
        }

    };

}]).factory('EstadoService', ['$http', '$q', function($http, $q){

    return {
        fetchAllEstados: function() {
            return $http.get('http://localhost:8080/hunza/estados')
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
            return $http.post('http://localhost:8080/hunza/estados/create', state)
                .then(
                    function(response){
                        alert("Estado Incluído com sucesso!");
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while creating state');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateEstado: function(state, id){
            return $http.put('http://localhost:8080/hunza/estados/update/'+id, state)
                .then(
                    function(response){
                        alert("Estado Alterado com sucesso!");
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while updating state');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteEstado: function(id){
            return $http.delete('http://localhost:8080/hunza/estados/destroy/'+id)
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

}]).factory('PaisService', ['$http', '$q', function($http, $q){

    return {
        fetchAllPaises: function() {
            return $http.get('http://localhost:8080/hunza/pais')
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
            return $http.post('http://localhost:8080/hunza/pais/create', pais)
                .then(
                    function(response){
                        alert("País Incluído com sucesso!");
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while creating pais');
                        return $q.reject(errResponse);
                    }
                );
        },

        updatePais: function(pais, id){
            return $http.put('http://localhost:8080/hunza/pais/update/'+id, pais)
                .then(
                    function(response){
                        alert("País Alterado com sucesso!");
                        return response.data;
                    },
                    function(errResponse){
                        console.error('Error while updating pais');
                        return $q.reject(errResponse);
                    }
                );
        },

        deletePais: function(id){
            return $http.delete('http://localhost:8080/hunza/pais/destroy/'+id)
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