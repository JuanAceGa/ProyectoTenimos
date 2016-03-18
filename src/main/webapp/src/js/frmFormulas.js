(function(document, window, $, undefined) {
    (function() {
        return frmFormula = {
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
            $dataTableFormulas: $('#dataTableFormulas'),
            $loader: '<div class="loader"></div>',
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $btnSaveForm: $('#btnSaveForm'),
            
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
                }
            },
            
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                
                if (opc === 'f') { //Fibras
                    if ($.type(data) !== 'array') {
                        self.oFibras = JSON.parse(data);
                    }
                    
                    um.cargarComboBox([self.$cbxFibra], self.oFibras, 'formula');
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
                    um.renderDataTables(self.$dataTableFormulas, self.oFormulas, {frm: 'formula', tbl: 'formulas'});
                }
                
                if (opc === 'cps') { //Composicion
                    self.oComposicion = data;                    
                    um.cargarComboBox([self.$cbxCompos], self.oComposicion, 'compos');
                }
                
                if (opc === 'clr') { //Colores
                    self.oColores = data;
                    um.cargarComboBox([self.$cbxColor], self.oColores, 'color');
                }
                
                if (opc === 'tn') { //Tonos
                    self.oTonos = data;
                    um.cargarComboBox([self.$cbxTono], self.oTonos, 'tono');
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
                        um.destruirDataTable(self.$daTablePreparaciones, '');
                        um.renderDataTables(self.$daTablePreparaciones, arrTemp, {frm: 'formula', tbl:'preparacion'});
                        
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
                        um.destruirDataTable(self.$daTableAuxiliares, '');
                        um.renderDataTables(self.$daTableAuxiliares, arrTemp, {frm:'formula', tbl:'auxiliar'});
                        
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
                        um.destruirDataTable(self.$daTableProPosteriores, '');
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
                    }
                    u.camposObligatorios([self.$cbxFibra], '4');
                    
                });
                
                self.$cbxCompos.on('focusout, change', function(e) {
                    u.camposObligatorios([self.$cbxCompos], '4');
                    self.vistaPreliminarFormula({in: ''});
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
                
            },
            
            limpiarFormulario: function() {
                var self = this;
                
                self.$btnLimpiarEncab.on('click', function(e) {
                    e.preventDefault();
                    
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
                });                
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

                try {
                    self.$tituloMensaje.text(mensaje.titulo);
                    self.$cuerpoMensaje.text(mensaje.cuerpoMensaje);
                    self.$modalMensaje.modal("show");
                } catch (e) {
                    alert(mensaje.cuerpoMensaje);
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
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
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
                                self.mensajeObligatoriedad({titulo: 'Registro de Colorantes',
                                cuerpoMensaje: 'No puede agregar más de una vez un mismo color.'});
                            }
                        } else {
                            self.mensajeObligatoriedad({titulo: 'Cantidad Colorantes',
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
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro',
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
                    self.$tProcesos.find('tbody').remove();
                    self.$tProcesos.append('<tbody></tbody>');
                    self.$tProcesos.find('tbody').append(self.$loader);
                    var tempTrProceso = '<tr>' +
                                            '<td class="col-sm-1">' +
                                                'Proceso:<br>' +
                                                'Tiempo:' +
                                            '</td>' +
                                            '<td class="left">' +
                                                ':NombreProceso:<br>' +
                                                ':Tiempo: (hrs)' +
                                            '</td>' +
                                        '</tr>';
                    
                    var fila = $(this).closest('tr');
                    var nomProceso = fila[0].cells[0].textContent;
                    var tiempo = (parseInt(fila[0].cells[2].textContent) / 60);
                    
                    var trProc = tempTrProceso
                                    .replace(':NombreProceso:', nomProceso)
                                    .replace(':Tiempo:', tiempo.toFixed(2));
                    
                    self.$tProcesos.find('tbody').append(trProc);
                    
                    for (var i = 0; i < self.oProcesos.length; i++) {
                        if (nomProceso === self.oProcesos[i].nomProceso) {
                            
                            self.vistaPreliminarFormula({in: 'proceso', proceso: self.oProcesos[i].idProceso, tiempo: tiempo, curva: self.oProcesos[i].idCurvas});
                            
                            var curvas = self.oProcesos[i].idCurvas.split('-');
                            var tempTrCurva = '<tr>' +
                                                '<td>Curva:</td>' +
                                                '<td>' +
                                                    ':NombreCurva: <br>' +
                                                    'Tiempo: :TiempoCurva: (hrs)<br>' +
                                                    'Llenado: :LlenadoCurva: <br>' +
                                                    'Rinse: :RinseCurva:' +
                                                '</td>' +
                                              '</tr>';
                            
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
                });
                
                self.$daTablePreparaciones.on('click', '#btnAdd', function (e) {
                    e.preventDefault();
                    
                    self.$tPreparaciones.find('tbody').remove();
                    self.$tPreparaciones.append('<tbody></tbody>');
                    self.$tPreparaciones.find('tbody').append(self.$loader);
                    var tempTrPrep = '<tr>' +
                                        '<td class="center col-sm-2"><strong>Nombre Preparación:</strong></td>' +
                                        '<td class="left col-sm-4">:NombrePreparacion:</td>' +
                                        '<td class=" center col-sm-1"><strong>Fibra:</strong></td>' +
                                        '<td class="left col-sm-1">:Fibra:</td>' +
                                     '</tr>' +
                                     '<tr style="background: #E0E3E5;">' +
                                        '<td class="center"><strong>Código Químico</strong></td>' +
                                        '<td class="center"><strong>Nombre Químico</strong></td>' +
                                        '<td class="center"><strong>Gr/Lt</strong></td>' +
                                        '<td class="center"><strong>%/Kl</strong></td>' +
                                     '</tr>';
                    
                    var fila = $(this).closest('tr');
                    var nomPrep = fila[0].cells[0].textContent;
                    
                    for (var i = 0; i < self.oPreparaciones.length; i++) {
                        if (nomPrep === self.oPreparaciones[i].nomPreparacion) {
                            
                            var trPrep = tempTrPrep
                                    .replace(':NombrePreparacion:', self.oPreparaciones[i].nomPreparacion)
                                    .replace(':Fibra:', self.oPreparaciones[i].idFibra.nomFibra);
                            
                            self.$tPreparaciones.find('tbody').append(trPrep);
                            
                            var quimicos = self.oPreparaciones[i].preparacionCollection;
                            
                            for (var j = 0; j < quimicos.length; j++) {
                                for (var k = 0; k < self.oQuimicos.length; k ++) {                                    
                                    if (quimicos[j].codQuimico === self.oQuimicos[k].codProduct) {
                                        var tempTrQuim = '<tr>' +
                                                            '<td class="center">:CodQuim:</td>' +
                                                            '<td class="center">:NombreQuim:</td>' +
                                                            '<td class="center">:CantGrs:</td>' +
                                                            '<td class="center">:Cant%:</td>' +
                                                         '</tr>';
                                
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
                });
                
                self.$daTableAuxiliares.on('click', '#btnAdd', function (e) {
                    e.preventDefault();
                    
                    self.$tAuxiliares.find('tbody').remove();
                    self.$tAuxiliares.append('<tbody></tbody>');
                    self.$tAuxiliares.find('tbody').append(self.$loader);
                    var tempTrAux = '<tr>' +
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
                                     '</tr>';
                    
                    var fila = $(this).closest('tr');
                    var nomAux = fila[0].cells[0].textContent;
                    
                    for (var i = 0; i < self.oAuxiliares.length; i++) {
                        if (nomAux === self.oAuxiliares[i].nomAuxiliar) {
                            
                            var trAux = tempTrAux
                                    .replace(':NombreAuxiliar:', self.oAuxiliares[i].nomAuxiliar)
                                    .replace(':Fibra:', self.oAuxiliares[i].idFibra.nomFibra);
                            
                            self.$tAuxiliares.find('tbody').append(trAux);
                            
                            var quimicos = self.oAuxiliares[i].auxiliarCollection;
                            
                            for (var j = 0; j < quimicos.length; j++) {
                                for (var k = 0; k < self.oQuimicos.length; k ++) {                                    
                                    if (quimicos[j].codQuimico === self.oQuimicos[k].codProduct) {
                                        var tempTrQuim = '<tr>' +
                                                            '<td class="center">:CodQuim:</td>' +
                                                            '<td class="center">:NombreQuim:</td>' +
                                                            '<td class="center">:CantGrs:</td>' +
                                                            '<td class="center">:Cant%:</td>' +
                                                         '</tr>';
                                
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
                            
                            self.vistaPreliminarFormula({in: 'auxiliar', quimicos: quimicos});
                            
                            self.$tAuxiliares.find('.loader').remove();
                            break;
                        }
                    }
                });
                
                self.$daTableProPosteriores.on('click', '#btnAdd', function (e) {
                    e.preventDefault();
                    
                    self.$tProPosteriores.find('tbody').remove();
                    self.$tProPosteriores.append('<tbody></tbody>');
                    self.$tProPosteriores.find('tbody').append(self.$loader);
                    var tempTrProPos = '<tr>' +
                                        '<td class="center col-sm-2"><strong>Nombre Proceso Posterior:</strong></td>' +
                                        '<td class="left col-sm-4">:NombreProPos:</td>' +
                                        '<td class=" center col-sm-1"><strong>Fibra:</strong></td>' +
                                        '<td class="left col-sm-1">:Fibra:</td>' +
                                     '</tr>' +
                                     '<tr style="background: #E0E3E5;">' +
                                        '<td class="center"><strong>Código Químico</strong></td>' +
                                        '<td class="center"><strong>Nombre Químico</strong></td>' +
                                        '<td class="center"><strong>Gr/Lt</strong></td>' +
                                        '<td class="center"><strong>%/Kl</strong></td>' +
                                     '</tr>';
                    
                    var fila = $(this).closest('tr');
                    var nomProPos = fila[0].cells[0].textContent;
                    
                    for (var i = 0; i < self.oProPosterior.length; i++) {
                        if (nomProPos === self.oProPosterior[i].nomProcPost) {
                            
                            var trProPos = tempTrProPos
                                    .replace(':NombreProPos:', self.oProPosterior[i].nomProcPost)
                                    .replace(':Fibra:', self.oProPosterior[i].idFibra.nomFibra);
                            
                            self.$tProPosteriores.find('tbody').append(trProPos);
                            
                            var quimicos = self.oProPosterior[i].procesosPosterioresCollection;
                            
                            for (var j = 0; j < quimicos.length; j++) {
                                for (var k = 0; k < self.oQuimicos.length; k ++) {
                                    if (quimicos[j].codQuimico === self.oQuimicos[k].codProduct) {
                                        var tempTrQuim = '<tr>' +
                                                            '<td class="center">:CodQuim:</td>' +
                                                            '<td class="center">:NombreQuim:</td>' +
                                                            '<td class="center">:CantGrs:</td>' +
                                                            '<td class="center">:Cant%:</td>' +
                                                         '</tr>';
                                
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
                });

            },
            
            nombreFormula: function() {
                var self = this;
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
            },
            
            codigoFormula: function() {
                var self = this;                
                var fibra = self.$cbxFibra.val();
                var color = self.$cbxColor.val();
                var tono = self.$cbxTono.val();
                var codFibra = '';
                var codColor = '';
                var codTono = '';
                
                if (fibra !== 'Seleccione una...') {
                    for (var i = 0; i < self.oFibras.length; i++) {
                        if (fibra === self.oFibras[i].nomFibra) {
                            codFibra = self.oFibras[i].codFibra;
                        }
                    }
                }
                
                if (color !== 'Seleccione una...') {
                    for (var i = 0; i < self.oColores.length; i++) {
                        if (color === self.oColores[i].nomColor) {
                            codColor = self.oColores[i].codColor;
                        }
                    }
                }
                
                if (tono !== 'Seleccione una...') {
                    for (var i = 0; i < self.oTonos.length; i++) {
                        if (tono === self.oTonos[i].nomTono) {
                            codTono= self.oTonos[i].codTono;
                        }
                    }
                }
                
                var codigo = codFibra + codColor + codTono;
                
                self.$codFormula.val(codigo.trim());
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
                        }
                    }
                    
                    for (var i = 0; i < self.auxEsporFormula.length; i++) {
                        
                        codQuimAux = codQuimAux + self.auxEsporFormula[i].codQuimico + ' <br>';
                        nomQuimAux = nomQuimAux + self.auxEsporFormula[i].nomQuimico + ' <br>';
                        cantAux = cantAux + self.auxEsporFormula[i].cantGr + ' g <br>';
                    }
                    
                    $('#tCodQuimAux').html(codQuimAux);
                    $('#tNomQuimAux').html(nomQuimAux);
                    $('#tCantAux').html(cantAux);
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
                                self.$desColor,
                                self.$cbxTono,
                                self.$codPantone,
                                self.$phFormula,
                                self.$colorpicker
                            ], '2');
                            
                    if ($('#tProceso').text() === '' || $('#tCodQuimPre').text() === '' || $('#tCodQuimAux').text() === '' ||
                        $('#tCodQuimCol').text() === '' || $('#tCodQuimPro').text() === '' || (self.$tAuxEsp.find('tbody tr').length < 2)) {
                        resp2 = false;

                        self.mensajeObligatoriedad({
                            titulo: 'Campos obligatorios',
                            cuerpoMensaje: 'Hay maestros sin agregar, favor verificar.'
                        });
                    }

                    if (resp && resp2) {
                        
                    }
                });
            }
        };
    })();

    frmFormula.init();

})(document, window, jQuery)