'use strict';

App.controller('UnidadeController', ['$scope', 'UnidadeService','$location', function($scope, unidadeService,
                                                                                            $location) {
    var self = this;

    self.unidades=[];
    self.unidade={cdUnidade:null, nmUnidade:'', dsEmail:'', nuTelefone:'', status:'',nuCep:'',
        tipoLogradouro:'',dsLogradouro:'',dsBairro:'',numero:'',idSecretaria: '',nmSecretaria:''};

    $scope.successTextAlert = "";
    $scope.showSuccessAlert = false;

    $scope.show = false;

    if(Data.parametro != null && Data.parametro != undefined){

        self.unidade =  Data.parametro;

    }

    // switch flag
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };

    self.fetchAllUnidades = function(){

        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";

        unidadeService.fetchAllUnidades()
            .then(
                function(d) {
                    self.unidades = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.pesquisaPorNome = function(unidade){
        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";
        unidadeService.pesquisaPorNome(unidade)
            .then(
                function(d) {
                    self.unidades = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.pesquisaPorSecretaria = function(unidade){

        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";
        unidadeService.pesquisaPorSecretaria(unidade)
            .then(
                function(d) {
                    self.unidades = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.createUnidade = function(unidade){
        unidadeService.createUnidade(unidade)
            .then(
                self.fetchAllUnidades,
                function(errResponse){
                    console.error('Error while creating unidades.');
                }
            );
    };

    self.updateUnidade = function(unidade, id){
        unidadeService.updateUnidade(unidade, id)
            .then(
                self.updateUnidade(unidade, id),
                function(errResponse){
                    console.error('Error while updating unidades.');
                }
            );
    };

    self.showUnidade = function(id){
        unidadeService.showUnidade(id)
            .then(
                function(d) {
                    self.unidade = d;

                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.deleteUnidade = function(id){
        unidadeService.deleteunidade(id)
            .then(
                self.fetchAllUnidades,
                function(errResponse){
                    console.error('Error while deleting unidades.');
                }
            );
    };

    self.submit = function() {
        if(self.unidade.cdUnidade === null || self.unidade.cdUnidade === undefined){
            console.log('Saving New unidades', self.unidade);

            if(self.unidade.idSecretaria === null || self.unidade.idSecretaria === undefined
             || self.unidade.idSecretaria === ''){

                alert("Favor selecionar a secretaria!");
                return;
            }

            var jaExiste = false;

            for(var i = 0; i < self.unidades.length; i++){

                if(self.unidades[i].nmUnidade === self.unidade.nmUnidade.toUpperCase()) {

                    if(self.unidades[i].idSecretaria === self.unidade.idSecretaria) {
                        jaExiste = true;
                        alert("Já existe uma unidade nessa secretaria com esse nome!");
                        self.reset();
                        break;
                    }

                }
            }

            if(!jaExiste) {
                unidadeService.createUnidade(self.unidade);
                $scope.showSuccessAlert = true;
                $scope.successTextAlert = "Operação Realizada com Sucesso!";
            }

        }else{
            unidadeService.updateUnidade(self.unidade, self.unidade.cdUnidade);
            console.log('unidades updated with id ', self.unidade.cdUnidade);
            $scope.showSuccessAlert = true;
            $scope.successTextAlert = "Operação Realizada com Sucesso!";
        }

        self.reset();

    };

    self.pesquisa = function() {
        if(self.unidade.nmUnidade === null || self.unidade.nmUnidade === ''){
            console.log('pesquisa todas as unidades', self.unidade);
            self.fetchAllUnidades();
        }else{
            console.log('pesquisa por nome ', self.unidade.nmUnidade);
            self.pesquisaPorNome(self.unidade);
        }

    };

    self.edit = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.unidades.length; i++){
            if(self.unidades[i].cdUnidade === id) {
                self.unidade = angular.copy(self.unidades[i]);
                $scope.selected = self.unidade;
                $scope.show = false;
                break;
            }
        }
        //self.showUnidade(id);

    };

    self.show = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.unidades.length; i++){
            if(self.unidades[i].cdUnidade === id) {
                self.unidade = angular.copy(self.unidades[i]);
                $scope.selected = self.unidade;
                $scope.show = true;
                break;
            }
        }
        //self.showUnidade(id);

    };


    self.pesquisa = function(){

        var tipoFiltro = document.getElementById("filtrar").value;

        if(tipoFiltro == 0 || tipoFiltro == 3){

            self.fetchAllUnidades();

        }

        if(tipoFiltro == 1){

            self.pesquisaPorNome(self.unidade);

        }

        if(tipoFiltro == 2){

            self.pesquisaPorSecretaria(self.unidade);

        }

        //self.showUnidade(id);

    };

    self.remove = function(id){
        console.log('id to be deleted', id);
        if(self.unidade.cdUnidade === id) {//clean form if the unidades to be deleted is shown there.
            self.reset();
        }
        self.deleteunidade(id);
    };


    self.reset = function(){
        self.unidade={cdUnidade:null, nmUnidade:'', dsEmail:'', nuTelefone:'', status:'',nuCep:'',
            tipoLogradouro:'',dsLogradouro:'',dsBairro:'',numero:''};
        //$scope.myForm.$setPristine(); //reset Form
    };

}]);

