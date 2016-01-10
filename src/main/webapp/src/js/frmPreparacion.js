(function(document, window, $, undefined) {
    (function() {
        return frmPreparacion = {
            //oFibras: {},
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
            $eBtnAddLineaPrep: $('#eBtnAddLineaPrep'),
            $eBtnModificar: $('#eBtnEditPrep'),
            $eBtnCerrar: $('#eBtnCerrar'),
            $eBtnCerrar2: $('#modalEditPreparacion').find('.modal-header .close'),
            quimicosPorPrep: [],
            idPreparacion: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
            
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
                    self.oFibras = data;
                    elementos.push(self.$cbxfibraPrep);
                    elementos.push(self.$eCbxfibraPrep);
                    um.cargarComboBox(elementos, self.oFibras);
                }

                if (opc === 'q') {
                    self.oQuimicos = data;
                    elementos.push(self.$dlCodQuimPrep);
                    elementos.push(self.$dlNomQuimPrep);
                    um.cargarDataList(elementos, self.oQuimicos);
                    
                    elementos = [];
                    elementos.push(self.$eDlCodQuimPrep);
                    elementos.push(self.$eDlNomQuimPrep);
                    um.cargarDataList(elementos, self.oQuimicos);
                }

                if (opc === 'pr') {
                    self.oPreparaciones = data;
                    um.renderDataTables(self.$dataTablePreparacion, self.oPreparaciones);
                }

                if (opc === 'npr') {
                    if (data !== null) {
                        self.oPreparaciones = "";
                        self.oPreparaciones = data;
                        um.destruirDataTable(self.$dataTablePreparacion.dataTable(), '1');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTablePreparacion, self.oPreparaciones);
                        self.pintarCamposObligatorios();
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
                    var elementos = [];
                    elementos.push(self.$nomQuimPrep);
                    elementos.push(self.$codQuimPrep);
                    elementos.push(self.$cantGrLtPrep);
                    elementos.push(self.$cantPctjPrep);
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
                });

                $(self.$eCodQuimPrep).on('keyup keypress change', function() {
                    self.$eNomQuimPrep.val("");
                    var elementos = [];
                    elementos.push(self.$eCodQuimPrep);
                    elementos.push(self.$eNomQuimPrep);
                    elementos.push(self.$eCantGrLtPrep);
                    elementos.push(self.$eCantPctjPrep);
                    
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                });

                $(self.$eNomQuimPrep).on('keyup keypress change', function() {
                    self.$eCodQuimPrep.val("");
                    var elementos = [];
                    elementos.push(self.$eNomQuimPrep);
                    elementos.push(self.$eCodQuimPrep);
                    elementos.push(self.$eCantGrLtPrep);
                    elementos.push(self.$eCantPctjPrep);
                    
                    um.cargarCoincidenciaProductoQuimico('nom', elementos, self.oQuimicos);
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

            },
            limpiarFormulario: function() {
                var self = this;

                self.$nomPrep.val("");
                self.$cbxfibraPrep.val("Seleccione una...");
                self.$codQuimPrep.val("");
                self.$nomQuimPrep.val("");
                self.$cantGrLtPrep.val("");
                self.$cantPctjPrep.val("");

                $('#dataTableNewQPreparacion tr:gt(1)').remove();
                self.quimicosPorPrep = [];
                self.pintarCamposObligatorios();
                self.inhabilitarCampos();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [];
              
              campos.push(self.$nomPrep);
              campos.push(self.$cbxfibraPrep);
              campos.push(self.$codQuimPrep);
              campos.push(self.$nomQuimPrep);
              campos.push(self.$cantGrLtPrep);
              campos.push(self.$cantPctjPrep);
              
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
                    var campos = [];
                    
                    campos.push(self.$codQuimPrep);
                    campos.push(self.$nomQuimPrep);
                    campos.push(self.$cantGrLtPrep);
                    campos.push(self.$cantPctjPrep);

                    campObligQuim = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro', cuerpoMensaje: '...'});

                    } else if (um.cantidadDeQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }

                    if (b && campObligQuim) {
                        
                        var d = um.noRepetirQuimicos({
                            tipo: '+', 
                            codQ: self.$codQuimPrep.val(), 
                            maestro: 'prep', 
                            codQpermitido: '1550'},
                            self.quimicosPorPrep);
                            
                        if (!d.existe) {
                            
                            self.quimicosPorPrep.push(self.$codQuimPrep.val());
                            
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
                    var campos = [];
                    
                    campos.push(self.$eCodQuimPrep);
                    campos.push(self.$eNomQuimPrep);
                    campos.push(self.$eCantGrLtPrep);
                    campos.push(self.$eCantPctjPrep);

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
                            um.agregarLinea(
                                    self.filaEditar,
                                    {tipo: self.tipoEdicion,
                                     codQuim: self.$eCodQuimPrep.val(),
                                     nomQuim: self.$eNomQuimPrep.val(),
                                     cantGrLt: self.$eCantGrLtPrep.val(),
                                     cantPctj: self.$eCantPctjPrep.val()});
                            
                            u.limpiarCampos([self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep])
                            self.$eCodQuimPrep.attr('disabled', false);
                            self.$eNomQuimPrep.attr('disabled', false);
                            self.filaEditar = null;
                    }
                });
            },
            borrarLineaPreparacion: function() {
                var self = this;
                
                self.$dataTableNewQPreparacion.on('click', '#btnDelLineaPrep', function(e) {
                    var fila = $(this).closest('tr');
                    fila.remove();
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent, 
                        maestro: 'prep', 
                        codQpermitido: ''}, 
                        self.quimicosPorPrep); 
                    
                    self.quimicosPorPrep = d.oQuim;

                    if ($('#dataTableNewQPreparacion tbody tr').length - 1 == 0) {
                        self.$btnSavePrep.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
                
                self.$tBodyEditPrep.on('click', '#eBtnDelLineaPrep', function (e){
                    var fila = $(this).closest('tr');
                    fila.remove();
                    var d = um.noRepetirQuimicos({
                        tipo: '-', 
                        codQ: fila[0].cells[0].textContent, 
                        maestro: 'prep', 
                        codQpermitido: ''}, 
                        self.quimicosPorPrep); 
                    
                    self.quimicosPorPrep = d.oQuim;

                    e.stopPropagation();
                });
            },
            
            consultaNombrePreparacion: function(){
                var self = this;

                self.$btnSavePrep.on("click", function(e) {
                    e.preventDefault();
                    var campObligPrep = false;
                    var campos = [];
                    
                    campos.push(self.$nomPrep);
                    campos.push(self.$cbxfibraPrep);

                    campObligPrep = u.camposObligatorios(campos, '2');

                    var b = true;

                    if (um.cantidadDeQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                    } else if (um.cantidadDeQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campObligPrep) {                        
                        consultas.consultarNombrePreparacion(self.$nomPrep.val() + " (" + self.$cbxfibraPrep.val() + ")");
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
                    
                    um.guardarRegistro({form: 'prep', tabla: self.$dataTableNewQPreparacion, nombre: nombre, idFib: idFib});
                    
                }
            },
            verPreparacion: function() {
                var self = this;

                self.$dataTablePreparacion.on('click', '#btnViewPrep', function (e) {
                    self.idPreparacion = 0;
                    var fila = $(this).closest('tr');
                    var elementos = [self.$eNomPrep, self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
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
                    self.quimicosPorPrep = um.verRegistro(datos);
                    
                    e.stopPropagation();
                });
                    
            },
            
            modificarQuimicoPreparacion: function() {
                var self = this;
                
                self.$tBodyEditPrep.on('click', '#eBtnEditLineaPrep', function (e) {
                    var fila = $(this).closest('tr');
                    self.tipoEdicion = 'editar';
                    self.filaEditar = fila;
                    
                    self.$eCodQuimPrep.val(parseInt(fila[0].cells[0].textContent));
                    self.$eNomQuimPrep.val(fila[0].cells[1].textContent);
                    self.$eCantGrLtPrep.val(fila[0].cells[2].textContent);
                    self.$eCantPctjPrep.val(fila[0].cells[3].textContent);
                    
                    var elementos = [self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep];
                    um.cargarCoincidenciaProductoQuimico('cod', elementos, self.oQuimicos);
                    self.$eCodQuimPrep.attr('disabled', true);
                    self.$eNomQuimPrep.attr('disabled', true);
                    
                    u.camposObligatorios([self.$eCodQuimPrep, self.$eNomQuimPrep, self.$eCantGrLtPrep, self.$eCantPctjPrep], '2');
                                   
                    e.stopPropagation();
                });

            },
            
            solicitarModificarPreparacion: function() {
                var self = this;
                
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.$modalEditPrep.is(':hidden')) {
                        self.quimicosPorPrep = [];
                    }
                });
                
                self.$eBtnCerrar.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorPrep = [];
                });
                
                self.$eBtnCerrar2.on('click', function(e) {
                    e.preventDefault();
                    self.quimicosPorPrep = [];
                });
            }
        };
    })();

    frmPreparacion.init();

})(document, window, jQuery)

/*
 data[i].costoPreparacion: "0"
 data[i].fechaUso: null
 data[i].idNomPreparacion: 21
 data[i].nomPreparacion: "PRUEBA 2 (ALG LYCRA)"
 
 data[i].idFibra.nomFibra: "ALG LYCRA"
 data[i].idFibra.codFibra: "011"
 data[i].idFibra.idFibra: 1
 
 data[i].preparacionCollection[k].cantGr: 10
 data[i].preparacionCollection[k].cantPtj: 0
 data[i].preparacionCollection[k].codQuimico: "9923"
 data[i].preparacionCollection[k].idPreparacion: 70
 */