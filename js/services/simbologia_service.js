'use strict';

App.factory('SimbologiaService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = 'http://209.172.51.58:7447/gerrh/simbologia/';
    var REST_SERVICE_URI_PESQUISA_NOME = 'http://209.172.51.58:7447/gerrh/getbynomeclatura/';

    //var REST_SERVICE_URI = 'http://localhost:8080/gerrh/simbologia/';
    //var REST_SERVICE_URI_PESQUISA_NOME = 'http://localhost:8080/gerrh/getbynomeclatura/';

    var factory = {
        fetchAllSimbologias: fetchAllSimbologias,
        createSimbologia: createSimbologia,
        updateSimbologia:updateSimbologia,
        deleteSimbologia:deleteSimbologia,
        showSimbologia:showSimbologia,
        pesquisaPorNome:pesquisaPorNome,
    };

    return factory;

    function pesquisaPorNome(simbologia) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_NOME,simbologia.nomeclatura)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Simbologia');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function fetchAllSimbologias() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching Simbologias');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function createSimbologia(simbologia) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, simbologia)
            .then(
                function (response) {
                    alert("Simbologia Salva com Sucesso!");
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert("Já existe uma simbologia com essa nomeclatura!");
                    console.error('Error while creating Simbologia');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }


    function updateSimbologia(simbologia, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, simbologia)
            .then(
                function (response) {
                    alert("Simbologia atualizada com Sucesso!");
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert('erro ao atualizar a simbologia!');
                    console.error('Error while updating Simbologia');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function showSimbologia(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+id)

            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while updating Simbologia');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteSimbologia(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while deleting Simbologia');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);