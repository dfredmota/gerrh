'use strict';

App.factory('CargoService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = 'http://209.172.51.58:7447/gerrh/cargo/';
    var REST_SERVICE_URI_PESQUISA_NOME = 'http://209.172.51.58:7447/gerrh/getbynome/';
    var REST_SERVICE_URI_PESQUISA_SIMBOLOGIAS = 'http://209.172.51.58:7447/gerrh/getsimbologias/';

    //var REST_SERVICE_URI = 'http://localhost:8080/gerrh/cargo/';
    //var REST_SERVICE_URI_PESQUISA_NOME = 'http://localhost:8080/gerrh/getbynomecargo/';

    //var REST_SERVICE_URI_PESQUISA_SIMBOLOGIAS = 'http://localhost:8080/gerrh/getsimbologias/';

    var factory = {
        fetchAllCargos: fetchAllCargos,
        createCargo: createCargo,
        updateCargo:updateCargo,
        deleteCargo:deleteCargo,
        showCargo:showCargo,
        pesquisaPorNome:pesquisaPorNome,
        getSimbologias:getSimbologias,
    };

    return factory;

    function pesquisaPorNome(cargo) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_NOME,cargo.nome)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Cargo');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function getSimbologias(cargo) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_SIMBOLOGIAS)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Cargo');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function fetchAllCargos() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching Cargos');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function createCargo(cargo) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, cargo)
            .then(
                function (response) {
                    alert("Cargo Salva com Sucesso!");
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert("Já existe um cargo com essa nome!");
                    console.error('Error while creating Cargo');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }


    function updateCargo(cargo, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, cargo)
            .then(
                function (response) {
                    alert("Cargo atualizada com Sucesso!");
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert('erro ao atualizar a cargo!');
                    console.error('Error while updating Cargo');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function showCargo(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+id)

            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while updating Cargo');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteCargo(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while deleting Cargo');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);