(function(document, window, $, undefined) {
    (function() {
        return frmCurva = {
            oCurvas: [],
            oListaCheck: [],
            oLabel: [],
            $dataTableCurva: $('#dataTableCurva'),
            $nomCurva: $('#nombCurva'),
            $tiempoCurva: $('#tiempCurva'),
            $llenadoCurva: $('#llenadCurva'),
            $rinseCurva: $('#rinsCurva'),
            $tBodyNewListCheck: $('#tableNewListCheck').find('tbody'),
            $cbxListaCheck: $('#cbxListaCheck'),
            $btnAddLista: $('#btnAddLista'),
            $btnSaveCurva: $('#btnSaveCurva'),
            $btnCleanCurva: $('#btnCleanCurva'),
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            $modalEditCurva: $('#modalEditCurva'),
            $eNombCurva: $('#eNombCurva'),
            $eTiempCurva: $('#eTiempCurva'),
            $eLlenadCurva: $('#eLlenadCurva'),
            $eRinseCurva: $('#eRinsCurva'),
            $eTBodyNewListCheck: $('#eTableNewListCheck').find('tbody'),
            $eCbxListaCheck: $('#eCbxListaCheck'),
            $eBtnAddLista: $('#eBtnAddLista'),
            $eTextArea: $('#modalEditCurva').find('textarea'),
            $eBtnModificar: $('#eBtnModificarCurva'),
            $eBtnCerrar: $('#eBtnCerrarModalEdit'),
            $eBtnCerrar2: $('#modalEditCurva').find('.modal-header .close'),
            idCurva: 0,
            banderaModal: 0,
            tipoEdicion: 'nuevo',
            filaEditar: null,
            
            init: function() {
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.agregarListaChequeo();
                this.desplegarLista();
                this.borrarListaCheck()
                this.consultaNombreCurva();
                this.verCurva();
                this.cerrarModalEdicion();
            },
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                
                if (opc === 'c') {
                    self.oCurvas = '';
                    self.oCurvas = data;
                    um.destruirDataTable(self.$dataTableCurva.dataTable(), '6');
                    um.renderDataTables(self.$dataTableCurva, self.oCurvas, 'c');
                }
                
                if (opc === 'lc') {
                    self.oListaCheck = [];
                    self.oListaCheck = data;
                    um.cargarComboBox([self.$cbxListaCheck, self.$eCbxListaCheck], self.oListaCheck, 'curvas');
                }
                
                if (opc === 'll') {
                    self.oLabel = [];
                    self.oLabel = data;
                }
                
                if (opc === 'nc') {
                    if (data !== null) {
                        self.oCurvas = "";
                        self.oCurvas = data;
                        um.destruirDataTable(self.$dataTableCurva.dataTable(), '6');
                        self.limpiarFormulario();
                        um.renderDataTables(self.$dataTableCurva, self.oCurvas, 'c');
                        self.pintarCamposObligatorios();
                    }
                }
            },
            
            metodosUtiles: function() {
                var self = this;

                self.$nomCurva.on('keyup keypress', function() {
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
                });
            },
            
            limpiarFormulario: function() {
                var self = this;
                
                var elementos = [self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva];
                u.limpiarCampos(elementos);
                
                self.pintarCamposObligatorios();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              var campos = [self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva, self.$cbxListaCheck];
              
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
            
            verCurva: function() {
                var self = this;

                self.$dataTableCurva.on('click', '#btnView', function (e) {
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
                });
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
            }
        };
    })();

    frmCurva.init();

})(document, window, jQuery)