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
            
            init: function() {
                this.iniciarComplementos();
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
//                this.agregarListaChequeo();
//                this.desplegarLista();
//                this.borrarListaCheck()
//                this.consultaNombreCurva();
                this.agregarMaestros();
//                this.cerrarModalEdicion();
            },
            
            iniciarComplementos: function() {
                var self = this;
                
                self.$cbxCompos.attr('disabled', true);
                
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
                
                if (opc === '') { //Colorantes
                    
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
                                    self.$cbxCompos.attr('disabled', false);
                                    u.camposObligatorios([self.$cbxCompos], '4');
                                } else {
                                    self.$cbxCompos.attr('disabled', true);
                                    u.camposObligatorios([self.$cbxCompos], '4');
                                }
                                
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
                
                /*self.$nomCurva.on('keyup keypress', function() {
                    self.$nomCurva.val(self.$nomCurva.val().toUpperCase());
                });

                self.$eNombCurva.on('keyup keypress', function() {
                    self.$eNombCurva.val(self.$eNombCurva.val().toUpperCase());
                })
                
                self.$tiempoCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eTiempCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$llenadoCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eLlenadCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$rinseCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$eRinseCurva.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
                
                self.$btnCleanCurva.on('click', function(e) {
                    e.preventDefault();
                    
                    //self.limpiarFormulario();
                    self.$cbxListaCheck.val('Seleccione una...');
                    self.$tBodyNewListCheck.find('tr:gt(0)').remove();
                    var elementos = [self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva];
                    u.limpiarCampos(elementos);
                    u.camposObligatorios(elementos, '1');
                });*/
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
            
            agregarListaChequeo: function() {
                var self = this;
                
                self.$btnAddLista.on('click', function(e) {
                    e.preventDefault();
                    var newDd = '';
                    var ddTemp = '<dd>Etiqueta: :nombreLabel:</dd>';                     
                    var trTemp = '<tr>' +
                                    '<td class="center">:idNomLista:</td>' +
                                    '<td class="left">' +
                                        '<dl style="margin-bottom: 0;">' +
                                            '<dt>' +
                                                '<button type="button" class="btn" id="btnPlus" style="background: transparent">' +
                                                    '<i class="fa fa-plus-square"></i>' +
                                                '</button>' +
                                                ':nomLista:</dt> :dd:' +
                                        '</dl>' +
                                    '</td>' +
                                    '<td class="center">' +
                                        '<button type="button" class="btn" id="btnDelLinea">' +
                                            '<i class="fa fa-trash-o"></i>' +
                                        '</button>' +
                                    '</td>' +
                                 '</tr>';
                    
                    var campObligQuim = u.camposObligatorios([self.$cbxListaCheck], '2');
                    
                    if (campObligQuim) {
                        var lista = self.$cbxListaCheck.val();
                        var label;
                        var aLabel;
                        
                        for (var i = 0; i < self.oListaCheck.length; i++) {
                            if (lista === self.oListaCheck[i].nomListaCheck) {
                                label = self.oListaCheck[i].idLabel.split('-');
                                aLabel = new Array(label.length);
                                
                                for (var j = 0; j < label.length; j++) {
                                    for (var k = 0; k < self.oLabel.length; k++) {
                                        if (parseInt(label[j]) === self.oLabel[k].idLabel) {
                                            aLabel[j] = ddTemp.replace(':nombreLabel:', self.oLabel[k].nombreLabel);
                                            newDd = newDd + aLabel[j];
                                            break;
                                        }
                                    }
                                }
                                
                                var newTr = trTemp
                                        .replace(':idNomLista:', self.oListaCheck[i].idNomLista)
                                        .replace(':nomLista:', self.oListaCheck[i].nomListaCheck)
                                        .replace(':dd:', newDd);
                                break;
                            }
                        }
                        
                        self.$tBodyNewListCheck.append(newTr);
                        $('dd').hide();
                        
                        self.$cbxListaCheck.val("Seleccione una...");
                        u.camposObligatorios([self.$cbxListaCheck], '1');
                    }
                });
                
                self.$eBtnAddLista.on('click', function(e) {
                    e.preventDefault();
                    var newDd = '';
                    var ddTemp = '<dd>Etiqueta: :nombreLabel:</dd>';                     
                    var trTemp = '<tr>' +
                                    '<td class="center">:idNomLista:</td>' +
                                    '<td class="left">' +
                                        '<dl style="margin-bottom: 0;">' +
                                            '<dt>' +
                                                '<button type="button" class="btn" id="btnPlus" style="background: transparent">' +
                                                    '<i class="fa fa-plus-square"></i>' +
                                                '</button>' +
                                                ':nomLista:</dt> :dd:' +
                                        '</dl>' +
                                    '</td>' +
                                    '<td class="center">' +
                                        '<button type="button" class="btn" id="btnDelLinea">' +
                                            '<i class="fa fa-trash-o"></i>' +
                                        '</button>' +
                                    '</td>' +
                                 '</tr>';
                    
                    var campObligQuim = u.camposObligatorios([self.$eCbxListaCheck], '2');
                    
                    if (campObligQuim) {
                        var lista = self.$eCbxListaCheck.val();
                        var label;
                        var aLabel;
                        
                        for (var i = 0; i < self.oListaCheck.length; i++) {
                            if (lista === self.oListaCheck[i].nomListaCheck) {
                                label = self.oListaCheck[i].idLabel.split('-');
                                aLabel = new Array(label.length);
                                
                                for (var j = 0; j < label.length; j++) {
                                    for (var k = 0; k < self.oLabel.length; k++) {
                                        if (parseInt(label[j]) === self.oLabel[k].idLabel) {
                                            aLabel[j] = ddTemp.replace(':nombreLabel:', self.oLabel[k].nombreLabel);
                                            newDd = newDd + aLabel[j];
                                            break;
                                        }
                                    }
                                }
                                
                                var newTr = trTemp
                                        .replace(':idNomLista:', self.oListaCheck[i].idNomLista)
                                        .replace(':nomLista:', self.oListaCheck[i].nomListaCheck)
                                        .replace(':dd:', newDd);
                                break;
                            }
                        }
                        
                        self.$eTBodyNewListCheck.append(newTr);
                        $('dd').hide();
                        
                        self.$eCbxListaCheck.val("Seleccione una...");
                        u.camposObligatorios([self.$eCbxListaCheck], '1');
                    }
                });
            },
            
            desplegarLista: function() {
                var self = this;
                
                self.$tBodyNewListCheck.on('click', '#btnPlus', function(e) {
                    e.preventDefault();
                    
                    var lista = $(this).closest('dl').find('dd');
                    
                    $('dd').not(lista).slideUp('fast');
                    $('dd').not(lista)
                            .closest('dl').find('i').removeClass('fa-minus-square');

                    $(this).find('i').toggleClass('fa-minus-square');
                    
                    lista.slideToggle('fast');
                });
                
                self.$eTBodyNewListCheck.on('click', '#btnPlus', function(e) {
                    e.preventDefault();
                    
                    var lista = $(this).closest('dl').find('dd');
                    
                    $('dd').not(lista).slideUp('fast');
                    $('dd').not(lista)
                            .closest('dl').find('i').removeClass('fa-minus-square');

                    $(this).find('i').toggleClass('fa-minus-square');
                    
                    lista.slideToggle('fast');
                });
            },
            
            borrarListaCheck: function() {
                var self = this;
                
                self.$tBodyNewListCheck.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    
                    fila.remove();
                   
                    e.stopPropagation();
                });
                
                self.$eTBodyNewListCheck.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    
                    fila.remove();
                   
                    e.stopPropagation();
                });
            },
            
            consultaNombreCurva: function(){
                var self = this;

                self.$btnSaveCurva.on("click", function(e) {
                    e.preventDefault();
                    
                    var campObligPrep = false;
                    var elementos = [self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva];

                    campObligPrep = u.camposObligatorios(elementos, '2');

                    if (campObligPrep) {                        
                        consultas.consultarNombreMaestros(self.$nomCurva.val(), 'nuevo', 0, 'ServletCurvas');
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    var nombre = '';
                    var campOblig = false;
                    var elementos = [self.$eNombCurva, self.$eTiempCurva, self.$eLlenadCurva, self.$eRinseCurva, self.$eTextArea];

                    campOblig = u.camposObligatorios(elementos, '2');

                    if (campOblig) {
                        for (var i = 0; i < self.oCurvas.length; i++) {
                            if (self.oCurvas[i].idCurva === parseInt(self.idCurva)) {
                                if (self.oCurvas[i].nomCurva !== self.$eNombCurva.val()) {
                                    nombre = self.$eNombCurva.val();
                                }
                                break;
                            }
                        }
                        
                        consultas.consultarNombreMaestros(nombre, 'editar', self.idCurva, 'ServletCurvas');
                    }
                });
            },
            
            agregarCurva: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Curva Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = self.$nomCurva.val();
                    var tiempo = self.$tiempoCurva.val();
                    var llenado = self.$llenadoCurva.val();
                    var rinse = self.$rinseCurva.val();
                    
                    um.guardarRegistro({form: 'curva', nombre: nombre, tiempo: tiempo, llenado: llenado, rinse: rinse, tabla: $('#tableNewListCheck')}, 'ServletCurvas');
                }
            },
            
            agregarMaestros: function() {
                var self = this;
                
                self.$daTableProcesos.on('click', '#btnAdd', function (e) {
                    //$('#tProcesos tbody tr:gt(0)').remove();
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

                /*self.$dataTableCurva.on('click', '#btnView', function (e) {
                    var fila = $(this).closest('tr');
                    self.$eCbxListaCheck.val('Seleccione una...');
                    var elementos = [self.$eNombCurva, self.$eTiempCurva, self.$eLlenadCurva, self.$eRinseCurva, self.$eTextArea];
                    
                    self.banderaModal = 1;
                    self.idCurva = parseInt(fila[0].cells[0].textContent);
                    
                    u.limpiarCampos(elementos);                    
                    self.$eTBodyNewListCheck.find('tr:gt(0)').remove();
                    elementos.push(self.$eCbxListaCheck);
                    u.camposObligatorios(elementos, '1');
                    
                    for (var i = 0; i < self.oCurvas.length; i++) {
                        if (self.oCurvas[i].idCurva === self.idCurva) {
                            self.$eNombCurva.val(self.oCurvas[i].nomCurva);
                            self.$eTiempCurva.val(self.oCurvas[i].tiempoCurva);
                            self.$eLlenadCurva.val(self.oCurvas[i].llenadoCurva);
                            self.$eRinseCurva.val(self.oCurvas[i].rinseCurva);
                            
                            if (self.oCurvas[i].checkList !== null) {
                                var idLista = self.oCurvas[i].checkList.split('-');
                                
                                for (var h = 0; h < idLista.length; h++) {
                                    for (var i = 0; i < self.oListaCheck.length; i++) {
                                        if (parseInt(idLista[h]) === self.oListaCheck[i].idNomLista) {
                                            var newDd = '';
                                            var ddTemp = '<dd>Etiqueta: :nombreLabel:</dd>';                     
                                            var trTemp = '<tr>' +
                                                            '<td class="center">:idNomLista:</td>' +
                                                            '<td class="left">' +
                                                                '<dl style="margin-bottom: 0;">' +
                                                                    '<dt>' +
                                                                        '<button type="button" class="btn" id="btnPlus" style="background: transparent">' +
                                                                            '<i class="fa fa-plus-square"></i>' +
                                                                        '</button>' +
                                                                        ':nomLista:</dt> :dd:' +
                                                                '</dl>' +
                                                            '</td>' +
                                                            '<td class="center">' +
                                                                '<button type="button" class="btn" id="btnDelLinea">' +
                                                                    '<i class="fa fa-trash-o"></i>' +
                                                                '</button>' +
                                                            '</td>' +
                                                         '</tr>';
                                            
                                            var label = self.oListaCheck[i].idLabel.split('-');
                                            var aLabel = new Array(label.length);

                                            for (var j = 0; j < label.length; j++) {
                                                for (var k = 0; k < self.oLabel.length; k++) {
                                                    if (parseInt(label[j]) === self.oLabel[k].idLabel) {
                                                        aLabel[j] = ddTemp.replace(':nombreLabel:', self.oLabel[k].nombreLabel);
                                                        newDd = newDd + aLabel[j];
                                                        break;
                                                    }
                                                }
                                            }

                                            var newTr = trTemp
                                                    .replace(':idNomLista:', self.oListaCheck[i].idNomLista)
                                                    .replace(':nomLista:', self.oListaCheck[i].nomListaCheck)
                                                    .replace(':dd:', newDd);
                                            break;
                                        }
                                    }
                                    self.$eTBodyNewListCheck.append(newTr);
                                }
                                
                                $('dd').hide();

                                self.$eCbxListaCheck.val("Seleccione una...");
                                u.camposObligatorios([self.$eCbxListaCheck], '1');
                            }
                            
                            break;
                        }
                    }
                    
                    self.$modalEditCurva.modal('show', 'slow');
                    
                    u.camposObligatorios(elementos, '3');
                    
                    e.stopPropagation();
                });*/
            },
            
            solicitarModificarCurva: function(response) {
                var self = this;
                
                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Curva Existente.',
                        cuerpoMensaje: 'Ya existe una curva con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = '';
                    var tiempo = '';
                    var llenado = '';
                    var rinse = '';
                    var j = 0;
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; i < self.oCurvas.length; i++) {
                        if (self.oCurvas[i].idCurva === parseInt(self.idCurva)) {
                            j = i;
                            if (self.oCurvas[i].nomCurva !== self.$eNombCurva.val()) {
                                nombre = self.$eNombCurva.val();
                            } else {
                                nombre = self.oCurvas[i].nomCurva;
                            }
                            
                            if (self.oCurvas[i].tiempoCurva !== parseInt(self.$eTiempCurva.val())) {
                                tiempo = self.$eTiempCurva.val();
                            } else {
                                tiempo = self.oCurvas[i].tiempoCurva;
                            }
                            
                            if (self.oCurvas[i].llenadoCurva !== parseInt(self.$eLlenadCurva.val())) {
                                llenado = self.$eLlenadCurva.val();
                            } else {
                                llenado = self.oCurvas[i].llenadoCurva;
                            }
                            
                            if (self.oCurvas[i].rinseCurva !== parseInt(self.$eRinseCurva.val())) {
                                rinse = self.$eRinseCurva.val();
                            } else {
                                rinse = self.oCurvas[i].rinseCurva;
                            }
                            
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: $('#eTableNewListCheck'), nombre: nombre, tiempo: tiempo, llenado: llenado, rinse: rinse, idMaestro: self.idCurva, coment: coment, org: self.oCurvas[j]}, [], [], self.$eBtnCerrar, 'ServletCurvas');
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditCurva.is(':hidden')) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                    }
                });
                
                self.$modalEditCurva.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditCurva.is(':visible') && e.keyCode === 27) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
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