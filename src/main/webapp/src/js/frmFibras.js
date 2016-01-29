(function(document, window, $, undefined) {
    (function() {
        return frmFibra = {
            oFibras: {},
            $frmFibra: $('#frmFibra'),
            $dataTableFibra: $('#dataTableFibra'),
            $nomFibra: $('#nomFibra'),
            $codFibra: $('#codFibra'),
            $btnSaveFibra: $('#btnSaveFibra'),
            $btnCleanFibra: $('#btnCleanFibra'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditFibra: $('#modalEditFibra'),
            $eNomFibra: $('#eNomFibra'),
            $eCodFibra: $('#eCodFibra'),
            $eTextArea: $('#modalEditFibra').find('textarea'),
            $eBtnModificar: $('#eBtnEditFibra'),
            $eBtnRestFibra: $('#eBtnRestFibra'),
            $eBtnCerrar: $('#eBtnCerrar'),
            $eBtnCerrar2: $('#modalEditFibra').find('.modal-header .close'),
            idFibra: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
            solicitudesEnviadas: [],
            solcNombre: false,
            solcFibra: false,
            
            init: function() {
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.consultaNombreFibra();
                this.verFibra();
                this.cerrarModalEdicion();
            },
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                
                if (opc === 'f') {
                    if ($.type(data) !== 'array') {
                        self.oFibras = JSON.parse(data);
                    }
                    
                    um.renderDataTables(self.$dataTableFibra, self.oFibras, 'f');
                }

                if (opc === 'nf') {
                    if (data !== null) {
                        self.oFibras = {};
                        self.oFibras = data;
                        
                        frmPreparacion.cargarDatos(dato, 'f');
                        frmAuxiliar.cargarDatos(dato, 'f');
                        frmProcPos.cargarDatos(dato, 'f');
                        self.cargarDatos(dato, 'f');
                        
                        um.destruirDataTable(self.$dataTableFibra.dataTable(), '4');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableFibra, self.oFibras, 'f');
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
            
            metodosUtiles: function() {
                var self = this;

                self.$nomFibra.on('keyup keypress', function() {
                    self.$nomFibra.val(self.$nomFibra.val().toUpperCase());
                });

                self.$eNomFibra.on('keyup keypress', function() {
                    self.$eNomFibra.val(self.$eNomFibra.val().toUpperCase());
                });

                self.$codFibra.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$eCodFibra.on('keypress', function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });

                self.$btnCleanFibra.on('click', function(e) {
                    e.preventDefault();

                    self.limpiarFormulario();
                });
                
                self.$eBtnRestFibra.on('click', function(e) {
                   e.preventDefault();
                   
                   var elementos = [self.$eCodFibra, self.$eNomFibra];
                   u.limpiarCampos(elementos);
                   u.habilitarDeshabilitarCampos(elementos, "hab");
                   u.camposObligatorios(elementos, '3');
                   self.tipoEdicion = 'nuevo';
                });

            },
            limpiarFormulario: function() {
                var self = this;
                
                var elementos = [self.$codFibra, self.$nomFibra];
                u.limpiarCampos(elementos);

                self.pintarCamposObligatorios();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var elementos = [self.$nomFibra , self.$codFibra];
              
              u.camposObligatorios(elementos, '1');
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
            
            consultaNombreFibra: function(){
                var self = this;

                self.$btnSaveFibra.on("click", function(e) {
                    e.preventDefault();
                    var campOblig = false;
                    var elementos = [self.$codFibra, self.$nomFibra];

                    campOblig = u.camposObligatorios(elementos, '2');

                    if (campOblig) {
                        consultas.consultarNombreMaestros(self.$nomFibra.val(), 'nuevo', self.$codFibra.val(), 'ServletFibras');
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    if (!self.$eCodFibra.attr('disabled') || !self.$eNomFibra.attr('disabled')) {
                        var campOblig = false;
                        var campos = [self.$eCodFibra, self.$eNomFibra, self.$eTextArea];

                        campOblig = u.camposObligatorios(campos, '2');

                        if (campOblig) {
                            consultas.consultarNombreMaestros(self.$eCodFibra.val() + ";" + self.$eNomFibra.val(), 'editar', self.idFibra, 'ServletFibras');
                        }
                    } else {
                        consultas.consultarNombreMaestros('', 'editar', self.idFibra, 'ServletFibras');
                    }
                });
            },
            
            agregarFibra: function(response) {
                var self = this;

                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Fibra Existente.',
                        cuerpoMensaje: 'Ya hay una fibra con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {

                    um.guardarRegistro({form: '', tabla: '', nombre: self.$nomFibra.val(), idFib: self.$codFibra.val()}, 'ServletFibras');
                }
            },
            verFibra: function() {
                var self = this;

                self.$dataTableFibra.on('click', '#btnView', function (e) {
                    self.banderaModal = 1;
                    var fila = $(this).closest('tr');
                    self.idFibra = parseInt(fila[0].cells[0].textContent);
                    var elementos = [self.$eCodFibra, self.$eNomFibra];
                    consultas.verificarEstadoModificacion(fila[0].cells[0].textContent, 'ServletFibras');
                    var datos = {
                        frm: 'f',
                        idReg: parseInt(fila[0].cells[0].textContent),
                        registros: self.oFibras,
                        quimicos: '',
                        eNombre: self.$eCodFibra,
                        eNombreFib: self.$eNomFibra,
                        eTabla: '',
                        eModal: self.$modalEditFibra
                    }
                    
                    u.limpiarCampos(elementos);
                    u.camposObligatorios(elementos, '3');
                    u.habilitarDeshabilitarCampos(elementos, 'hab');
                    um.verRegistro(datos);
                    
                    e.stopPropagation();
                });
                    
            },
            
            verificarSolicitudes: function() {
                var self = this;
                var elementos = [self.$eNomFibra, self.$eCodFibra];
                var estado = um.verificarSolicitudes('', elementos, self.solicitudesEnviadas, {solcNombre: self.solcNombre, solcFibra: self.solcFibra});
                
                self.solcNombre = estado.solcNombre;
                self.solcFibra = estado.solcFibra;
            },
            
            solicitarModificarFibra: function(response) {
                var self = this;
                
                if (response === 'true') {
                    self.mensajeObligatoriedad({
                        titulo: 'Nombre de Fibra Existente.',
                        cuerpoMensaje: 'Ya hay una fibra con este nombre, por favor intente nuevamente.'
                    });
                
                } else if (response === 'false') {
                    var nombre = '';
                    var nombreNue = '';
                    var idFib = '';
                    var idFibNue = '';
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; self.oFibras.length; i++) {
                        if (self.oFibras[i].idFibra === self.idFibra) {
                            
                            if (self.oFibras[i].nomFibra !== self.$eNomFibra.val()) {
                                nombre = self.oFibras[i].nomFibra;
                                nombreNue = self.$eNomFibra.val();
                            }
                            
                            if (self.oFibras[i].codFibra !== self.$eCodFibra.val()) {
                                idFib = self.oFibras[i].codFibra;
                                idFibNue = self.$eCodFibra.val()
                            }
                            break;
                        }
                    }
                    
                    um.SolicitarModificarRegistro({tabla: '', nombre: nombre, nombreNue: nombreNue, idFib: idFib, idFibNue: idFibNue, idMaestro: self.idFibra, coment: coment}, [], [], self.$modalEditFibra.find('#eBtnCerrar'), 'ServletFibras');
                }
            },
            
            cerrarModalEdicion: function() {
                var self = this;
                
                $(document).on('click', function(e) {
                    e.preventDefault();

                    if (self.banderaModal === 1 && self.$modalEditFibra.is(':hidden')) {
                        self.banderaModal = 0;
                        self.tipoEdicion = 'nuevo';
                        self.$eTextArea.val('');
                    }
                });
                
                self.$modalEditFibra.on('keydown', function(e){
                    if (self.banderaModal === 1 && self.$modalEditFibra.is(':visible') && e.keyCode === 27) {
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
            }
        };
    })();

    frmFibra.init();

})(document, window, jQuery)