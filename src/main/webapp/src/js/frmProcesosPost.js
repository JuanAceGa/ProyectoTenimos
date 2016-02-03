(function(document, window, $, undefined) {
    (function() {
        return frmProcPos = {
            oFibras: {},
            oQuimicos: {},
            oProcPos: {},
            $frmProcPos: $('#frmProcPos'),
            $dataTableNewQProcPos: $('#dataTableNewQProcPos'),
            $tBodyNewQProcPos: $('#tBodyNewQProcPos'),
            $dataTableProcPos: $('#dataTableProcPos'),
            $nomProcPos: $('#nomProcPos'),
            $cbxfibraProcPos: $('#cbxfibraProcPos'),
            $codQuimProcPos: $('#codQuimProcPos'),
            $nomQuimProcPos: $('#nomQuimProcPos'),
            $dlCodQuimProcPos: $('#dlCodQuimProcPos'),
            $dlNomQuimProcPos: $('#dlNomQuimProcPos'),
            $cantGrLtProcPos: $('#cantGrLtProcPos'),
            $cantPctjProcPos: $('#cantPctjProcPos'),
            $btnAddLineaProcPos: $('#btnAddLineaProcPos'),
            $btnSaveProcPos: $('#btnSaveProcPos'),
            $btnCleanProcPos: $('#btnCleanProcPos'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditProcPos: $('#modalEditProcPos'),
            $tableEditProcPos: $('#tableEditProcPos'),
            $tBodyEditProcPos: $('#tableEditProcPos').find('tbody'),
            $eCbxfibraProcPos: $('#eCbxfibraProcPos'),
            $eCodQuimProcPos: $('#eCodQuimProcPos'),
            $eNomQuimProcPos: $('#eNomQuimProcPos'),
            $eNomProcPos: $('#eNomProcPos'),
            $eDlCodQuimProcPos: $('#eDlCodQuimProcPos'),
            $eDlNomQuimProcPos: $('#eDlNomQuimProcPos'),
            $eCantGrLtProcPos: $('#eCantGrLtProcPos'),
            $eCantPctjProcPos: $('#eCantPctjProcPos'),
            $eTextArea: $('#modalEditProcPos').find('textarea'),
            $eBtnAddLineaProcPos: $('#eBtnAddLineaProcPos'),
            $eBtnModificar: $('#eBtnEditProcPos'),
            $eBtnRestProcPos: $('#eBtnRestProcPos'),
            $eBtnCerrar: $('#eBtnCerrar'),
            $eBtnCerrar2: $('#modalEditProcPos').find('.modal-header .close'),
            quimicosPorProcPos: [],
            idProcPos: 0,
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
                this.agregarLineaProcPos();
                this.borrarLineaProcPos();
                this.consultaNombreProcPos();
                this.verProcPos();
                this.modificarQuimicoProcPos();
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
                    
                    elementos.push(self.$cbxfibraProcPos);
                    elementos.push(self.$eCbxfibraProcPos);
                    um.cargarComboBox(elementos, self.oFibras);
                }

                if (opc === 'q') {
                    self.oQuimicos = data;
                    elementos.push(self.$dlCodQuimProcPos);
                    elementos.push(self.$dlNomQuimProcPos);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                    
                    elementos = [];
                    elementos.push(self.$eDlCodQuimProcPos);
                    elementos.push(self.$eDlNomQuimProcPos);
                    um.cargarDataList(elementos, self.oQuimicos, 'q');
                }

                if (opc === 'pp') {
                    self.oProcPos = data;
                    um.renderDataTables(self.$dataTableProcPos, self.oProcPos, 'pp');
                }

                if (opc === 'npp') {
                    if (data !== null) {
                        self.oProcPos = "";
                        self.oProcPos = data;
                        um.destruirDataTable(self.$dataTableProcPos.dataTable(), '3');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableProcPos, self.oProcPos, 'pp');
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

                self.$btnSaveProcPos.attr('disabled', true);
            },
            coincidenciaQuimico: function() {
                var self = this;                

                $(self.$codQuimProcPos).on("keyup keypress change", function() {
                    self.$nomQuimProcPos.val("");
                    var elementos = [self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];

                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                });

                $(self.$nomQuimProcPos).on('keyup keypress change', function() {
                    self.$codQuimProcPos.val("");
                    var elementos = [self.$nomQuimProcPos, self.$codQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                });

                $(self.$eCodQuimProcPos).on('keyup keypress change', function() {
                    self.$eNomQuimProcPos.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                    
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    
                    elementos.push(self.$eBtnAddLineaProcPos);
                    um.verificarSolicitudes(self.$eCodQuimProcPos.val(), elementos, self.solicitudesEnviadas, {});
                    
                });

                $(self.$eNomQuimProcPos).on('keyup keypress change', function() {
                    self.$eCodQuimProcPos.val("");
                    self.tipoEdicion = 'nuevo';
                    var elementos = [self.$eNomQuimProcPos, self.$eCodQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                    
                    elementos.push(self.$eBtnAddLineaProcPos);
                    um.verificarSolicitudes(self.$eCodQuimProcPos.val(), elementos, self.solicitudesEnviadas, {});
                });
            },
            formatoInput: function() {
                var self = this;

                self.$cantGrLtProcPos.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$cantPctjProcPos.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 5
                });

                self.$eCantGrLtProcPos.inputNumber({
                    allowDecimals: true,
                    allowNegative: false,
                    allowLeadingZero: false,
                    thousandSep: ',',
                    decimalSep: '.',
                    maxDecimalDigits: 4
                });

                self.$eCantPctjProcPos.inputNumber({
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

                self.$nomProcPos.on('keyup keypress', function() {
                    self.$nomProcPos.val(self.$nomProcPos.val().toUpperCase());
                });

                self.$nomQuimProcPos.on('keyup keypress', function() {
                    self.$nomQuimProcPos.val(self.$nomQuimProcPos.val().toUpperCase());
                });

                self.$eNomProcPos.on('keyup keypress', function() {
                    self.$eNomProcPos.val(self.$eNomProcPos.val().toUpperCase());
                });

                self.$eNomQuimProcPos.on('keyup keypress', function() {
                    self.$eNomQuimProcPos.val(self.$eNomQuimProcPos.val().toUpperCase());
                });

                self.$codQuimProcPos.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$eCodQuimProcPos.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$btnCleanProcPos.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestProcPos.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                   u.limpiarCampos(elementos);
                   elementos.push(self.$eBtnAddLineaProcPos);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });

            },
            limpiarFormulario: function() {
                var self = this;
                
                self.$cbxfibraProcPos.val("Seleccione una...");
                var elementos = [self.$nomProcPos, self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];
                u.limpiarCampos(elementos);

                $('#dataTableNewQProcPos tr:gt(1)').remove();
                self.quimicosPorProcPos = [];
                self.eNuevosQuimicos = [];
                self.eQuimicosModif = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$nomProcPos, self.$cbxfibraProcPos, self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];
              
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
            
            agregarLineaProcPos: function() {
                var self = this;
                
                self.$btnAddLineaProcPos.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var elementos = [self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos];

                    campObligQuim = u.camposObligatorios(elementos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtProcPos.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro',
                            cuerpoMensaje: 'La cantidad debe ser superior a 0.'});

                    } else if (um.cantidadDeQuimico({val: self.$cantPctjProcPos.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }

                    if (b && campObligQuim) {
                        
                        var d = um.noRepetirQuimicos({
                            tipo: '+', 
                            codQ: self.$codQuimProcPos.val(),
                            cant1: parseFloat(self.$cantGrLtProcPos.val()),
                            cant2: parseFloat(self.$cantPctjProcPos.val()),
                            maestro: 'pp', 
                            codQpermitido: '1550'},
                            self.quimicosPorProcPos);
                            
                        if (!d.existe) {
                            
                            self.quimicosPorProcPos.push({codQ: self.$codQuimProcPos.val(), cant1: parseFloat(self.$cantGrLtProcPos.val()), cant2: parseFloat(self.$cantPctjProcPos.val())});
                            
                            um.agregarLinea(
                                    self.$tBodyNewQProcPos,
                                    {tipo: self.tipoEdicion,
                                    codQuim: self.$codQuimProcPos.val(),
                                    nomQuim: self.$nomQuimProcPos.val(),
                                    cantGrLt: self.$cantGrLtProcPos.val(),
                                    cantPctj: self.$cantPctjProcPos.val()});
                            
                            u.limpiarCampos([self.$codQuimProcPos, self.$nomQuimProcPos, self.$cantGrLtProcPos, self.$cantPctjProcPos]);

                            self.$btnSaveProcPos.attr('disabled', false);
                        } else {
                            self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                        }
                    }
                });
                
                self.$eBtnAddLineaProcPos.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var campos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;
                    
                    if (um.cantidadDeQuimico({val: self.$eCantGrLtProcPos.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro', 
                            cuerpoMensaje: 'Los gramos debe ser superior a 0.'});

                    } else if (um.cantidadDeQuimico({val: self.$eCantPctjProcPos.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }
                    
                    if (b && campObligQuim) {
                        var d = false;
                        var oDatos = {
                            tipo: self.tipoEdicion,
                            codQuim: self.$eCodQuimProcPos.val(),
                            nomQuim: self.$eNomQuimProcPos.val(),
                            cantGrLt: self.$eCantGrLtProcPos.val(),
                            cantPctj: self.$eCantPctjProcPos.val()
                        }
                                  
                        if (self.tipoEdicion === 'nuevo') {
                            self.filaEditar = self.$tBodyEditProcPos;
                            
                            if(parseFloat(self.$eCantGrLtProcPos.val()) > 0) {
                                var gr = parseFloat(self.$eCantGrLtProcPos.val());
                                var pctj = 0;
                                
                            } else {
                                var gr = 0;
                                var pctj = parseFloat(self.$eCantPctjProcPos.val())
                            }
                            
                            var d = um.noRepetirQuimicos({
                                    tipo: '+', 
                                    codQ: self.$eCodQuimProcPos.val(),
                                    cant1: gr,
                                    cant2: pctj,
                                    maestro: 'pp', 
                                    codQpermitido: '1550'},
                                    self.quimicosPorProcPos);
                            if (!d.existe) {
                                self.quimicosPorProcPos.push({codQ: self.$eCodQuimProcPos.val(), cant1: gr, cant2: pctj});
                                self.eNuevosQuimicos.push({codQ: self.$eCodQuimProcPos.val(), cant1: gr, cant2: pctj});
                            }
                            
                        } else {
                            var q = {
                                codQ: self.$eCodQuimProcPos.val(),
                                cantGrLt: parseFloat(self.filaEditar[0].cells[2].textContent),
                                cantPctj: parseFloat(self.filaEditar[0].cells[3].textContent),
                                cantGrLtNue: self.$eCantGrLtProcPos.val(),
                                cantPctjNue: self.$eCantPctjProcPos.val(),
                                tipo: 'mod'
                            };
                            self.eQuimicosModif = um.modificarRegistro(q, self.eQuimicosModif);
                        }
                        
                        if (!d.existe) {
                            
                            um.agregarLinea(self.filaEditar, oDatos);
                            
                            u.limpiarCampos([self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos])
                            self.$eCodQuimProcPos.attr('disabled', false);
                            self.$eNomQuimProcPos.attr('disabled', false);
                            self.filaEditar = null;
                            
                       } else {
                            self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                        }
                    }
                });
            },
            borrarLineaProcPos: function() {
                var self = this;
                
                self.$dataTableNewQProcPos.on('click', '#btnDelLinea', function(e) {
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                        
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent,
                        cant1: parseFloat(fila[0].cells[2].textContent),
                        cant2: parseFloat(fila[0].cells[3].textContent),
                        maestro: 'pp', 
                        codQpermitido: '1550',
                        pos: (rowIndex - 2)},
                        self.quimicosPorProcPos); 
                    
                    self.quimicosPorProcPos = d.oQuim;
                    
                    fila.remove();
                    
                    if ($('#dataTableNewQProcPos tbody tr').length - 1 == 0) {
                        self.$btnSaveProcPos.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$tBodyEditProcPos.on('click', '#btnDelLinea', function (e){
                    var d;
                    var fila = $(this).closest('tr');
                    var rowIndex = fila[0].rowIndex;
                    var codigo = fila[0].cells[0].textContent;
                    var r = um.verificarSolicitudes(codigo, [], self.solicitudesEnviadas, {});
                    
                    if (!r.estado) {
                        var posN = ((rowIndex - 2) - (self.quimicosPorProcPos.length - self.eNuevosQuimicos.length));
                        
                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'pp',
                            codQpermitido: '1550',
                            pos: (rowIndex - 2)},
                        self.quimicosPorProcPos);
                        
                        self.quimicosPorProcPos = d.oQuim;
                        
                        d = um.noRepetirQuimicos({
                            tipo: '-',
                            codQ: fila[0].cells[0].textContent,
                            cant1: parseFloat(fila[0].cells[2].textContent),
                            cant2: parseFloat(fila[0].cells[3].textContent),
                            maestro: 'pp',
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
            
            consultaNombreProcPos: function(){
                var self = this;

                self.$btnSaveProcPos.on("click", function(e) {
                    e.preventDefault();
                    var campOblig = false;
                    var campos = [self.$nomProcPos, self.$cbxfibraProcPos];

                    campOblig = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtProcPos.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$cantPctjProcPos.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campOblig) {                        
                        consultas.consultarNombreMaestros(self.$nomProcPos.val() + " (" + self.$cbxfibraProcPos.val() + ")", 'nuevo', 0, 'ServletProcesosPost');
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    if (!self.$eNomProcPos.attr('disabled') || !self.$eCbxfibraProcPos.attr('disabled')) {
                        var campOblig = false;
                        var campos = [self.$eNomProcPos, self.$eCbxfibraProcPos, self.$eTextArea];

                        campOblig = u.camposObligatorios(campos, '2');

                        var b = true;

                        if (um.cantidadDeQuimico({val: self.$eCantGrLtProcPos.val(), input: 'grlt'})) {
                            b = false;
                        } else if (um.cantidadDeQuimico({val: self.$eCantPctjProcPos.val(), input: 'pctj'})) {
                            b = false;
                        }

                        if (b && campOblig) {
                            consultas.consultarNombreMaestros(self.$eNomProcPos.val() + " (" + self.$eCbxfibraProcPos.val() + ")", 'editar', self.idProcPos, 'ServletProcesosPost');
                        }
                    } else {
                        consultas.consultarNombreMaestros('', 'editar', self.idProcPos, 'ServletProcesosPost');
                    }
                });
            },
            
            agregarProcPos: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Proceso Posterior Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de proceso posterior para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = self.$nomProcPos.val() + " (" + self.$cbxfibraProcPos.val() + ")";
                    
                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$cbxfibraProcPos.val()) {
                            var idFib = "" + self.oFibras[i].idFibra;
                            break;
                        }
                    }
                    
                    um.guardarRegistro({form: '', tabla: self.$dataTableNewQProcPos, nombre: nombre, idFib: idFib}, 'ServletProcesosPost');
                }
            },
            verProcPos: function() {
                var self = this;

                self.$dataTableProcPos.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idProcPos = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eNomProcPos, self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                    consultas.verificarEstadoModificacion(fila[0].cells[0].textContent, 'ServletProcesosPost');
                    var datos = {
                        frm: 'pp',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oProcPos,
                        quimicos: self.oQuimicos,
                        eNombre: self.$eNomProcPos,
                        eNombreFib: self.$eCbxfibraProcPos,
                        eTabla: self.$tBodyEditProcPos,
                        eModal: self.$modalEditProcPos
                    }
                    
                    $("#tableEditProcPos tr:gt(1)").remove();
                    u.limpiarCampos(elementos);
                    elementos.splice(0, 1);
                    u.camposObligatorios(elementos, '3');
                    elementos.push(self.$eNomProcPos);
                    elementos.push(self.$eCbxfibraProcPos);
                    u.habilitarDeshabilitarCampos(elementos, 'hab');
                    self.quimicosPorProcPos = um.verRegistro(datos);
                    
                    for (var i = 0; i < self.quimicosPorProcPos.length; i++) {
                        var q = {
                            codQ: self.quimicosPorProcPos[i].codQ,
                            cantGrLt: self.quimicosPorProcPos[i].cant1,
                            cantPctj: self.quimicosPorProcPos[i].cant2,
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
                var elementos = [self.$eNomProcPos, self.$eCbxfibraProcPos];
                var estado = um.verificarSolicitudes('', elementos, self.solicitudesEnviadas, {solcNombre: self.solcNombre, solcFibra: self.solcFibra});
                
                self.solcNombre = estado.solcNombre;
                self.solcFibra = estado.solcFibra;
            },
            
            modificarQuimicoProcPos: function() {
                var self = this;
                
                self.$tBodyEditProcPos.on('click', '#eBtnEditLinea', function (e) {
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    var r = um.verificarSolicitudes(fila[0].cells[0].textContent, [], self.solicitudesEnviadas, {});
                    
                    if (!r.estado) {
                        self.$eCodQuimProcPos.val(parseInt(fila[0].cells[0].textContent));
                        self.$eNomQuimProcPos.val(fila[0].cells[1].textContent);
                        self.$eCantGrLtProcPos.val(fila[0].cells[2].textContent);
                        self.$eCantPctjProcPos.val(fila[0].cells[3].textContent);

                        var elementos = [self.$eCodQuimProcPos, self.$eNomQuimProcPos, self.$eCantGrLtProcPos, self.$eCantPctjProcPos];
                        um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                        self.$eCodQuimProcPos.attr('disabled', true);
                        self.$eNomQuimProcPos.attr('disabled', true);

                        u.camposObligatorios(elementos, '2');
                    }
                                   
                    e.stopPropagation();
                });

            },
            
            solicitarModificarProcPos: function(response) {
                var self = this;
                
                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Procesos Posteriores Existente.',
                        cuerpoMensaje: 'Ya hay un nombre de proceso posterior para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = '';
                    var nombreNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].nomFibra === self.$eCbxfibraProcPos.val()) {
                            var idFibNue = self.oFibras[i].idFibra;
                            break;
                        }
                    }
                    
                    for (var i = 0; i < self.oProcPos.length; i++) {
                        if (self.idProcPos === self.oProcPos[i].idNomProcPost) {
                            nombre = um.separarNombreDeFibra({nombre: self.oProcPos[i].nomProcPost, fibra: self.oProcPos[i].idFibra.nomFibra});
                            idFib = self.oProcPos[i].idFibra.idFibra;
                            
                            if (nombre !== self.$eNomProcPos.val()) {
                                nombreNue = self.$eNomProcPos.val();
                            }
                            
                            if (idFib === idFibNue) {
                                idFibNue = '';
                            }
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: self.$tableEditProcPos, nombre: nombre, nombreNue: nombreNue, idFib: idFib, idFibNue: idFibNue, idMaestro: self.idProcPos, coment: coment}, self.eQuimicosModif, self.eNuevosQuimicos, self.$modalEditProcPos.find('#eBtnCerrar'), 'ServletProcesosPost');
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditProcPos.is(':hidden')) {
                        self.quimicosPorProcPos = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$modalEditProcPos.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditProcPos.is(':visible') && e.keyCode === 27) {
                        self.quimicosPorProcPos = [];
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                        self.eNuevosQuimicos = [];
                        self.eQuimicosModif = [];
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorProcPos = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorProcPos = [];
                    self.banderaModal = 0;
                    self.tipoEdicion = 'nuevo';
                    self.$eTextArea.val('');
                    self.eNuevosQuimicos = [];
                    self.eQuimicosModif = [];
                });
            }
        };
    })();

    frmProcPos.init();

})(document, window, jQuery)