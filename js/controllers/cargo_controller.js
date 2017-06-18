'use strict';

App.controller('CargoController', ['$scope', 'CargoService','$location','$timeout', function($scope, cargoService,
                                                                                  $location,$timeout) {




    var self = this;

    self.cargos=[];
    self.cargo={cdCargo:null, nome:'', tipoCargo:0,descTipoCargo:'',escolaridade:'',cargaHoraria:'',
        grupoOcupacional:0,classe1ReferenciaMin:'',classe1ReferenciaMax:'',classe2ReferenciaMin:'',classe2ReferenciaMax:'',
        classe3ReferenciaMin:'',classe3ReferenciaMax:'',classe4ReferenciaMin:'',classe4ReferenciaMax:'',classe5ReferenciaMin:'',
        classe5ReferenciaMax:'',atribuicoesCargo:'',requisitosProvimento:'',idSimbologia:0,grupoOcupacionalDesc:'',
        salarioBase:''};

    $scope.successTextAlert = "";
    $scope.showSuccessAlert = false;

    self.selectedSimbologia = null;
    $scope.simbologias = [];

    $scope.show = false;

    angular.element('#myModalShower').trigger('click');

    if(Data.parametro != null && Data.parametro != undefined){

        self.cargo =  Data.parametro;
    }

    // switch flag
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };



    $scope.open = function() {

        $scope.showModal = true;
    };

    $scope.ok = function() {
        $scope.showModal = false;
    };

    $scope.cancel = function() {
        $scope.showModal = false;
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
                    console.log(errResponse);
                }
            );
    };

    self.pesquisaPorTipoCargo = function(cargo){

        console.log("Pesquisa por Tipo de Cargo");
        console.log("Tipo de Cargo:");
        console.log(cargo.tipoCargo);
        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";
        cargoService.pesquisaPorTipoCargo(cargo)
            .then(
                function(d) {
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
        cargoService.createCargo(cargo,$scope)
            .then(self.fetchAllCargos


            ).catch(function (errResponse) {
            alert("ERRRRRO!!");
        });
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

        if(self.cargo.cdCargo === null || self.cargo.cdCargo === undefined) {
            console.log('Saving New cargos', self.cargo);

            var jaExiste = false;

            console.log(self.cargos[i]);

            for (var i = 0; i < self.cargos.length; i++) {

                if (self.cargos[i].nome.toUpperCase() === self.cargo.nome.toUpperCase()) {

                    jaExiste = true;
                    alert("Já existe um cargo com esse nome!");
                    self.reset();
                    break;

                }
            }

            if (!jaExiste) {

                //reseta as bordas

                document.getElementById("nome").style.borderColor = "";
                document.getElementById("salarioBase").style.borderColor = "";
                document.getElementById("tipoCargo_").style.borderColor = "";
                document.getElementById("quantidade").style.borderColor = "";
                document.getElementById("escolaridade").style.borderColor = "";
                document.getElementById("cargaHoraria").style.borderColor = "";
                document.getElementById("grupoOcupacional").style.borderColor = "";
                document.getElementById("atribuicoesCargo").style.borderColor = "";
                document.getElementById("requisitosProvimento").style.borderColor = "";

                var idSimbo = document.getElementById("simbologias").value.replace("number:", "");

                if (idSimbo != null && idSimbo != undefined) {

                    self.cargo.idSimbologia = idSimbo;
                }

                self.cargo.tipoCargo = document.getElementById("tipoCargo").value;

                self.cargo.escolaridade = document.getElementById("escolaridade").value;

                self.cargo.grupoOcupacional = document.getElementById("grupoOcupacional").value;

                cargoService.createCargo(self.cargo);

            } else {


                document.getElementById("nome").style.borderColor = "";
                document.getElementById("salarioBase").style.borderColor = "";
                document.getElementById("tipoCargo_").style.borderColor = "";
                document.getElementById("quantidade").style.borderColor = "";
                document.getElementById("escolaridade").style.borderColor = "";
                document.getElementById("cargaHoraria").style.borderColor = "";
                document.getElementById("grupoOcupacional").style.borderColor = "";
                document.getElementById("atribuicoesCargo").style.borderColor = "";
                document.getElementById("requisitosProvimento").style.borderColor = "";

                var idSimbo = document.getElementById("simbologias").value.replace("number:", "");

                if (idSimbo != null && idSimbo != undefined) {

                    self.cargo.idSimbologia = idSimbo;
                }

                self.cargo.tipoCargo = document.getElementById("tipoCargo").value;

                self.cargo.escolaridade = document.getElementById("escolaridade").value;

                self.cargo.grupoOcupacional = document.getElementById("grupoOcupacional").value;

                cargoService.updateCargo(self.cargo, self.cargo.cdCargo);

            }

            self.reset();
        }

    };

    self.edit = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.cargos.length; i++){
            if(self.cargos[i].cdCargo === id) {
                self.cargo = angular.copy(self.cargos[i]);
                $scope.selected = self.cargo;
                $scope.show = false;

                console.log(self.cargo);

                if(self.cargo.grupoOcupacional == 1){

                    self.cargo.grupoOcupacionalDesc = 'ANS - Atividades de nível superior';
                }

                if(self.cargo.grupoOcupacional == 2){

                    self.cargo.grupoOcupacionalDesc = 'AAD - Atividades de apoio administrativo';
                }

                if(self.cargo.grupoOcupacional == 3){

                    self.cargo.grupoOcupacionalDesc = 'AAO - Atividades de apoio operacional';
                }

                if(self.cargo.grupoOcupacional == 4){

                    self.cargo.grupoOcupacionalDesc = 'Outros';
                }

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

        if(tipoFiltro === '3' || tipoFiltro === '0'){
            self.fetchAllCargos();
        }else if(tipoFiltro === '1'){
            self.pesquisaPorNome(self.cargo);
        }else if(tipoFiltro === '2'){

            var tipoCargo = document.getElementById("tipoCargo").value;

            if(tipoCargo != null && tipoCargo != undefined){

                self.cargo.tipoCargo = tipoCargo;
            }

            self.pesquisaPorTipoCargo(self.cargo);

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
        self.cargo={cdCargo:null, nome:'', tipoCargo:0,descTipoCargo:'',escolaridade:'',cargaHoraria:'',
            grupoOcupacional:0,classe1ReferenciaMin:'',classe1ReferenciaMax:'',classe2ReferenciaMin:'',classe2ReferenciaMax:'',
            classe3ReferenciaMin:'',classe3ReferenciaMax:'',classe4ReferenciaMin:'',classe4ReferenciaMax:'',classe5ReferenciaMin:'',
            classe5ReferenciaMax:'',atribuicoesCargo:'',requisitosProvimento:'',idSimbologia:0,grupoOcupacionalDesc:'',
            salarioBase:''};
        //$scope.myForm.$setPristine(); //reset Form
    };

}]);

