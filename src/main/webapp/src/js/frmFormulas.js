(function(document, window, $, undefined) {
    (function() {
        return frmFormula = {
            formula: {},
            oFibras: [],
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
            oFormulas: [],
            cantQuimicos: 0,
            cQuimicos: 0,
            colorPorFormula: [],
            auxEsporFormula: [],
            idMaestros: [],
            tipoEdicionColor: 'nuevoColor',
            tipoEdicionAuxEsp: 'nuevoAuxEsp',
            $barraProgreso: $('#barraProgreso'),
            $nomFormula: $('#nomFormula'),
            $codFormula: $('#codFormula'),
            $cbxFibra: $('#cbxFibra'),
            $cbxCompos: $('#cbxCompos'),
            $cbxColor: $('#cbxColor'),
            $desColor: $('#desColor'),
            $cbxTono: $('#cbxTono'),
            $codPantone: $('#codPantone'),
            $phFormula: $('#phFormula'),
            $colorpicker: $('#colorpicker'),
            $colorSelector: $('#colorSelector'),
            $tProcesos: $('#tProcesos'),
            $btnLimpiarEncab: $('#btnLimpiarEncab'),
            $daTableProcesos: $('#daTableProcesos'),
            $tPreparaciones: $('#tPreparaciones'),
            $daTablePreparaciones: $('#daTablePreparaciones'),
            $tAuxiliares: $('#tAuxiliares'),
            $daTableAuxiliares: $('#daTableAuxiliares'),
            $tColorantes: $('#tColorantes'),
            $codColor: $('#codColor'),
            $dlCodColor: $('#dlCodColor'),
            $nomColor: $('#nomColor'),
            $dlNomColor: $('#dlNomColor'),
            $cantColor: $('#cantColor'),
            $btnAddColor: $('#btnAddColor'),
            $tAuxEsp: $('#tAuxEsp'),
            $codAuxEsp: $('#codAuxEsp'),
            $dlCodAuxEsp: $('#dlCodAuxEsp'),
            $nomAuxEsp: $('#nomAuxEsp'),
            $dlNomAuxEsp: $('#dlNomAuxEsp'),
            $cantAuxEsp: $('#cantAuxEsp'),
            $btnAddAuxEsp: $('#btnAddAuxEsp'), 
            $tProPosteriores: $('#tProPosteriores'),
            $daTableProPosteriores: $('#daTableProPosteriores'),
            $observ: $('#observ'),
            $tFormula: $('#tFormula').find('tbody'),
            $cbxFibraFiltro: $('#cbxFibraFiltro'),
            $cbxComposFiltro: $('#cbxComposFiltro'),
            $cbxColorFiltro: $('#cbxColorFiltro'),
            $cbxTonoFiltro: $('#cbxTonoFiltro'),
            $cbxFechaFiltro: $('#cbxFechaFiltro'),
            $fechaDesde: $('#fechaDesde'),
            $fechaHasta: $('#fechaHasta'),
            $checkBox: $('#check'),
            $cbxCostoFiltro: $('#cbxCostoFiltro'),
            $valorFiltro1: $('#valorFiltro1'),
            $valorFiltro2: $('#valorFiltro2'),
            $btnFiltro: $('#btnFiltro'),
            $dataTableFormulas: $('#dataTableFormulas'),
            $loader: '<div class="loader"></div>',
            $cargando: '<h3 class="center">Procesando...</h3>',
            $divLoader: $('#divLoader'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $btnSaveForm: $('#btnSaveForm'),
            proceso: 'nuevo',
            aux: [],
            $tempTrPrep: '<tr>' +
                            '<td class="center col-sm-2"><strong>Nombre Preparación:</strong></td>' +
                            '<td class="left col-sm-4" id="tNomPrep">:NombrePreparacion:</td>' +
                            '<td class=" center col-sm-1"><strong>Fibra:</strong></td>' +
                            '<td class="left col-sm-1">:Fibra:</td>' +
                         '</tr>' +
                         '<tr style="background: #E0E3E5;">' +
                            '<td class="center"><strong>Código Químico</strong></td>' +
                            '<td class="center"><strong>Nombre Químico</strong></td>' +
                            '<td class="center"><strong>Gr/Lt</strong></td>' +
                            '<td class="center"><strong>%/Kl</strong></td>' +
                         '</tr>',
            $tempTrQuim: '<tr>' +
                            '<td class="center">:CodQuim:</td>' +
                            '<td class="center">:NombreQuim:</td>' +
                            '<td class="center">:CantGrs:</td>' +
                            '<td class="center">:Cant%:</td>' +
                         '</tr>',
            $tempTrCurva: '<tr>' +
                            '<td>Curva:</td>' +
                            '<td>' +
                                ':NombreCurva: <br>' +
                                'Tiempo: :TiempoCurva: (hrs)<br>' +
                                'Llenado: :LlenadoCurva: <br>' +
                                'Rinse: :RinseCurva:' +
                            '</td>' +
                          '</tr>',
            $tempTrProceso: '<tr>' +
                                '<td class="col-sm-1">' +
                                    'Proceso:<br>' +
                                    'Tiempo:' +
                                '</td>' +
                                '<td class="left">' +
                                    ':NombreProceso:<br>' +
                                    ':Tiempo: (hrs)' +
                                '</td>' +
                            '</tr>',
            $tempTrAux: '<tr>' +
                            '<td class="center col-sm-2"><strong>Nombre Auxiliar:</strong></td>' +
                            '<td class="left col-sm-4" id="tNomAux">:NombreAuxiliar:</td>' +
                            '<td class=" center col-sm-1"><strong>Fibra:</strong></td>' +
                            '<td class="left col-sm-1">:Fibra:</td>' +
                        '</tr>' +
                        '<tr style="background: #E0E3E5;">' +
                            '<td class="center"><strong>Código Químico</strong></td>' +
                            '<td class="center"><strong>Nombre Químico</strong></td>' +
                            '<td class="center"><strong>Gr/Lt</strong></td>' +
                            '<td class="center"><strong>%/Kl</strong></td>' +
                        '</tr>',
            $tempTrProPos: '<tr>' +
                                '<td class="center col-sm-2"><strong>Nombre Proceso Posterior:</strong></td>' +
                                '<td class="left col-sm-4" id="tNomProPos">:NombreProPos:</td>' +
                                '<td class=" center col-sm-1"><strong>Fibra:</strong></td>' +
                                '<td class="left col-sm-1">:Fibra:</td>' +
                           '</tr>' +
                           '<tr style="background: #E0E3E5;">' +
                                '<td class="center"><strong>Código Químico</strong></td>' +
                                '<td class="center"><strong>Nombre Químico</strong></td>' +
                                '<td class="center"><strong>Gr/Lt</strong></td>' +
                                '<td class="center"><strong>%/Kl</strong></td>' +
                            '</tr>',
            
            init: function() {
                this.iniciarComplementos();
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
//                this.agregarListaChequeo();
//                this.desplegarLista();
//                this.borrarListaCheck()
//                this.consultaNombreCurva();
                this.agregarColorantes();
                this.borrarColorante();
                this.agregarAuxEsp();
                this.borrarAuxEsp();
                this.agregarMaestros();
                this.editarFormula();
                this.guardarFormula();
            },
            
            iniciarComplementos: function() {
                var self = this;
                
                u.habilitarDeshabilitarCampos([
                    self.$cbxCompos,
                    self.$codColor,
                    self.$nomColor,
                    self.$cantColor,
                    self.$btnAddColor,
                    self.$codAuxEsp,
                    self.$nomAuxEsp,
                    self.$cantAuxEsp,
                    self.$btnAddAuxEsp,
                    self.$fechaDesde,
                    self.$fechaHasta,
                    self.$valorFiltro1,
                    self.$valorFiltro2
                ], 'des');
                
                self.$barraProgreso.bootstrapWizard({
                    'nextSelector': '#siguiente',
                    'previousSelector': '#anterior',
                    onNext: function(tab, navigation, index) {
                      var $total = navigation.find('li').length;
                      var $current = index+1;
                      var $percent = ($current/$total) * 100;
                      self.$barraProgreso.find('.progress-bar').css('width', $percent+'%');
                    },
                    onPrevious: function(tab, navigation, index) {
                      var $total = navigation.find('li').length;
                      var $current = index+1;
                      var $percent = ($current/$total) * 100;
                      self.$barraProgreso.find('.progress-bar').css('width', $percent+'%');
                    },
                    onTabShow: function(tab, navigation, index) {
                      var $total = navigation.find('li').length;
                      var $current = index+1;
                      var $percent = ($current/$total) * 100;
                      self.$barraProgreso.find('.progress-bar').css('width', $percent+'%');
                    }
                  });
                  
                  if (self.$colorpicker.length > 0) {
                    jQuery('#colorSelector').ColorPicker({
                        onShow: function(colpkr) {
                            jQuery(colpkr).fadeIn(500);
                            return false;
                        },
                        onHide: function(colpkr) {
                            jQuery(colpkr).fadeOut(500);
                            return false;
                        },
                        onChange: function(hsb, hex, rgb) {
                            jQuery('#colorSelector span').css('backgroundColor', '#' + hex);
                            self.$colorpicker.val(rgb.r + ", " + rgb.g + ", " + rgb.b);
                            self.$colorpicker.css({
                                color: 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')', 
                                backgroundColor: 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')'});
                            u.camposObligatorios([self.$colorpicker], '4');
                        }
                    });
                    
                    $.datepicker.regional['es'] = {
                        closeText: 'Cerrar',
                        prevText: 'Ant',
                        nextText: 'Sig',
                        currentText: 'Hoy',
                        monthNames: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
                        monthNamesShort: ['ENE','FEB','MAR','ABR', 'MAY','JUN','JUL','AGO','SEP', 'OCT','NOV','DIC'],
                        dayNames: ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'],
                        dayNamesShort: ['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'],
                        dayNamesMin: ['DO','LU','MA','MI','JU','VI','SÁ'],
                        weekHeader: 'Sm',
                        dateFormat: 'yy/mm/dd',
                        firstDay: 1,
                        isRTL: false,
                        showMonthAfterYear: false,
                        yearSuffix: ''
                    };
                    
                    self.$fechaDesde.datepicker($.datepicker.regional['es']);
                    self.$fechaHasta.datepicker($.datepicker.regional['es']);
                }
            },
            
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                
                if (opc === 'f') { //Fibras
                    if ($.type(data) !== 'array') {
                        self.oFibras = JSON.parse(data);
                    }
                    
                    um.cargarComboBox([self.$cbxFibra, self.$cbxFibraFiltro], self.oFibras, 'formula');
                }
                
                if (opc === 'q') {
                    self.oQuimicos = data;
                    um.cargarDataList([self.$dlCodAuxEsp, self.$dlNomAuxEsp], self.oQuimicos, 'auxEsp');
                }
                
                if (opc === 'pr') { //Procesos
                    self.oProcesos = data;
                    um.destruirDataTable(self.$daTableProcesos, '');
                    um.renderDataTables(self.$daTableProcesos, self.oProcesos, {frm: 'formula', tbl:'procesos'});
                }
                
                if (opc === 'fla') {
                    self.oFormulas = data;
                    um.destruirDataTable(self.$dataTableFormulas, '');
                    self.$dataTableFormulas.find('tbody').remove();
                    if (!$.isEmptyObject(data)) {
                        self.$divLoader.find('h3, div').remove();
                        um.renderDataTables(self.$dataTableFormulas, self.oFormulas, {frm: 'formula', tbl: 'formulas'});
                    } else {
                        self.$divLoader.find('div').remove();
                        self.$divLoader.find('h3').text('No se encontraron datos.');
                    }
                }
                
                if (opc === 'cps') { //Composicion
                    self.oComposicion = data;                    
                    um.cargarComboBox([self.$cbxCompos, self.$cbxComposFiltro], self.oComposicion, 'compos');
                }
                
                if (opc === 'clr') { //Colores
                    self.oColores = data;
                    um.cargarComboBox([self.$cbxColor, self.$cbxColorFiltro], self.oColores, 'color');
                }
                
                if (opc === 'tn') { //Tonos
                    self.oTonos = data;
                    um.cargarComboBox([self.$cbxTono, self.$cbxTonoFiltro], self.oTonos, 'tono');
                }
                
                if (opc === 'pre') { //Preparacion
                    self.oPreparaciones = data;
                }
                
                if (opc === 'aux') { //Auxiliares
                    self.oAuxiliares = data;
                }
                
                if (opc === 'clrts') { //Colorantes
                    self.oColorantes = data;
                    um.cargarDataList([self.$dlCodColor, self.$dlNomColor], self.oColorantes, 'q');
                }
                
                if (opc === 'pp') { //Procesos Posteriores
                    self.oProPosterior = data;
                }
                
                if (opc === 'curv') { //Curvas
                    self.oCurvas = data;
                }
            },
            
            metodosUtiles: function() {
                var self = this;
                
                //focusin
                //focusout
                self.$cbxFibra.on('focusout, change', function(e) {
                    var fibra = self.$cbxFibra.val();
                    
                    self.cargarDataTablesByFibra(fibra);
                    u.camposObligatorios([self.$cbxFibra], '4');
                });
                
                self.$cbxCompos.on('focusout, change', function(e) {
                    u.camposObligatorios([self.$cbxCompos], '4');
                    self.vistaPreliminarFormula({in: ''});
                    self.codigoFormula();
                });
                
                self.$cbxColor.on('focusout, change', function(e) {
                    u.camposObligatorios([self.$cbxColor], '4');
                    self.nombreFormula();
                    self.codigoFormula();
                    self.vistaPreliminarFormula({in: ''});
                });
                
                self.$desColor.focusin(function(e) {
                    self.$desColor.css('text-transform', 'uppercase');
                });
                
                self.$desColor.focusout(function(e) {
                    u.camposObligatorios([self.$desColor], '4');
                    self.nombreFormula();
                    self.vistaPreliminarFormula({in: ''});
                    
                    if (self.$desColor.val() === '') {
                        self.$desColor.css('text-transform', '');
                    }
                });
                
                self.$cbxTono.on('focusout, change', function(e) {
                    u.camposObligatorios([self.$cbxTono], '4');
                    self.nombreFormula();
                    self.codigoFormula();
                    self.vistaPreliminarFormula({in: ''});
                });
                
                self.$codPantone.focusin(function(e) {
                    self.$codPantone.css('text-transform', 'uppercase');
                });
                
                self.$codPantone.focusout(function(e) {
                    u.camposObligatorios([self.$codPantone], '4');
                    self.vistaPreliminarFormula({in: ''});
                    
                    if (self.$codPantone.val() === '') {
                        self.$codPantone.css('text-transform', '');
                    }
                });
                
                self.$phFormula.on('focusout, change', function(e) {
                    u.camposObligatorios([self.$phFormula], '4');
                    self.vistaPreliminarFormula({in: ''});
                });
                
                self.$codColor.on("keyup keypress change", function() {
                    self.$nomColor.val("");
                    um.cargarCoincidenciaProductoQuimico('cod', [self.$codColor, self.$nomColor], self.oColorantes);
                    u.camposObligatorios([self.$codColor, self.$nomColor], '4');
                });
                
                self.$nomColor.on('keyup keypress change', function() {
                    self.$codColor.val("");
                    um.cargarCoincidenciaProductoQuimico('nom', [self.$nomColor, self.$codColor], self.oColorantes);
                    u.camposObligatorios([self.$nomColor, self.$codColor], '4');
                });
                
                self.$cantColor.on('keyup keypress change', function() {
                    u.camposObligatorios([self.$cantColor], '4');
                });
                
                self.$cantColor.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 3
                });
                
                self.$codAuxEsp.on("keyup keypress change", function() {
                    self.$nomAuxEsp.val("");
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$codAuxEsp.val() === self.oQuimicos[i].codProduct) && (self.oQuimicos[i].auxEsp === true)) {
                            um.cargarCoincidenciaProductoQuimico('cod', [self.$codAuxEsp, self.$nomAuxEsp], self.oQuimicos);
                            break;
                        } 
                    }
                    
                    u.camposObligatorios([self.$codAuxEsp, self.$nomAuxEsp], '4');
                });
                
                self.$nomAuxEsp.on('keyup keypress change', function() {
                    self.$codAuxEsp.val("");
                    
                    for (var i = 0; i < self.oQuimicos.length; i++){
                        if ((self.$nomAuxEsp.val() === self.oQuimicos[i].nomProducto) && (self.oQuimicos[i].auxEsp === true)) {
                            um.cargarCoincidenciaProductoQuimico('nom', [self.$nomAuxEsp, self.$codAuxEsp], self.oQuimicos);
                            break;
                        }   
                    }
                    
                    u.camposObligatorios([self.$nomAuxEsp, self.$codAuxEsp], '4');
                });
                
                self.$cantAuxEsp.on('keyup keypress change', function() {
                    u.camposObligatorios([self.$cantAuxEsp], '4');
                });
                
                self.$cantAuxEsp.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });
                
                self.$phFormula.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 2
                });
                
                self.$observ.on('focusin, focusout', function() {
                    self.vistaPreliminarFormula({in: ''});
                });
                
                self.$valorFiltro1.inputNumber({
                    allowDecimals: false,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ','
                });
                
                self.$valorFiltro2.inputNumber({
                    allowDecimals: false,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ','
                });
                
                self.$cbxFechaFiltro.on('focusout, change', function(e) {
                    if (self.$cbxFechaFiltro.val() !== 'Seleccione una...') {
                        u.habilitarDeshabilitarCampos([self.$fechaDesde,self.$fechaHasta,], 'hab');
                    } else {
                        u.limpiarCampos([self.$fechaDesde,self.$fechaHasta]);
                        u.habilitarDeshabilitarCampos([self.$fechaDesde,self.$fechaHasta], 'des');
                    }
                });
                
                self.$cbxCostoFiltro.on('focusout, change', function(e) {
                    if (self.$cbxCostoFiltro.val() !== 'Seleccione una...') {
                        
                        if (self.$cbxCostoFiltro.val() === 'ENTRE') {
                            u.habilitarDeshabilitarCampos([self.$valorFiltro1, self.$valorFiltro2], 'hab');
                        } else if (self.$cbxCostoFiltro.val() !== 'ENTRE') {
                            u.limpiarCampos([self.$valorFiltro2]);
                            u.habilitarDeshabilitarCampos([self.$valorFiltro2], 'des');
                            u.habilitarDeshabilitarCampos([self.$valorFiltro1], 'hab');
                        }
                        
                    } else {
                        u.limpiarCampos([self.$valorFiltro1,self.$valorFiltro2]);
                        u.habilitarDeshabilitarCampos([self.$valorFiltro1,self.$valorFiltro2], 'des');
                    }
                    
                });
                
                self.$btnFiltro.on('click', function(e) {
                    e.preventDefault();
                    
                    var fibra = '';
                    var compos = '';
                    var color = '';
                    var tono = '';
                    var tipoFecha = '';
                    var fechaDes = '';
                    var fechaHas = '';
                    var rango = '';
                    var valor1 = '';
                    var valor2 = '';
                    var ac = self.$checkBox.children().children().children()[0];
                    var activa = $(ac).hasClass('toggle-on active');
                    
                    if (self.$cbxFibraFiltro.val() !== 'Seleccione una...') {                        
                        for(var i = 0; i < self.oFibras.length; i++){
                            if (self.oFibras[i].nomFibra === self.$cbxFibraFiltro.val()) {
                                fibra = self.oFibras[i].idFibra;                                
                                break;
                            }
                        }
                    }
                    
                    if (self.$cbxComposFiltro.val() !== 'Seleccione una...') {
                        compos = self.$cbxComposFiltro.val();
                    }
                    
                    if (self.$cbxColorFiltro.val() !== 'Seleccione una...') {
                        for (var i = 0; i < self.oColores.length; i++) {
                            if (self.oColores[i].nomColor === self.$cbxColorFiltro.val()) {
                                color = self.oColores[i].idNomColor;
                                break;
                            }
                        }
                    }
                
                    if (self.$cbxTonoFiltro.val() !== 'Seleccione una...') {
                        for (var i = 0; i < self.oTonos.length; i++) {
                            if (self.oTonos[i].nomTono === self.$cbxTonoFiltro.val()) {
                                tono = self.oTonos[i].codTono;
                            }
                        }
                    }
                    
                    if (self.$cbxFechaFiltro.val() !== 'Seleccione una...') {
                        
                        if (self.$cbxFechaFiltro.val() === 'FECHA DE CREACIÓN') {
                            tipoFecha = 'fCreacion';
                        } else if (self.$cbxFechaFiltro.val() === 'FECHA DE MODIFICACIÓN') {
                            tipoFecha = 'fModifica';
                        } else if (self.$cbxFechaFiltro.val() === 'FECHA DE USO') {
                            tipoFecha = 'fUso';
                        }
                        
                        fechaDes = self.$fechaDesde.val();
                        fechaHas = self.$fechaHasta.val();
                    }
                    
                    if (self.$cbxCostoFiltro.val() !== 'Seleccione una...') {
                        
                        if (self.$cbxCostoFiltro.val() === 'MAYOR QUE') {
                            rango = 'mayor';
                        } else if (self.$cbxCostoFiltro.val() === 'MENOR QUE') {
                            rango = 'menor';
                        } else if (self.$cbxCostoFiltro.val() === 'ENTRE') {
                            rango = 'entre';
                        }
                        
                        if (self.$valorFiltro1.val() !== '') {
                            valor1 = self.obtenerValor(self.$valorFiltro1.val());
                        }
                        
                        if (self.$valorFiltro2.val() !== '') {
                            valor2 = self.obtenerValor(self.$valorFiltro2.val());
                        }
                    }
                    
                    self.$divLoader.find('h3, div').remove();
                    
                    if (fibra !== '' || compos !== '' || color !== '' || tono !== '' || tipoFecha !== '' || fechaDes !== '' || fechaHas !== '' ||
                       rango !== '' || valor1 !== '' || valor2 !== '') {
                        
                        self.$divLoader.append(self.$cargando);
                        self.$divLoader.append(self.$loader);
                        consultas.consultarMaestroFormulas(fibra, compos, color, tono, tipoFecha, fechaDes, fechaHas, rango, valor1, valor2, activa);
                    } else {
                        self.$divLoader.append(self.$cargando);
                        self.$divLoader.find('h3').text('No hay datos a consultar');
                        um.destruirDataTable(self.$dataTableFormulas, '');
                        self.$dataTableFormulas.find('tbody').remove();
                    }
                });
                
            },
            
            cargarDataTablesByFibra: function(fibra) {
                var self = this;
                var arrTemp = [];

                if (fibra !== 'Seleccione una...') {
                    self.$tPreparaciones.find('tbody').remove();
                    self.$tAuxiliares.find('tbody').remove();
                    self.$tProPosteriores.find('tbody').remove();

                    for (var i = 0; i < self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === fibra) {
                            var idFibra = self.oFibras[i].idFibra;
                            
                            if (self.oFibras[i].composicion === 'SI') {
                                self.cantQuimicos = 6;
                                self.cQuimicos = 6;
                                self.$cbxCompos.attr('disabled', false);
                                u.camposObligatorios([self.$cbxCompos], '4');
                            } else {
                                self.cantQuimicos = 3;
                                self.cQuimicos = 3;
                                self.$cbxCompos.val('Seleccione una...');
                                self.$cbxCompos.attr('disabled', true);
                                u.camposObligatorios([self.$cbxCompos], '4');
                            }

                            self.colorPorFormula = [];
                            self.$tColorantes.find('tr:gt(1)').remove();
                            self.$tAuxEsp.find('tr:gt(1)').remove();
                            u.habilitarDeshabilitarCampos([
                                self.$codColor,
                                self.$nomColor,
                                self.$cantColor,
                                self.$btnAddColor
                            ], 'hab');

                            break;
                        }
                    }

                    for (var j = 0; j < self.oPreparaciones.length; j++) {
                        if (self.oPreparaciones[j].idFibra.idFibra === idFibra) {
                            var obj = {
                                idNomPreparacion: self.oPreparaciones[j].idNomPreparacion,
                                nomPreparacion: self.oPreparaciones[j].nomPreparacion,
                                codFibra: self.oPreparaciones[j].idFibra.codFibra,
                                costoPreparacion: self.oPreparaciones[j].costoPreparacion.toFixed(1),
                                fechaUso: self.oPreparaciones[j].fechaUso
                            };
                            arrTemp.push(obj);
                        }
                    }

                    var tp = self.$daTablePreparaciones.dataTable();
                    tp.fnDestroy();
                    self.$daTablePreparaciones.find('tbody').remove();
                    um.renderDataTables(self.$daTablePreparaciones, arrTemp, {frm: 'formula', tbl: 'preparacion'});

                    arrTemp = [];
                    for (var j = 0; j < self.oAuxiliares.length; j++) {
                        if (self.oAuxiliares[j].idFibra.idFibra === idFibra) {
                            var obj = {
                                nomAuxiliar: self.oAuxiliares[j].nomAuxiliar,
                                codFibra: self.oAuxiliares[j].idFibra.codFibra,
                                costoAuxiliar: self.oAuxiliares[j].costoAuxiliar.toFixed(1),
                                fechaUso: self.oAuxiliares[j].fechaUso
                            };
                            arrTemp.push(obj);
                        }
                    }

                    var ta = self.$daTableAuxiliares.dataTable();
                    ta.fnDestroy();
                    self.$daTableAuxiliares.find('tbody').remove();
                    um.renderDataTables(self.$daTableAuxiliares, arrTemp, {frm: 'formula', tbl: 'auxiliar'});

                    arrTemp = [];
                    for (var j = 0; j < self.oProPosterior.length; j++) {
                        if (self.oProPosterior[j].idFibra.idFibra === idFibra) {
                            var obj = {
                                nomProcPost: self.oProPosterior[j].nomProcPost,
                                codFibra: self.oProPosterior[j].idFibra.codFibra,
                                costoProcPost: self.oProPosterior[j].costoProcPost.toFixed(1),
                                fechaUso: self.oProPosterior[j].fechaUso
                            };
                            arrTemp.push(obj);
                        }
                    }

                    var tpp = self.$daTableProPosteriores.dataTable();
                    tpp.fnDestroy();
                    self.$daTableProPosteriores.find('tbody').remove();
                    um.renderDataTables(self.$daTableProPosteriores, arrTemp, {frm: 'formula', tbl: 'proPost'});

                    self.nombreFormula();
                    self.codigoFormula();
                    self.vistaPreliminarFormula({in: ''});
                } else {
                    self.cantQuimicos = 0;
                    self.cQuimicos = 0;
                    self.colorPorFormula = [];
                    self.$tColorantes.find('tr:gt(1)').remove();
                    self.$tAuxEsp.find('tr:gt(1)').remove();
                    u.habilitarDeshabilitarCampos([
                        self.$cbxCompos,
                        self.$codColor,
                        self.$nomColor,
                        self.$cantColor,
                        self.$btnAddColor,
                        self.$codAuxEsp,
                        self.$nomAuxEsp,
                        self.$cantAuxEsp,
                        self.$btnAddAuxEsp
                    ], 'des');
                    u.camposObligatorios([self.$cbxCompos, self.$codColor, self.$nomColor, self.$cantColor], '4');
                    self.nombreFormula();
                    self.codigoFormula();
                    self.vistaPreliminarFormula({in: ''});

                    var tp = self.$daTablePreparaciones.dataTable();
                    tp.fnDestroy();
                    self.$daTablePreparaciones.find('tbody').remove();

                    var ta = self.$daTableAuxiliares.dataTable();
                    ta.fnDestroy();
                    self.$daTableAuxiliares.find('tbody').remove();

                    var tpp = self.$daTableProPosteriores.dataTable();
                    tpp.fnDestroy();
                    self.$daTableProPosteriores.find('tbody').remove();
                }
            },
            
            obtenerValor: function(v) {
                var val = v.split(',');
                
                if (val.length > 1) {
                    var miles = val[0];
                    var centena = val[1];
                    
                    return miles + centena;
                } else {
                    var centena = val[0];
                    
                    return centena;
                }
            },
            
            limpiarFormulario: function() {
                var self = this;
                
                self.$btnLimpiarEncab.on('click', function(e) {
                    e.preventDefault();
                    
                    self.limpiarTodo();
                });                
            },
            
            limpiarTodo: function() {
                var self = this;
                
                self.formula = {};
                self.proceso = 'nuevo';
                
                self.$cbxFibra.val('Seleccione una...');
                self.$cbxCompos.val('Seleccione una...');
                self.$cbxColor.val('Seleccione una...');
                self.$cbxTono.val('Seleccione una...');
                self.$colorpicker.css('backgroundColor', '');
                
                u.limpiarCampos([
                    self.$desColor,
                    self.$codPantone,
                    self.$phFormula,
                    self.$colorpicker,
                    self.$codColor,
                    self.$nomColor,
                    self.$cantColor,
                    self.$codAuxEsp,
                    self.$nomAuxEsp,
                    self.$cantAuxEsp,
                    self.$observ
                ]);

                u.camposObligatorios([
                    self.$cbxFibra,
                    self.$cbxColor,
                    self.$desColor,
                    self.$cbxTono,
                    self.$codPantone,
                    self.$phFormula,
                    self.$colorpicker,
                    self.$cbxCompos,
                    self.$codColor,
                    self.$nomColor,
                    self.$cantColor,
                    self.$codAuxEsp,
                    self.$nomAuxEsp,
                    self.$cantAuxEsp
                ], '4');

                u.habilitarDeshabilitarCampos([
                    self.$cbxFibra,
                    self.$cbxCompos,
                    self.$cbxColor,
                    self.$desColor,
                    self.$cbxTono,
                    self.$codPantone,
                    self.$phFormula,
                    self.$colorpicker
                ], 'hab');

                self.$tProcesos.find('tbody').remove();
                self.$tPreparaciones.find('tbody').remove();
                self.$tAuxiliares.find('tbody').remove();
                self.$tProPosteriores.find('tbody').remove();

                self.cantQuimicos = 0;
                self.cQuimicos = 0;
                self.colorPorFormula = [];
                self.$tColorantes.find('tr:gt(1)').remove();
                self.$tAuxEsp.find('tr:gt(1)').remove();

                u.habilitarDeshabilitarCampos([
                    self.$cbxCompos,
                    self.$codColor,
                    self.$nomColor,
                    self.$cantColor,
                    self.$btnAddColor,
                    self.$codAuxEsp,
                    self.$nomAuxEsp,
                    self.$cantAuxEsp,
                    self.$btnAddAuxEsp
                ], 'des');

                um.destruirDataTable(self.$daTablePreparaciones, '');
                um.destruirDataTable(self.$daTableAuxiliares, '');
                um.destruirDataTable(self.$daTableProPosteriores, '');

                self.nombreFormula();
                self.codigoFormula();

                self.vistaPreliminarFormula({in: 'proceso', proceso: '', tiempo: 0, curva: ''});
                self.vistaPreliminarFormula({in: 'preparacion', quimicos: []});
                self.vistaPreliminarFormula({in: 'auxiliar', quimicos: []});
                self.vistaPreliminarFormula({in: 'colorante'});
                self.vistaPreliminarFormula({in: 'propos', quimicos: []});

                $('#desColor, #desColor, #codPantone').css('text-transform', '');
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              
                var campos = [
                  self.$cbxFibra,
                  self.$cbxColor,
                  self.$desColor,
                  self.$cbxTono,
                  self.$codPantone,
                  self.$phFormula,
                  self.$colorpicker,
                  self.$codColor,
                  self.$nomColor,
                  self.$cantColor,
                  self.$codAuxEsp,
                  self.$nomAuxEsp,
                  self.$cantAuxEsp
              ];
              
              u.camposObligatorios(campos, '1');
            },
            
            mensajeObligatoriedad: function(mensaje) {
                var self = this;

                if (mensaje.t === 'modal') {
                    try {
                        self.$tituloMensaje.text(mensaje.titulo);
                        self.$cuerpoMensaje.text(mensaje.cuerpoMensaje);
                        self.$modalMensaje.modal("show");
                    } catch (e) {
                        alert(mensaje.cuerpoMensaje);
                    }
                } else if (mensaje.t === 'gritter') {
                    try {
                        $.gritter.add({
                            title: mensaje.titulo,
                            text: mensaje.cuerpoMensaje,
                            sticky: false,
                            time: "30000"
                        });
                    } catch (e) {
                        alert(mensaje.cuerpoMensaje);
                    }
                }
            },
            
            consultaNombreFormula: function(){
                var self = this;

            },
            
            agregarColorantes: function() {
                var self = this;
                
                self.$btnAddColor.on('click', function(e) {
                    e.preventDefault();
                    
                    var campObligQuim = u.camposObligatorios([self.$codColor, self.$nomColor, self.$cantColor], '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantColor.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({
                            t: 'modal',
                            titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }

                    if (b && campObligQuim) {
                        if (self.cantQuimicos > 0) {
                            var d = um.noRepetirQuimicos({
                                tipo: '+', 
                                codQ: self.$codColor.val(),
                                cant1: 0,
                                cant2: 0,
                                maestro: 'formula', 
                                codQpermitido: ''},
                                self.colorPorFormula);

                            if (!d.existe) {

                                self.colorPorFormula.push({codQ: self.$codColor.val(), cant1: 0, cant2: parseFloat(self.$cantColor.val())});
                                
                                if (self.colorPorFormula.length > 0 && self.$tAuxiliares.find('tbody tr'). length > 0) {
                                    u.habilitarDeshabilitarCampos([
                                        self.$codAuxEsp,
                                        self.$nomAuxEsp,
                                        self.$cantAuxEsp,
                                        self.$btnAddAuxEsp]
                                    , 'hab');
                                } else {
                                    self.$tAuxEsp.find('tr:gt(1)').remove();
                                    u.habilitarDeshabilitarCampos([
                                        self.$codAuxEsp,
                                        self.$nomAuxEsp,
                                        self.$cantAuxEsp,
                                        self.$btnAddAuxEsp]
                                    , 'des');
                                }
                                
                                um.agregarLinea(
                                        self.$tColorantes.find('tbody'),
                                        {tipo: self.tipoEdicionColor,
                                        codQuim: self.$codColor.val(),
                                        nomQuim: self.$nomColor.val(),
                                        cantPctj: self.$cantColor.val()});

                                self.vistaPreliminarFormula({in: 'colorante'});
                                
                                u.limpiarCampos([self.$codColor, self.$nomColor, self.$cantColor]);
                                u.camposObligatorios([self.$codColor, self.$nomColor, self.$cantColor], '4');
                                self.cantQuimicos--;
                                
                            } else {
                                self.mensajeObligatoriedad({
                                    t: 'modal',
                                    titulo: 'Registro de Colorantes',
                                    cuerpoMensaje: 'No puede agregar más de una vez un mismo color.'});
                            }
                        } else {
                            self.mensajeObligatoriedad({
                                t: 'modal',
                                titulo: 'Cantidad Colorantes',
                                cuerpoMensaje: 'La cantidad permitida para la fibra seleccionada es de ' + self.cQuimicos + ' colorantes.'});
                        }
                    }
                });
            },
            
            borrarColorante: function() {
                var self = this;
                
                self.$tColorantes.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent,
                        cant1: '',
                        cant2: '',
                        maestro: 'formula',
                        codQpermitido: '',
                        pos: (rowIndex - 2)}, 
                        self.colorPorFormula);
                    
                    self.colorPorFormula = d.oQuim;
                    self.cantQuimicos++;
                    
                    fila.remove();
                    
                    if (self.colorPorFormula.length > 0 && self.$tAuxiliares.find('tbody tr'). length > 0) {
                        u.habilitarDeshabilitarCampos([
                            self.$codAuxEsp,
                            self.$nomAuxEsp,
                            self.$cantAuxEsp,
                            self.$btnAddAuxEsp]
                        , 'hab');
                        
                    } else {
                        self.$tAuxEsp.find('tr:gt(1)').remove();
                        u.habilitarDeshabilitarCampos([
                            self.$codAuxEsp,
                            self.$nomAuxEsp,
                            self.$cantAuxEsp,
                            self.$btnAddAuxEsp]
                        , 'des');
                    }
                    
                    self.vistaPreliminarFormula({in: 'colorante'});
                    
                    e.stopPropagation();
                });
            },
            
            agregarAuxEsp: function() {
                var self = this;
                
                self.$btnAddAuxEsp.on('click', function(e) {
                    e.preventDefault();
                    
                    var campObligQuim = u.camposObligatorios([self.$codAuxEsp, self.$nomAuxEsp, self.$cantAuxEsp], '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantAuxEsp.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({
                            t: 'modal',
                            titulo: 'Unidad de Medida Gramos por Litro',
                            cuerpoMensaje: 'La cantida de gramos debe ser superior a 0 (Cero).'});
                    }

                    if (b && campObligQuim) {

                        self.auxEsporFormula.push({codQuimico: self.$codAuxEsp.val(), nomQuimico: self.$nomAuxEsp.val(), cantGr: self.$cantAuxEsp.val()});

                        um.agregarLinea(
                                self.$tAuxEsp.find('tbody'), {
                                tipo: self.tipoEdicionAuxEsp,
                                codQuim: self.$codAuxEsp.val(),
                                nomQuim: self.$nomAuxEsp.val(),
                                cantGrLt: self.$cantAuxEsp.val()
                        });

                        self.vistaPreliminarFormula({in: 'auxEsp'});

                        u.limpiarCampos([self.$codAuxEsp, self.$nomAuxEsp, self.$cantAuxEsp]);
                        u.camposObligatorios([self.$codAuxEsp, self.$nomAuxEsp, self.$cantAuxEsp], '4');
                    }
                });
            },
            
            borrarAuxEsp: function() {
                var self = this;
                
                self.$tAuxEsp.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent,
                        cant1: '',
                        cant2: '',
                        maestro: '',
                        codQpermitido: '',
                        pos: (rowIndex - 2)}, 
                        self.auxEsporFormula);
                    
                    self.auxEsporFormula = d.oQuim;
                    
                    fila.remove();
                    
                    self.vistaPreliminarFormula({in: 'auxEsp'});
                    
                    e.stopPropagation();
                });
            },
            
            agregarMaestros: function() {
                var self = this;
                
                self.$daTableProcesos.on('click', '#btnAdd', function (e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var nomProceso = fila[0].cells[0].textContent;
                    var tiempo = (parseInt(fila[0].cells[2].textContent));
                    
                    self.renderTablas('proceso', {nombre: nomProceso, tiempo: tiempo});
                });
                
                self.$daTablePreparaciones.on('click', '#btnAdd', function (e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var nomPrep = fila[0].cells[0].textContent;
                    
                    self.renderTablas('preparacion', nomPrep);
                });
                
                self.$daTableAuxiliares.on('click', '#btnAdd', function (e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var nomAux = fila[0].cells[0].textContent;
                    
                    self.renderTablas('auxiliar', nomAux);
                });
                
                self.$daTableProPosteriores.on('click', '#btnAdd', function (e) {
                    e.preventDefault();
                    var fila = $(this).closest('tr');
                    var nomProPos = fila[0].cells[0].textContent;
                    
                    self.renderTablas('proPost', nomProPos);
                });
            },
            
            renderTablas: function(tabla, maestro) {
                var self = this;
                
                if (tabla === 'proceso') {
                    self.$tProcesos.find('tbody').remove();
                    self.$tProcesos.append('<tbody></tbody>');
                    self.$tProcesos.find('tbody').append(self.$loader);
                    var tempTrProceso = self.$tempTrProceso;
                    
                    var tiempo = (parseInt(maestro.tiempo) / 60);
                    
                    var trProc = tempTrProceso
                                    .replace(':NombreProceso:', maestro.nombre)
                                    .replace(':Tiempo:', tiempo.toFixed(2));
                    
                    self.$tProcesos.find('tbody').append(trProc);
                    
                    for (var i = 0; i < self.oProcesos.length; i++) {
                        if (maestro.nombre === self.oProcesos[i].nomProceso) {
                            self.formula.idProceso = self.oProcesos[i].idProceso;
                            
                            self.vistaPreliminarFormula({in: 'proceso', proceso: self.oProcesos[i].idProceso, tiempo: tiempo, curva: self.oProcesos[i].idCurvas});
                            
                            var curvas = self.oProcesos[i].idCurvas.split('-');
                            var tempTrCurva = self.$tempTrCurva;
                            
                            for (var j = 0; j < curvas.length; j++) {
                                for (var k = 0; k < self.oCurvas.length; k++){
                                    if (parseInt(curvas[j]) === self.oCurvas[k].idCurva) {
                                        var trCurva = tempTrCurva
                                                        .replace(':NombreCurva:', self.oCurvas[k].nomCurva)
                                                        .replace(':TiempoCurva:', ((self.oCurvas[k].tiempoCurva / 60).toFixed(2)))
                                                        .replace(':LlenadoCurva:', self.oCurvas[k].llenadoCurva)
                                                        .replace(':RinseCurva:', self.oCurvas[k].rinseCurva);
                                        
                                        self.$tProcesos.find('tbody').append(trCurva);
                                        break;
                                    }
                                }
                            }
                            self.$tProcesos.find('.loader').remove();
                            break;
                        }
                    }
                    
                } else if (tabla === 'preparacion') {
                    self.$tPreparaciones.find('tbody').remove();
                    self.$tPreparaciones.append('<tbody></tbody>');
                    self.$tPreparaciones.find('tbody').append(self.$loader);
                    var tempTrPrep = self.$tempTrPrep;
                    
                    for (var i = 0; i < self.oPreparaciones.length; i++) {
                        if (maestro === self.oPreparaciones[i].nomPreparacion) {
                            
                            self.formula.idPreparacion = self.oPreparaciones[i].idNomPreparacion;
                            
                            var trPrep = tempTrPrep
                                    .replace(':NombrePreparacion:', self.oPreparaciones[i].nomPreparacion)
                                    .replace(':Fibra:', self.oPreparaciones[i].idFibra.nomFibra);
                            
                            self.$tPreparaciones.find('tbody').append(trPrep);
                            
                            var quimicos = self.oPreparaciones[i].preparacionCollection;
                            
                            for (var j = 0; j < quimicos.length; j++) {
                                for (var k = 0; k < self.oQuimicos.length; k ++) {                                    
                                    if (quimicos[j].codQuimico === self.oQuimicos[k].codProduct) {
                                        var tempTrQuim = self.$tempTrQuim;
                                
                                        var trQuim = tempTrQuim
                                                        .replace(':CodQuim:', quimicos[j].codQuimico)
                                                        .replace(':NombreQuim:', self.oQuimicos[k].nomProducto)
                                                        .replace(':CantGrs:', quimicos[j].cantGr)
                                                        .replace(':Cant%:', quimicos[j].cantPtj);

                                        self.$tPreparaciones.find('tbody').append(trQuim);
                                        break;
                                    }
                                }
                            }
                            
                            self.vistaPreliminarFormula({in: 'preparacion', quimicos: quimicos});
                            
                            self.$tPreparaciones.find('.loader').remove();
                            break;
                        }
                    }
                } else if (tabla === 'auxiliar') {
                    self.$tAuxiliares.find('tbody').remove();
                    self.$tAuxiliares.append('<tbody></tbody>');
                    self.$tAuxiliares.find('tbody').append(self.$loader);
                    var tempTrAux = self.$tempTrAux;
                    
                    for (var i = 0; i < self.oAuxiliares.length; i++) {
                        if (maestro === self.oAuxiliares[i].nomAuxiliar) {
                            
                            self.formula.idAuxiliar = self.oAuxiliares[i].idNomAuxiliar;
                            
                            var trAux = tempTrAux
                                    .replace(':NombreAuxiliar:', self.oAuxiliares[i].nomAuxiliar)
                                    .replace(':Fibra:', self.oAuxiliares[i].idFibra.nomFibra);
                            
                            self.$tAuxiliares.find('tbody').append(trAux);
                            
                            var quimicos = self.oAuxiliares[i].auxiliarCollection;
                            
                            for (var j = 0; j < quimicos.length; j++) {
                                for (var k = 0; k < self.oQuimicos.length; k ++) {                                    
                                    if (quimicos[j].codQuimico === self.oQuimicos[k].codProduct) {
                                        var tempTrQuim = self.$tempTrQuim;
                                
                                        var trQuim = tempTrQuim
                                                        .replace(':CodQuim:', quimicos[j].codQuimico)
                                                        .replace(':NombreQuim:', self.oQuimicos[k].nomProducto)
                                                        .replace(':CantGrs:', quimicos[j].cantGr)
                                                        .replace(':Cant%:', quimicos[j].cantPtj);

                                        self.$tAuxiliares.find('tbody').append(trQuim);
                                        break;
                                    }
                                }
                            }
                            
                            if (self.colorPorFormula.length > 0 && self.$tAuxiliares.find('tbody tr'). length > 0) {
                                u.habilitarDeshabilitarCampos([
                                    self.$codAuxEsp,
                                    self.$nomAuxEsp,
                                    self.$cantAuxEsp,
                                    self.$btnAddAuxEsp]
                                , 'hab');
                            } else {
                                self.$tAuxEsp.find('tr:gt(1)').remove();
                                u.habilitarDeshabilitarCampos([
                                    self.$codAuxEsp,
                                    self.$nomAuxEsp,
                                    self.$cantAuxEsp,
                                    self.$btnAddAuxEsp]
                                , 'des');
                            }
                            self.aux = quimicos;
                            self.vistaPreliminarFormula({in: 'auxiliar', quimicos: quimicos});
                            self.vistaPreliminarFormula({in: 'auxEsp'});
                            
                            self.$tAuxiliares.find('.loader').remove();
                            break;
                        }
                    }
                } else if (tabla === 'proPost') {
                    self.$tProPosteriores.find('tbody').remove();
                    self.$tProPosteriores.append('<tbody></tbody>');
                    self.$tProPosteriores.find('tbody').append(self.$loader);
                    var tempTrProPos = self.$tempTrProPos;
                    
                    for (var i = 0; i < self.oProPosterior.length; i++) {
                        if (maestro === self.oProPosterior[i].nomProcPost) {
                            
                            self.formula.idProPost = self.oProPosterior[i].idNomProcPost;
                            
                            var trProPos = tempTrProPos
                                    .replace(':NombreProPos:', self.oProPosterior[i].nomProcPost)
                                    .replace(':Fibra:', self.oProPosterior[i].idFibra.nomFibra);
                            
                            self.$tProPosteriores.find('tbody').append(trProPos);
                            
                            var quimicos = self.oProPosterior[i].procesosPosterioresCollection;
                            
                            for (var j = 0; j < quimicos.length; j++) {
                                for (var k = 0; k < self.oQuimicos.length; k ++) {
                                    if (quimicos[j].codQuimico === self.oQuimicos[k].codProduct) {
                                        var tempTrQuim = self.$tempTrQuim;
                                
                                        var trQuim = tempTrQuim
                                                        .replace(':CodQuim:', quimicos[j].codQuimico)
                                                        .replace(':NombreQuim:', self.oQuimicos[k].nomProducto)
                                                        .replace(':CantGrs:', quimicos[j].cantGr)
                                                        .replace(':Cant%:', quimicos[j].cantPtj);

                                        self.$tProPosteriores.find('tbody').append(trQuim);
                                        break;
                                    }
                                }   
                            }
                            
                            self.vistaPreliminarFormula({in: 'propos', quimicos: quimicos});
                            
                            self.$tProPosteriores.find('.loader').remove();
                            break;
                        }
                    }
                }
            },
            
            editarFormula: function() {
                var self = this;
                
                self.$dataTableFormulas.on('click', '#btnView', function(){
                    self.limpiarTodo();
                    self.proceso = 'editar';
                    self.auxEsporFormula = [];
                    self.cantQuimicos = 0;
                    self.aux = [];
                    var fila = $(this).closest('tr');
                    var idFormula =  parseInt(fila[0].cells[0].textContent);
                    self.formula.idFormula = idFormula;

                    var formula = {};
                    
                    for (var i = 0; i < self.oFormulas.length; i++){
                        if (idFormula === self.oFormulas[i].idFormula) {
                            formula = self.oFormulas[i];
                            break;
                        }
                    }
                    
                    if (!$.isEmptyObject(formula)) {
                        self.$nomFormula.val(formula.nombreForm);
                        self.$codFormula.val(formula.codFibra + formula.codColor + formula.codTono + formula.consecutivo);
                        self.$observ.val(formula.observ);
                        
                        self.formula.codTono = formula.codTono;
                        self.formula.idColor = formula.idColor;
                        self.formula.idFibra = formula.idFibra;
                                                
                        for (var i = 0; i < self.oFibras.length; i++) {
                            if (formula.idFibra === self.oFibras[i].idFibra) {
                                self.$cbxFibra.val(self.oFibras[i].nomFibra);
                                self.cargarDataTablesByFibra(self.oFibras[i].nomFibra);
                                break;
                            }
                        }
                        
                        if (formula.compos !== '') {
                            self.$cbxCompos.val(formula.compos);
                        }
                        
                        for (var i = 0; i < self.oColores.length; i++) {
                            if (formula.idColor === self.oColores[i].idNomColor) {
                                self.$cbxColor.val(self.oColores[i].nomColor);
                                break;
                            }
                        }
                        
                        var fechaCreacion = new Date(formula.fechaCreacion);

                        if (fechaCreacion.toLocaleDateString() > '1/4/2016') {
                            var n = formula.nombreForm.split(' ');
                            var f = self.$cbxFibra.val().split(' ');
                            var c = self.$cbxColor.val().split(' ');
                            if (n.length >= 4) {
                                var nom = '';
                                for (var i = (f.length + c.length); i < (n.length - 1); i++) {
                                    nom = nom + n[i] + ' ';
                                }
                                
                                self.$desColor.val(nom.trim());
                            }
                            
                            self.$codPantone.val((formula.pantone !== 'no Pantone') ? formula.pantone : '');
                            self.$phFormula.val((formula.phFormula !== 'no PH') ? formula.phFormula : '');
                        }
                        
                        for (var i = 0; i < self.oTonos.length; i++) {
                            if (formula.codTono === self.oTonos[i].codTono) {
                                self.$cbxTono.val(self.oTonos[i].nomTono);
                                break;
                            }
                        }
                        
                        self.$colorpicker.val(formula.color);
                        self.$colorpicker.css({color: 'rgb(' + formula.color + ')', backgroundColor: 'rgb(' + formula.color + ')'});
                        
                        for (var i = 0; i < self.oProcesos.length; i++) {
                            if (formula.proceso === self.oProcesos[i].idProceso) {
                                self.renderTablas('proceso', {nombre: self.oProcesos[i].nomProceso, tiempo: self.oProcesos[i].tiempoEst});
                            }
                        }
                        
                        var quimicos = formula.labFormulaDetalleCollection;
                        var prep = [];
                        var ppos = [];
                        
                        self.$tPreparaciones.find('tbody').remove();
                        self.$tPreparaciones.append('<tbody></tbody>');
                        self.$tPreparaciones.find('tbody').append(self.$loader);
                        var tempTrPrep = self.$tempTrPrep;
                        
                        self.$tAuxiliares.find('tbody').remove();
                        self.$tAuxiliares.append('<tbody></tbody>');
                        self.$tAuxiliares.find('tbody').append(self.$loader);
                        var tempTrAux = self.$tempTrAux;
                        
                        self.$tProPosteriores.find('tbody').remove();
                        self.$tProPosteriores.append('<tbody></tbody>');
                        self.$tProPosteriores.find('tbody').append(self.$loader);
                        var tempTrProPos = self.$tempTrProPos;
                        
                        if (formula.idPreparacion !== 0) {
                            for (var i = 0; i < self.oPreparaciones.length; i++) {                            
                                if (formula.idPreparacion === self.oPreparaciones[i].idNomPreparacion) {
                                    var trPrep = tempTrPrep
                                                    .replace(':NombrePreparacion:', self.oPreparaciones[i].nomPreparacion)
                                                    .replace(':Fibra:', self.$cbxFibra.val());
                                    
                                    self.formula.idPreparacion = self.oPreparaciones[i].idNomPreparacion;
                                    break;
                                }
                            }    
                        } else {
                            var trPrep = tempTrPrep
                                            .replace(':NombrePreparacion:', 'SIN MAESTRO ASIGNADO')
                                            .replace(':Fibra:', self.$cbxFibra.val());
                            self.formula.idPreparacion = 0;
                        }
                        
                        self.$tPreparaciones.find('tbody').append(trPrep);
                        
                        if (formula.idAuxiliar !== 0) {
                            for (var i = 0; i < self.oAuxiliares.length; i++) {
                                if (formula.idAuxiliar === self.oAuxiliares[i].idNomAuxiliar) {
                                    var trAux = tempTrAux
                                                .replace(':NombreAuxiliar:', self.oAuxiliares[i].nomAuxiliar)
                                                .replace(':Fibra:', self.$cbxFibra.val());
                                    
                                    self.formula.idAuxiliar = self.oAuxiliares[i].idNomAuxiliar;
                                    break;
                                }
                            }
                        } else {
                            var trAux = tempTrAux
                                        .replace(':NombreAuxiliar:', 'SIN MAESTRO ASIGNADO')
                                        .replace(':Fibra:', self.$cbxFibra.val());
                            
                            self.formula.idAuxiliar = 0;
                        }
                            
                        self.$tAuxiliares.find('tbody').append(trAux);
                        
                        if (formula.idProcPost !== 0) {
                            for (var i = 0; i < self.oProPosterior.length; i++) {
                                if (formula.idProcPost === self.oProPosterior[i].idNomProcPost) {
                                    var trPpos = tempTrProPos
                                                .replace(':NombreProPos:', self.oProPosterior[i].nomProcPost)
                                                .replace(':Fibra:', self.$cbxFibra.val());
                                        
                                    self.formula.idProPost = self.oProPosterior[i].idNomProcPost;
                                    break;
                                }
                            }
                        } else {
                            var trPpos = tempTrProPos
                                        .replace(':NombreProPos:', 'SIN MAESTRO ASIGNADO')
                                        .replace(':Fibra:', self.$cbxFibra.val());
                            
                            self.formula.idProPost = 0;
                        }
                            
                        self.$tProPosteriores.find('tbody').append(trPpos);
                        
                        for (var i = 0; i < quimicos.length; i++) {
                            if (quimicos[i].seccion === 1) {
                                for (var j = 0; j < self.oQuimicos.length; j ++) {
                                    if (quimicos[i].codProducto === self.oQuimicos[j].codProduct) {
                                            var tempTrQuim = self.$tempTrQuim;
                                            
                                            var q = {
                                                codQuimico: quimicos[i].codProducto,
                                                nomProducto: self.oQuimicos[j].nomProducto,
                                                cantGr: quimicos[i].cantGrs,
                                                cantPtj: quimicos[i].cantPtje
                                            };
                                            
                                            prep.push(q);
                                            
                                            var trQuim = tempTrQuim
                                                            .replace(':CodQuim:', quimicos[i].codProducto)
                                                            .replace(':NombreQuim:', self.oQuimicos[j].nomProducto)
                                                            .replace(':CantGrs:', quimicos[i].cantGrs)
                                                            .replace(':Cant%:', quimicos[i].cantPtje);

                                            self.$tPreparaciones.find('tbody').append(trQuim);
                                            break;
                                    }
                                }
                                self.vistaPreliminarFormula({in: 'preparacion', quimicos: prep});
                                
                            } else if (quimicos[i].seccion === 3) {
                                for (var j = 0; j < self.oColorantes.length; j ++) {
                                    if (quimicos[i].codProducto === self.oColorantes[j].codProduct) {
                                        if (self.cantQuimicos > 0) {
                                            var d = um.noRepetirQuimicos({
                                                tipo: '+',
                                                codQ: quimicos[i].codProducto,
                                                cant1: 0,
                                                cant2: 0,
                                                maestro: 'formula',
                                                codQpermitido: ''},
                                            self.colorPorFormula);

                                            if (!d.existe) {

                                                self.colorPorFormula.push({codQ: quimicos[i].codProducto, cant1: 0, cant2: parseFloat(quimicos[i].cantPtje)});

                                                if (self.colorPorFormula.length > 0 && self.$tAuxiliares.find('tbody tr').length > 0) {
                                                    u.habilitarDeshabilitarCampos([
                                                        self.$codAuxEsp,
                                                        self.$nomAuxEsp,
                                                        self.$cantAuxEsp,
                                                        self.$btnAddAuxEsp
                                                    ], 'hab');
                                                } else {
                                                    self.$tAuxEsp.find('tr:gt(1)').remove();
                                                    u.habilitarDeshabilitarCampos([
                                                        self.$codAuxEsp,
                                                        self.$nomAuxEsp,
                                                        self.$cantAuxEsp,
                                                        self.$btnAddAuxEsp
                                                    ], 'des');
                                                }

                                                um.agregarLinea(
                                                        self.$tColorantes.find('tbody'),
                                                        {tipo: self.tipoEdicionColor,
                                                            codQuim: quimicos[i].codProducto,
                                                            nomQuim: self.oColorantes[j].nomProducto,
                                                            cantPctj: quimicos[i].cantPtje});

                                                self.vistaPreliminarFormula({in: 'colorante'});

                                                self.cantQuimicos--;

                                            } else {
                                                self.mensajeObligatoriedad({
                                                    t: 'modal',
                                                    titulo: 'Registro de Colorantes',
                                                    cuerpoMensaje: 'No puede agregar más de una vez un mismo color.'});
                                            }
                                        }
                                    }
                                }
                            } else if (quimicos[i].seccion === 2) {
                                for (var j = 0; j < self.oQuimicos.length; j ++) {
                                    if (quimicos[i].codProducto === self.oQuimicos[j].codProduct && !self.oQuimicos[j].auxEsp) {
                                        var tempTrQuim = self.$tempTrQuim;
                                        
                                        var q = {
                                            codQuimico: quimicos[i].codProducto,
                                            nomProducto: self.oQuimicos[j].nomProducto,
                                            cantGr: quimicos[i].cantGrs,
                                            cantPtj: quimicos[i].cantPtje
                                        };

                                        self.aux.push(q);
                                        
                                        var trQuim = tempTrQuim
                                                        .replace(':CodQuim:', quimicos[i].codProducto)
                                                        .replace(':NombreQuim:', self.oQuimicos[j].nomProducto)
                                                        .replace(':CantGrs:', quimicos[i].cantGrs)
                                                        .replace(':Cant%:', quimicos[i].cantPtje);

                                        self.$tAuxiliares.find('tbody').append(trQuim);
                                        break;
                                    } else if (quimicos[i].codProducto === self.oQuimicos[j].codProduct && self.oQuimicos[j].auxEsp) {
                                        
                                        self.auxEsporFormula.push({codQuimico: quimicos[i].codProducto, nomQuimico: self.oQuimicos[j].nomProducto, cantGr: quimicos[i].cantGrs});
                                        
                                        um.agregarLinea(self.$tAuxEsp.find('tbody'), {
                                            tipo: self.tipoEdicionAuxEsp,
                                            codQuim: quimicos[i].codProducto,
                                            nomQuim: self.oQuimicos[j].nomProducto,
                                            cantGrLt: quimicos[i].cantGrs
                                        });
                                    }
                                }
                                
                                self.vistaPreliminarFormula({in: 'auxiliar', quimicos: self.aux});
                            } else if (quimicos[i].seccion === 4) {
                                for (var j = 0; j < self.oQuimicos.length; j++) {
                                    if (quimicos[i].codProducto === self.oQuimicos[j].codProduct) {
                                        var tempTrQuim = self.$tempTrQuim;

                                        var q = {
                                            codQuimico: quimicos[i].codProducto,
                                            nomProducto: self.oQuimicos[j].nomProducto,
                                            cantGr: quimicos[i].cantGrs,
                                            cantPtj: quimicos[i].cantPtje
                                        };

                                        ppos.push(q);

                                        var trQuim = tempTrQuim
                                                .replace(':CodQuim:', quimicos[i].codProducto)
                                                .replace(':NombreQuim:', self.oQuimicos[j].nomProducto)
                                                .replace(':CantGrs:', quimicos[i].cantGrs)
                                                .replace(':Cant%:', quimicos[i].cantPtje);

                                        self.$tProPosteriores.find('tbody').append(trQuim);
                                        break;
                                    }
                                }
                                self.vistaPreliminarFormula({in: 'propos', quimicos: ppos});
                            }
                        }
                        self.vistaPreliminarFormula({in: 'auxEsp'});
                        self.$tPreparaciones.find('.loader').remove();
                        self.$tAuxiliares.find('.loader').remove();
                        self.$tProPosteriores.find('.loader').remove();
                        
                        u.camposObligatorios([
                            self.$cbxFibra,
                            self.$cbxCompos,
                            self.$cbxColor,
                            self.$desColor,
                            self.$cbxTono,
                            self.$codPantone,
                            self.$phFormula,
                            self.$colorpicker
                        ], '3');
                        
                        u.habilitarDeshabilitarCampos([
                            self.$cbxFibra,
                            self.$cbxCompos,
                            self.$cbxColor,
                            self.$cbxTono,
                            self.$colorpicker
                        ], 'des');
                    }
                    
                    /*
                    codColor:"4"
                    codFibra:"011"
                    codTono:"2"
                    color:"64, 0, 64"
                    compos:""
                    consecutivo:"320"
                    costoFormula:955
                    estado:false
                    fechaCreacion:1341464400000
                    fechaModificacion:1341464400000
                    fechaUso:1341464400000
                    idAuxiliar: 1
                    idColor:7
                    idFibra:1
                    idFormula:3919
                    idPreparacion:1
                    idProcPost:1
                    labFormulaDetalleCollection: Array[10]
                            0:Object
                                cantGrs:1
                                cantPtje:0
                                codProducto:"3350"
                                idFrmDetalle:43494
                                seccion:2
                    nombreForm:"ALG LYCRA MORADO OSCURO"
                    observ:"preblanq"
                    pantone:"no Pantone"
                    phFormula:"no PH"
                    proceso:37
                    */
                        
                    /*
                    oFibras: [],
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
                    oFormulas: [],
                    cantQuimicos: 0,
                    cQuimicos: 0,
                    colorPorFormula: [],
                    auxEsporFormula: [],
                    tipoEdicionColor: 'nuevoColor',
                    tipoEdicionAuxEsp: 'nuevoAuxEsp',
                    $barraProgreso: $('#barraProgreso'),
                    $nomFormula: $('#nomFormula'),
                    $codFormula: $('#codFormula'),
                    $cbxFibra: $('#cbxFibra'),
                    $cbxCompos: $('#cbxCompos'),
                    $cbxColor: $('#cbxColor'),
                    $desColor: $('#desColor'),
                    $cbxTono: $('#cbxTono'),
                    $codPantone: $('#codPantone'),
                    $phFormula: $('#phFormula'),
                    $colorpicker: $('#colorpicker'),
                    $colorSelector: $('#colorSelector'),
                    $tProcesos: $('#tProcesos'),
                    $btnLimpiarEncab: $('#btnLimpiarEncab'),
                    $daTableProcesos: $('#daTableProcesos'),
                    $tPreparaciones: $('#tPreparaciones'),
                    $daTablePreparaciones: $('#daTablePreparaciones'),
                    $tAuxiliares: $('#tAuxiliares'),
                    $daTableAuxiliares: $('#daTableAuxiliares'),
                    $tColorantes: $('#tColorantes'),
                    $codColor: $('#codColor'),
                    $dlCodColor: $('#dlCodColor'),
                    $nomColor: $('#nomColor'),
                    $dlNomColor: $('#dlNomColor'),
                    $cantColor: $('#cantColor'),
                    $btnAddColor: $('#btnAddColor'),
                    $tAuxEsp: $('#tAuxEsp'),
                    $codAuxEsp: $('#codAuxEsp'),
                    $dlCodAuxEsp: $('#dlCodAuxEsp'),
                    $nomAuxEsp: $('#nomAuxEsp'),
                    $dlNomAuxEsp: $('#dlNomAuxEsp'),
                    $cantAuxEsp: $('#cantAuxEsp'),
                    $btnAddAuxEsp: $('#btnAddAuxEsp'), 
                    $tProPosteriores: $('#tProPosteriores'),
                    $daTableProPosteriores: $('#daTableProPosteriores'),
                    $observ: $('#observ'),
                    $tFormula: $('#tFormula').find('tbody'),
                    */                  
                });
            },
            
            nombreFormula: function() {
                var self = this;
                
                if (self.proceso === 'nuevo') {                
                    var fibra = self.$cbxFibra.val();
                    var color = self.$cbxColor.val();
                    var desColor = self.$desColor.val().toUpperCase();
                    var tono = self.$cbxTono.val();

                    if (fibra === 'Seleccione una...') {
                        fibra = '';
                    }

                    if (color === 'Seleccione una...') {
                        color = '';
                    }

                    if (tono === 'Seleccione una...') {
                        tono = '';
                    }

                    var nombre = fibra + ' ' + color + ' ' + desColor + ' ' + tono;

                    self.$nomFormula.val(nombre.trim());
                }
            },
            
            codigoFormula: function() {
                var self = this;
                
                if (self.proceso === 'nuevo') {
                    var fibra = self.$cbxFibra.val();
                    var color = self.$cbxColor.val();
                    var tono = self.$cbxTono.val();
                    var codFibra = '';
                    var codColor = '';
                    var codTono = '';
                    self.formula.idFibra = '';
                    self.formula.idColor = '';
                    self.formula.codTono = '';
                        
                    if (fibra !== 'Seleccione una...') {
                        for (var i = 0; i < self.oFibras.length; i++) {
                            if (fibra === self.oFibras[i].nomFibra) {
                                codFibra = self.oFibras[i].codFibra;
                                self.formula.idFibra = self.oFibras[i].idFibra;
                                break;
                            }
                        }
                    }

                    if (color !== 'Seleccione una...') {
                        for (var i = 0; i < self.oColores.length; i++) {
                            if (color === self.oColores[i].nomColor) {
                                codColor = self.oColores[i].codColor;
                                self.formula.idColor = self.oColores[i].idNomColor;
                                break;
                            }
                        }
                    }

                    if (tono !== 'Seleccione una...') {
                        for (var i = 0; i < self.oTonos.length; i++) {
                            if (tono === self.oTonos[i].nomTono) {
                                codTono= self.oTonos[i].codTono;
                                self.formula.codTono = codTono;
                                break;
                            }
                        }
                    }

                    var codigo = codFibra + codColor + codTono;

                    self.$codFormula.val(codigo.trim());
                    
                    if (self.formula.idFibra !== '' && self.formula.idColor !== '' && self.formula.codTono !== '' && self.proceso === 'nuevo') {
                        $.getJSON('../../../ServletFormulas', {
                            accion: 'consecutivo',
                            idFibra: self.formula.idFibra,
                            idColor: self.formula.idColor,
                            codTono: self.formula.codTono,
                            compos: self.formula.compos
                        }, function(response) {
                            self.formula.consec = response;
                            codigo = codFibra + codColor + codTono;
                            self.$codFormula.val(codigo.trim() + response);
                            self.vistaPreliminarFormula({in: ''});
                        });
                    }
                }
            },
            
            vistaPreliminarFormula: function(oD) {
                var self = this;
                
                var cod = self.$codFormula.val();
                var fibra = '';
                var compos = '';
                var color = self.$desColor.val().toUpperCase();
                var tono = '';
                var proceso = '';
                var tiempo = '';
                var curva = '';
                var ph = self.$phFormula.val().toUpperCase();
                var pantone = self.$codPantone.val().toUpperCase();
                
                var codQuimPre = '';
                var nomQuimPre = '';
                var cantPre = '';
                        
                var codQuimAux = '';
                var nomQuimAux = '';
                var cantAux = '';

                var codQuimCol = '';
                var nomQuimCol = '';
                var cantCol = '';

                var codQuimPro = '';
                var nomQuimPro = '';
                var cantPro = '';

                var observ = '<strong>OBSERVACIONES: </strong>' + self.$observ.val();
                
                if (self.$cbxFibra.val() !== 'Seleccione una...') {
                    fibra = self.$cbxFibra.val();
                }
                
                if (self.$cbxCompos.val() !== 'Seleccione una...') {
                    compos = self.$cbxCompos.val();
                }
                
                if (self.$cbxColor.val() !== 'Seleccione una...') {
                    color = self.$cbxColor.val() + ' ' + color;
                }
                
                if (self.$cbxTono.val() !== 'Seleccione una...') {
                    tono = self.$cbxTono.val();
                }
                
                self.formula.compos = compos;
                
                $('#tCodFormula').text(cod);
                $('#tNomFibra').text(fibra);
                $('#tCompos').text(compos);
                $('#tColor').text(color.trim());
                $('#tTono').text(tono);
                
                $('#tPh').text(ph.trim());
                $('#tPantone').text(pantone.trim());
                
                $('#tObserv').html(observ.trim());
                
                if (oD.in === 'proceso') {
                    proceso = oD.proceso;
                    tiempo = oD.tiempo.toFixed(2) + ' Hora(s)';
                    curva = oD.curva;
                    
                    $('#tProceso').text(proceso);
                    $('#tTiempo').text(tiempo);
                    $('#tCurva').text(curva);
                }
                
                if (oD.in === 'preparacion') {
                    for (var i = 0; i < oD.quimicos.length; i++) {
                        for (var k = 0; k < self.oQuimicos.length; k++) {
                            if (self.oQuimicos[k].codProduct === oD.quimicos[i].codQuimico) {
                                if (codQuimPre === '') {
                                    codQuimPre = oD.quimicos[i].codQuimico + ' <br>';
                                    nomQuimPre = self.oQuimicos[k].nomProducto + ' <br>';
                                    
                                    if (oD.quimicos[i].cantGr !== 0) {
                                        cantPre = oD.quimicos[i].cantGr + ' g <br>';
                                    } else {
                                        cantPre = oD.quimicos[i].cantPtj + ' p <br>';
                                    }
                                } else {
                                    codQuimPre = codQuimPre + oD.quimicos[i].codQuimico + ' <br>';
                                    nomQuimPre = nomQuimPre + self.oQuimicos[k].nomProducto + ' <br>';
                                    
                                    if (oD.quimicos[i].cantGr !== 0) {
                                        cantPre = cantPre + oD.quimicos[i].cantGr + ' g <br>';
                                    } else {
                                        cantPre = cantPre + oD.quimicos[i].cantPtj + ' p <br>';
                                    }
                                }
                                break;
                            }
                        }
                    }
                    
                    $('#tCodQuimPre').html(codQuimPre);
                    $('#tNomQuimPre').html(nomQuimPre);
                    $('#tCantPre').html(cantPre);
                }
                
                if (oD.in === 'auxiliar') {
                    for (var i = 0; i < oD.quimicos.length; i++) {
                        for (var k = 0; k < self.oQuimicos.length; k++) {
                            if (self.oQuimicos[k].codProduct === oD.quimicos[i].codQuimico) {
                                if (codQuimAux === '') {
                                    codQuimAux = oD.quimicos[i].codQuimico + ' <br>';
                                    nomQuimAux = self.oQuimicos[k].nomProducto + ' <br>';
                                    
                                    if (oD.quimicos[i].cantGr !== 0) {
                                        cantAux = oD.quimicos[i].cantGr + ' g <br>';
                                    } else {
                                        cantAux = oD.quimicos[i].cantPtj + ' p <br>';
                                    }
                                } else {
                                    codQuimAux = codQuimAux + oD.quimicos[i].codQuimico + ' <br>';
                                    nomQuimAux = nomQuimAux + self.oQuimicos[k].nomProducto + ' <br>';
                                    
                                    if (oD.quimicos[i].cantGr !== 0) {
                                        cantAux = cantAux + oD.quimicos[i].cantGr + ' g <br>';
                                    } else {
                                        cantAux = cantAux + oD.quimicos[i].cantPtj + ' p <br>';
                                    }
                                }
                                break;
                            }
                        }
                    }
                    
                    $('#tCodQuimAux').html(codQuimAux);
                    $('#tNomQuimAux').html(nomQuimAux);
                    $('#tCantAux').html(cantAux);
                }
                
                if (oD.in === 'auxEsp') {
                    if (self.proceso === 'nuevo') {
                        var nomAux = $('#tNomAux').text();
                    
                        for (var i = 0; i < self.oAuxiliares.length; i++) {
                            if (nomAux === self.oAuxiliares[i].nomAuxiliar) {
                                var quimicos = self.oAuxiliares[i].auxiliarCollection;

                                for (var i = 0; i < quimicos.length; i++) {
                                    for (var k = 0; k < self.oQuimicos.length; k++) {
                                        if (self.oQuimicos[k].codProduct === quimicos[i].codQuimico) {
                                            if (codQuimAux === '') {
                                                codQuimAux = quimicos[i].codQuimico + ' <br>';
                                                nomQuimAux = self.oQuimicos[k].nomProducto + ' <br>';

                                                if (quimicos[i].cantGr !== 0) {
                                                    cantAux = quimicos[i].cantGr + ' g <br>';
                                                } else {
                                                    cantAux = quimicos[i].cantPtj + ' p <br>';
                                                }
                                            } else {
                                                codQuimAux = codQuimAux + quimicos[i].codQuimico + ' <br>';
                                                nomQuimAux = nomQuimAux + self.oQuimicos[k].nomProducto + ' <br>';

                                                if (quimicos[i].cantGr !== 0) {
                                                    cantAux = cantAux + quimicos[i].cantGr + ' g <br>';
                                                } else {
                                                    cantAux = cantAux + quimicos[i].cantPtj + ' p <br>';
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                                break;
                            }
                        }
                    } else {
                        for (var i = 0; i < self.aux.length; i++) {
                            for (var k = 0; k < self.oQuimicos.length; k++) {
                                if (self.oQuimicos[k].codProduct === self.aux[i].codQuimico) {
                                    if (codQuimAux === '') {
                                        codQuimAux = self.aux[i].codQuimico + ' <br>';
                                        nomQuimAux = self.oQuimicos[k].nomProducto + ' <br>';

                                        if (self.aux[i].cantGr !== 0) {
                                            cantAux = self.aux[i].cantGr + ' g <br>';
                                        } else {
                                            cantAux = self.aux[i].cantPtj + ' p <br>';
                                        }
                                    } else {
                                        codQuimAux = codQuimAux + self.aux[i].codQuimico + ' <br>';
                                        nomQuimAux = nomQuimAux + self.oQuimicos[k].nomProducto + ' <br>';

                                        if (self.aux[i].cantGr !== 0) {
                                            cantAux = cantAux + self.aux[i].cantGr + ' g <br>';
                                        } else {
                                            cantAux = cantAux + self.aux[i].cantPtj + ' p <br>';
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    
                    
                    for (var i = 0; i < self.auxEsporFormula.length; i++) {
                        
                        codQuimAux = codQuimAux + self.auxEsporFormula[i].codQuimico + ' <br>';
                        nomQuimAux = nomQuimAux + self.auxEsporFormula[i].nomQuimico + ' <br>';
                        cantAux = cantAux + self.auxEsporFormula[i].cantGr + ' g <br>';
                    }
                    
                    $('#tCodQuimAux').html(codQuimAux.trim());
                    $('#tNomQuimAux').html(nomQuimAux.trim());
                    $('#tCantAux').html(cantAux.trim());
                }
                
                if (oD.in === 'colorante') {
                    for (var i = 0; i < self.colorPorFormula.length; i++) {
                        for (var j = 0; j < self.oColorantes.length; j++) {
                            if (self.oColorantes[j].codProduct === self.colorPorFormula[i].codQ) {
                                
                                if (codQuimCol === '') {
                                    codQuimCol = self.oColorantes[j].codProduct + ' <br>';
                                    nomQuimCol = self.oColorantes[j].nomProducto + ' <br>';
                                    cantCol = self.colorPorFormula[i].cant2 + ' p <br>';
                                    
                                } else {
                                    codQuimCol = codQuimCol + self.oColorantes[j].codProduct + ' <br>';
                                    nomQuimCol = nomQuimCol + self.oColorantes[j].nomProducto + ' <br>';
                                    cantCol = cantCol + self.colorPorFormula[i].cant2 + ' p <br>';
                                }
                                break;
                            }
                        }
                    }
                    
                    $('#tCodQuimCol').html(codQuimCol);
                    $('#tNomQuimCol').html(nomQuimCol);
                    $('#tCantCol').html(cantCol);
                }
                
                if (oD.in === 'propos') {
                    for (var i = 0; i < oD.quimicos.length; i++) {
                        for (var k = 0; k < self.oQuimicos.length; k++) {
                            if (self.oQuimicos[k].codProduct === oD.quimicos[i].codQuimico) {
                                if (codQuimPro === '') {
                                    codQuimPro = oD.quimicos[i].codQuimico + ' <br>';
                                    nomQuimPro = self.oQuimicos[k].nomProducto + ' <br>';
                                    
                                    if (oD.quimicos[i].cantGr !== 0) {
                                        cantPro = oD.quimicos[i].cantGr + ' g <br>';
                                    } else {
                                        cantPro = oD.quimicos[i].cantPtj + ' p <br>';
                                    }
                                } else {
                                    codQuimPro = codQuimPro + oD.quimicos[i].codQuimico + ' <br>';
                                    nomQuimPro = nomQuimPro + self.oQuimicos[k].nomProducto + ' <br>';
                                    
                                    if (oD.quimicos[i].cantGr !== 0) {
                                        cantPro = cantPro + oD.quimicos[i].cantGr + ' g <br>';
                                    } else {
                                        cantPro = cantPro + oD.quimicos[i].cantPtj + ' p <br>';
                                    }
                                }
                                break;
                            }
                        }
                    }
                    
                    $('#tCodQuimPro').html(codQuimPro);
                    $('#tNomQuimPro').html(nomQuimPro);
                    $('#tCantPro').html(cantPro);
                }                
            },
            
            guardarFormula: function() {
                var self = this;
                
                
                self.$btnSaveForm.on('click', function(e) {
                    e.preventDefault();
                    var resp;
                    var resp2 = true;

                    resp = u.camposObligatorios([
                                self.$cbxFibra,
                                self.$cbxCompos,
                                self.$cbxColor,
                                self.$cbxTono,
                                self.$codPantone,
                                self.$phFormula,
                                self.$colorpicker
                            ], '2');
                            
                    if ($('#tNomFibra').text() === '') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado una fibra.'
                        });
                    } 
                    
                    if ($('#tColor').text() === '') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado un color.'
                        });
                    } 
                    
                    if ($('#tTono').text() === '') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado un tono.'
                        });
                    } 
                    
                    if ($('#tProceso').text() === '') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado un proceso.'
                        });
                    } 
                    
                    if ($('#tPh').text() === '') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha indicado el ph para la formula.'
                        });
                    } 
                    
                    if ($('#tPantone').text() === '') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha indicado el código pantone para la formula.'
                        });
                    } 
                    
                    if ($('#tNomPrep').text() === '' || $('#tNomPrep').text() === 'SIN MAESTRO ASIGNADO') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado una preparación.'
                        });
                    } 
                    
                    if ($('#tNomAux').text() === '' || $('#tNomAux').text() === 'SIN MAESTRO ASIGNADO') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado un auxiliar.'
                        });
                    }
                    
                    if (self.$tAuxEsp.find('tbody tr').length < 2) {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado un auxiliar especial.'
                        });
                    }
                    
                    if ($('#tCodQuimCol').text() === '') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado un colorante.'
                        });
                    }
                    
                    if ($('#tNomProPos').text() === '' || $('#tNomProPos').text() === 'SIN MAESTRO ASIGNADO') {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            t: 'gritter',
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'No ha seleccionado un proceso posterior.'
                        });
                    }

                    if (resp && resp2) {
                        if (self.proceso === 'nuevo') {
                            
                            self.formula.nomFormula = self.$nomFormula.val().toUpperCase();
                            self.formula.desColor = self.$desColor.val().toUpperCase();
                            self.formula.codPantone = self.$codPantone.val().toUpperCase();
                            self.formula.phFormula = self.$phFormula.val();
                            self.formula.color = self.$colorpicker.val();
                            self.formula.codColorante = '';
                            self.formula.cantColorante = '';
                            self.formula.codAuxEsp = '';
                            self.formula.cantCodAuxEsp = '';
                            
                            for (var i = 0; i < self.colorPorFormula.length; i++) {
                                self.formula.codColorante = self.formula.codColorante + self.colorPorFormula[i].codQ + ' ';
                                self.formula.cantColorante = self.formula.cantColorante + self.colorPorFormula[i].cant2 + ' ';
                            }
                            
                            for(var i = 0; i < self.auxEsporFormula.length; i++) {
                                self.formula.codAuxEsp = self.formula.codAuxEsp + self.auxEsporFormula[i].codQuimico + ' ';
                                self.formula.cantCodAuxEsp = self.formula.cantCodAuxEsp + self.auxEsporFormula[i].cantGr + ' ';
                            }
                            
                            self.formula.observ = self.$observ.val();
                            
                            consultas.guardarFormula(self.formula);
                            self.limpiarTodo();
                            
                        } else if (self.proceso === 'editar') {
                            var nombre = self.$cbxFibra.val() + ' ' + self.$cbxColor.val() + ' ' + self.$desColor.val().toUpperCase() + ' ' + self.$cbxTono.val();
                            self.formula.nomFormula = nombre.trim();
                            self.formula.desColor = self.$desColor.val().toUpperCase();
                            self.formula.codPantone = self.$codPantone.val().toUpperCase();
                            self.formula.phFormula = self.$phFormula.val();
                            self.formula.color = self.$colorpicker.val();
                            self.formula.codColorante = '';
                            self.formula.cantColorante = '';
                            self.formula.codAuxEsp = '';
                            self.formula.cantCodAuxEsp = '';
                            
                            for (var i = 0; i < self.colorPorFormula.length; i++) {
                                self.formula.codColorante = self.formula.codColorante + self.colorPorFormula[i].codQ + ' ';
                                self.formula.cantColorante = self.formula.cantColorante + self.colorPorFormula[i].cant2 + ' ';
                            }
                            
                            for(var i = 0; i < self.auxEsporFormula.length; i++) {
                                self.formula.codAuxEsp = self.formula.codAuxEsp + self.auxEsporFormula[i].codQuimico + ' ';
                                self.formula.cantCodAuxEsp = self.formula.cantCodAuxEsp + self.auxEsporFormula[i].cantGr + ' ';
                            }
                            
                            self.formula.observ = self.$observ.val();
                            
                            consultas.editarFormula(self.formula);
                            self.limpiarTodo();
                        }
                    }
                });
            }
        };
    })();

    frmFormula.init();

})(document, window, jQuery)

            /*formula: {
              nomFormula: '',
              idFibra: '',
              compos: '',
              idColor: '',
              desColor: '',
              codTono: '',
              codPantone: '',
              phFormula: '',
              color: '',
              idProceso: '',
              idPreparacion: '',
              idAuxiliar: '',
              idProPost: '',
              codColorante: '',
              cantColorante: '',
              codAuxEsp: '',
              cantCodAuxEsp: '',
              observ: '',
              idFormula: '',
              consec: ''
            }*/