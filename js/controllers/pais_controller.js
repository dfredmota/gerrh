'use strict';

App.controller('PaisController', ['$scope', 'PaisService', function($scope, PaisService) {
    var self = this;
    self.pais={id:null, description:'',countrycode:'',countrycurrency:'',countrylanguage:''};
    self.paises=[];

    self.fetchAllPais = function(){
        PaisService.fetchAllPaiss()
            .then(
                function(d) {
                    self.paises = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };


    self.createPais = function(pais){
        PaisService.createPais(pais)
            .then(
                self.fetchAllPais,
                function(errResponse){
                    console.error('Error while creating Pais.');
                }
            );
    };

    self.updatePais = function(pais, id){
        PaisService.updatePais(pais, id)
            .then(
                self.fetchAllPaiss,
                function(errResponse){
                    console.error('Error while updating Pais.');
                }
            );
    };

    self.deletePais = function(id){
        PaisService.deletePais(id)
            .then(
                self.fetchAllPaiss,
                function(errResponse){
                    console.error('Error while deleting Pais.');
                }
            );
    };

    self.fetchAllPais();

    self.submit = function() {
        if(self.pais.id===null){
            console.log('Saving New Pais', self.pais);
            self.createPais(self.pais);
        }else{
            self.updatePais(self.pais, self.pais.id);
            console.log('Pais updated with id ', self.pais.id);
        }
        self.reset();
    };

    self.edit = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.paises.length; i++){
            if(self.paises[i].id === id) {
                self.pais = angular.copy(self.paises[i]);
                break;
            }
        }
    };

    self.remove = function(id){

        var r = confirm("Deseja Deletar Pais?");
        if (r == true) {
            console.log('id to be deleted', id);
            if(self.pais.id === id) {//clean form if the pais to be deleted is shown there.
                self.reset();
            }
            self.deletePais(id);
        } else {
            return;
        }



    };


    self.reset = function(){
        self.pais={id:null, description:'',countrycode:'',countrycurrency:'',countrylanguage:''};
        $scope.myForm.$setPristine(); //reset Form
    };

}]);