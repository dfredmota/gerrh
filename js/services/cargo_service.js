'use strict';

App.factory('CargoService', ['$http', '$q','$timeout', function($http, $q,$timeout){

    var REST_SERVICE_URI = 'http://209.172.51.58:7447/gerrh/cargo/';
    var REST_SERVICE_URI_PESQUISA_NOME = 'http://209.172.51.58:7447/gerrh/getbynome/';
    var REST_SERVICE_URI_PESQUISA_SIMBOLOGIAS = 'http://209.172.51.58:7447/gerrh/getsimbologias/';
    var REST_SERVICE_URI_PESQUISA_TIPO_CARGO = 'http://209.172.51.58:7447/gerrh/getbytipocargo/';

    //var REST_SERVICE_URI = 'http://localhost:8080/gerrh/cargo/';
    //var REST_SERVICE_URI_PESQUISA_NOME = 'http://localhost:8080/gerrh/getbynomecargo/';

    //var REST_SERVICE_URI_PESQUISA_SIMBOLOGIAS = 'http://localhost:8080/gerrh/getsimbologias/';

    //var REST_SERVICE_URI_PESQUISA_TIPO_CARGO = 'http://localhost:8080/gerrh/getbytipocargo/';

    var factory = {
        fetchAllCargos: fetchAllCargos,
        createCargo: createCargo,
        updateCargo:updateCargo,
        deleteCargo:deleteCargo,
        showCargo:showCargo,
        pesquisaPorNome:pesquisaPorNome,
        getSimbologias:getSimbologias,
        pesquisaPorTipoCargo:pesquisaPorTipoCargo,
    };

    return factory;

    function pesquisaPorTipoCargo(cargo) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI_PESQUISA_TIPO_CARGO,cargo.tipoCargo)
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

    function createCargo(cargo,$scope) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, cargo)
            .then(
                function (response) {

                    var div_message = document.getElementById("div_message_sucess");

                    div_message.style.display="block";

                    div_message.innerHTML = "Ok! Dados Gravados com sucesso!";

                    $timeout(function(){
                        div_message.style.display="none";
                    }, 5500);



                    deferred.resolve(response.data);
                },
                function(errResponse){

                   var div_error = document.getElementById("div_message");

                   div_error.style.display="block";

                    var tipoErro = errResponse.status;

                    if(tipoErro == 995){

                        div_error.innerHTML = "Ops! Cargo já cadastrado. Tente novamente ou contate o suporte";
                    }

                    if(tipoErro == 996){

                        div_error.innerHTML = "Ops! O Nome Do Cargo já está cadastrado com um outro Tipo de Cargo. \n Para alterar vá em: Tabelas > Consultar Cargos > Selecione o ítem desejado > Botão Editar, ou contate o suporte";
                    }

                    if(tipoErro == 997){

                        div_error.innerHTML = "Ops! O Nome Do Cargo já está cadastrado com um outro Tipo de Cargo. \n Para alterar vá em: Tabelas > Consultar Cargos > Selecione o ítem desejado > Botão Editar, ou contate o suporte";

                    }

                    if(tipoErro == 998){

                        div_error.innerHTML = "Ops! O Nome Do Cargo já está cadastrado com um outro Tipo de Cargo. \n Para alterar vá em: Tabelas > Consultar Cargos > Selecione o ítem desejado > Botão Editar, ou contate o suporte";

                    }

                    if(tipoErro == 999){

                        div_error.innerHTML = "Ops! O Nome Do Cargo já está cadastrado com um outro Tipo de Cargo. \n Para alterar vá em: Tabelas > Consultar Cargos > Selecione o ítem desejado > Botão Editar, ou contate o suporte";
                    }

                    $timeout(function(){
                        div_error.style.display="none";
                    }, 5500);

                }
            );
        return deferred.promise;
    }


    function updateCargo(cargo, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, cargo)
            .then(
                function (response) {


                    var div_message = document.getElementById("div_message_sucess");

                    div_message.style.display="block";

                    div_message.innerHTML = "Ok! Dados Gravados com sucesso!";

                    $timeout(function(){
                        div_message.style.display="none";
                    }, 5500);

                    deferred.resolve(response.data);
                },
                function(errResponse){

                    var div_error = document.getElementById("div_message");

                    div_error.style.display="block";

                    var tipoErro = errResponse.status;

                    if(tipoErro == 995){

                        div_error.innerHTML = "Ops! Cargo já cadastrado. Tente novamente ou contate o suporte";
                    }

                    if(tipoErro == 996){

                        div_error.innerHTML = "Ops! O Cargo Nome Do Cargo já está cadastrado com um outro Tipo de Cargo. \n Para alterar vá em: Tabelas > Consultar Cargos > Selecione o ítem desejado > Botão Editar, ou contate o suporte";
                    }

                    if(tipoErro == 997){

                        div_error.innerHTML = "Ops! O Cargo Nome Do Cargo já está cadastrado com um outro Tipo de Cargo. \n Para alterar vá em: Tabelas > Consultar Cargos > Selecione o ítem desejado > Botão Editar, ou contate o suporte";

                    }

                    if(tipoErro == 998){

                        div_error.innerHTML = "Ops! O Cargo Nome Do Cargo já está cadastrado com um outro Tipo de Cargo. \n Para alterar vá em: Tabelas > Consultar Cargos > Selecione o ítem desejado > Botão Editar, ou contate o suporte";

                    }

                    if(tipoErro == 999){

                        div_error.innerHTML = "Ops! O Cargo Nome Do Cargo já está cadastrado com um outro Tipo de Cargo. \n Para alterar vá em: Tabelas > Consultar Cargos > Selecione o ítem desejado > Botão Editar, ou contate o suporte";
                    }

                    $timeout(function(){
                        div_error.style.display="none";
                    }, 5500);

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