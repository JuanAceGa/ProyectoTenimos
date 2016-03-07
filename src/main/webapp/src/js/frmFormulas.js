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
            $tProPosteriores: $('#tProPosteriores'),
            $daTableProPosteriores: $('#daTableProPosteriores'),
            $observ: $('#observ'),
            $tFormula: $('#tFormula').find('tbody'),
            $loader: '<div class="loader"></div>',
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            cantQuimicos: 0,
            cQuimicos: 0,
            colorPorFormula: [],
            tipoEdicion: 'nuevoColor',
            
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
                this.agregarMaestros();
//                this.cerrarModalEdicion();
            },
            
            iniciarComplementos: function() {
                var self = this;
                
                u.habilitarDeshabilitarCampos([self.$cbxCompos, self.$codColor, self.$nomColor, self.$cantColor, self.$btnAddColor], 'des');
                
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
                            self.$colorpicker.val('#' + hex);
                            self.$colorpicker.css({color: '#' + hex, backgroundColor: '#' + hex});
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
                }
                
                if (opc === 'pr') { //Procesos
                    self.oProcesos = data;
                    um.destruirDataTable(self.$daTableProcesos, '');
                    um.renderDataTables(self.$daTableProcesos, self.oProcesos, {frm: 'formula', tbl:'procesos'});
                }
                
                if (opc === 'fla') {
                    
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
                self.$cbxFibra.focusout(function(e) {
                    var fibra = self.$cbxFibra.val();
                    var arrTemp = [];
                    
                    if (fibra !== 'Seleccione una...') {
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
                                    self.$cbxCompos.attr('disabled', true);
                                    u.camposObligatorios([self.$cbxCompos], '4');
                                }
                                
                                self.colorPorFormula = [];
                                self.$tColorantes.find('tr:gt(1)').remove();
                                u.habilitarDeshabilitarCampos([self.$codColor, self.$nomColor, self.$cantColor, self.$btnAddColor], 'hab');
                                
                                break;
                            }
                        }
                        
                        for (var j = 0; j < self.oPreparaciones.length; j++) {
                            if (self.oPreparaciones[j].idFibra.idFibra === idFibra) {
                                arrTemp.push(self.oPreparaciones[j]);
                            }
                        }
                        um.destruirDataTable(self.$daTablePreparaciones, '');
                        um.renderDataTables(self.$daTablePreparaciones, arrTemp, {frm: 'formula', tbl:'preparacion'});
                        
                        arrTemp = [];                        
                        for (var j = 0; j < self.oAuxiliares.length; j++) {
                            if (self.oAuxiliares[j].idFibra.idFibra === idFibra) {
                                arrTemp.push(self.oAuxiliares[j]);
                            }
                        }
                        um.destruirDataTable(self.$daTableAuxiliares, '');
                        um.renderDataTables(self.$daTableAuxiliares, arrTemp, {frm:'formula', tbl:'auxiliar'});
                        
                        arrTemp = [];
                        for (var j = 0; j < self.oProPosterior.length; j++) {
                            if (self.oProPosterior[j].idFibra.idFibra === idFibra) {
                                arrTemp.push(self.oProPosterior[j]);
                            }
                        }
                        um.destruirDataTable(self.$daTableProPosteriores, '');
                        um.renderDataTables(self.$daTableProPosteriores, arrTemp, {frm: 'formula', tbl: 'proPost'});
                        
                        self.nombreFormula();
                        self.codigoFormula();
                    } else {
                        self.cantQuimicos = 0;
                        self.$cbxCompos.attr('disabled', true);
                        u.camposObligatorios([self.$cbxCompos], '4');
                        self.nombreFormula();
                        self.codigoFormula();
                    }
                    u.camposObligatorios([self.$cbxFibra], '4');
                    
                });
                
                self.$cbxFibra.change(function(e) {
                    if (self.$cbxFibra.val() !== 'Seleccione una...') {
                        self.nombreFormula();
                        self.codigoFormula();
                        u.camposObligatorios([self.$cbxFibra], '4');                    
                    }
                });
                
                self.$cbxCompos.focusout(function(e) {
                    u.camposObligatorios([self.$cbxCompos], '4');
                });
                
                self.$cbxColor.focusout(function(e) {
                    u.camposObligatorios([self.$cbxColor], '4');
                    self.nombreFormula();
                    self.codigoFormula();
                });
                
                self.$desColor.focusin(function(e) {
                    self.$desColor.css('text-transform', 'uppercase');
                });
                
                self.$desColor.focusout(function(e) {
                    u.camposObligatorios([self.$desColor], '4');
                    self.nombreFormula();
                    
                    if (self.$desColor.val() === '') {
                        self.$desColor.css('text-transform', '');
                    }
                });
                
                self.$cbxTono.focusout(function(e) {
                    u.camposObligatorios([self.$cbxTono], '4');
                    self.nombreFormula();
                    self.codigoFormula();
                });
                
                self.$codPantone.focusin(function(e) {
                    self.$codPantone.css('text-transform', 'uppercase');
                });
                
                self.$codPantone.focusout(function(e) {
                    u.camposObligatorios([self.$codPantone], '4');
                    
                    if (self.$codPantone.val() === '') {
                        self.$codPantone.css('text-transform', '');
                    }
                });
                
                self.$phFormula.focusout(function(e) {
                    u.camposObligatorios([self.$phFormula], '4');
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
                
                self.$cantColor.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: true,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 3
                });
                
                self.$cantColor.on('keyup keypress change', function() {
                    u.camposObligatorios([self.$cantColor], '4');
                });
            },
            
            limpiarFormulario: function() {
                var self = this;
                
                self.$btnLimpiarEncab.on('click', function(e) {
                    e.preventDefault();
                    
                    self.$cbxFibra.val('Seleccione una...');
                    self.$cbxCompos.val('Seleccione una...');
                    self.$cbxCompos.attr('disabled', true);
                    self.$cbxColor.val('Seleccione una...');
                    self.$cbxTono.val('Seleccione una...');
                    self.$colorpicker.css('backgroundColor', '');
                    
                    u.limpiarCampos([
                        self.$desColor,
                        self.$codPantone,
                        self.$phFormula,
                        self.$colorpicker
                    ]);
                    
                    u.camposObligatorios([
                        self.$cbxFibra,
                        self.$cbxColor,
                        self.$desColor,
                        self.$cbxTono,
                        self.$codPantone,
                        self.$phFormula,
                        self.$colorpicker
                    ], '4');
                    
                    self.$tProcesos.find('tbody').remove();
                    self.nombreFormula();
                    self.codigoFormula();
                    
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
                  self.$cantColor
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
                                
                                um.agregarLinea(
                                        self.$tColorantes.find('tbody'),
                                        {tipo: self.tipoEdicion,
                                        codQuim: self.$codColor.val(),
                                        nomQuim: self.$nomColor.val(),
                                        cantPctj: self.$cantColor.val()});

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
                                        '<td class="left col-sm-4">:NombreAuxiliar:</td>' +
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
            }
        };
    })();

    frmFormula.init();

})(document, window, jQuery)