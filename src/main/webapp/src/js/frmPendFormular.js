(function(document, window, $, undefined) {
    (function() {
        return frmPendForm = {
            UrlLotesPendientes: 'http://localhost:8084/ERPTenimosBackend/rest/lotePendinteFormula/',
            UrlFibras: 'http://localhost:8084/ERPTenimosBackend/rest/fibras/',
            UrlProdQuimicos: 'http://localhost:8084/ERPTenimosBackend/rest/productformulacion/',
            UrlProcesos: 'http://localhost:8084/ERPTenimosBackend/rest/procesos/',
            UrlCurvas: 'http://localhost:8084/ERPTenimosBackend/rest/curvas/',
            UrlPreparacion: 'http://localhost:8084/ERPTenimosBackend/rest/preparacion/',
            UrlAuxiliar: 'http://localhost:8084/ERPTenimosBackend/rest/auxiliar/',
            UrlProcPos: 'http://localhost:8084/ERPTenimosBackend/rest/procesopost/',
            UrlFormulas: 'http://localhost:8084/ERPTenimosBackend/rest/formulas/',
            UrlMaquinaria: 'http://localhost:8084/ERPTenimosBackend/rest/maquinaria/',
            oFibras: {},
            oProcesos: [],
            oComposicion: [],
            oColores: [],
            oTonos: [],
            oPreparaciones: [],
            oAuxiliares: [],
            oColorantes: [],
            oProPosterior: [],
            oCurvas: [],
            oQuimicos: [],
            oMaquinas: {},
            oPendientes: {},
            oProgMaquina: {},
            $tableLotesPendForm: $('#tableLotesPendForm'),
            $btnCargar: $('#btnCargar'),
            $modalFormulaLotesPend: $('#modalFormulaLotesPend'),
            $tituloMFLP: $('#tituloMFLP'),
            $tFormulaLotesPend: $('#tFormulaLotesPend'),
            $pendFormMaquina: $('#pendFormMaquina'),
            $dlNomMaqPFM: $('#dlNomMaqPFM'),
            $pendFormRelaBaño: $('#pendFormRelaBaño'),
            $pendFormAbsor: $('#pendFormAbsor'),
            $btnImprimirFormula: $('#btnImprimirFormula'),
            $divPfR1: $('#pfR1'),
            $divPfK1: $('#pfK1'),
            $divPfR2: $('#pfR2'),
            $divPfK2: $('#pfK2'),
            $pendFormRollos1: $('#pendFormRollos1'),
            $pendFormKilos1: $('#pendFormKilos1'),
            $pendFormRollos2: $('#pendFormRollos2'),
            $pendFormKilos2: $('#pendFormKilos2'),
            $btnDividirLote: $('#btnDividirLote'),
            $divPfCNP: $('#pfCNP'),
            $divPfNNP: $('#pfNNP'),
            $pendFormNewCodProceso: $('#newCodProceso'),
            $pendFormNewNomProceso: $('#newNomProceso'),
            $pendFormDlNomProceso: $('#dlNomProceso'),
            $btnNewProceso: $('#btnNewProceso'),
            $btnOrdenar: $('#btnOrdenar'),
            $tablePendFormMaq: $('#tablePendFormMaq'),
            $btnGuardarTandas: $('#btnGuardarTandas'),
            $btnCerrarModalPendForm: $('#btnCerrarModalPendForm'),
            $divLoaderPendForm: $('#divLoaderPendForm'),
            $loader: '<div class="loader"></div>',
            $cargando: '<h3 class="center">Cargando...</h3>',
            oSeleccLotes: [],
            oFormulaPrint: {},
            $confirmarLoteDividido: $('#confirmarLoteDividido'),
            $confirmarLDTitulo: $('#confirmarLDTitulo'),
            $confirmarLDPregunta: $('#confirmarLDPregunta'),
            $btnNoConf: $('#btnNoConf'),
            $btnSiConf: $('#btnSiConf'),
            litrosMinimo: 0,
            oFilasLotesSelec: [],
            
            init: function() {
                //this.iniciarComponentes();
//                this.coincidenciaQuimico();
                this.otrasFunciones();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
//                this.agregarLineaProcPos();
//                this.borrarLineaProcPos();
//                this.consultaNombreProcPos();
//                this.verProcPos();
//                this.modificarQuimicoProcPos();
//                this.cerrarModalEdicion();
                this.seleccionLotes();
                this.verFormulaLotesPendientes();
                this.calcularGramosFormula();
                this.imprimirFormula();
                this.validarMensajeAlerta();
            },
            
            /*iniciarComponentes: function() {
                var self = this;
                

            },*/
            
            consultasPendFormular: function() {
                var self = this;
                
                //self.$modalFormulaLotesPend.modal('show');
                um.destruirDataTable(self.$tableLotesPendForm, '');
                self.$divLoaderPendForm.find('div, h3').remove();
                self.$divLoaderPendForm.append(self.$loader, self.$cargando);
                
                $.get(self.UrlLotesPendientes + 'lotesPendientes', {consulta: 0}, function(data) {
                    self.cargarDatos(data, 'p');
                    
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'lotesPendientesPorFormular/lotesPendientes');
                    self.$divLoaderPendForm.find('div').remove();
                    self.$divLoaderPendForm.find('h3').text('Sin datos.');
                });
                
                $.get(self.UrlMaquinaria + 'listadoMaquinas', function(data) {
                    self.cargarDatos(data, 'm');
                    
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'maquinaria/listadoMaquinas');
                });
                
                $.get(self.UrlFibras + 'listadoFibras', function(data) {
                    self.cargarDatos(data, 'f');
                    
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'fibras/listadoFibras');
                });
                
                $.get(self.UrlProdQuimicos + 'noColorantes', function(data) {
                    self.cargarDatos(data, 'q');
                    
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'prodQuimicos/noColorantes');
                });
                
                $.get(self.UrlProdQuimicos + 'colorantes', function(data) {
                    self.cargarDatos(data, 'clrts');
                    
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'prodQuimicos/colorantes');
                });
                
                $.get(self.UrlProcesos + 'listaProcesos', function(data) {
                    self.cargarDatos(data, 'pr');
                    
                }).fail(function(res, status, er) {
                    self.errorDeConexion(res, status, er, 'procesos/listaProcesos'); //CAMBIAR
                });
                
                $.get(self.UrlFormulas + 'listadoTonos', function(data) {
                    self.cargarDatos(data, 'tn');
                    
                }).fail(function(res, status, er) {
                    self.errorDeConexion(res, status, er, 'formulas/listadoTonos');
                });
                
                $.get(self.UrlPreparacion + 'maestros', function(data) {
                    self.cargarDatos(data, 'pre');
                
                }).fail(function(res, status, er) {
                    self.errorDeConexion(res, status, er, 'preparacion/maestros');
                });
                
                $.get(self.UrlAuxiliar + 'maestros', function(data) {
                    self.cargarDatos(data, 'aux');

                }).fail(function(res, status, er) {
                    self.errorDeConexion(res, status, er, 'auxiliar/maestros');
                });
                
                $.get(self.UrlProcPos + 'maestros', function(data) {
                    self.cargarDatos(data, 'pp');
                        
                }).fail(function(res, status, er) {
                    self.errorDeConexion(res, status, er, 'procPos/maestros');
                });
                
                $.get(self.UrlCurvas + 'listadoCurvas', function(data) {
                    self.cargarDatos(data, 'curv');
                    
                }).fail(function(res, status, er) {
                    self.errorDeConexion(res, status, er, 'curvas/listadoCurvas');
                });
            },
            
            cargarDatos: function(data, opc) {
                var self = this;
                
                if (opc === 'm') {
                    self.oMaquinas = data;
                    
                    self.$dlNomMaqPFM.empty();
                    for (var i = 0; i < self.oMaquinas.length; i++) {
                        self.$dlNomMaqPFM.append('<option>' + self.oMaquinas[i].nombreMaquina + '</option>');
                    }
                }

                if (opc === 'p') {
                    self.oPendientes = data;
                    self.renderTablaLotesPendientes();
                }
                
                if (opc === 'pm') {
                    self.oProgMaquina = data;
                }
                
                if (opc === 'f') { //Fibras
                    self.oFibras = data;
                }
                
                if (opc === 'q') {
                    self.oQuimicos = data;
                }
                
                if (opc === 'clrts') { //Colorantes
                    self.oColorantes = data;
                }
                
                if (opc === 'pr') { //Procesos
                    self.oProcesos = data;
                    
                    self.$pendFormDlNomProceso.empty();
                    for (var i = 0; i < self.oProcesos.length; i++) {
                        self.$pendFormDlNomProceso.append('<option>' + self.oProcesos[i].nomProceso + '</option>');
                    }
                }
                
                if (opc === 'tn') { //Tonos
                    self.oTonos = data;
                }
                
                if (opc === 'pre') { //Preparacion
                    self.oPreparaciones = data;
                }
                
                if (opc === 'aux') { //Auxiliares
                    self.oAuxiliares = data;
                }
                
                if (opc === 'pp') { //Procesos Posteriores
                    self.oProPosterior = data;
                }
                
                if (opc === 'curv') { //Curvas
                    self.oCurvas = data;
                }
                
            },

            otrasFunciones: function() {
                var self = this;
                
                self.$btnDividirLote.on('click', function(e) {
                    e.preventDefault();
                    self.$divPfR1.toggle('fast');
                    self.$divPfK1.toggle('fast');
                    self.$divPfR2.toggle('fast');
                    self.$divPfK2.toggle('fast');
                });
                
                self.$btnNewProceso.on('click', function(e){
                    e.preventDefault();
                    self.$divPfCNP.toggle('fast');
                    self.$divPfNNP.toggle('fast');
                });

                self.$pendFormMaquina.focusin(function() {
                    self.$pendFormMaquina.css('text-transform', 'uppercase');
                });
                
                self.$pendFormMaquina.focusout(function() {
                    u.camposObligatorios([self.$pendFormMaquina], '4');
                    
                    if (self.$pendFormMaquina.val() !== '') {
                        var nombreMaquina = self.$pendFormMaquina.val().toUpperCase().trim();
                        self.litrosMinimo = 0;
                        
                        for (var i = 0; i < self.oMaquinas.length; i++) {
                            if (nombreMaquina === self.oMaquinas[i].nombreMaquina) {
                                self.oFormulaPrint.codMaquina = self.oMaquinas[i].idMaquina;
                                self.litrosMinimo = self.oMaquinas[i].litrosMinimo;
                                self.$pendFormRelaBaño.attr('disabled', false);
                                break;
                            }
                        }
                        
                    } else {
                        self.litrosMinimo = 0;
                        self.$pendFormRelaBaño.val('');
                        self.$pendFormRelaBaño.attr('disabled', true);
                        self.$pendFormMaquina.css('text-transform', '');
                    }
                    
                });
                
                self.$pendFormRelaBaño.inputNumber({
                    allowDecimals: false,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 0
                });
                
                self.$pendFormRelaBaño.focusout(function () {
                    u.camposObligatorios([self.$pendFormRelaBaño], '4');
                });
                
                self.$pendFormAbsor.inputNumber({
                    allowDecimals: false,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 0
                });
                
                self.$pendFormRollos1.inputNumber({
                    allowDecimals: false,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 0
                });
                
                self.$pendFormKilos1.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 2
                });
                
                self.$pendFormRollos2.inputNumber({
                    allowDecimals: false,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 0
                });
                
                self.$pendFormKilos2.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 2
                });
                
                self.$pendFormNewCodProceso.inputNumber({
                    allowDecimals: false,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 0
                });
                
                self.$pendFormAbsor.focusout(function () {
                    u.camposObligatorios([self.$pendFormAbsor], '4');
                });
                
                self.$pendFormMaquina.on('focusout', function(){
                    if ($('#tGramos2').text() === '' || self.$pendFormMaquina.val() === '' || $('#tNumProceso').text() === '') {
                        self.$btnImprimirFormula.attr('disabled', true);
                    } else if ($('#tGramos2').text() !== '' && self.$pendFormMaquina.val() !== '' && $('#tNumProceso').text() !== '') {
                        self.$btnImprimirFormula.attr('disabled', false);
                    }
                }); 
                
                self.$tFormulaLotesPend.on('click', '#btnQuitarPrep, #btnQuitarProp', function(e){
                    if ($(this).is('#btnQuitarPrep')) {
                        self.oFormulaPrint.codQuimPrep = '';
                        self.oFormulaPrint.cantQuimPrep = '';
                        self.oFormulaPrint.nomQuimPrep = '';
                        self.oFormulaPrint.grsPrep = '';
                        
                        $('#tCant1').text('');
                        $('#tNom1').text('');
                        $('#tGramos1').text('');
                        
                        $('#tNumProceso').text('');
                        $('#tTiempoProceso').text('');
                        $('#tCurvas').text('');
                        
                        self.$btnNewProceso.attr('disabled', false);
                    }
                    
                    if ($(this).is('#btnQuitarProp')) {
                        self.oFormulaPrint.codQuimPro = '';
                        self.oFormulaPrint.cantQuimPro = '';
                        self.oFormulaPrint.nomQuimPro = '';
                        self.oFormulaPrint.grsPro = '';
                        
                        $('#tCant4').text('');
                        $('#tNom4').text('');
                        $('#tGramos4').text('');
                        
                        $('#tNumProceso').text('');
                        $('#tTiempoProceso').text('');
                        $('#tCurvas').text('');
                        
                        self.$btnNewProceso.attr('disabled', false);
                    }
                });
                
                self.$pendFormNewCodProceso.on('keyup keypress keydown change', function() {
                    self.$pendFormNewNomProceso.val('');
                    
                    if (self.$pendFormNewCodProceso.val() !== "" && self.$pendFormNewCodProceso.val().length >= 1) {
                        self.$pendFormNewNomProceso.val("");
                        
                        for (var i = 0; i < self.oProcesos.length; i++) {
                            if (self.oProcesos[i].idProceso === parseInt(self.$pendFormNewCodProceso.val())){
                                self.$pendFormNewNomProceso.val(self.oProcesos[i].nomProceso);
                                $('#tNumProceso').text(self.oProcesos[i].idProceso);
                                $('#tTiempoProceso').text((self.oProcesos[i].tiempoEst / 60).toFixed(2) + ' Hrs');
                                $('#tCurvas').text(self.oProcesos[i].idCurvas);
                                
                                self.oFormulaPrint.proceso = self.oProcesos[i].idProceso;
                                self.oFormulaPrint.tiempo = $('#tTiempoProceso').text();
                                self.oFormulaPrint.curvas = self.oProcesos[i].idCurvas;
                                
                                break;
                            }
                        }
                    } else {
                        $('#tNumProceso').text('');
                        $('#tTiempoProceso').text('');
                        $('#tCurvas').text('');

                        self.oFormulaPrint.proceso = '';
                        self.oFormulaPrint.tiempo = ''; //self.oProcesos[i].tiempoEst;
                        self.oFormulaPrint.curvas = '';
                    }
                    
                    if ($('#tGramos2').text() === '' || self.$pendFormMaquina.val() === '' || $('#tNumProceso').text() === '') {
                        self.$btnImprimirFormula.attr('disabled', true);
                    } else if ($('#tGramos2').text() !== '' && self.$pendFormMaquina.val() !== '' && $('#tNumProceso').text() !== '') {
                        self.$btnImprimirFormula.attr('disabled', false);
                    }
                });
                
                self.$pendFormNewNomProceso.on('keyup keypress keydown change', function() {
                    self.$pendFormNewCodProceso.val('');
                    
                    if (self.$pendFormNewNomProceso.val() !== "" && self.$pendFormNewNomProceso.val().length >= 5) {
                        self.$pendFormNewCodProceso.val("");
                        
                        for (var i = 0; i < self.oProcesos.length; i++) {
                            if (self.oProcesos[i].nomProceso === self.$pendFormNewNomProceso.val()){
                                self.$pendFormNewCodProceso.val(self.oProcesos[i].idProceso);
                                $('#tNumProceso').text(self.oProcesos[i].idProceso);
                                $('#tTiempoProceso').text((self.oProcesos[i].tiempoEst / 60).toFixed(2) + ' Hrs');
                                $('#tCurvas').text(self.oProcesos[i].idCurvas);
                                
                                self.oFormulaPrint.proceso = self.oProcesos[i].idProceso;
                                self.oFormulaPrint.tiempo = $('#tTiempoProceso').text();
                                self.oFormulaPrint.curvas = self.oProcesos[i].idCurvas;
                                
                                break;
                            }
                        }
                    } else {
                        $('#tNumProceso').text('');
                        $('#tTiempoProceso').text('');
                        $('#tCurvas').text('');

                        self.oFormulaPrint.proceso = '';
                        self.oFormulaPrint.tiempo = ''; //self.oProcesos[i].tiempoEst;
                        self.oFormulaPrint.curvas = '';
                    }
                    
                    if ($('#tGramos2').text() === '' || self.$pendFormMaquina.val() === '' || $('#tNumProceso').text() === '') {
                        self.$btnImprimirFormula.attr('disabled', true);
                    } else if ($('#tGramos2').text() !== '' && self.$pendFormMaquina.val() !== '' && $('#tNumProceso').text() !== '') {
                        self.$btnImprimirFormula.attr('disabled', false);
                    }
                });
            },
            
            limpiarFormulario: function() {
                var self = this;
                
                var elementos = [self.$pendFormMaquina, self.$pendFormRelaBaño, self.$pendFormNewCodProceso, self.$pendFormNewNomProceso];
                
                u.limpiarCampos(elementos);
                self.$btnImprimirFormula.attr('disabled', true);
                self.$pendFormRelaBaño.attr('disabled', true);
            },

            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$pendFormMaquina, self.$pendFormRelaBaño];
              
              u.camposObligatorios(campos, '1');
            },

            renderTablaLotesPendientes: function(){
                var self = this;
                var trTemplate = '<tr class="center">' +
                                    '<td>' +
                                        '<a href="#" id="addLote"><i class="fa fa-check-circle"></i></a>' +
                                        '<a href="#" id="delLote" style="display: none"><i class="fa fa-times-circle"></i></a>' +
                                    '</td>' +
                                    '<td class="col-md-1">:lote:</td>' +
                                    '<td class="col-md-2">:codFormulaAndCompos:</td>' +
                                    '<td class="table-action">' +
                                        '<a href="#" id="verFormula" style="display: none">' +
                                            '<i class="fa fa-eye"></i>' +
                                        '</a>' +
                                    '</td>' +
                                    '<td class="col-md-2">:referencia:</td>' +
                                    '<td class="col-md-3">:nomCliente:</td>' +
                                    '<td  class="col-md-1" style="background-color: RGB(:colorRGB:)">:proceso:</td>' +
                                    '<td>:rollos:</td>' +
                                    '<td>:kilos:</td>' +
                                    '<td>:ancho:</td>' +
                                    '<td>:diasCodificado:</td>' +
                                    '<td>:hrsSeccion:</td>' +
                                    '<td>:compromiso:</td>' +
                                 '</tr>';
                
                um.destruirDataTable(self.$tableLotesPendForm, '');
                
                for (var i = 0; i < self.oPendientes.length; i++) {
                    var l = self.oPendientes[i];
                    var trLote = trTemplate;
                    var newTr = trLote
                                .replace(':lote:', l.lote)
                                .replace(':codFormulaAndCompos:', (l.compos !== '') ? l.codFormula + ' ' + l.compos : l.codFormula)
                                .replace(':referencia:', l.referencia)
                                .replace(':nomCliente:', l.nomCliente)
                                .replace(':colorRGB:', (l.formula !== null) ? l.formula.color : '')
                                .replace(':proceso:', (l.formula !== null) ? '' : 'Sin Proceso')
                                .replace(':rollos:',l.rollos)
                                .replace(':kilos:',l.kilos)
                                .replace(':ancho:', l.ancho)
                                .replace(':diasCodificado:', l.diasCodificado)
                                .replace(':hrsSeccion:', l.hrsSeccion)
                                .replace(':compromiso:', l.compromiso);
                 
                    self.$tableLotesPendForm.find('tbody').append(newTr);
                }
                
                self.$divLoaderPendForm.find('div, h3').remove();
                
                self.$tableLotesPendForm.find('tbody tr').each(function(index) {
                    var f = $(this);
                    var dias = parseInt($(f[0].cells[12]).text());
                    var codColor = $(f[0].cells[2]).text();
                    
                    if ($(f[0].cells[6]).text() === 'Sin Proceso'){
                        f.find('#addLote').hide();
                        f.find('#delLote').hide();
                        f.find('#verFormula').hide();
                    }
                    
                    if (codColor.substring(3, 4) === '0'){
                        if (dias >= 0 && dias <= 2) {
                            $(f[0].cells[12]).css({'color': 'white', 'font-weight': 'bold', 'background-color': 'green'});
                        } else if (dias >= 3 && dias <= 4) {
                            $(f[0].cells[12]).css({'color': 'white', 'font-weight': 'bold', 'background-color': 'orange'});
                        } else if (dias > 4) {
                            $(f[0].cells[12]).css({'color': 'white', 'font-weight': 'bold', 'background-color': 'red'});
                        }
                    } else {
                        if (dias >= 0 && dias <= 4) {
                            $(f[0].cells[12]).css({'color': 'white', 'font-weight': 'bold', 'background-color': 'green'});
                        } else if (dias >= 5 && dias <= 7) {
                            $(f[0].cells[12]).css({'color': 'white', 'font-weight': 'bold', 'background-color': 'orange'});
                        } else if (dias > 7) {
                            $(f[0].cells[12]).css({'color': 'white', 'font-weight': 'bold', 'background-color': 'red'});
                        }
                    }
                });
                
                self.$tableLotesPendForm.dataTable({
                    'searching': false,
                    'paging': false,
                    'bAutoWidth': false,
                    'info': false
                });
            },
            
            seleccionLotes: function(){
                var self = this;
                
                self.$tableLotesPendForm.on('click', '#addLote, #delLote', function(e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    
                    if ($(this).is('#addLote')) {
                        //fila.find('#addLote').hide();
                        //fila.find('#delLote').show();
                        //fila.css('background-color', '#DEDEDE');
                        
                        self.verificarCoincidencias(fila);
                        
                    } else if ($(this).is('#delLote')) {
                        fila.find('#addLote').show();
                        fila.find('#delLote').hide();
                        fila.css('background-color', '');
                        fila.find('#verFormula').hide();
                        
                        var lotes = self.oSeleccLotes[0].split(' - ');
                        self.oSeleccLotes[0] = '';
                        var l = self.oFormulaPrint.lotes;
                        self.oFormulaPrint.lotes = [];
                        
                        for (var i = 0; i < lotes.length; i++) {
                            if (lotes[i] !== $(fila[0].cells[1]).text()) {
                                self.oSeleccLotes[0] = (self.oSeleccLotes[0] === '') ? lotes[i] : self.oSeleccLotes[0] + ' - ' + lotes[i];
                                self.oFormulaPrint.lotes.push(l[i]);
                            } else {
                                self.oSeleccLotes[1] = parseInt(self.oSeleccLotes[1]) - parseInt($(fila[0].cells[7]).text());
                                self.oSeleccLotes[2] = (parseFloat(self.oSeleccLotes[2]) - parseFloat($(fila[0].cells[8]).text())).toFixed(1);
                            }
                        }
                    }
                });
            },
            
            verificarCoincidencias: function(fila) {
                var self = this;
                var f2 = $(fila[0].cells[2]).text();
                f2 = f2.trim();
                self.oSeleccLotes[0] = '';
                self.oSeleccLotes[1] = 0;
                self.oSeleccLotes[2] = 0;
                self.oSeleccLotes[3] = '';
                self.oFormulaPrint.lotes = [];
                self.oFilasLotesSelec = [];
                
                self.$tableLotesPendForm.find('tbody tr').each(function(index) {
                    $(this).children('td').each(function(index2) {
                        
                        if (index2 === 2) {
                            var fila2 = $(this).closest('tr');
                            var f1 = $(this).text();
                            f1 = f1.trim();
                            
                            if (f1.substring(0, 14) === f2.substring(0, 14) && $(fila2[0].cells[6]).text() !== 'Sin Proceso'){
                                self.oFilasLotesSelec.push(fila2);
                                fila2.find('#addLote').hide();
                                fila2.find('#delLote').show();
                                fila2.css('background-color', '#DEDEDE');                                
                                fila2.find('#verFormula').show();
                                
                                self.oFormulaPrint.lotes.push({
                                    lote: $(fila2[0].cells[1]).text(),
                                    referencia: $(fila2[0].cells[4]).text(),
                                    rollos: $(fila2[0].cells[7]).text(),
                                    cliente: $(fila2[0].cells[5]).text(),
                                    kilos: $(fila2[0].cells[8]).text(),
                                    cantGrs: ''
                                });
                                
                                self.oSeleccLotes[0] = (self.oSeleccLotes[0] === '') ? $(fila2[0].cells[1]).text() : self.oSeleccLotes[0] + ' - ' + $(fila2[0].cells[1]).text();
                                self.oSeleccLotes[1] = parseInt(self.oSeleccLotes[1]) + parseInt($(fila2[0].cells[7]).text());
                                self.oSeleccLotes[2] = (parseFloat(self.oSeleccLotes[2]) + parseFloat($(fila2[0].cells[8]).text())).toFixed(1);
                                self.oSeleccLotes[3] = (self.oSeleccLotes[3] === '') ? $(fila2[0].cells[5]).text() : self.oSeleccLotes[3];
                            } else if (f1.substring(0, 14) !== f2.substring(0, 14) && fila2.find('#verFormula').is(':visible')){
                                fila2.find('#addLote').show();
                                fila2.find('#delLote').hide();
                                fila2.css('background-color', '');
                                fila2.find('#verFormula').hide();
                            }
                        }
                    });
                });
            },
            
            verFormulaLotesPendientes: function() {
                var self = this;
                var trTemplateFormula = 
                        '<tr>' +
                            '<td class="col-sm-1"><strong>Lotes:</strong></td>' +
                            '<td class="col-sm-1" colspan="5">:lotes:</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1"><strong>Cliente:</strong></td>' +
                            '<td class="col-sm-1" colspan="3">:cliente:</td>' +
                            '<td class="col-sm-1"><strong>Código:</strong></td>' +
                            '<td class="col-sm-1 center">:codFormula:</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1"><strong>Kilos:</strong></td>' +
                            '<td class="col-sm-1 center">:kilos:</td>' +
                            '<td class="col-sm-1"><strong>Rollos:</strong></td>' +
                            '<td class="col-sm-1 center">:rollos:</td>' +
                            '<td class="col-sm-1"><strong>Tono:</strong></td>' +
                            '<td class="col-sm-1 center">:tono:</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1"><strong>Color:</strong></td>' +
                            '<td class="col-sm-1" colspan="3">:nomColor:</td>' +
                            '<td class="col-sm-1"><strong>Proceso:</strong></td>' +
                            '<td class="col-sm-1 center" id="tNumProceso">:numProceso:</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1"><strong>Tiempo:</strong></td>' +
                            '<td class="col-sm-1 center" id="tTiempoProceso">:tiempo:</td>' +
                            '<td class="col-sm-1"><strong>Curvas:</strong></td>' +
                            '<td class="col-sm-1 center" id="tCurvas">:numCurvas:</td>' +
                            '<td class="col-sm-1"><strong>Agua Inicial:</strong></td>' +
                            '<td class="col-sm-1 center" id="tAguaIni"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1"><strong>PH:</strong></td>' +
                            '<td class="col-sm-1 center">:ph:</td>' +
                            '<td class="col-sm-1"><strong>Pantone:</strong></td>' +
                            '<td class="col-sm-1 center">:pantone:</td>' +
                            '<td class="col-sm-1"><strong>Referencia:</strong></td>' +
                            '<td class="col-sm-1 center">:referencia:</td>' +
                        '</tr>' +
                        '<tr style="background: #E0E3E5;">' +
                            '<td class="col-sm-1 center"><strong>Sección</strong></td>' +
                            '<td class="col-sm-1 center"><strong>Maestro</strong></td>' +
                            '<td class="col-sm-1 center" colspan="3"><strong>Nombre Producto</strong></td>' +
                            '<td class="col-sm-1 center"><strong>Gramos</strong></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1 center">' +
                                '<strong>PREPARACIÓN</strong>' +
                                '<div class="col-lg-12">' +
                                    '<button class="btn btn-default btn-xs" id="btnQuitarPrep">Quitar</button>' +
                                '</div>' +
                            '</td>' +
                            '<td class="col-sm-1 right" id="tCant1">:cantQuimPrep:</td>' +
                            '<td class="col-sm-1" colspan="3" id="tNom1">:nomQuimPrep:</td>' +
                            '<td class="col-sm-1 right" id="tGramos1"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1 center"><strong>AUXILIAR</strong></td>' +
                            '<td class="col-sm-1 right">:cantQuimAux:</td>' +
                            '<td class="col-sm-1" colspan="3">:nomQuimAux:</td>' +
                            '<td class="col-sm-1 right" id="tGramos2"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1 center"><strong>COLORANTES</strong></td>' +
                            '<td class="col-sm-1 right">:cantQuimCol:</td>' +
                            '<td class="col-sm-1" colspan="3">:nomQuimCol:</td>' +
                            '<td class="col-sm-1 right" id="tGramos3"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1 center">' +
                                '<strong>PROCESO POSTERIOR</strong>' +
                                '<div class="col-lg-12">' +
                                    '<button class="btn btn-default btn-xs" id="btnQuitarProp">Quitar</button>' +
                                '</div>' +
                            '</td>' +
                            '<td class="col-sm-1 right" id="tCant4">:cantQuimPro:</td>' +
                            '<td class="col-sm-1" colspan="3" id="tNom4">:nomQuimPro:</td>' +
                            '<td class="col-sm-1 right" id="tGramos4"></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="col-sm-1" colspan="6" style="text-align: justify;"><strong>OBSERVACIONES:</strong> :observ:</td>' +
                        '</tr>';
                
                self.$tableLotesPendForm.on('click', '#verFormula', function (e) {
                    e.preventDefault();
                    
                    self.$btnImprimirFormula.attr('disabled', true);
                    self.$btnNewProceso.attr('disabled', true);
                    self.$pendFormRelaBaño.attr('disabled', true);
                    
                    var fila = $(this).closest('tr');
                    var lote = $(fila[0].cells[1]).text();
                    self.$tituloMFLP.text('Formula para los Lotes ' + self.oSeleccLotes[0]);

                    self.$tFormulaLotesPend.find('tbody').remove();
                    self.$tFormulaLotesPend.append('<tbody></tbody>');

                    for (var i = 0; i < self.oPendientes.length; i++) {
                        var p = self.oPendientes[i];

                        if (lote === p.lote) {
                            var f = p.formula;
                            var nomFibra = '';
                            var tono = '';
                            var proceso = '';
                            var tProceso = '';
                            var curvas = '';
                            var nomQuimPrep = '';
                            var cantQuimPrep = '';
                            var nomQuimAux = '';
                            var cantQuimAux = '';
                            var nomQuimCol = '';
                            var cantQuimCol = '';
                            var nomQuimPro = '';
                            var cantQuimPro = '';
                            //self.oFormulaPrint.lote; //Inicializado en el metodo verificarCoincidencias()
                            self.oFormulaPrint.idColor = f.idColor;
                            self.oFormulaPrint.idFibra = f.idFibra;
                            self.oFormulaPrint.codigo = '';
                            self.oFormulaPrint.kilos = '';
                            self.oFormulaPrint.rollos = '';
                            self.oFormulaPrint.tono = '';
                            self.oFormulaPrint.color = '';
                            self.oFormulaPrint.proceso = '';
                            self.oFormulaPrint.tiempo = '';
                            self.oFormulaPrint.curvas = '';
                            self.oFormulaPrint.ph = '';
                            self.oFormulaPrint.pantone = '';
                            //self.oFormulaPrint.referencia = '';                            
                            self.oFormulaPrint.codQuimPrep = '';
                            self.oFormulaPrint.nomQuimPrep = '';
                            self.oFormulaPrint.cantQuimPrep = '';
                            self.oFormulaPrint.codQuimAux = '';
                            self.oFormulaPrint.nomQuimAux = '';
                            self.oFormulaPrint.cantQuimAux = '';
                            self.oFormulaPrint.codQuimCol = '';
                            self.oFormulaPrint.nomQuimCol = '';
                            self.oFormulaPrint.cantQuimCol = '';
                            self.oFormulaPrint.codQuimPro = '';
                            self.oFormulaPrint.nomQuimPro = '';
                            self.oFormulaPrint.cantQuimPro = '';
                            self.oFormulaPrint.observ = '';

                            for (var j = 0; j < self.oFibras.length; j++) {
                                if (f.idFibra === self.oFibras[j].idFibra) {
                                    nomFibra = self.oFibras[j].nomFibra;
                                    break;
                                }
                            }

                            for (var j = 0; j < self.oTonos.length; j++) {
                                if (f.codTono === self.oTonos[j].codTono) {
                                    tono = self.oTonos[j].nomTono;
                                    break;
                                }
                            }

                            for (var j = 0; j < self.oProcesos.length; j++) {
                                if (f.proceso === self.oProcesos[j].idProceso) {
                                    proceso = self.oProcesos[j].idProceso;
                                    tProceso = self.oProcesos[j].tiempoEst + ' Hora(s)';
                                    curvas = self.oProcesos[j].idCurvas;
                                    break;
                                }
                            }

                            for (var j = 0; j < f.formulaDetalle.length; j++) {
                                var fd = f.formulaDetalle[j];

                                if (fd.seccion === 1) {
                                    for (var k = 0; k < self.oQuimicos.length; k++) {
                                        if (fd.codProducto === self.oQuimicos[k].codProduct) {
                                            if (nomQuimPrep === '') {
                                                //codQuimPrep = fd.codProducto + '<br>';
                                                nomQuimPrep = fd.codProducto + ' - ' + self.oQuimicos[k].nomProducto + '<br>';

                                                self.oFormulaPrint.codQuimPrep = fd.codProducto + ' ';
                                                self.oFormulaPrint.nomQuimPrep = self.oQuimicos[k].nomProducto + ';';

                                                if (fd.cantGrs !== 0) {
                                                    cantQuimPrep = fd.cantGrs + ' g <br>';
                                                    self.oFormulaPrint.cantQuimPrep = fd.cantGrs + 'g - ';
                                                } else {
                                                    cantQuimPrep = fd.cantPtje + ' p <br>';
                                                    self.oFormulaPrint.cantQuimPrep = fd.cantPtje + ' p - ';
                                                }
                                            } else {
                                                //codQuimPrep = codQuimPrep + fd.codProducto + '<br>';
                                                nomQuimPrep = nomQuimPrep + fd.codProducto + ' - ' + self.oQuimicos[k].nomProducto + '<br>';

                                                self.oFormulaPrint.codQuimPrep = self.oFormulaPrint.codQuimPrep + fd.codProducto + ' ';
                                                self.oFormulaPrint.nomQuimPrep = self.oFormulaPrint.nomQuimPrep + self.oQuimicos[k].nomProducto + ';';

                                                if (fd.cantGrs !== 0) {
                                                    cantQuimPrep = cantQuimPrep + fd.cantGrs + ' g <br>';
                                                    self.oFormulaPrint.cantQuimPrep = self.oFormulaPrint.cantQuimPrep + fd.cantGrs + ' g - ';
                                                } else {
                                                    cantQuimPrep = cantQuimPrep + fd.cantPtje + ' p <br>';
                                                    self.oFormulaPrint.cantQuimPrep = self.oFormulaPrint.cantQuimPrep + fd.cantPtje + ' p - ';
                                                }
                                            }
                                            break;
                                        }
                                    }
                                } else if (fd.seccion === 2 || fd.seccion === 5) {
                                    for (var k = 0; k < self.oQuimicos.length; k++) {
                                        if (fd.codProducto === self.oQuimicos[k].codProduct) {
                                            if (nomQuimAux === '') {
                                                //codQuimAux = fd.codProducto + '<br>';
                                                nomQuimAux = fd.codProducto + ' - ' + self.oQuimicos[k].nomProducto + '<br>';

                                                self.oFormulaPrint.codQuimAux = fd.codProducto + ' ';
                                                self.oFormulaPrint.nomQuimAux = self.oQuimicos[k].nomProducto + ';';

                                                if (fd.cantGrs !== 0) {
                                                    cantQuimAux = fd.cantGrs + ' g <br>';
                                                    self.oFormulaPrint.cantQuimAux = fd.cantGrs + ' g - ';
                                                } else {
                                                    cantQuimAux = fd.cantPtje + ' p <br>';
                                                    self.oFormulaPrint.cantQuimAux = fd.cantPtje + ' p - ';
                                                }

                                            } else {
                                                //codQuimAux = codQuimAux + fd.codProducto + '<br>';
                                                nomQuimAux = nomQuimAux + fd.codProducto + ' - ' + self.oQuimicos[k].nomProducto + '<br>';

                                                self.oFormulaPrint.codQuimAux = self.oFormulaPrint.codQuimAux + fd.codProducto + ' ';
                                                self.oFormulaPrint.nomQuimAux = self.oFormulaPrint.nomQuimAux + self.oQuimicos[k].nomProducto + ';';

                                                if (fd.cantGrs !== 0) {
                                                    cantQuimAux = cantQuimAux + fd.cantGrs + ' g <br>';
                                                    self.oFormulaPrint.cantQuimAux = self.oFormulaPrint.cantQuimAux + fd.cantGrs + ' g - ';
                                                } else {
                                                    cantQuimAux = cantQuimAux + fd.cantPtje + ' p <br>';
                                                    self.oFormulaPrint.cantQuimAux = self.oFormulaPrint.cantQuimAux + fd.cantPtje + ' p - ';
                                                }
                                            }
                                            break;
                                        }
                                    }
                                } else if (fd.seccion === 3) {
                                    for (var k = 0; k < self.oColorantes.length; k++) {
                                        if (fd.codProducto === self.oColorantes[k].codProduct) {
                                            if (nomQuimCol === '') {
                                                //codQuimCol = fd.codProducto + '<br>';
                                                nomQuimCol = fd.codProducto + ' - ' + self.oColorantes[k].nomProducto + '<br>';

                                                self.oFormulaPrint.codQuimCol = fd.codProducto + ' ';
                                                self.oFormulaPrint.nomQuimCol = self.oColorantes[k].nomProducto + ';';

                                                if (fd.cantGrs !== 0) {
                                                    cantQuimCol = fd.cantGrs + ' g <br>';
                                                    self.oFormulaPrint.cantQuimCol = fd.cantGrs + ' g - ';
                                                } else {
                                                    cantQuimCol = fd.cantPtje + ' p <br>';
                                                    self.oFormulaPrint.cantQuimCol = fd.cantPtje + ' p - ';
                                                }

                                            } else {
                                                //codQuimCol = codQuimCol + fd.codProducto + '<br>';
                                                nomQuimCol = nomQuimCol + fd.codProducto + ' - ' + self.oColorantes[k].nomProducto + '<br>';

                                                self.oFormulaPrint.codQuimCol = self.oFormulaPrint.codQuimCol + fd.codProducto + ' ';
                                                self.oFormulaPrint.nomQuimCol = self.oFormulaPrint.nomQuimCol + self.oColorantes[k].nomProducto + ';';

                                                if (fd.cantGrs !== 0) {
                                                    cantQuimCol = cantQuimCol + fd.cantGrs + ' g <br>';
                                                    self.oFormulaPrint.cantQuimCol = self.oFormulaPrint.cantQuimCol + fd.cantGrs + ' g - ';
                                                } else {
                                                    cantQuimCol = cantQuimCol + fd.cantPtje + ' p <br>';
                                                    self.oFormulaPrint.cantQuimCol = self.oFormulaPrint.cantQuimCol + fd.cantPtje + ' p - ';
                                                }
                                            }
                                            break;
                                        }
                                    }
                                } else if (fd.seccion === 4) {
                                    for (var k = 0; k < self.oQuimicos.length; k++) {
                                        if (fd.codProducto === self.oQuimicos[k].codProduct) {
                                            if (nomQuimPro === '') {
                                                //codQuimPro = fd.codProducto + '<br>';
                                                nomQuimPro = fd.codProducto + ' - ' + self.oQuimicos[k].nomProducto + '<br>';

                                                self.oFormulaPrint.codQuimPro = fd.codProducto + ' ';
                                                self.oFormulaPrint.nomQuimPro = self.oQuimicos[k].nomProducto + ';';

                                                if (fd.cantGrs !== 0) {
                                                    cantQuimPro = fd.cantGrs + ' g <br>';
                                                    self.oFormulaPrint.cantQuimPro = fd.cantGrs + ' g - ';
                                                } else {
                                                    cantQuimPro = fd.cantPtje + ' p <br>';
                                                    self.oFormulaPrint.cantQuimPro = fd.cantPtje + ' p - ';
                                                }

                                            } else {
                                                //codQuimPro = codQuimPro + fd.codProducto + '<br>';
                                                nomQuimPro = nomQuimPro + fd.codProducto + ' - ' + self.oQuimicos[k].nomProducto + '<br>';

                                                self.oFormulaPrint.codQuimPro = self.oFormulaPrint.codQuimPro + fd.codProducto + ' ';
                                                self.oFormulaPrint.nomQuimPro = self.oFormulaPrint.nomQuimPro + self.oQuimicos[k].nomProducto + ';';

                                                if (fd.cantGrs !== 0) {
                                                    cantQuimPro = cantQuimPro + fd.cantGrs + ' g <br>';
                                                    self.oFormulaPrint.cantQuimPro = self.oFormulaPrint.cantQuimPro + fd.cantGrs + ' g - ';
                                                } else {
                                                    cantQuimPro = cantQuimPro + fd.cantPtje + ' p <br>';
                                                    self.oFormulaPrint.cantQuimPro = self.oFormulaPrint.cantQuimPro + fd.cantPtje + ' p - ';
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }

                            var trFormula = trTemplateFormula;
                            var newFormula = trFormula
                                    .replace(':lotes:', self.oSeleccLotes[0])
                                    .replace(':cliente:', self.oSeleccLotes[3])
                                    .replace(':codFormula:', p.codFormula + " " + p.compos)
                                    .replace(':kilos:', self.oSeleccLotes[2])
                                    .replace(':rollos:', self.oSeleccLotes[1])
                                    .replace(':tono:', tono)
                                    .replace(':nomColor:', f.nombreForm)
                                    .replace(':numProceso:', proceso)
                                    .replace(':tiempo:', tProceso)
                                    .replace(':numCurvas:', curvas)
                                    .replace(':ph:', f.phFormula)
                                    .replace(':pantone:', f.pantone)
                                    .replace(':referencia:', p.referencia)
                                    .replace(':nomQuimPrep:', nomQuimPrep)
                                    .replace(':cantQuimPrep:', cantQuimPrep)
                                    .replace(':nomQuimAux:', nomQuimAux)
                                    .replace(':cantQuimAux:', cantQuimAux)
                                    .replace(':nomQuimCol:', nomQuimCol)
                                    .replace(':cantQuimCol:', cantQuimCol)
                                    .replace(':nomQuimPro:', nomQuimPro)
                                    .replace(':cantQuimPro:', cantQuimPro)
                                    .replace(':observ:', f.observ);

                            //self.oFormulaPrint.lote = self.oSeleccLotes[0]; //String
                            //self.oFormulaPrint.nomCliente = self.oSeleccLotes[3]; //String
                            self.oFormulaPrint.codigo = p.codFormula + " " + p.compos; //String
                            self.oFormulaPrint.rollos = self.oSeleccLotes[1]; //Integer
                            self.oFormulaPrint.kilos = self.oSeleccLotes[2]; //Double
                            self.oFormulaPrint.tono = tono;
                            self.oFormulaPrint.color = f.nombreForm;
                            self.oFormulaPrint.proceso = proceso;
                            self.oFormulaPrint.tiempo = tProceso;
                            self.oFormulaPrint.curvas = curvas;
                            self.oFormulaPrint.ph = f.phFormula;
                            self.oFormulaPrint.pantone = f.pantone;
                            //self.oFormulaPrint.referencia = p.referencia; //String
                            self.oFormulaPrint.observ = f.observ; //String

                            break;
                        }
                    }

                    self.$tFormulaLotesPend.find('tbody').append(newFormula);

                    if (self.oSeleccLotes[1] % 2 === 0) {
                        self.$pendFormRollos1.val(self.oSeleccLotes[1] / 2);
                        self.$pendFormRollos2.val(self.oSeleccLotes[1] / 2);
                        self.$pendFormKilos1.val(self.oSeleccLotes[2] / 2);
                        self.$pendFormKilos2.val(self.oSeleccLotes[2] / 2);
                    } else {

                        var r = self.oSeleccLotes[1];
                        var k = parseFloat(self.oSeleccLotes[2]);

                        var r1 = Math.round(r / 2);
                        var k1 = parseFloat(((k / r) * r1).toFixed('2'));

                        var r2 = (r - r1);
                        var k2 = parseFloat((k / r * (r - r1)).toFixed('2'));

                        self.$pendFormRollos1.val(r1);
                        self.$pendFormRollos2.val(r2);
                        self.$pendFormKilos1.val(k1);
                        self.$pendFormKilos2.val(k2);
                    }

                    var l = self.oSeleccLotes[0].split(' - ');
                    if (l.length > 1) {
                        self.$btnDividirLote.attr('disabled', true);
                    } else if (l.length === 1) {
                        self.$btnDividirLote.attr('disabled', false);
                    }

                    self.$divPfR1.hide();
                    self.$divPfK1.hide();
                    self.$divPfR2.hide();
                    self.$divPfK2.hide();
                    
                    self.$divPfCNP.hide();
                    self.$divPfNNP.hide();
                    
                    self.limpiarFormulario();
                    self.pintarCamposObligatorios();
                    self.$modalFormulaLotesPend.modal('show');

                });
            },
            
            calcularGramosFormula: function() {
                var self = this;
                
                self.$pendFormRelaBaño.on('keydown focusout', function(e){
                    var grs = 0;
                    var cellData;
                    var cantQ = [];
                    
                    if (e.keyCode === 13 || e.type === 'focusout') {
                        self.oFormulaPrint.grsPrep = '';
                        self.oFormulaPrint.grsAux = '';
                        self.oFormulaPrint.grsCol = '';
                        self.oFormulaPrint.grsPro = '';
                        var relacion = (self.$pendFormRelaBaño.val() !== '') ? parseInt(self.$pendFormRelaBaño.val()) : 0;
                        var kilos = parseFloat(self.oFormulaPrint.kilos);
                        //var litros = relacion * kilos;
                        
                        if (relacion > 0) {
                            var litros = (self.redondearNumero(relacion, kilos) < self.litrosMinimo) ? self.litrosMinimo : self.redondearNumero(relacion, kilos);

                            $('#tAguaIni').text(litros + ' Lts');
                            self.oFormulaPrint.relacionBa = relacion;
                            grs = 0;
                            cellData = '';
                            cantQ = '';

                            if (self.oFormulaPrint.cantQuimPrep !== '') {
                                cantQ = self.oFormulaPrint.cantQuimPrep.split(" - ");

                                for (var i = 0; i < cantQ.length; i++) {
                                    if (cantQ[i] !== '') {
                                        var str = cantQ[i];
                                        var l = str.length;

                                        if (str.substring(l - 1) === 'g') {
                                            grs = parseFloat(parseFloat(str.substring(0, l - 1)) * litros);
                                            grs = self.enmascararNumero(grs.toFixed(4));
                                        } else if (str.substring(l - 1) === 'p') {
                                            grs = (relacion === 0) ? 0 : parseFloat(parseFloat(str.substring(0, l - 1)) * kilos * 10);
                                            grs = self.enmascararNumero(grs.toFixed(4));
                                        }

                                        if (cellData === '') {
                                            cellData = grs + '<br>';
                                            self.oFormulaPrint.grsPrep = grs + ' - ';
                                        } else {
                                            cellData = cellData + grs + '<br>';
                                            self.oFormulaPrint.grsPrep = self.oFormulaPrint.grsPrep + grs + ' - ';
                                        }
                                    }
                                }

                                $('#tGramos1').html(cellData);
                            }

                            grs = 0;
                            cellData = '';
                            cantQ = '';

                            if (self.oFormulaPrint.cantQuimAux !== '') {
                                cantQ = self.oFormulaPrint.cantQuimAux.split(" - ");

                                for (var i = 0; i < cantQ.length; i++) {
                                    if (cantQ[i] !== '') {
                                        var str = cantQ[i];
                                        var l = str.length;

                                        if (str.substring(l - 1) === 'g') {
                                            grs = parseFloat(parseFloat(str.substring(0, l - 1)) * litros);
                                            grs = self.enmascararNumero(grs.toFixed(4));
                                        } else if (str.substring(l - 1) === 'p') {
                                            grs = (relacion === 0) ? 0 : parseFloat(parseFloat(str.substring(0, l - 1)) * kilos * 10);
                                            grs = self.enmascararNumero(grs.toFixed(4));
                                        }

                                        if (cellData === '') {
                                            cellData = grs + '<br>';
                                            self.oFormulaPrint.grsAux = grs + ' - ';
                                        } else {
                                            cellData = cellData + grs + '<br>';
                                            self.oFormulaPrint.grsAux = self.oFormulaPrint.grsAux + grs + ' - ';
                                        }
                                    }
                                }
                                $('#tGramos2').html(cellData);
                            }

                            grs = 0;
                            cellData = '';
                            cantQ = '';

                            if (self.oFormulaPrint.cantQuimCol !== '') {
                                cantQ = self.oFormulaPrint.cantQuimCol.split(" - ");

                                for (var i = 0; i < cantQ.length; i++) {
                                    if (cantQ[i] !== '') {
                                        var str = cantQ[i];
                                        var l = str.length;

                                        if (str.substring(l - 1) === 'g') {
                                            grs = parseFloat(parseFloat(str.substring(0, l - 1)) * litros);
                                            grs = self.enmascararNumero(grs.toFixed(4));
                                        } else if (str.substring(l - 1) === 'p') {
                                            grs = (relacion === 0) ? 0 : parseFloat(parseFloat(str.substring(0, l - 1)) * kilos * 10);
                                            grs = self.enmascararNumero(grs.toFixed(4));
                                        }

                                        if (cellData === '') {
                                            cellData = grs + '<br>';
                                            self.oFormulaPrint.grsCol = grs + ' - ';
                                        } else {
                                            cellData = cellData + grs + '<br>';
                                            self.oFormulaPrint.grsCol = self.oFormulaPrint.grsCol + grs + ' - ';
                                        }
                                    }
                                }
                                $('#tGramos3').html(cellData);
                            }

                            grs = 0;
                            cellData = '';
                            cantQ = '';

                            if (self.oFormulaPrint.cantQuimPro !== '') {
                                cantQ = self.oFormulaPrint.cantQuimPro.split(" - ");

                                for (var i = 0; i < cantQ.length; i++) {
                                    if (cantQ[i] !== '') {
                                        var str = cantQ[i];
                                        var l = str.length;

                                        if (str.substring(l - 1) === 'g') {
                                            grs = parseFloat(parseFloat(str.substring(0, l - 1)) * litros);
                                            grs = self.enmascararNumero(grs.toFixed(4));
                                        } else if (str.substring(l - 1) === 'p') {
                                            grs = (relacion === 0) ? 0 : parseFloat(parseFloat(str.substring(0, l - 1)) * kilos * 10);
                                            grs = self.enmascararNumero(grs.toFixed(4));
                                        }

                                        if (cellData === '') {
                                            cellData = grs + '<br>';
                                            self.oFormulaPrint.grsPro = grs + ' - ';
                                        } else {
                                            cellData = cellData + grs + '<br>';
                                            self.oFormulaPrint.grsPro = self.oFormulaPrint.grsPro + grs + ' - ';
                                        }
                                    }
                                }
                                $('#tGramos4').html(cellData);
                            }
                        }
                    }
                    
                    if ($('#tGramos2').text() === '' || self.$pendFormMaquina.val() === '' || $('#tNumProceso').text() === '' || self.$pendFormRelaBaño.val() === '') {
                        self.$btnImprimirFormula.attr('disabled', true);
                    } else if ($('#tGramos2').text() !== '' && self.$pendFormMaquina.val() !== '' && $('#tNumProceso').text() !== '' && self.$pendFormRelaBaño.val() !== '') {
                        self.$btnImprimirFormula.attr('disabled', false);
                    }
                });
            },
            
            redondearNumero: function(relacion, kilos) {
                var num = Math.round(relacion  * kilos);
                var numString = '' + num;
                var l = numString.length;
                
                var n = parseInt(numString.substring((l-2)));
                
                if (n < 50) {
                    num -= n;
                } else {
                    var ajuste = 100 - n;
                    num += ajuste;
                }
                
                return num;
            },
            
            enmascararNumero: function(numero){
                var num = "";
                var i;
                
                numero = numero.toString();
                
                if (numero.length < 8) {
                    return numero;
                }
                
                for(i = 0; i < numero.length; i++){
                    switch (numero.length) {
                        case 8:
                            return numero;
                            break;
                        case 9:
                            if (i === 1) {
                                num = num + "," + numero[i];
                            } else {
                                num = num + numero[i];
                            }
                            break;
                        case 10:
                            if (i === 2) {
                                num = num + "," + numero[i];
                            } else {
                                num = num + numero[i];
                            }
                            break;
                        case 11:
                            if (i === 3) {
                                num = num + "," + numero[i];
                            } else {
                                num = num + numero[i];
                            }
                            break;
                        case 12:
                            if (i === 1 || i === 4) {
                                num = num + "," + numero[i];
                            } else {
                                num = num + numero[i];
                            }
                            break;
                        case 13:
                            if (i === 2 || i === 5) {
                                num = num + "," + numero[i];
                            } else {
                                num = num + numero[i];
                            }
                            break;
                        case 14:
                            if (i === 3 || i === 6) {
                                num = num + "," + numero[i];
                            } else {
                                num = num + numero[i];
                            }
                            break;
                    }
                }
                return num;
            },
            
            calcularGramosFormulaLotePartido: function() {
                var self = this;
                
                var grs = 0;
                var cantQ = [];
                    
                var relacion = (self.$pendFormRelaBaño.val() !== '') ? parseInt(self.$pendFormRelaBaño.val()) : 0;
                var lote = [];
                lote.push({kilos: self.oFormulaPrint.K1});
                lote.push({kilos: self.oFormulaPrint.K2});
                self.oFormulaPrint.lotes[0].cantGrs = '';
                
                for (var z = 0; z < lote.length; z++) {
                    
                    if (self.oFormulaPrint.lotes[0].cantGrs !== '') {
                        self.oFormulaPrint.lotes[0].cantGrs = self.oFormulaPrint.lotes[0].cantGrs + ' /';
                    }
                    
                    var kilos = parseFloat(lote[z].kilos);
                    var litros = relacion * kilos;
                    
                    grs = 0;
                    cantQ = '';
                        
                    if (self.oFormulaPrint.cantQuimPrep !== '') {
                        cantQ = self.oFormulaPrint.cantQuimPrep.split(" - ");

                        for (var i = 0; i < cantQ.length; i++) {
                            if (cantQ[i] !== '') {
                                var str = cantQ[i];
                                var l = str.length;

                                if (str.substring(l - 1) === 'g') {
                                    grs = parseFloat(parseFloat(str.substring(0, l - 1)) * litros);
                                    grs = self.enmascararNumero(grs.toFixed(4));
                                } else if (str.substring(l - 1) === 'p') {
                                    grs = (relacion === 0) ? 0 :   parseFloat(parseFloat(str.substring(0, l - 1)) * kilos * 10);
                                    grs = self.enmascararNumero(grs.toFixed(4));
                                }

                                if (self.oFormulaPrint.lotes[0].cantGrs === '') {
                                    self.oFormulaPrint.lotes[0].cantGrs = grs;
                                } else {
                                    self.oFormulaPrint.lotes[0].cantGrs = self.oFormulaPrint.lotes[0].cantGrs + ' ' + grs;
                                }
                            }
                        }
                        if (self.oFormulaPrint.cantQuimAux !== '') {
                            self.oFormulaPrint.lotes[0].cantGrs = self.oFormulaPrint.lotes[0].cantGrs + ' -';
                        }
                    }
                        
                    grs = 0;
                    cantQ = '';

                    if (self.oFormulaPrint.cantQuimAux !== '') {
                        cantQ = self.oFormulaPrint.cantQuimAux.split(" - ");

                        for (var i = 0; i < cantQ.length; i++) {
                            if (cantQ[i] !== '') {
                                var str = cantQ[i];
                                var l = str.length;

                                if (str.substring(l - 1) === 'g') {
                                    grs = parseFloat(parseFloat(str.substring(0, l - 1)) * litros);
                                    grs = self.enmascararNumero(grs.toFixed(4));
                                } else if (str.substring(l - 1) === 'p') {
                                    grs = (relacion === 0) ? 0 :   parseFloat(parseFloat(str.substring(0, l - 1)) * kilos * 10);
                                    grs = self.enmascararNumero(grs.toFixed(4));
                                }

                                if (self.oFormulaPrint.lotes[0].cantGrs === '') {
                                    self.oFormulaPrint.lotes[0].cantGrs = grs;
                                } else {
                                    self.oFormulaPrint.lotes[0].cantGrs = self.oFormulaPrint.lotes[0].cantGrs + ' ' + grs;
                                }
                            }
                        }
                        if (self.oFormulaPrint.cantQuimCol !== '') {
                            self.oFormulaPrint.lotes[0].cantGrs = self.oFormulaPrint.lotes[0].cantGrs + ' -';
                        }
                    }
                        
                    grs = 0;
                    cantQ = '';

                    if (self.oFormulaPrint.cantQuimCol !== '') {
                        cantQ = self.oFormulaPrint.cantQuimCol.split(" - ");

                        for (var i = 0; i < cantQ.length; i++) {
                            if (cantQ[i] !== '') {
                                var str = cantQ[i];
                                var l = str.length;

                                if (str.substring(l - 1) === 'g') {
                                    grs = parseFloat(parseFloat(str.substring(0, l - 1)) * litros);
                                    grs = self.enmascararNumero(grs.toFixed(4));
                                } else if (str.substring(l - 1) === 'p') {
                                    grs = (relacion === 0) ? 0 :   parseFloat(parseFloat(str.substring(0, l - 1)) * kilos * 10);
                                    grs = self.enmascararNumero(grs.toFixed(4));
                                }

                                if (self.oFormulaPrint.lotes[0].cantGrs === '') {
                                    self.oFormulaPrint.lotes[0].cantGrs = grs;
                                } else {
                                    self.oFormulaPrint.lotes[0].cantGrs = self.oFormulaPrint.lotes[0].cantGrs + ' ' + grs;
                                }
                            }
                        }
                        if (self.oFormulaPrint.cantQuimPro !== '') {
                            self.oFormulaPrint.lotes[0].cantGrs = self.oFormulaPrint.lotes[0].cantGrs + ' -';
                        }
                    }
                        
                    grs = 0;
                    cantQ = '';

                    if (self.oFormulaPrint.cantQuimPro !== '') {
                        cantQ = self.oFormulaPrint.cantQuimPro.split(" - ");

                        for (var i = 0; i < cantQ.length; i++) {
                            if (cantQ[i] !== '') {
                                var str = cantQ[i];
                                var l = str.length;

                                if (str.substring(l - 1) === 'g') {
                                    grs = parseFloat(parseFloat(str.substring(0, l - 1)) * litros);
                                    grs = self.enmascararNumero(grs.toFixed(4));
                                } else if (str.substring(l - 1) === 'p') {
                                    grs = (relacion === 0) ? 0 :   parseFloat(parseFloat(str.substring(0, l - 1)) * kilos * 10);
                                    grs = self.enmascararNumero(grs.toFixed(4));
                                }

                                if (self.oFormulaPrint.lotes[0].cantGrs === '') {
                                    self.oFormulaPrint.lotes[0].cantGrs = grs;
                                } else {
                                    self.oFormulaPrint.lotes[0].cantGrs = self.oFormulaPrint.lotes[0].cantGrs + ' ' + grs;
                                }
                            }
                        }
                    }
                }
            },
            
            
            imprimirFormula: function(){
                var self = this;
                
                self.$btnImprimirFormula.on('click', function(e){
                    e.preventDefault();
                    
                    if (self.$divPfR1.is(':visible')) {
                        
                        self.mensajeModalAndGritter({
                            tipo: 'modalAlert',
                            titulo: 'Dividir Lote',
                            mensaje: '¿Está seguro que desea dividir el lote?'
                         });
                        
                    } else {
                        self.oFormulaPrint.absorcion = self.$pendFormAbsor.val();
                        self.oFormulaPrint.cortado = false;
                        self.enviarFormulaImprimir();
                    }
                });
            },
            
            validarMensajeAlerta: function() {
                var self = this;
                
                self.$btnSiConf.on('click', function(e){
                   self.obtenerLoteCortado();
                   self.$confirmarLoteDividido.modal('hide');
                });
                
                self.$btnNoConf.on('click', function(e){
                    self.oFormulaPrint.cortado = false;
                    self.enviarFormulaImprimir();
                });
            },
            
            enviarFormulaImprimir: function () {
                var self = this;
                
                $.get(self.UrlLotesPendientes + 'imprimirFormula', {
                    datos: JSON.stringify(self.oFormulaPrint)
                }, function (data) {
                    //console.log(data);
                    if (data === true) {
                        self.$modalFormulaLotesPend.modal('hide');
                        
                        for (var i = 0; i < self.oFilasLotesSelec.length; i++) {
                            self.oFilasLotesSelec[i].remove();
                        }
                        
                    } else if (data === false || data !== false) {
                        self.mensajeModalAndGritter({
                            tipo: 'gritter',
                            titulo: 'Programación de Maquina',
                            mensaje: 'No fue posible generar la carga.',
                            clase: 'growl-danger'
                        });
                    }
                    

                }).fail(function (res, status, er) {
                    self.errorDeConexion(res, status, er, 'lotesPendientesPorFormular/imprimirFormula');
                });
            },
            
            obtenerLoteCortado: function() {
                var self = this;
                
                self.oFormulaPrint.cortado = true;
                self.oFormulaPrint.absorcion = self.$pendFormAbsor.val();
                self.oFormulaPrint.R1 = self.$pendFormRollos1.val();
                self.oFormulaPrint.K1 = self.$pendFormKilos1.val();
                self.oFormulaPrint.R2 = self.$pendFormRollos2.val();
                self.oFormulaPrint.K2 = self.$pendFormKilos2.val();
                
                self.calcularGramosFormulaLotePartido();
                self.enviarFormulaImprimir();
            },
            
            errorDeConexion: function(res, status, er, serv){
                var self = this;
                self.mensajeModalAndGritter({
                       tipo: 'gritter',
                       titulo: 'Servicio: ' + serv,
                       mensaje: 'status: ' + status + ' er: ' + er,
                       clase: 'growl-danger'
                    });
            },
            
            mensajeModalAndGritter: function(m) {
                var self = this;
                
                if (m.tipo === 'modal') {
                
                    try {
                        self.$tituloMensaje.text(m.titulo);
                        self.$cuerpoMensaje.text(m.mensaje);
                        self.$modalMensaje.modal("show");
                    } catch (e) {
                        alert(m.mensaje);
                    }
                    
                } else if (m.tipo === 'gritter') {
                
                    if (m.clase === '') {
                        $.gritter.add({
                            title: m.titulo,
                            text: m.mensaje,
                            sticky: false,
                            time: ''
                        });
                    } else {
                        $.gritter.add({
                            title: m.titulo,
                            text: m.mensaje,
                            class_name: m.clase,
                            sticky: false,
                            time: ''
                        });
                    }
                    
                }  else if (m.tipo === 'modalAlert') {
                
                    try {                        
                        self.$confirmarLDTitulo.text(m.titulo);
                        self.$confirmarLDPregunta.text(m.mensaje);
                        self.$confirmarLoteDividido.modal("show");
                    } catch (e) {
                        var confirmar = confirm(m.mensaje);
                        
                        if (confirmar) {
                            self.obtenerLoteCortado();
                        } else {
                            self.oFormulaPrint.cortado = false;
                            self.enviarFormulaImprimir();
                        }
                    }
                }             
            }
        };
    })();

    frmPendForm.init();

})(document, window, jQuery)