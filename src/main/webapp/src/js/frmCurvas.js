(function(document, window, $, undefined) {
    (function() {
        return frmCurva = {
            UrlCurvas: 'http://localhost:8084/ERPTenimosBackend/rest/curvas/',
            UrlLabelCheck: 'http://localhost:8084/ERPTenimosBackend/rest/listaCheck/',
            UrlListaCheck: 'http://localhost:8084/ERPTenimosBackend/rest/nombreListCheck/',
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
            idListaCheck: '',
            
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
            
            consultasCurvas: function() {
                var self = this;
                
                $.get(self.UrlCurvas + 'listadoCurvas', function(res) {
                    self.cargarDatos(res, 'c');
                    
                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'curvas/listadoCurvas');
                });
                    
                $.get(self.UrlLabelCheck + 'listadoItems', function(res) {
                    self.cargarDatos(res, 'll');
                });
                    
                $.get(self.UrlListaCheck + 'listadoListCheck', function(res) {
                    self.cargarDatos(res, 'lc');
                });
            },
            
            cargarDatos: function(data, opc) {
                var self = this;
                
                if (opc === 'c') {
                    self.oCurvas = '';
                    self.oCurvas = data;
                    um.destruirDataTable(self.$dataTableCurva.dataTable(), '6');
                    self.limpiarFormulario();
                    um.renderDataTables(self.$dataTableCurva, self.oCurvas, 'c');
                    self.pintarCamposObligatorios();
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
            },
            
            metodosUtiles: function() {
                var self = this;

                self.$nomCurva.on('focusin', function() {
                    self.$nomCurva.css('text-transform', 'uppercase');
                });
                
                self.$nomCurva.on('focusout', function() {
                    u.camposObligatorios([self.$nomCurva], '4');
                    
                    (self.$nomCurva.val() === '') ? self.$nomCurva.css('text-transform', '') : '';
                });

                self.$eNombCurva.on('focusin', function() {
                    self.$eNombCurva.css('text-transform', 'uppercase');
                });
                
                self.$eNombCurva.on('focusout', function() {
                    u.camposObligatorios([self.$eNombCurva], '4');
                    
                    (self.$eNombCurva.val() === '') ? self.$eNombCurva.css('text-transform', '') : '';
                });
                
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
                
                self.$tiempoCurva.on('focusout', function() {
                    u.camposObligatorios([self.$tiempoCurva], '4');
                });
                
                self.$eTiempCurva.on('focusout', function() {
                    u.camposObligatorios([self.$eTiempCurva], '4');
                });
                
                self.$llenadoCurva.on('focusout', function() {
                    u.camposObligatorios([self.$llenadoCurva], '4');
                });
                
                self.$eLlenadCurva.on('focusout', function() {
                    u.camposObligatorios([self.$eLlenadCurva], '4');
                });
                
                self.$rinseCurva.on('focusout', function() {
                    u.camposObligatorios([self.$rinseCurva], '4');
                });
                
                self.$eRinseCurva.on('focusout', function() {
                    u.camposObligatorios([self.$eRinseCurva], '4');
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
                
                u.limpiarCampos([self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva]);
                
                self.pintarCamposObligatorios();
            },
            
            pintarCamposObligatorios: function() {
              var self = this;
              
              u.camposObligatorios([self.$nomCurva, self.$tiempoCurva, self.$llenadoCurva, self.$rinseCurva, self.$cbxListaCheck], '1');
            },
            
            mensajeModalAndGritter: function(m) {
                var self = this;
                
                if (m.tipo === 'modal') {
                
                    try {
                        self.$tituloMensaje.text(m.titulo);
                        self.$cuerpoMensaje.text(m.mensaje);
                        self.$modalMensaje.modal("show");
                    } catch (e) {
                        alert(m.mensaje);
                    }
                    
                } else if (m.tipo === 'gritter') {
                
                    if (m.clase === '') {
                        $.gritter.add({
                            title: m.titulo,
                            text: m.mensaje,
                            sticky: false,
                            time: ''
                        });
                    } else {
                        $.gritter.add({
                            title: m.titulo,
                            text: m.mensaje,
                            class_name: m.clase,
                            sticky: false,
                            time: ''
                        });
                    }
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
                    
                    var campObligQuim = u.camposObligatorios([self.$eCbxListaCheck], '4');
                    
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
                        u.camposObligatorios([self.$eCbxListaCheck], '4');
                    }
                });
            },
            
            desplegarLista: function() {
                var self = this;
                
                self.$tBodyNewListCheck.on('click', '#btnPlus', function(e) {
                    e.preventDefault();
                    
                    var lista = $(this).closest('dl').find('dd');
                    
                    $('dd').not(lista).slideUp('fast');
                    $('dd').not(lista).closest('dl').find('i').removeClass('fa-minus-square');

                    $(this).find('i').toggleClass('fa-minus-square');
                    
                    lista.slideToggle('fast');
                });
                
                self.$eTBodyNewListCheck.on('click', '#btnPlus', function(e) {
                    e.preventDefault();
                    
                    var lista = $(this).closest('dl').find('dd');
                    
                    $('dd').not(lista).slideUp('fast');
                    $('dd').not(lista).closest('dl').find('i').removeClass('fa-minus-square');

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
                        var n = self.$nomCurva.val().trim();
                        self.consultarNombresCurva(n.toUpperCase(), 'nuevo', 0);
                    }
                });
                
                self.$eBtnModificar.on("click", function(e) {
                    e.preventDefault();
                    
                    var elementos = [self.$eNombCurva, self.$eTiempCurva, self.$eLlenadCurva, self.$eRinseCurva, self.$eTextArea];
                    var campOblig = u.camposObligatorios(elementos, '2');

                    if (campOblig) {
                        var n = self.$eNombCurva.val().trim();
                        
                        self.consultarNombresCurva(n.toUpperCase(), 'editar', self.idCurva);
                    }
                });
            },
            
            consultarNombresCurva: function(n, t, i) {
                var self = this;

                $.get(self.UrlCurvas + 'buscarNombre', {
                    nombre: n,
                    tipo: t,
                    idMaestro: i
                }, function(res) {
                    if (t === 'nuevo') {
                        self.agregarCurva(res);
                    } else {
                        self.solicitarModificarCurva(res);
                    }

                }).fail(function(res, status, er){
                    self.errorDeConexion(res, status, er, 'curvas/buscarNombre');
                });
            },
            
            agregarCurva: function(res) {
                var self = this;

                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Curva Existente.',
                        mensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                    });
                
                } else if (!res) {
                    var usuario = JSON.parse(sessionStorage.user);
                    var nombre = self.$nomCurva.val().trim();
                    var tiempo = self.$tiempoCurva.val();
                    var llenado = self.$llenadoCurva.val();
                    var rinse = self.$rinseCurva.val();
                    
                    self.obtenerDatosTablaCurva($('#tableNewListCheck'));
                    
                    var datos = {};
                    datos.nomCurva = nombre.toUpperCase();
                    datos.tiempoCurva = tiempo;
                    datos.llenadoCurva = llenado;
                    datos.rinseCurva = rinse;
                    datos.checkList = self.idListaCheck;
                    datos.idUsuario = usuario.idUsuario.idPersonal;
                    
                    $.get(self.UrlCurvas + 'guardar', {
                        datos: JSON.stringify(datos)
                    }, function(res){
                        if (res) {
                            self.mensajeModalAndGritter({
                                tipo: 'gritter',
                                titulo: 'curvas/guardar',
                                mensaje: '¡Se guardó la curva.!',
                                clase: "growl-success",
                            });
                            
                            $.get(self.UrlCurvas + 'listadoCurvas', function(res) {
                                self.cargarDatos(res, 'c');

                            }).fail(function(res, status, er){
                                self.errorDeConexion(res, status, er, 'curvas/listadoCurvas');
                            });
                            
                            self.limpiarFormulario();
                            
                        } else if (!res) {
                            self.mensajeModalAndGritter({
                                tipo: 'gritter',
                                titulo: 'curvas/guardar',
                                mensaje: '¡No se guardó la curva.!',
                                clase: 'growl-danger'
                            });
                        }
                        
                    }).fail(function(res, status, er) {
                        self.errorDeConexion(res, status, er, 'curvas/guardar');
                    });                    
                }
            },
            
            obtenerDatosTablaCurva: function(tabla) {
                var self = this;
            
                $(tabla).find('tbody tr').each(function(index) {
                    if (index > 0) {
                        $(this).children('td').each(function(index2) {
                            switch (index2) {
                                case 0: //Id Lista Chequeo
                                    if (self.idListaCheck === '') {
                                        self.idListaCheck = $(this).text();
                                    } else {
                                        self.idListaCheck += "-" + $(this).text();
                                    }
                                    break;
                            }
                        });
                    }
                });
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
            
            solicitarModificarCurva: function(res) {
                var self = this;
                
                if (res) {
                    self.mensajeModalAndGritter({
                        tipo: 'modal',
                        titulo: 'Nombre de Curva Existente.',
                        mensaje: 'Ya existe una curva con ese nombre, por favor intente nuevamente.'
                    });
                
                } else if (!res) {
                    self.idListaCheck = '';
                    var idListaCheck = '';
                    var nombre = self.$eNombCurva.val().trim();
                    var tiempo = self.$eTiempCurva.val();
                    var llenado = self.$eLlenadCurva.val();
                    var rinse = self.$eRinseCurva.val();
                    var j = 0;
                    
                    var coment = self.$eTextArea.val();
                    
                    for (var i = 0; i < self.oCurvas.length; i++) {
                        if (self.oCurvas[i].idCurva === parseInt(self.idCurva)) {
                            j = i;
                            idListaCheck = self.oCurvas[i].checkList.split('-');                            
                            break;
                        }
                    }
                    
                    self.obtenerDatosTablaCurva($('#eTableNewListCheck'));
                    
                    var idListaCheckN = self.idListaCheck.split('-');
                    var c = 0;
                    
                    for (var k = 0; k < idListaCheck.length; k++) {
                        for (var x = 0; x < idListaCheckN.length; x++) {
                            if (idListaCheckN[x] !== idListaCheck[k]) {
                                c++;
                                break;
                            }
                        }
                    }
                    
                    if (c > 0) {
                        var usuario = JSON.parse(sessionStorage.user);
                        var datos = {};
                        datos.idCurva = self.idCurva;
                        datos.nomCurva = nombre.toUpperCase();
                        datos.tiempoCurva = tiempo;
                        datos.llenadoCurva = llenado;
                        datos.rinseCurva = rinse;
                        datos.checkList = (c === 0) ? self.oCurvas[j].checkList : self.idListaCheck;
                        datos.idUsuario = usuario.idUsuario.idPersonal;
                        
                        $.get(self.UrlCurvas + 'editar', {
                            datos: JSON.stringify(datos)
                        }, function(res) {
                            if (res) {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'curvas/editar',
                                    mensaje: '¡Se modificó la curva.!'
                                });
                                
                                $.get(self.UrlCurvas + 'listadoCurvas', function(res) {
                                    self.cargarDatos(res, 'c');

                                }).fail(function(res, status, er){
                                    self.errorDeConexion(res, status, er, 'curvas/listadoCurvas');
                                });
                                
                                self.$eBtnCerrar.click();

                            } else {
                                self.mensajeModalAndGritter({
                                    tipo: 'gritter',
                                    titulo: 'curvas/editar',
                                    mensaje: '¡No se modificó la curva.!',
                                    clase: 'growl-danger'
                                });
                            }
                        }).fail(function(res, status, er) {
                            self.errorDeConexion(res, status, er, 'curvas/editar');
                        });
                    } else {
                        self.mensajeModalAndGritter({
                            tipo: 'gritter',
                            titulo: 'curvas/editar',
                            mensaje: '¡No hay datos a modificar.!',
                            clase: 'growl-warning'                            
                        });
                    }
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
            
            errorDeConexion: function(res, status, er, serv) {
                var self = this;
                self.mensajeModalAndGritter({
                    tipo: 'gritter',
                    titulo: 'Servicio: ' + serv,
                    mensaje: 'status: ' + status + ' er: ' + er,
                    clase: 'growl-danger'
                });
            }
        };
    })();

    frmCurva.init();

})(document, window, jQuery)