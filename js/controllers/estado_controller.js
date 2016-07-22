'use strict';

App.controller('EstadoController', ['$scope', 'EstadoService', function($scope, EstadoService) {
    var self = this;
    self.estado={id:null, description:'', statecode:'', stateregion:'', country_id:''};
    self.estados=[];

    self.fetchAllEstados = function(){
        EstadoService.fetchAllEstados()
            .then(
                function(d) {
                    self.estados = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.createEstado = function(estado){
        EstadoService.createEstado(estado)
            .then(
                self.fetchAllEstados,
                function(errResponse){
                    console.error('Error while creating Estado.');
                }
            );
    };

    self.updateEstado = function(estado, id){
        EstadoService.updateEstado(estado, id)
            .then(
                self.fetchAllEstados,
                function(errResponse){
                    console.error('Error while updating Estado.');
                }
            );
    };

    self.deleteEstado = function(id){
        EstadoService.deleteEstado(id)
            .then(
                self.fetchAllEstados,
                function(errResponse){
                    console.error('Error while deleting Estado.');
                }
            );
    };

    self.fetchAllEstados();

    self.submit = function() {
        if(self.estado.id===null){
            console.log('Saving New Estado', self.estado);
            self.createEstado(self.estado);
        }else{
            self.updateEstado(self.estado, self.estado.id);
            console.log('Estado updated with id ', self.estado.id);
        }
        self.reset();
    };

    self.edit = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.estados.length; i++){
            if(self.estados[i].id === id) {
                self.estado = angular.copy(self.estados[i]);
                break;
            }
        }
    };

    self.remove = function(id){
        alert("delete")
        console.log('id to be deleted', id);
        if(self.estado.id === id) {//clean form if the estado to be deleted is shown there.
            self.reset();
        }
        self.deleteEstado(id);
    };


    self.reset = function(){
        self.estado={id:null, description:'', statecode:'', stateregion:'', country_id:''};
        $scope.myForm.$setPristine(); //reset Form
    };

}]);