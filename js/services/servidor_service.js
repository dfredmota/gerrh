'use strict';

App.factory('ServidorService', ['$http', '$q', function($http, $q){

    var url_local = "localhost:8080";
    //var url_local = "209.172.51.58:7447";

    var REST_SERVICE_URI = "http://"+url_local+"/gerrh/servidor/";
    var REST_SERVICE_URI_PESQUISA_NOME = "http://"+url_local+"/gerrh/getbynomeservidor/";
    var REST_SERVICE_URI_PESQUISA_SECRETARIAS = "http://"+url_local+"/gerrh/getsecretarias/";
    var REST_SERVICE_URI_PESQUISA_UNIDADE = "http://"+url_local+"/gerrh/getunidades/";
    var REST_SERVICE_URI_FILE_UPLOAD= "http://"+url_local+"/gerrh/fileUpload/";
    var servlet= "http://localhost:8080/gerrh/UploadServlet";


    var factory = {
        fetchAllServidores: fetchAllServidores,
        createServidor: createServidor,
        updateServidor:updateServidor,
        deleteServidor:deleteServidor,
        showServidor:showServidor,
        pesquisaPorNome:pesquisaPorNome,
        getSecretaria:getSecretaria,
        getUnidades:getUnidades,
        uploadFileToUrl:uploadFileToUrl,
    };

    return factory;

    function uploadFileToUrl(file,tipo,cpf){

        var fd = new FormData();
        fd.append('file', file);
        fd.append('tipo',tipo);
        fd.append('cpf',cpf);

        console.log(file);
        console.log(fd);

        $http.post(REST_SERVICE_URI_FILE_UPLOAD, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function(){
            })
            .error(function(){
            });

    };


    function pesquisaPorNome(servidor) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_NOME,servidor.nome)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Servidor');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function getSecretaria(servidor) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_SECRETARIAS)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Servidor');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function getUnidades(servidor) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_UNIDADE)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while search Servidor');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function fetchAllServidores() {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while fetching Servidores');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function createServidor(servidor) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, servidor)
            .then(
                function (response) {
                    alert("Servidor Salva com Sucesso!");
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert("Já existe um servidor com essa nome!");
                    console.error('Error while creating Servidor');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }


    function updateServidor(servidor, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, servidor)
            .then(
                function (response) {
                    alert("Servidor atualizada com Sucesso!");
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    alert('erro ao atualizar a servidor!');
                    console.error('Error while updating Servidor');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function showServidor(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI+id)

            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while updating Servidor');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

    function deleteServidor(id) {
        var deferred = $q.defer();
        $http.delete(REST_SERVICE_URI+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while deleting Servidor');
                    deferred.reject(errResponse);
                }
            );
        return deferred.promise;
    }

}]);