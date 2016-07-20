'use strict';

App.controller('MunicipioController', ['$scope', 'MunicipioService', function($scope, MunicipioService) {
    var self = this;
    self.municipio={id:null, description:'', estado_id:'', stCityCode:''};
    self.municipios=[];

    self.fetchAllMunicipios = function(){
        MunicipioService.fetchAllMunicipios()
            .then(
                function(d) {
                    self.municipios = d;
                },
                function(errResponse){
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.createMunicipio = function(municipio){
        MunicipioService.createMunicipio(municipio)
            .then(
                self.fetchAllMunicipios,
                function(errResponse){
                    console.error('Error while creating Municipio.');
                }
            );
    };

    self.updateMunicipio = function(municipio, id){
        MunicipioService.updateMunicipio(municipio, id)
            .then(
                self.fetchAllMunicipios,
                function(errResponse){
                    console.error('Error while updating Municipio.');
                }
            );
    };

    self.deleteMunicipio = function(id){
        MunicipioService.deleteMunicipio(id)
            .then(
                self.fetchAllMunicipios,
                function(errResponse){
                    console.error('Error while deleting Municipio.');
                }
            );
    };

    self.fetchAllMunicipios();

    self.submit = function() {
        if(self.municipio.id===null){
            console.log('Saving New Municipio', self.municipio);
            self.createMunicipio(self.municipio);
        }else{
            self.updateMunicipio(self.municipio, self.municipio.id);
            console.log('Municipio updated with id ', self.municipio.id);
        }
        self.reset();
    };

    self.edit = function(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.municipios.length; i++){
            if(self.municipios[i].id === id) {
                self.municipio = angular.copy(self.municipios[i]);
                break;
            }
        }
    };

    self.remove = function(id){
        console.log('id to be deleted', id);
        if(self.municipio.id === id) {//clean form if the municipio to be deleted is shown there.
            self.reset();
        }
        self.deleteMunicipio(id);
    };


    self.reset = function(){
        self.municipio={id:null, description:'', estado_id:'', stCityCode:''};
        $scope.myForm.$setPristine(); //reset Form
    };

}]).controller('EstadoController', ['$scope', 'EstadoService', function($scope, EstadoService) {
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

}]).controller('PaisController', ['$scope', 'PaisService', function($scope, PaisService) {
    var self = this;
    self.pais={id:null, description:'',countrycode:'',countrycurrency:'', countrylanguage: ''};
    self.paises=[];

    self.fetchAllPaises = function(){
        PaisService.fetchAllPaises()
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
                self.fetchAllPaises,
                function(errResponse){
                    console.error('Error while creating Pais.');
                }
            );
    };

    self.updatePais = function(pais, id){
        PaisService.updatePais(pais, id)
            .then(
                self.fetchAllPaises,
                function(errResponse){
                    console.error('Error while updating Pais.');
                }
            );
    };

    self.deletePais = function(id){
        PaisService.deletePais(id)
            .then(
                self.fetchAllPaises,
                function(errResponse){
                    console.error('Error while deleting Pais.');
                }
            );
    };

    self.fetchAllPaises();

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
        console.log('id to be deleted', id);
        if(self.pais.id === id) {//clean form if the pais to be deleted is shown there.
            self.reset();
        }
        self.deletePais(id);
    };


    self.reset = function(){
        self.pais={id:null, description:'',countrycode:'',countrycurrency:'', countrylanguage: ''};
        $scope.myForm.$setPristine(); //reset Form
    };

}]);