'use strict';


App.directive('demoFileModel', function ($parse) {

    return {
        restrict: 'A', //the directive can be used as an attribute only

        /*
         link is a function that defines functionality of directive
         scope: scope associated with the element
         element: element on which this directive used
         attrs: key value pair of element attributes
         */
        link: function (scope, element, attrs) {
            var model = $parse(attrs.demoFileModel),
                modelSetter = model.assign; //define a setter for demoFileModel

            //Bind change event on the element
            element.bind('change', function () {
                //Call apply on scope, it checks for value changes and reflect them on UI
                scope.$apply(function () {
                    //set the model value
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});

App.controller('ServidorController', ['$scope', 'ServidorService', '$location','$timeout',function ($scope, servidorService,
                                                                                          $location,$timeout) {
    var self = this;

    self.servidores = [];
    self.servidor = {
        cdServidor: null,
        nome: '',
        optionsSexo: '',
        filiacao_pai: '',
        filiacao_mae: '',
        dateNascimento: '',
        nacionalidade: '',
        telefone: '',
        telefone2: '',
        estado_civil: 0,
        escolaridade: 0,
        municipio_nascimento: '',
        conselho_classe: '',
        num_conselho: 0,
        tipoLogradouro: 0,
        cep: '',
        logradouro: '',
        numero: 0,
        municipio: '',
        bairro: '',
        complemento: '',
        data_admissao: '',
        ini_contrato_temp: '',
        fim_contrato_temp: '',
        ordem: '',
        serie: '',
        optionsSituacao: '',
        natureza: 0,
        tipo_admissao: 0,
        tipo_previdencia: '',
        cdCargo: 0,
        cdSecretaria: 0,
        cdUnidade: 0,
        descSecretaria: '',
        descUnidade: '',
        cpf: '',
        ufNascimento: '',
        temGratificacao: '',
        tipoGratificacao: '',
        doc_rg: '',
        imagem:'',
        foto34:'',
        doc_cpf:'',
    };

    $scope.successTextAlert = "";
    $scope.showSuccessAlert = false;

    $scope.selectedSecretaria = null;
    $scope.secretarias = [];

    $scope.selectedUnidade = null;
    $scope.unidades = [];

    $scope.show = false;

    angular.element('#myModalShower').trigger('click');

    if (Data.parametro != null && Data.parametro != undefined) {


        self.servidor = Data.parametro;

        servidorService.showServidor(self.servidor.cdServidor)
            .then(
                function (d) {
                    self.servidor = d;
                    console.log("RETORNO SERVIDOR...");
                    console.log(self.servidor.doc_rg);

                    // console.log("imagem");
                    // console.log(self.servidor.imagem);

                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );

        //populando as combos colocar melhoria pra pegar direto do atributo

        if(self.servidor.estado_civil == 'SOLTEIRO')
            document.getElementById("estado_civil").value = 1;

        if(self.servidor.estado_civil == 'CASADO')
            document.getElementById("estado_civil").value = 2;

        if(self.servidor.estado_civil == 'DIVORCIADO')
            document.getElementById("estado_civil").value = 3;

        if(self.servidor.estado_civil == 'VIUVO')
            document.getElementById("estado_civil").value = 4;

        document.getElementById("optionsSexo").value = self.servidor.optionsSexo;

        document.getElementById("uf_nascimento").value = self.servidor.ufNascimento;


        if(self.servidor.tipoLogradouro == "RUA")
            document.getElementById("tipo_logradouro").value = 1;

        if(self.servidor.tipoLogradouro == "AVENIDA")
            document.getElementById("tipo_logradouro").value = 2;

        if(self.servidor.tipoLogradouro == "TRAVESSA")
            document.getElementById("tipo_logradouro").value = 3;

        if(self.servidor.tipoLogradouro == "BECO")
            document.getElementById("tipo_logradouro").value = 4;

        if(self.servidor.tipoLogradouro == "ALTOSITIO")
            document.getElementById("tipo_logradouro").value = 5;

        if(self.servidor.tipoLogradouro == "VILA")
            document.getElementById("tipo_logradouro").value = 6;

        if(self.servidor.tipoLogradouro == "SÍTIO")
            document.getElementById("tipo_logradouro").value = 7;

        if(self.servidor.tipoLogradouro == "OUTRO...")
            document.getElementById("tipo_logradouro").value = 8;

        document.getElementById("optionsSituacao").value = self.servidor.optionsSituacao;

        if(self.servidor.tipo_admissao == "CARGO_EM_COMISSAO");
        document.getElementById("tipo_admissao").value = 1;

        if(self.servidor.tipo_admissao == "CONCURSO_PUBLICO");
        document.getElementById("tipo_admissao").value = 2;

        if(self.servidor.tipo_admissao == "CONTRATO_TEMPORARIO");
        document.getElementById("tipo_admissao").value = 3;

        if(self.servidor.tipo_admissao == "ELETIVO");
        document.getElementById("tipo_admissao").value = 4;

        if(self.servidor.tipo_admissao == "ESTATUTO");
        document.getElementById("tipo_admissao").value = 5;

        if(self.servidor.tipo_admissao == "OUTRO");
        document.getElementById("tipo_admissao").value = 6;

        document.getElementById("temGratificacao").value = self.servidor.temGratificacao;

        if(self.servidor.temGratificacao == "Sim"){

            document.getElementById("div_tipo_gratificacao").style.display="block";

            document.getElementById("tipoGratificacao").value = self.servidor.tipoGratificacao;

        }

        if(self.servidor.escolaridade =="FUNDAMENTAL_INCOMPLETO"){
            document.getElementById("escolaridade").value = 1;
        }

        if(self.servidor.escolaridade =="FUNDAMENTAL_COMPLETO"){
            document.getElementById("escolaridade").value = 2;
        }

        if(self.servidor.escolaridade =="MEDIO_INCOMPLETO"){
            document.getElementById("escolaridade").value = 3;
        }

        if(self.servidor.escolaridade =="MEDIO_COMPLETO"){
            document.getElementById("escolaridade").value = 4;
        }

        if(self.servidor.escolaridade =="SUPERIOR_INCOMPLETO"){
            document.getElementById("escolaridade").value = 5;
        }

        if(self.servidor.escolaridade =="SUPERIOR_COMPLETO"){
            document.getElementById("escolaridade").value = 6;
        }

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


    $scope.uploadFile = function (tipo) {




    };



    servidorService.getSecretaria()
        .then(
            function (d) {
                console.log("Lista de Secretarias:");
                console.log(d);
                $scope.secretarias = d;
            },
            function (errResponse) {
                console.error('Error while fetching Currencies');
            }
        );

    servidorService.getUnidades()
        .then(
            function (d) {
                console.log("Lista de Unidades:");
                console.log(d);
                $scope.unidades = d;
            },
            function (errResponse) {
                console.error('Error while fetching Currencies');
            }
        );


    self.fetchAllServidores = function () {

        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";

        servidorService.fetchAllServidores()
            .then(
                function (d) {
                    console.log("Lista:");
                    console.log(d);
                    self.servidores = d;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.pesquisaPorNome = function (servidor) {

        console.log("Pesquisa por nome");
        console.log("Nome:");
        console.log(servidor.nome);
        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";
        servidorService.pesquisaPorNome(servidor)
            .then(
                function (d) {
                    self.servidores = d;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };


    self.getSimbologias = function (servidor) {

        console.log("lista simbologias");
        console.log("Tipo de Simbologia:");
        console.log(servidor.tipoServidor);
        $scope.showSuccessAlert = false;
        $scope.successTextAlert = "";
        servidorService.pesquisaPorNome(servidor)
            .then(
                function (d) {
                    self.servidores = d;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.createServidor = function (servidor) {
        servidorService.createServidor(servidor)
            .then(
                self.fetchAllServidores,
                function (errResponse) {
                    alert("Já existe um servidor com esse nome!");
                    console.error('Error while creating servidores.');
                }
            );
    };

    self.updateServidor = function (servidor, id) {
        servidorService.updateServidor(servidor, id)
            .then(
                self.updateServidor(servidor, id),
                function (errResponse) {
                    console.error('Error while updating servidores.');
                }
            );
    };

    self.showServidor = function (id) {
        servidorService.showServidor(id)
            .then(
                function (d) {
                    console.log("GET BY ID SERVIDOR");
                    console.log(d);
                    self.servidor = d;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.deleteServidor = function (id) {
        servidorService.deleteServidor(id)
            .then(
                self.fetchAllServidores,
                function (errResponse) {
                    console.error('Error while deleting servidores.');
                }
            );
    };

    self.submit = function () {
        if (self.servidor.cdServidor === null || self.servidor.cdServidor === undefined) {
            console.log('Saving New servidores', self.servidor);

            var jaExiste = false;

            console.log(self.servidores[i]);

            for (var i = 0; i < self.servidores.length; i++) {

                if (self.servidores[i].nome.toUpperCase() === self.servidor.nome.toUpperCase()) {

                    jaExiste = true;
                    alert("Já existe um servidor com esse nome!");
                    self.reset();
                    break;

                }
            }

            if (!jaExiste) {

                var cpf_upload = self.servidor.cpf+"";

                var estado_civil = document.getElementById("estado_civil").value;

                var escolaridade = document.getElementById("escolaridade").value;

                var tipo_logradouro = document.getElementById("tipo_logradouro").value;

                var tipo_admissao = document.getElementById("tipo_admissao").value;

                var tipo_previdencia = document.getElementById("tipo_previdencia").value;

                var optionsSexo = document.getElementById("optionsSexo").value;

                var optionsSituacao = document.getElementById("optionsSituacao").value;

                var uf_nascimento = document.getElementById("uf_nascimento").value;

                var temGratificacao = document.getElementById("temGratificacao").value;

                var tipoGratificacao = document.getElementById("tipoGratificacao").value;

                self.servidor.temGratificacao = temGratificacao;

                self.servidor.tipoGratificacao = tipoGratificacao;

                self.servidor.ufNascimento = uf_nascimento;

                self.servidor.optionsSexo = optionsSexo;

                self.servidor.optionsSituacao = optionsSituacao;

                self.servidor.estado_civil = estado_civil;

                self.servidor.escolaridade = escolaridade;

                self.servidor.tipoLogradouro = tipo_logradouro;

                self.servidor.tipo_admissao = tipo_admissao;

                self.servidor.tipo_previdencia = tipo_previdencia;

                console.log(self.servidor);

                console.log($scope.fileRg);

                var promise = servidorService.createServidor(self.servidor);

                promise.then(function (response) {


                    //uploads

                    var file = null;

                    var tipo = '';

                    if($scope.foto34 != undefined){

                        file =   $scope.foto34;
                        tipo = 'foto34';

                        servidorService.uploadFileToUrl(file,tipo,cpf_upload);
                    }

                    if($scope.fileRg != undefined){

                        file =   $scope.fileRg;
                        tipo = 'fileRg';

                        servidorService.uploadFileToUrl(file,tipo,cpf_upload);
                    }

                    if($scope.docCpf != undefined){

                        file =   $scope.docCpf;
                        tipo = 'docCpf';

                        servidorService.uploadFileToUrl(file,tipo,cpf_upload);
                    }

                    if($scope.doc_comp_residencia != undefined){

                        file =   $scope.doc_comp_residencia;
                        tipo = 'doc_comp_residencia';

                        servidorService.uploadFileToUrl(file,tipo,cpf_upload);
                    }

                    if($scope.doc_ctps != undefined){

                        file =   $scope.doc_ctps;
                        tipo = 'doc_ctps';

                        servidorService.uploadFileToUrl(file,tipo,cpf_upload);
                    }

                    if($scope.doc_titulo_eleitoral != undefined){

                        file =   $scope.doc_titulo_eleitoral;
                        tipo = 'doc_titulo_eleitoral';

                        servidorService.uploadFileToUrl(file,tipo,cpf_upload);
                    }

                    if($scope.doc_diploma_nivel_medio != undefined){

                        file =   $scope.doc_diploma_nivel_medio;
                        tipo = 'doc_diploma_nivel_medio';

                        servidorService.uploadFileToUrl(file,tipo,cpf_upload);
                    }

                    if($scope.doc_diploma_nivel_superior != undefined){

                        file =   $scope.doc_diploma_nivel_superior;
                        tipo = 'doc_diploma_nivel_superior';
                        servidorService.uploadFileToUrl(file,tipo,cpf_upload);
                    }

                    $scope.serverResponse = response;

                }, function () {

                    alert("opa deu erro na gravação sem uploads...");

                    $scope.serverResponse = 'An error has occurred';
                })




            }

        } else {


            var cpf_upload = self.servidor.cpf+"";

            var estado_civil = document.getElementById("estado_civil").value;

            var escolaridade = document.getElementById("escolaridade").value;

            var tipo_logradouro = document.getElementById("tipo_logradouro").value;

            var tipo_admissao = document.getElementById("tipo_admissao").value;

            var tipo_previdencia = document.getElementById("tipo_previdencia").value;

            var optionsSexo = document.getElementById("optionsSexo").value;

            var optionsSituacao = document.getElementById("optionsSituacao").value;

            var uf_nascimento = document.getElementById("uf_nascimento").value;

            var temGratificacao = document.getElementById("temGratificacao").value;

            var tipoGratificacao = document.getElementById("tipoGratificacao").value;

            self.servidor.temGratificacao = temGratificacao;

            self.servidor.tipoGratificacao = tipoGratificacao;

            self.servidor.ufNascimento = uf_nascimento;

            self.servidor.optionsSexo = optionsSexo;

            self.servidor.optionsSituacao = optionsSituacao;

            self.servidor.estado_civil = estado_civil;

            self.servidor.escolaridade = escolaridade;

            self.servidor.tipoLogradouro = tipo_logradouro;

            self.servidor.tipo_admissao = tipo_admissao;

            self.servidor.tipo_previdencia = tipo_previdencia;

            console.log(self.servidor);

            var promise = servidorService.updateServidor(self.servidor, self.servidor.cdServidor);

            promise.then(function (response) {

                //uploads

                var file = null;

                var tipo = '';

                if ($scope.fileRg != undefined) {

                    file = $scope.fileRg;
                    tipo = 'fileRg';

                    servidorService.uploadFileToUrl(file, tipo, cpf_upload);
                }

                if ($scope.docCpf != undefined) {

                    file = $scope.docCpf;
                    tipo = 'docCpf';

                    servidorService.uploadFileToUrl(file, tipo, cpf_upload);
                }

                if ($scope.doc_comp_residencia != undefined) {

                    file = $scope.doc_comp_residencia;
                    tipo = 'doc_comp_residencia';

                    servidorService.uploadFileToUrl(file, tipo, cpf_upload);
                }

                if ($scope.doc_ctps != undefined) {

                    file = $scope.doc_ctps;
                    tipo = 'doc_ctps';

                    servidorService.uploadFileToUrl(file, tipo, cpf_upload);
                }

                if ($scope.doc_titulo_eleitoral != undefined) {

                    file = $scope.doc_titulo_eleitoral;
                    tipo = 'doc_titulo_eleitoral';

                    servidorService.uploadFileToUrl(file, tipo, cpf_upload);
                }

                if ($scope.doc_diploma_nivel_medio != undefined) {

                    file = $scope.doc_diploma_nivel_medio;
                    tipo = 'doc_diploma_nivel_medio';

                    servidorService.uploadFileToUrl(file, tipo, cpf_upload);
                }

                if ($scope.doc_diploma_nivel_superior != undefined) {

                    file = $scope.doc_diploma_nivel_superior;
                    tipo = 'doc_diploma_nivel_superior';
                    servidorService.uploadFileToUrl(file, tipo, cpf_upload);
                }

            }, function () {

                alert("opa deu erro na gravação sem uploads...");

                $scope.serverResponse = 'An error has occurred';
            })


        }

        self.reset();

    };

    self.pesquisa = function () {
        if (self.servidor.nome === null || self.servidor.nome === '') {
            console.log('pesquisa todas as servidores', self.servidor);
            self.fetchAllServidores();
        } else {
            console.log('pesquisa por nome ', self.c.nome);
            self.pesquisaPorNome(self.servidor);
        }

    };

    self.edit = function (id) {
        console.log('id to be edited', id);


        for (var i = 0; i < self.servidores.length; i++) {
            if (self.servidores[i].cdServidor === id) {
                self.servidor = angular.copy(self.servidores[i]);
                $scope.selected = self.servidor;
                $scope.show = false;
                break;
            }




            //self.showServidor(id);
        }

    };

    self.show = function (id) {
        console.log('id to be edited', id);
        for (var i = 0; i < self.servidores.length; i++) {
            if (self.servidores[i].cdServidor === id) {
                self.servidor = angular.copy(self.servidores[i]);
                $scope.selected = self.servidor;
                $scope.show = true;
                break;
            }
        }
        //self.showServidor(id);

    };

    self.pesquisa = function () {

        var tipoFiltro = document.getElementById("filtrar").value;

        if (tipoFiltro == 0 || tipoFiltro == 4) {

            self.fetchAllServidores();

        }

        console.log("Nome:");
        console.log(self.servidor.nome);

        if (tipoFiltro == 1) {

            if(self.servidor.nome == null || self.servidor.nome == ''){
                self.fetchAllServidores();
            }else {
                self.pesquisaPorNome(self.servidor);
            }

        }

        //self.showUnidade(id);

    };

    self.remove = function (id) {
        console.log('id to be deleted', id);
        if (self.servidor.cdServidor === id) {//clean form if the servidores to be deleted is shown there.
            self.reset();
        }
        self.deleteServidor(id);
    };


    self.reset = function () {
        self.servidor = {
            cdServidor: null,
            nome: '',
            optionsSexo: '',
            filiacao_pai: '',
            filiacao_mae: '',
            dateNascimento: '',
            nacionalidade: '',
            telefone: '',
            telefone2: '',
            estado_civil: 0,
            escolaridade: 0,
            municipio_nascimento: '',
            conselho_classe: '',
            num_conselho: 0,
            tipoLogradouro: 0,
            cep: '',
            logradouro: '',
            numero: 0,
            municipio: '',
            bairro: '',
            complemento: '',
            data_admissao: '',
            ini_contrato_temp: '',
            fim_contrato_temp: '',
            ordem: '',
            serie: '',
            optionsSituacao: '',
            natureza: 0,
            tipo_admissao: 0,
            tipo_previdencia: '',
            cdCargo: 0,
            cdSecretaria: 0,
            cdUnidade: 0,
            descSecretaria: '',
            descUnidade: '',
            cpf: '',
            ufNascimento: '',
            temGratificacao: '',
            tipoGratificacao: ''
        };
        //$scope.myForm.$setPristine(); //reset Form
    };

}]);



function base64ArrayBuffer(arrayBuffer) {
    var base64    = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes         = new Uint8Array(arrayBuffer)
    var byteLength    = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength    = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3)   << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}