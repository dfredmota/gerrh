'use strict';

App.controller('SimbologiaController', ['$scope', 'SimbologiaService','$location', function($scope, simbologiaService,
                                                                                            $location) {
    var self = this;

    self.simbologias=[];
    self.simbologia={cdSimbologia:null, nomeclatura:'', salarioBase:''};

    $scope.successTextAlert = "";
    $scope.showSuccessAlert = false;

    $scope.show = false;

    if(Data.parametro != null && Data.parametro != undefined){

        self.simbologia =  Data.parametro;
    }

    // switch flag
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };

    self.fetchAllSimbologias = function(){

        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";

        simbologiaService.fetchAllSimbologias()
            .then(
                function(d) {
                    self.simbologias = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.pesquisaPorNome = function(simbologia){

        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";
        simbologiaService.pesquisaPorNome(simbologia)
            .then(
                function(d) {
                    self.simbologias = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.createSimbologia = function(simbologia){
        simbologiaService.createSimbologia(simbologia)
            .then(
                self.fetchAllSimbologias,
                function(errResponse){
                    alert("Já existe uma simbologia com esse nome!");
                    console.error('Error while creating simbologias.');
                }
            );
    };

    self.updateSimbologia = function(simbologia, id){
        simbologiaService.updateSimbologia(simbologia, id)
            .then(
                self.updateSimbologia(simbologia, id),
                function(errResponse){
                    console.error('Error while updating simbologias.');
                }
            );
    };

    self.showSimbologia = function(id){
        simbologiaService.showSimbologia(id)
            .then(
                function(d) {
                    self.simbologia = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.deleteSimbologia = function(id){
        simbologiaService.deletesimbologia(id)
            .then(
                self.fetchAllSimbologias,
                function(errResponse){
                    console.error('Error while deleting simbologias.');
                }
            );
    };

    self.submit = function() {
        if(self.simbologia.cdSimbologia === null || self.simbologia.cdSimbologia === undefined){
            console.log('Saving New simbologias', self.simbologia);

            var jaExiste = false;

            for(var i = 0; i < self.simbologias.length; i++){
                if(self.simbologias[i].nomeclatura.toUpperCase() === self.simbologia.nomeclatura.toUpperCase()) {

                        jaExiste = true;
                        alert("Já existe uma simbologias com esse nome!");
                        self.reset();
                        break;

                }
            }

            if(!jaExiste) {
                simbologiaService.createSimbologia(self.simbologia);
                $scope.showSuccessAlert = true;
                $scope.successTextAlert = "Operação Realizada com Sucesso!";
            }

        }else{
            simbologiaService.updateSimbologia(self.simbologia, self.simbologia.cdSimbologia);
            console.log('simbologias updated with id ', self.simbologia.cdSimbologia);
            $scope.showSuccessAlert = true;
            $scope.successTextAlert = "Operação Realizada com Sucesso!";
        }

        self.reset();

    };

    self.pesquisa = function() {
        if(self.simbologia.nomeclatura === null || self.simbologia.nomeclatura === ''){
            console.log('pesquisa todas as simbologias', self.simbologia);
            self.fetchAllSimbologias();
        }else{
            console.log('pesquisa por nome ', self.simbologia.nomeclatura);
            self.pesquisaPorNome(self.simbologia);
        }

    };

    self.edit = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.simbologias.length; i++){
            if(self.simbologias[i].cdSimbologia === id) {
                self.simbologia = angular.copy(self.simbologias[i]);
                $scope.selected = self.simbologia;
                $scope.show = false;
                break;
            }
        }
        //self.showSimbologia(id);

    };

    self.show = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.simbologias.length; i++){
            if(self.simbologias[i].cdSimbologia === id) {
                self.simbologia = angular.copy(self.simbologias[i]);
                $scope.selected = self.simbologia;
                $scope.show = true;
                break;
            }
        }
        //self.showSimbologia(id);

    };

    self.pesquisa = function(){

        var tipoFiltro = document.getElementById("filtrar").value;

        if(tipoFiltro == 0 || tipoFiltro == 3){

            self.fetchAllSimbologias();

        }

        if(tipoFiltro == 1){

            self.pesquisaPorNome(self.simbologia);

        }

        //self.showUnidade(id);

    };

    self.remove = function(id){
        console.log('id to be deleted', id);
        if(self.simbologia.cdSimbologia === id) {//clean form if the simbologias to be deleted is shown there.
            self.reset();
        }
        self.deletesimbologia(id);
    };


    self.reset = function(){
        self.simbologia={cdSimbologia:null, nomeclatura:'', salarioBase:''};
        //$scope.myForm.$setPristine(); //reset Form
    };

}]);

