'use strict';

App.factory('UnidadeService', ['$http', '$q', function($http, $q){

    var REST_SERVICE_URI = 'http://209.172.51.58:7447/gerrh/unidade/';
    var REST_SERVICE_URI_PESQUISA_NOME = 'http://209.172.51.58:7447/gerrh/getbynome/';
    var REST_SERVICE_URI_PESQUISA_SECRETARIA = 'http://209.172.51.58:7447/gerrh/getbysecretaria/';

    var REST_SERVICE_URI = 'http://localhost:8080/gerrh/unidade/';
    var REST_SERVICE_URI_PESQUISA_NOME = 'http://localhost:8080/gerrh/getbynome/';
    var REST_SERVICE_URI_PESQUISA_SECRETARIA = 'http://localhost:8080/gerrh/getbysecretaria/';


    var factory = {
        fetchAllUnidades: fetchAllUnidades,
        createUnidade: createUnidade,
        updateUnidade:updateUnidade,
        deleteUnidade:deleteUnidade,
        showUnidade:showUnidade,
        pesquisaPorNome:pesquisaPorNome,
        pesquisaPorSecretaria:pesquisaPorSecretaria,
    };

    return factory;

    function pesquisaPorNome(unidade) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_NOME,unidade.nmUnidade)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Unidade');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function pesquisaPorSecretaria(unidade) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_SECRETARIA,unidade.idSecretaria)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Unidade');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function fetchAllUnidades() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching Unidades');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function createUnidade(unidade) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, unidade)
            .then(
                function (response) {
                    alert('Unidade salva com sucesso!');
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert('Já existe uma unidade com esse nome alocada nessa secretaria!');
                    console.error('Error while creating Unidade');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }


    function updateUnidade(unidade, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, unidade)
            .then(
                function (response) {
                    alert('Unidade atualizada com sucesso!');
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert('erro ao atualizar a unidade!');
                    console.error('Error while updating Unidade');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function showUnidade(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+id)

            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while updating Unidade');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteUnidade(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while deleting Unidade');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);