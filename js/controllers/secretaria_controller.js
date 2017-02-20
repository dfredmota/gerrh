'use strict';

App.controller('SecretariaController', ['$scope', 'SecretariaService','$location', function($scope, secretariaService,
                                                                                            $location) {
    var self = this;

    self.secretarias=[];
    self.secretaria={cdSecretaria:null, nmSecretaria:'', dsEmail:'', nuTelefone:'', status:'',nuCep:'',
        tipoLogradouro:'',dsLogradouro:'',dsBairro:'',numero:'',idTipoLogradouro:''};

    $scope.successTextAlert = "";
    $scope.showSuccessAlert = false;

    $scope.show = false;

    self.secretariasCombo=[];

    if(Data.parametro != null && Data.parametro != undefined){

        self.secretaria =  Data.parametro;
        self.secretaria.idTipoLogradouro = ""+self.secretaria.idTipoLogradouro;

    }

    // switch flag
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };

    self.secretariasUnidade = function(){
        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";

        secretariaService.fetchAllSecretarias()
            .then(
                function(d) {
                    self.secretariasCombo = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllSecretarias = function(){

        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";

        secretariaService.fetchAllSecretarias()
            .then(
                function(d) {
                    self.secretarias = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.secretariasUnidade();

    self.pesquisaPorNome = function(secretaria){

        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";

        secretariaService.pesquisaPorNome(secretaria)
            .then(
                function(d) {
                    self.secretarias = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };


    self.createSecretaria = function(secretaria){
        secretariaService.createSecretaria(secretaria)
            .then(
                self.fetchAllsecretarias,
                function(errResponse){
                    console.error('Error while creating secretarias.');
                }
            );
    };

    self.updateSecretaria = function(secretaria, id){
        secretariaService.updateSecretaria(secretaria, id)
            .then(
                self.updateSecretaria(secretaria, id),
                function(errResponse){
                    console.error('Error while updating secretarias.');
                }
            );
    };

    self.showSecretaria = function(id){
        secretariaService.showSecretaria(id)
            .then(
                function(d) {
                    self.secretaria = d;

                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.deleteSecretaria = function(id){
        secretariaService.deletesecretaria(id)
            .then(
                self.fetchAllSecretarias,
                function(errResponse){
                    console.error('Error while deleting secretarias.');
                }
            );
    };

    self.submit = function() {
        if(self.secretaria.cdSecretaria === null || self.secretaria.cdSecretaria === undefined){
            console.log('Saving New secretarias', self.secretaria);

            self.secretaria.tipoLogradouro = self.secretaria.idTipoLogradouro;

            var jaExiste = false;

            for(var i = 0; i < self.secretarias.length; i++){
                if(self.secretarias[i].nmSecretaria.toUpperCase() === self.secretaria.nmSecretaria.toUpperCase()) {
                    jaExiste = true;
                    alert("Já Existe uma Secretaria com esse nome!");
                    self.reset();
                    break;
                }
            }

            if(!jaExiste) {
                secretariaService.createSecretaria(self.secretaria);
            }

        }else{

            self.secretaria.tipoLogradouro = self.secretaria.idTipoLogradouro;

            secretariaService.updateSecretaria(self.secretaria, self.secretaria.cdSecretaria);
            console.log('secretarias updated with id ', self.secretaria.cdSecretaria);
            $scope.showSuccessAlert = true;
            $scope.successTextAlert = "Operação Realizada com Sucesso!";
        }

        self.reset();

    };

    self.pesquisa = function() {
        if(self.secretaria.nmSecretaria === null || self.secretaria.nmSecretaria === ''){
            console.log('pesquisa todas as secretarias', self.secretaria);
            self.fetchAllSecretarias();
        }else{
            console.log('pesquisa por nome ', self.secretaria.nmSecretaria);
            self.pesquisaPorNome(self.secretaria);
        }

    };

    self.edit = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.secretarias.length; i++){
            if(self.secretarias[i].cdSecretaria === id) {
                self.secretaria = angular.copy(self.secretarias[i]);
                $scope.selected = self.secretaria;
                $scope.show = false;
                break;
            }
        }
        //self.showSecretaria(id);

    };

    self.show = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.secretarias.length; i++){
            if(self.secretarias[i].cdSecretaria === id) {
                self.secretaria = angular.copy(self.secretarias[i]);
                $scope.selected = self.secretaria;
                $scope.show = true;
                break;
            }
        }
        //self.showSecretaria(id);

    };

    self.pesquisa = function(){

        var tipoFiltro = document.getElementById("filtrar").value;

        if(tipoFiltro == 0 || tipoFiltro == 3){

            self.fetchAllSecretarias();

        }

        if(tipoFiltro == 1){

            self.pesquisaPorNome(self.secretaria);

        }

        //self.showUnidade(id);

    };

    self.remove = function(id){
        console.log('id to be deleted', id);
        if(self.secretaria.cdSecretaria === id) {//clean form if the secretarias to be deleted is shown there.
            self.reset();
        }
        self.deletesecretaria(id);
    };


    self.reset = function(){
        self.secretaria={cdSecretaria:null, nmSecretaria:'', dsEmail:'', nuTelefone:'', status:'',nuCep:'',
            tipoLogradouro:'',dsLogradouro:'',dsBairro:'',numero:'',idTipoLogradouro:''};
        $scope.show = false;
        //$scope.myForm.$setPristine(); //reset Form
    };

    self.redirectToUnidade = function(){

        $location.path('unidades');
    };

}]);

