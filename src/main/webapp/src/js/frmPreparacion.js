(function(document, window, $, undefined) {
    (function() {
        return frmPreparacion = {
            oFibras: {},
            oQuimicos: {},
            oPreparaciones: {},
            $frmPreparacion: $('#frmPreparacion'),
            $dataTableNewQPreparacion: $('#dataTableNewQPreparacion'),
            $tBodyNewQPreparacion: $('#tBodyNewQPreparacion'),
            $dataTablePreparacion: $('#dataTablePreparacion'),
            $btnNewPrep: $('#btnNewPrep'),
            $nomPrep: $('#nomPrep'),
            $cbxfibraPrep: $('#cbxfibraPrep'),
            $codQuimPrep: $('#codQuimPrep'),
            $nomQuimPrep: $('#nomQuimPrep'),
            $dlCodQuimPrep: $('#dlCodQuimPrep'),
            $dlNomQuimPrep: $('#dlNomQuimPrep'),
            $cantGrLtPrep: $('#cantGrLtPrep'),
            $cantPctjPrep: $('#cantPctjPrep'),
            $btnAddLineaPrep: $('#btnAddLineaPrep'),
            $btnSavePrep: $('#btnSavePrep'),
            $btnCleanPrep: $('#btnCleanPrep'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditPrep: $('#modalEditPreparacion'),
            $tableEditPrep: $('#tableEditPrep'),
            $tBodyEditPrep: $('#tableEditPrep').find('tbody'),
            $eCbxfibraPrep: $('#eCbxfibraPrep'),
            $eCodQuimPrep: $('#eCodQuimPrep'),
            $eNomQuimPrep: $('#eNomQuimPrep'),
            $eNomPrep: $('#eNomPrep'),
            $eDlCodQuimPrep: $('#eDlCodQuimPrep'),
            $eDlNomQuimPrep: $('#eDlNomQuimPrep'),
            $eCantGrLtPrep: $('#eCantGrLtPrep'),
            $eCantPctjPrep: $('#eCantPctjPrep'),
            $eTextArea: $('#modalEditPreparacion').find('textarea'),
            $eBtnAddLineaPrep: $('#eBtnAddLineaPrep'),
            $eBtnModificar: $('#eBtnEditPrep'),
            $eBtnRestPrep: $('#eBtnRestPrep'),
            $eBtnCerrar: $('#eBtnCerrarModalEditPrep'),
            $eBtnCerrar2: $('#modalEditPreparacion').find('.modal-header .close'),
            quimicosPorPrep: [],
            idPreparacion: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
            eNuevosQuimicos: [],
            eQuimicosModif: [],
            solicitudesEnviadas: [],
            solcNombre: false,
            solcFibra: false,
            
            init: function() {
                this.inhabilitarCampos();
                this.coincidenciaQuimico();
                this.formatoInput();
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.agregarLineaPreparacion();
                this.borrarLineaPreparacion();
                this.consultaNombrePreparacion();
                this.verPreparacion();
                this.modificarQuimicoPreparacion();
                this.cerrarModalEdicion();
            },
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                var elementos = [];
                
                if (opc === 'f') {
                    if ($.type(data) !== 'array') {
                        self.oFibras = JSON.parse(data);
                    }
                    
                    elementos.push(self.$cbxfibraPrep);
                    elementos.push(self.$eCbxfibraPrep);
                    um.cargarComboBox(elementos, self.oFibras, 'preparacion');
                }

                if (opc === 'q') {
                    self.oQuimicos = data;
                    elementos.push(self.$dlCodQuimPrep);
                    elementos.push(self.$dlNomQuimPrep);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                    
                    elementos = [];
                    elementos.push(self.$eDlCodQuimPrep);
                    elementos.push(self.$eDlNomQuimPrep);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                }

                if (opc === 'pr') {
                    self.oPreparaciones = data;
                    um.renderDataTables(self.$dataTablePreparacion, self.oPreparaciones, 'prep');
                }

                if (opc === 'npr') {
                    if (data !== null) {
                        self.oPreparaciones = "";
                        self.oPreparaciones = data;
                        um.destruirDataTable(self.$dataTablePreparacion.dataTable(), '1');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTablePreparacion, self.oPreparaciones, 'prep');
                        self.pintarCamposObligatorios();
                    }
                }
                
                if (opc === 'solic') {
                    if (data !== null) {
                        self.solicitudesEnviadas = data;
                        self.solcNombre = false;
                        self.solcFibra = false;
                        self.verificarSolicitudes();
                    }
                }
            },
            inhabilitarCampos: function() {
                var self = this;

                self.$btnSavePrep.attr('disabled', true);
            },
            coincidenciaQuimico: function() {
                var self = this;                

                $(self.$codQuimPrep).on("keyup keypress change", function() {
                    self.$nomQuimPrep.val("");
                    var elementos = [self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];

                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                });

                $(self.$nomQuimPrep).on('keyup keypress change', function() {
                    self.$codQuimPrep.val("");
                    var elementos = [self.$nomQuimPrep, self.$codQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                });

                $(self.$eCodQuimPrep).on('keyup keypress change', function() {
                    self.$eNomQuimPrep.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    
                    elementos.push(self.$eBtnAddLineaPrep);
                    um.verificarSolicitudes(self.$eCodQuimPrep.val(), elementos, self.solicitudesEnviadas, {});
                    
                });

                $(self.$eNomQuimPrep).on('keyup keypress change', function() {
                    self.$eCodQuimPrep.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eNomQuimPrep, self.$eCodQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                    
                    elementos.push(self.$eBtnAddLineaPrep);
                    um.verificarSolicitudes(self.$eCodQuimPrep.val(), elementos, self.solicitudesEnviadas, {});
                });
            },
            formatoInput: function() {
                var self = this;

                self.$cantGrLtPrep.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$cantPctjPrep.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });

                self.$eCantGrLtPrep.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$eCantPctjPrep.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });
            },
            metodosUtiles: function() {
                var self = this;

                self.$nomPrep.on('keyup keypress', function() {
                    self.$nomPrep.val(self.$nomPrep.val().toUpperCase());
                });

                self.$nomQuimPrep.on('keyup keypress', function() {
                    self.$nomQuimPrep.val(self.$nomQuimPrep.val().toUpperCase());
                });

                self.$eNomPrep.on('keyup keypress', function() {
                    self.$eNomPrep.val(self.$eNomPrep.val().toUpperCase());
                });

                self.$eNomQuimPrep.on('keyup keypress', function() {
                    self.$eNomQuimPrep.val(self.$eNomQuimPrep.val().toUpperCase());
                });

                self.$codQuimPrep.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$eCodQuimPrep.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$btnCleanPrep.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestPrep.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaPrep);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });

            },
            limpiarFormulario: function() {
                var self = this;
                
                self.$cbxfibraPrep.val("Seleccione una...");
                var elementos = [self.$nomPrep, self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];
                u.limpiarCampos(elementos);

                $('#dataTableNewQPreparacion tr:gt(1)').remove();
                self.quimicosPorPrep = [];
                self.eNuevosQuimicos = [];
                self.eQuimicosModif = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$nomPrep, self.$cbxfibraPrep, self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];
              
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
            
            agregarLineaPreparacion: function() {
                var self = this;
                
                self.$btnAddLineaPrep.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var elementos = [self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep];

                    campObligQuim = u.camposObligatorios(elementos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro',
                            cuerpoMensaje: 'La cantidad debe ser superior a 0.'});

                    } else if (um.cantidadDeQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }

                    if (b && campObligQuim) {
                        
                        var d = um.noRepetirQuimicos({
                            tipo: '+', 
                            codQ: self.$codQuimPrep.val(),
                            cant1: parseFloat(self.$cantGrLtPrep.val()),
                            cant2: parseFloat(self.$cantPctjPrep.val()),
                            maestro: 'prep', 
                            codQpermitido: '1550'},
                            self.quimicosPorPrep);
                            
                        if (!d.existe) {
                            
                            self.quimicosPorPrep.push({codQ: self.$codQuimPrep.val(), cant1: parseFloat(self.$cantGrLtPrep.val()), cant2: parseFloat(self.$cantPctjPrep.val())});
                            
                            um.agregarLinea(
                                    self.$tBodyNewQPreparacion,
                                    {tipo: self.tipoEdicion,
                                    codQuim: self.$codQuimPrep.val(),
                                    nomQuim: self.$nomQuimPrep.val(),
                                    cantGrLt: self.$cantGrLtPrep.val(),
                                    cantPctj: self.$cantPctjPrep.val()});
                            
                            u.limpiarCampos([self.$codQuimPrep, self.$nomQuimPrep, self.$cantGrLtPrep, self.$cantPctjPrep]);

                            self.$btnSavePrep.attr('disabled', false);
                        } else {
                            self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                        }
                    }
                });
                
                self.$eBtnAddLineaPrep.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var campos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;
                    
                    if (um.cantidadDeQuimico({val: self.$eCantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro', 
                            cuerpoMensaje: 'Los gramos debe ser superior a 0.'});

                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }
                    
                    if (b && campObligQuim) {
                        var d = false;
                        var oDatos = {
                            tipo: self.tipoEdicion,
                            codQuim: self.$eCodQuimPrep.val(),
                            nomQuim: self.$eNomQuimPrep.val(),
                            cantGrLt: self.$eCantGrLtPrep.val(),
                            cantPctj: self.$eCantPctjPrep.val()
                        }
                                  
                        if (self.tipoEdicion === 'nuevo') {
                            self.filaEditar = self.$tBodyEditPrep;
                            
                            if(parseFloat(self.$eCantGrLtPrep.val()) > 0) {
                                var gr = parseFloat(self.$eCantGrLtPrep.val());
                                var pctj = 0;
                                
                            } else {
                                var gr = 0;
                                var pctj = parseFloat(self.$eCantPctjPrep.val())
                            }
                            
                            var d = um.noRepetirQuimicos({
                                    tipo: '+', 
                                    codQ: self.$eCodQuimPrep.val(),
                                    cant1: gr,
                                    cant2: pctj,
                                    maestro: 'prep', 
                                    codQpermitido: '1550'},
                                    self.quimicosPorPrep);
                            if (!d.existe) {
                                self.quimicosPorPrep.push({codQ: self.$eCodQuimPrep.val(), cant1: gr, cant2: pctj});
                                self.eNuevosQuimicos.push({codQ: self.$eCodQuimPrep.val(), cant1: gr, cant2: pctj});
                            }
                            
                        } else {
                            var q = {
                                codQ: self.$eCodQuimPrep.val(),
                                cantGrLt: parseFloat(self.filaEditar[0].cells[2].textContent),
                                cantPctj: parseFloat(self.filaEditar[0].cells[3].textContent),
                                cantGrLtNue: self.$eCantGrLtPrep.val(),
                                cantPctjNue: self.$eCantPctjPrep.val(),
                                tipo: 'mod'
                            };
                            self.eQuimicosModif = um.modificarRegistro(q, self.eQuimicosModif);
                        }
                        
                        if (!d.existe) {
                            
                            um.agregarLinea(self.filaEditar, oDatos);
                            
                            u.limpiarCampos([self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep])
                            self.$eCodQuimPrep.attr('disabled', false);
                            self.$eNomQuimPrep.attr('disabled', false);
                            self.filaEditar = null;
                            
                       } else {
                            self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                        }
                    }
                });
            },
            borrarLineaPreparacion: function() {
                var self = this;
                
                self.$dataTableNewQPreparacion.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent,
                        cant1: '',
                        cant2: '',
                        maestro: 'prep', 
                        codQpermitido: '',
                        pos: (rowIndex - 2)}, 
                        self.quimicosPorPrep);
                    
                    self.quimicosPorPrep = d.oQuim;
                    
                    fila.remove();
                    
                    if ($('#dataTableNewQPreparacion tbody tr').length - 1 == 0) {
                        self.$btnSavePrep.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$tBodyEditPrep.on('click', '#btnDelLinea', function (e){
                    var d;
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    var codigo = fila[0].cells[0].textContent;
                    var r = um.verificarSolicitudes(codigo, [], self.solicitudesEnviadas, {});
                    
                    if (!r.estado) {
                        var posN = ((rowIndex - 2) - (self.quimicosPorAux.length - self.eNuevosQuimicos.length));
                        
                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'prep',
                            codQpermitido: '',
                            pos: (rowIndex - 2)},
                        self.quimicosPorPrep);

                        self.quimicosPorPrep = d.oQuim;

                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'prep',
                            codQpermitido: '', 
                            pos: posN},
                        self.eNuevosQuimicos);

                        self.eNuevosQuimicos = d.oQuim;

                        for (var i = 0; i < self.eQuimicosModif.length; i++) {
                            if (self.eQuimicosModif[i].codQ === fila[0].cells[0].textContent) {
                                self.eQuimicosModif[i].tipo = 'eli';
                                break;
                            }
                        }
                        
                        fila.remove();
                    }
                    
                    e.stopPropagation();
                });
            },
            
            consultaNombrePreparacion: function(){
                var self = this;

                self.$btnSavePrep.on("click", function(e) {
                    e.preventDefault();
                    var campObligPrep = false;
                    var campos = [self.$nomPrep, self.$cbxfibraPrep];

                    campObligPrep = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campObligPrep) {                        
                        consultas.consultarNombreMaestros(self.$nomPrep.val() + " (" + self.$cbxfibraPrep.val() + ")", 'nuevo', 0, 'ServletPreparaciones');
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    if (!self.$eNomAux.attr('disabled') || !self.$eCbxfibraAux.attr('disabled')) {
                    
                        var campObligPrep = false;
                        var campos = [self.$eNomPrep, self.$eCbxfibraPrep, self.$eTextArea];

                        campObligPrep = u.camposObligatorios(campos, '2');

                        var b = true;

                        if (um.cantidadDeQuimico({val: self.$eCantGrLtPrep.val(), input: 'grlt'})) {
                            b = false;
                        } else if (um.cantidadDeQuimico({val: self.$eCantPctjPrep.val(), input: 'pctj'})) {
                            b = false;
                        }

                        if (b && campObligPrep) {
                            consultas.consultarNombreMaestros(self.$eNomPrep.val() + " (" + self.$eCbxfibraPrep.val() + ")", 'editar', self.idPreparacion, 'ServletPreparaciones');
                        }
                    } else {
                        consultas.consultarNombreMaestros('', 'editar', self.idPreparacion, 'ServletPreparaciones');
                    }
                });
            },
            
            agregarPreparacion: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Preparación Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = self.$nomPrep.val() + " (" + self.$cbxfibraPrep.val() + ")";
                    
                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$cbxfibraPrep.val()) {
                            var idFib = "" + self.oFibras[i].idFibra;
                            break;
                        }
                    }
                    
                    um.guardarRegistro({form: '', tabla: self.$dataTableNewQPreparacion, nombre: nombre, idFib: idFib}, 'ServletPreparaciones');
                    
                }
            },
            verPreparacion: function() {
                var self = this;

                self.$dataTablePreparacion.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idPreparacion = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eNomPrep, self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    consultas.verificarEstadoModificacion(fila[0].cells[0].textContent, 'ServletPreparaciones');
                    var datos = {
                        frm: 'prep',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oPreparaciones,
                        quimicos: self.oQuimicos,
                        eNombre: self.$eNomPrep,
                        eNombreFib: self.$eCbxfibraPrep,
                        eTabla: self.$tBodyEditPrep,
                        eModal: self.$modalEditPrep
                    }
                    
                    $("#tableEditPrep tr:gt(1)").remove();
                    u.limpiarCampos(elementos);
                    elementos.splice(0, 1);
                    u.camposObligatorios(elementos, '3');
                    elementos.push(self.$eNomPrep);
                    elementos.push(self.$eCbxfibraPrep);
                    u.habilitarDeshabilitarCampos(elementos, 'hab');
                    self.quimicosPorPrep = um.verRegistro(datos);
                    
                    for (var i = 0; i < self.quimicosPorPrep.length; i++) {
                        var q = {
                            codQ: self.quimicosPorPrep[i].codQ,
                            cantGrLt: self.quimicosPorPrep[i].cant1,
                            cantPctj: self.quimicosPorPrep[i].cant2,
                            cantGrLtNue: -1,
                            cantPctjNue: -1,
                            tipo: ''
                        };
                         self.eQuimicosModif.push(q);
                    }
                    
                    e.stopPropagation();
                });
                    
            },
            
            verificarSolicitudes: function() {
                var self = this;
                var elementos = [self.$eNomPrep, self.$eCbxfibraPrep];
                var estado = um.verificarSolicitudes('', elementos, self.solicitudesEnviadas, {solcNombre: self.solcNombre, solcFibra: self.solcFibra});
                
                self.solcNombre = estado.solcNombre;
                self.solcFibra = estado.solcFibra;
            },
            
            modificarQuimicoPreparacion: function() {
                var self = this;
                
                self.$tBodyEditPrep.on('click', '#eBtnEditLinea', function (e) {
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    var r = um.verificarSolicitudes(fila[0].cells[0].textContent, [], self.solicitudesEnviadas, {});
                    
                    if (!r.estado) {
                        self.$eCodQuimPrep.val(parseInt(fila[0].cells[0].textContent));
                        self.$eNomQuimPrep.val(fila[0].cells[1].textContent);
                        self.$eCantGrLtPrep.val(fila[0].cells[2].textContent);
                        self.$eCantPctjPrep.val(fila[0].cells[3].textContent);

                        var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                        um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                        self.$eCodQuimPrep.attr('disabled', true);
                        self.$eNomQuimPrep.attr('disabled', true);

                        u.camposObligatorios(elementos, '2');
                    }
                                   
                    e.stopPropagation();
                });

            },
            
            solicitarModificarPreparacion: function(response) {
                var self = this;
                
                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Preparación Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = '';
                    var nombreNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$eCbxfibraPrep.val()) {
                            var idFibNue = self.oFibras[i].idFibra;
                            break;
                        }
                    }
                    
                    for (var i = 0; i < self.oPreparaciones.length; i++) {
                        if (self.idPreparacion === self.oPreparaciones[i].idNomPreparacion) {
                            //nombre = self.oPreparaciones[i].nomPreparacion;
                            nombre = um.separarNombreDeFibra({nombre: self.oPreparaciones[i].nomPreparacion, fibra: self.oPreparaciones[i].idFibra.nomFibra});
                            idFib = self.oPreparaciones[i].idFibra.idFibra;
                            
                            if (nombre !== self.$eNomPrep.val()) {
                                nombreNue = self.$eNomPrep.val();
                            }
                            
                            if (idFib === idFibNue) {
                                idFibNue = '';
                            }
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: self.$tableEditPrep, nombre: nombre, nombreNue: nombreNue, idFib: idFib, idFibNue: idFibNue, idMaestro: self.idPreparacion, coment: coment}, self.eQuimicosModif, self.eNuevosQuimicos, self.$eBtnCerrar, 'ServletPreparaciones');
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditPrep.is(':hidden')) {
                        self.quimicosPorPrep = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
               self.$modalEditPrep.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditPrep.is(':visible') && e.keyCode === 27) {
                        self.quimicosPorPrep = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorPrep = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorPrep = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
            }
        };
    })();

    frmPreparacion.init();

})(document, window, jQuery)