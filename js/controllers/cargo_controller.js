'use strict';

App.controller('CargoController', ['$scope', 'CargoService','$location', function($scope, cargoService,
                                                                                  $location) {
    var self = this;

    self.cargos=[];
    self.cargo={cdCargo:null, nome:'', tipoCargo:0,descTipoCargo:''};

    $scope.successTextAlert = "";
    $scope.showSuccessAlert = false;

    $scope.selectedSimbologia = null;
    $scope.simbologias = [];

    $scope.show = false;

    if(Data.parametro != null && Data.parametro != undefined){

        self.cargo =  Data.parametro;
    }

    // switch flag
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };


    $scope.getSimbologias = function(event){


        // $scope.simbologias = [
        //     {cdSimbologia:"14",nomeclatura:"Salário Base"},
        //     {cdSimbologia:"16",nomeclatura:"Salario Comissionado"}
        // ];

        cargoService.getSimbologias()
            .then(
                function(d) {
                    console.log("Lista de Simbologias:");
                    console.log(d);
                    $scope.simbologias = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );


    };

    self.fetchAllCargos= function(){

        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";

        cargoService.fetchAllCargos()
            .then(
                function(d) {
                    console.log("Lista:");
                    console.log(d);
                    self.cargos = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.pesquisaPorNome = function(cargo){

        console.log("Pesquisa por nome");
        console.log("Nome:");
        console.log(cargo.nome);
        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";
        cargoService.pesquisaPorNome(cargo)
            .then(
                function(d) {
                    self.cargos = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };


    self.getSimbologias = function(cargo){

        console.log("lista simbologias");
        console.log("Tipo de Simbologia:");
        console.log(cargo.tipoCargo);
        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";
        cargoService.pesquisaPorNome(cargo)
            .then(
                function(d) {
                    self.cargos = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.createCargo = function(cargo){
        cargoService.createCargo(cargo)
            .then(
                self.fetchAllCargos,
                function(errResponse){
                    alert("Já existe um cargo com esse nome!");
                    console.error('Error while creating cargos.');
                }
            );
    };

    self.updateCargo = function(cargo, id){
        cargoService.updateCargo(cargo, id)
            .then(
                self.updateCargo(cargo, id),
                function(errResponse){
                    console.error('Error while updating cargos.');
                }
            );
    };

    self.showCargo = function(id){
        cargoService.showCargo(id)
            .then(
                function(d) {
                    self.cargo = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.deleteCargo = function(id){
        cargoService.deleteCargo(id)
            .then(
                self.fetchAllCargos,
                function(errResponse){
                    console.error('Error while deleting cargos.');
                }
            );
    };

    self.submit = function() {
        if(self.cargo.cdCargo === null || self.cargo.cdCargo === undefined){
            console.log('Saving New cargos', self.cargo);

            var jaExiste = false;

            console.log(self.cargos[i]);

            for(var i = 0; i < self.cargos.length; i++){

                if(self.cargos[i].nome.toUpperCase() === self.cargo.nome.toUpperCase()) {

                    jaExiste = true;
                    alert("Já existe um cargo com esse nome!");
                    self.reset();
                    break;

                }
            }

            if(!jaExiste) {

                console.log(self.cargo);

                self.cargo.tipoCargo = document.getElementById("tipoCargo").value;

                console.log(self.cargo);

                cargoService.createCargo(self.cargo);
                $scope.showSuccessAlert = true;
                $scope.successTextAlert = "Operação Realizada com Sucesso!";
            }

        }else{
            self.cargo.tipoCargo = document.getElementById("tipoCargo").value;

            console.log("Update");
            console.log(self.cargo);

            cargoService.updateCargo(self.cargo, self.cargo.cdCargo);
            console.log('cargos updated with id ', self.cargo.cdCargo);
            $scope.showSuccessAlert = true;
            $scope.successTextAlert = "Operação Realizada com Sucesso!";
        }

        self.reset();

    };

    self.pesquisa = function() {
        if(self.cargo.nome === null || self.cargo.nome === ''){
            console.log('pesquisa todas as cargos', self.cargo);
            self.fetchAllCargos();
        }else{
            console.log('pesquisa por nome ', self.c.nome);
            self.pesquisaPorNome(self.cargo);
        }

    };

    self.edit = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.cargos.length; i++){
            if(self.cargos[i].cdCargo === id) {
                self.cargo = angular.copy(self.cargos[i]);
                $scope.selected = self.cargo;
                $scope.show = false;
                break;
            }
        }
        //self.showCargo(id);

    };

    self.show = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.cargos.length; i++){
            if(self.cargos[i].cdCargo === id) {
                self.cargo = angular.copy(self.cargos[i]);
                $scope.selected = self.cargo;
                $scope.show = true;
                break;
            }
        }
        //self.showCargo(id);

    };

    self.pesquisa = function(){

        var tipoFiltro = document.getElementById("filtrar").value;

        if(tipoFiltro == 0 || tipoFiltro == 3){

            self.fetchAllCargos();

        }

        if(tipoFiltro == 1){

            self.pesquisaPorNome(self.cargo);

        }

        //self.showUnidade(id);

    };

    self.remove = function(id){
        console.log('id to be deleted', id);
        if(self.cargo.cdCargo === id) {//clean form if the cargos to be deleted is shown there.
            self.reset();
        }
        self.deleteCargo(id);
    };


    self.reset = function(){
        self.cargo={cdCargo:null, nome:'', tipoCargo:''};
        //$scope.myForm.$setPristine(); //reset Form
    };

}]);

