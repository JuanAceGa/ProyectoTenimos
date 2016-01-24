(function(document, window, $, undefined) {
    (function() {
        return frmAuxiliar = {
            //oFibras: {},
            oQuimicos: {},
            oAuxiliares: {},
            $frmAuxiliar: $('#frmAuxiliar'),
            $dataTableNewQAuxiliar: $('#dataTableNewQAuxiliar'),
            $tBodyNewQAuxiliar: $('#tBodyNewQAuxiliar'),
            $dataTableAuxiliar: $('#dataTableAuxiliar'),
            $nomAux: $('#nomAux'),
            $cbxfibraAux: $('#cbxfibraAux'),
            $codQuimAux: $('#codQuimAux'),
            $nomQuimAux: $('#nomQuimAux'),
            $dlCodQuimAux: $('#dlCodQuimAux'),
            $dlNomQuimAux: $('#dlNomQuimAux'),
            $cantGrLtAux: $('#cantGrLtAux'),
            $cantPctjAux: $('#cantPctjAux'),
            $btnAddLineaAux: $('#btnAddLineaAux'),
            $btnSaveAux: $('#btnSaveAux'),
            $btnCleanAux: $('#btnCleanAux'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditAux: $('#modalEditAuxiliar'),
            $tableEditAux: $('#tableEditAux'),
            $tBodyEditAux: $('#tableEditAux').find('tbody'),
            $eCbxfibraAux: $('#eCbxfibraAux'),
            $eCodQuimAux: $('#eCodQuimAux'),
            $eNomQuimAux: $('#eNomQuimAux'),
            $eNomAux: $('#eNomAux'),
            $eDlCodQuimAux: $('#eDlCodQuimAux'),
            $eDlNomQuimAux: $('#eDlNomQuimAux'),
            $eCantGrLtAux: $('#eCantGrLtAux'),
            $eCantPctjAux: $('#eCantPctjAux'),
            $eTextArea: $('#modalEditAuxiliar').find('textarea'),
            $eBtnAddLineaAux: $('#eBtnAddLineaAux'),
            $eBtnModificar: $('#eBtnEditAux'),
            $eBtnRestAux: $('#eBtnRestAux'),
            $eBtnCerrar: $('#eBtnCerrar'),
            $eBtnCerrar2: $('#modalEditAuxiliar').find('.modal-header .close'),
            quimicosPorAux: [],
            idAuxiliar: 0,
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
                this.agregarLineaAuxiliar();
                this.borrarLineaAuxiliar();
                this.consultaNombreAuxiliar();
                this.verAuxiliar();
                this.modificarQuimicoAuxiliar();
                this.cerrarModalEdicion();
            },
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                var elementos = [];
                
                if (opc === 'f') {
                    self.oFibras = data;
                    elementos.push(self.$cbxfibraAux);
                    elementos.push(self.$eCbxfibraAux);
                    um.cargarComboBox(elementos, self.oFibras);
                }

                if (opc === 'q') {
                    self.oQuimicos = data;
                    elementos.push(self.$dlCodQuimAux);
                    elementos.push(self.$dlNomQuimAux);
                    um.cargarDataList(elementos, self.oQuimicos);
                    
                    elementos = [];
                    elementos.push(self.$eDlCodQuimAux);
                    elementos.push(self.$eDlNomQuimAux);
                    um.cargarDataList(elementos, self.oQuimicos);
                }

                if (opc === 'au') {
                    self.oAuxiliares = data;
                    um.renderDataTables(self.$dataTableAuxiliar, self.oAuxiliares, 'aux');
                }

                if (opc === 'npr') {
                    if (data !== null) {
                        self.oAuxiliares = "";
                        self.oAuxiliares = data;
                        um.destruirDataTable(self.$dataTableAuxiliar.dataTable(), '2');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableAuxiliar, self.oAuxiliares, 'aux');
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

                self.$btnSaveAux.attr('disabled', true);
            },
            coincidenciaQuimico: function() {
                var self = this;                

                $(self.$codQuimAux).on("keyup keypress change", function() {
                    self.$nomQuimAux.val("");
                    var elementos = [self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux];

                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                });

                $(self.$nomQuimAux).on('keyup keypress change', function() {
                    self.$codQuimAux.val("");
                    var elementos = [self.$nomQuimAux, self.$codQuimAux, self.$cantGrLtAux, self.$cantPctjAux];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                });

                $(self.$eCodQuimAux).on('keyup keypress change', function() {
                    self.$eNomQuimAux.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                    
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    
                    elementos.push(self.$eBtnAddLineaAux);
                    um.verificarSolicitudes(self.$eCodQuimAux.val(), elementos, self.solicitudesEnviadas, {});
                    
                });

                $(self.$eNomQuimAux).on('keyup keypress change', function() {
                    self.$eCodQuimAux.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eNomQuimAux, self.$eCodQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                    
                    elementos.push(self.$eBtnAddLineaAux);
                    um.verificarSolicitudes(self.$eCodQuimAux.val(), elementos, self.solicitudesEnviadas, {});
                });
            },
            formatoInput: function() {
                var self = this;

                self.$cantGrLtAux.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$cantPctjAux.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });

                self.$eCantGrLtAux.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$eCantPctjAux.inputNumber({
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

                self.$nomAux.on('keyup keypress', function() {
                    self.$nomAux.val(self.$nomAux.val().toUpperCase());
                });

                self.$nomQuimAux.on('keyup keypress', function() {
                    self.$nomQuimAux.val(self.$nomQuimAux.val().toUpperCase());
                });

                self.$eNomAux.on('keyup keypress', function() {
                    self.$eNomAux.val(self.$eNomAux.val().toUpperCase());
                });

                self.$eNomQuimAux.on('keyup keypress', function() {
                    self.$eNomQuimAux.val(self.$eNomQuimAux.val().toUpperCase());
                });

                self.$codQuimAux.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$eCodQuimAux.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$btnCleanAux.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestAux.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaAux);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });

            },
            limpiarFormulario: function() {
                var self = this;
                
                self.$cbxfibraAux.val("Seleccione una...");
                var elementos = [self.$nomAux, self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux];
                u.limpiarCampos(elementos);

                $('#dataTableNewQAuxiliar tr:gt(1)').remove();
                self.quimicosPorAux = [];
                self.eNuevosQuimicos = [];
                self.eQuimicosModif = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$nomAux, self.$cbxfibraAux, self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux];
              
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
            
            agregarLineaAuxiliar: function() {
                var self = this;
                
                self.$btnAddLineaAux.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var elementos = [self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux];

                    campObligQuim = u.camposObligatorios(elementos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtAux.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro',
                            cuerpoMensaje: 'La cantidad debe ser superior a 0.'});

                    } else if (um.cantidadDeQuimico({val: self.$cantPctjAux.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }

                    if (b && campObligQuim) {
                        
                        var d = um.noRepetirQuimicos({
                            tipo: '+', 
                            codQ: self.$codQuimAux.val(),
                            cant1: parseFloat(self.$cantGrLtAux.val()),
                            cant2: parseFloat(self.$cantPctjAux.val()),
                            maestro: 'aux', 
                            codQpermitido: '1550'},
                            self.quimicosPorAux);
                            
                        if (!d.existe) {
                            
                            self.quimicosPorAux.push({codQ: self.$codQuimAux.val(), cant1: parseFloat(self.$cantGrLtAux.val()), cant2: parseFloat(self.$cantPctjAux.val())});
                            
                            um.agregarLinea(
                                    self.$tBodyNewQAuxiliar,
                                    {tipo: self.tipoEdicion,
                                    codQuim: self.$codQuimAux.val(),
                                    nomQuim: self.$nomQuimAux.val(),
                                    cantGrLt: self.$cantGrLtAux.val(),
                                    cantPctj: self.$cantPctjAux.val()});
                            
                            u.limpiarCampos([self.$codQuimAux, self.$nomQuimAux, self.$cantGrLtAux, self.$cantPctjAux]);

                            self.$btnSaveAux.attr('disabled', false);
                        } else {
                            self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                        }
                    }
                });
                
                self.$eBtnAddLineaAux.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var campos = [self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;
                    
                    if (um.cantidadDeQuimico({val: self.$eCantGrLtAux.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro', 
                            cuerpoMensaje: 'Los gramos debe ser superior a 0.'});

                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjAux.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }
                    
                    if (b && campObligQuim) {
                        var d = false;
                        var oDatos = {
                            tipo: self.tipoEdicion,
                            codQuim: self.$eCodQuimAux.val(),
                            nomQuim: self.$eNomQuimAux.val(),
                            cantGrLt: self.$eCantGrLtAux.val(),
                            cantPctj: self.$eCantPctjAux.val()
                        }
                                  
                        if (self.tipoEdicion === 'nuevo') {
                            self.filaEditar = self.$tBodyEditAux;
                            
                            if(parseFloat(self.$eCantGrLtAux.val()) > 0) {
                                var gr = parseFloat(self.$eCantGrLtAux.val());
                                var pctj = 0;
                                
                            } else {
                                var gr = 0;
                                var pctj = parseFloat(self.$eCantPctjAux.val())
                            }
                            
                            var d = um.noRepetirQuimicos({
                                    tipo: '+', 
                                    codQ: self.$eCodQuimAux.val(),
                                    cant1: gr,
                                    cant2: pctj,
                                    maestro: 'aux', 
                                    codQpermitido: '1550'},
                                    self.quimicosPorAux);
                            if (!d.existe) {
                                self.quimicosPorAux.push({codQ: self.$eCodQuimAux.val(), cant1: gr, cant2: pctj});
                                self.eNuevosQuimicos.push({codQ: self.$eCodQuimAux.val(), cant1: gr, cant2: pctj});
                            }
                            
                        } else {
                            var q = {
                                codQ: self.$eCodQuimAux.val(),
                                cantGrLt: parseFloat(self.filaEditar[0].cells[2].textContent),
                                cantPctj: parseFloat(self.filaEditar[0].cells[3].textContent),
                                cantGrLtNue: self.$eCantGrLtAux.val(),
                                cantPctjNue: self.$eCantPctjAux.val(),
                                tipo: 'mod'
                            };
                            self.eQuimicosModif = um.modificarRegistro(q, self.eQuimicosModif);
                        }
                        
                        if (!d.existe) {
                            
                            um.agregarLinea(self.filaEditar, oDatos);
                            
                            u.limpiarCampos([self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux])
                            self.$eCodQuimAux.attr('disabled', false);
                            self.$eNomQuimAux.attr('disabled', false);
                            self.filaEditar = null;
                            
                       } else {
                            self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                        }
                    }
                });
            },
            borrarLineaAuxiliar: function() {
                var self = this;
                
                self.$dataTableNewQAuxiliar.on('click', '#btnDelLineaAux', function(e) {
                    var fila = $(this).closest('tr');
                    fila.remove();
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent, 
                        maestro: 'aux', 
                        codQpermitido: ''}, 
                        self.quimicosPorAux); 
                    
                    self.quimicosPorAux = d.oQuim;

                    if ($('#dataTableNewQAuxiliar tbody tr').length - 1 == 0) {
                        self.$btnSaveAux.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$tBodyEditAux.on('click', '#btnDelLinea', function (e){
                    var d;
                    var fila = $(this).closest('tr');
                    var codigo = fila[0].cells[0].textContent;
                    var r = um.verificarSolicitudes(codigo, [], self.solicitudesEnviadas, {});
                    
                    if (!r.estado) {
                        fila.remove();
                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'aux',
                            codQpermitido: ''},
                        self.quimicosPorAux);

                        self.quimicosPorAux = d.oQuim;

                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'aux',
                            codQpermitido: ''},
                        self.eNuevosQuimicos);

                        self.eNuevosQuimicos = d.oQuim;

                        for (var i = 0; i < self.eQuimicosModif.length; i++) {
                            if (self.eQuimicosModif[i].codQ === fila[0].cells[0].textContent) {
                                self.eQuimicosModif[i].tipo = 'eli';
                                break;
                            }
                        }
                    }
                    
                    e.stopPropagation();
                });
            },
            
            consultaNombreAuxiliar: function(){
                var self = this;

                self.$btnSaveAux.on("click", function(e) {
                    e.preventDefault();
                    var campOblig = false;
                    var campos = [self.$nomAux, self.$cbxfibraAux];

                    campOblig = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtAux.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$cantPctjAux.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campOblig) {                        
                        consultas.consultarNombreAuxiliar(self.$nomAux.val() + " (" + self.$cbxfibraAux.val() + ")", 'nuevo', 0);
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    var campOblig = false;
                    var campos = [self.$eNomAux, self.$eCbxfibraAux, self.$eTextArea];

                    campOblig = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$eCantGrLtAux.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjAux.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campOblig) {
                        consultas.consultarNombreAuxiliar(self.$eNomAux.val() + " (" + self.$eCbxfibraAux.val() + ")", 'editar', self.idAuxiliar);
                    }
                });
            },
            
            agregarAuxiliar: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Auxiliar Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de auxiliar para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = self.$nomAux.val() + " (" + self.$cbxfibraAux.val() + ")";
                    
                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$cbxfibraAux.val()) {
                            var idFib = "" + self.oFibras[i].idFibra;
                            break;
                        }
                    }
                    
                    um.guardarRegistro({form: 'aux', tabla: self.$dataTableNewQAuxiliar, nombre: nombre, idFib: idFib});
                    
                }
            },
            verAuxiliar: function() {
                var self = this;

                self.$dataTableAuxiliar.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idAuxiliar = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eNomAux, self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                    consultas.verificarEstadoModificacion(fila[0].cells[0].textContent, 'frmAux');
                    var datos = {
                        frm: 'aux',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oAuxiliares,
                        quimicos: self.oQuimicos,
                        eNombre: self.$eNomAux,
                        eNombreFib: self.$eCbxfibraAux,
                        eTabla: self.$tBodyEditAux,
                        eModal: self.$modalEditAux
                    }
                    
                    $("#tableEditAux tr:gt(1)").remove();
                    u.limpiarCampos(elementos);
                    elementos.splice(0, 1);
                    u.camposObligatorios(elementos, '3');
                    elementos.push(self.$eNomAux);
                    elementos.push(self.$eCbxfibraAux);
                    u.habilitarDeshabilitarCampos(elementos, 'hab');
                    self.quimicosPorAux = um.verRegistro(datos);
                    
                    for (var i = 0; i < self.quimicosPorAux.length; i++) {
                        var q = {
                            codQ: self.quimicosPorAux[i].codQ,
                            cantGrLt: self.quimicosPorAux[i].cant1,
                            cantPctj: self.quimicosPorAux[i].cant2,
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
                var elementos = [self.$eNomAux, self.$eCbxfibraAux];
                var estado = um.verificarSolicitudes('', elementos, self.solicitudesEnviadas, {solcNombre: self.solcNombre, solcFibra: self.solcFibra});
                
                self.solcNombre = estado.solcNombre;
                self.solcFibra = estado.solcFibra;
            },
            
            modificarQuimicoAuxiliar: function() {
                var self = this;
                
                self.$tBodyEditAux.on('click', '#eBtnEditLinea', function (e) {
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    var r = um.verificarSolicitudes(fila[0].cells[0].textContent, [], self.solicitudesEnviadas, {});
                    
                    if (!r.estado) {
                        self.$eCodQuimAux.val(parseInt(fila[0].cells[0].textContent));
                        self.$eNomQuimAux.val(fila[0].cells[1].textContent);
                        self.$eCantGrLtAux.val(fila[0].cells[2].textContent);
                        self.$eCantPctjAux.val(fila[0].cells[3].textContent);

                        var elementos = [self.$eCodQuimAux, self.$eNomQuimAux, self.$eCantGrLtAux, self.$eCantPctjAux];
                        um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                        self.$eCodQuimAux.attr('disabled', true);
                        self.$eNomQuimAux.attr('disabled', true);

                        u.camposObligatorios(elementos, '2');
                    }
                                   
                    e.stopPropagation();
                });

            },
            
            solicitarModificarAuxiliar: function(response) {
                var self = this;
                
                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Auxiliar Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de Auxiliar para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = '';
                    var nombreNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$eCbxfibraAux.val()) {
                            var idFibNue = self.oFibras[i].idFibra;
                            break;
                        }
                    }
                    
                    for (var i = 0; i < self.oAuxiliares.length; i++) {
                        if (self.idAuxiliar === self.oAuxiliares[i].idNomAuxiliar) {
                            nombre = um.separarNombreDeFibra({nombre: self.oAuxiliares[i].nomAuxiliar, fibra: self.oAuxiliares[i].idFibra.nomFibra});
                            idFib = self.oAuxiliares[i].idFibra.idFibra;
                            
                            if (nombre !== self.$eNomAux.val()) {
                                nombreNue = self.$eNomAux.val();
                            }
                            
                            if (idFib === idFibNue) {
                                idFibNue = '';
                            }
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: self.$tableEditAux, nombre: nombre, nombreNue: nombreNue, idFib: idFib, idFibNue: idFibNue, idAux: self.idAuxiliar, coment: coment}, self.eQuimicosModif, self.eNuevosQuimicos, self.$eBtnCerrar);
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditAux.is(':hidden')) {
                        self.quimicosPorAux = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
               self.$modalEditAux.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditAux.is(':visible') && e.keyCode === 27) {
                        self.quimicosPorAux = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorAux = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorAux = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
            }
        };
    })();

    frmAuxiliar.init();

})(document, window, jQuery)