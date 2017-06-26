'use strict';

App.factory('SecretariaService', ['$http', '$q', function($http, $q){


    var url_local = "localhost:8080";
    //var url_local = "209.172.51.58:7447";

    var REST_SERVICE_URI = "http://"+url_local+"/gerrh/secretaria/";
    var REST_SERVICE_URI_PESQUISA_NOME = "http://"+url_local+"/gerrh/getbynomesec/";


    var factory = {
        fetchAllSecretarias: fetchAllSecretarias,
        createSecretaria: createSecretaria,
        updateSecretaria:updateSecretaria,
        deleteSecretaria:deleteSecretaria,
        showSecretaria:showSecretaria,
        pesquisaPorNome:pesquisaPorNome,
    };

    return factory;

    function pesquisaPorNome(secretaria) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_NOME,secretaria.nmSecretaria)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Secretaria');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function fetchAllSecretarias() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching Secretarias');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function createSecretaria(secretaria) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, secretaria)
            .then(
                function (response) {
                    alert('Secretaria salva com sucesso!');
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert('Já Existe uma secretaria com este nome!');
                    console.error('Error while creating Secretaria');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }


    function updateSecretaria(secretaria, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, secretaria)
            .then(
                function (response) {
                    alert('Secretaria atualizada com sucesso!');
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert('erro ao atualizar a secretaria!');
                    console.error('Error while updating Secretaria');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function showSecretaria(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+id)

            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while updating Secretaria');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteSecretaria(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while deleting Secretaria');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);