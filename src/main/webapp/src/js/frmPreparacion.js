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
            quimicosPorPrep: [],
            idPreparacion: 0,
            
            init: function() {
                this.inhabilitarCampos();
                this.cargarCoincidenciaProductoQuimico();
                this.formatoInput();
                this.metodosUtiles();
                this.limpiarFormulario();
                this.pintarCamposObligatorios();
                this.agregarLineaPreparacion();
                this.borrarLineaPreparacion();
                this.agregarPreparacion();
                this.verPreparacion();
                this.modificarQuimicoPreparacion();
            },
            cargarDatos: function(dato, opc) {
                var self = this;
                var data = JSON.parse(dato);
                var elementos = [];
                
                if (opc === 'f') {
                    self.oFibras = data;
                    elementos.push(self.$cbxfibraPrep);
                    //elementos.push(self.$eCbxfibraPrep);
                    
                    u.cargarComboBox(elementos, self.oFibras);
                    //self.cargarComboBox();
                }

                if (opc === 'q') {
                    self.oQuimicos = data;
                    self.cargarCodigoYnombreProductoQuimico();
                }

                if (opc === 'pr') {
                    self.oPreparaciones = data;
                    u.renderDataTables(self.$dataTablePreparacion, self.oPreparaciones);
                    //self.iniciarDataTables();
                }

                if (opc === 'npr') {
                    if (data !== null) {
                        self.oPreparaciones = "";
                        self.oPreparaciones = data;
                        self.destruirDataTable();
                    }
                }

                if (opc === 'preparacion') {
                    self.$idPrep.val(data.code);
                }
            },
            
            destruirDataTable: function() {
                var self = this;
                var tabla = self.$dataTablePreparacion.dataTable();

                tabla.fnDestroy();
                $('#dataTablePreparacion tr:gt(0)').remove();

                self.limpiarFormulario();
                self.iniciarDataTables();
                self.pintarCamposObligatorios();
            },
            
            iniciarDataTables: function() {
                var self = this;
                var i;

                for (i = 0; i < self.oPreparaciones.length; i++) {
                    self.oPreparaciones[i].btnView = '<div class="form-group col-md-5">' +
                                                        '<button id="btnViewPrep" title="Ver/Editar" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                                            '<i class="glyphicon glyphicon-eye-open"></i>' +
                                                        '</button>' +
                                                     '</div>';
                }

                $(self.$dataTablePreparacion).dataTable({
                    data: self.oPreparaciones,
                    columns: [
                        {data: 'idNomPreparacion', className: 'center'},
                        {data: 'nomPreparacion', className: 'left'},
                        {data: 'idFibra.codFibra', className: 'center'},
                        {data: 'costoPreparacion', className: 'right'},
                        {data: 'fechaUso', className: 'center'},
                        {data: 'btnView'}
                    ],
                    sPaginationType: 'full_numbers',
                    bAutoWidth: false
                });
            },
            inhabilitarCampos: function() {
                var self = this;

                self.$btnSavePrep.attr('disabled', true);
            },
            cargarComboBox: function() {
                var self = this;

                $(self.$cbxfibraPrep).empty();
                self.$eCbxfibraPrep.empty();

                var option = document.createElement('option');
                var option2 = document.createElement('option');

                $(option).text("Seleccione una...");
                $(option2).text("Seleccione una...");

                $(self.$cbxfibraPrep).append(option);
                self.$eCbxfibraPrep.append(option2);

                self.oFibras.forEach(function(fibra) {
                    if (fibra.nomFibra !== "") {
                        option = document.createElement('option');
                        option2 = document.createElement('option');

                        $(option).text(fibra.nomFibra);
                        $(option2).text(fibra.nomFibra);

                        self.$cbxfibraPrep.append(option);
                        self.$eCbxfibraPrep.append(option2);
                    }
                });
            },
            cargarCodigoYnombreProductoQuimico: function() {
                var self = this;

                self.oQuimicos.forEach(function(quimico) {
                    var optCodQ = document.createElement('option');
                    var optCodQ2 = document.createElement('option');
                    var optNomQ = document.createElement('option');
                    var optNomQ2 = document.createElement('option');

                    optCodQ.value = quimico.codProduct;
                    optCodQ2.value = quimico.codProduct;

                    optNomQ.value = quimico.nomProducto;
                    optNomQ2.value = quimico.nomProducto;

                    self.$dlCodQuimPrep.append(optCodQ);
                    self.$eDlCodQuimPrep.append(optCodQ2);

                    self.$dlNomQuimPrep.append(optNomQ);
                    self.$eDlNomQuimPrep.append(optNomQ2);
                });
            },
            cargarCoincidenciaProductoQuimico: function() {
                var self = this;
                var data = [];

                $(self.$codQuimPrep).on("keyup keypress change", function() {
                    self.$nomQuimPrep.val("");

                    if (self.$codQuimPrep.val() !== "" && self.$codQuimPrep.val().length >= 4) {
                        data = self.buscarCoincidenciaProductosQuimicos('cod', self.$codQuimPrep.val());
                        if (data != null) {
                            self.$nomQuimPrep.val(data.nomProducto);

                            if (data.codUndMedida.idUndMedida === 2) {
                                self.$cantGrLtPrep.attr('disabled', false);
                                self.$cantPctjPrep.val("");
                                self.$cantPctjPrep.attr('disabled', true);
                            } else if (data.codUndMedida.idUndMedida === 5) {
                                self.$cantGrLtPrep.val("");
                                self.$cantGrLtPrep.attr('disabled', true);
                                self.$cantPctjPrep.attr('disabled', false);
                            }
                        }
                    }
                });

                $(self.$nomQuimPrep).on('keyup keypress change', function() {
                    self.$codQuimPrep.val("");

                    if (self.$nomQuimPrep.val() !== "" && self.$nomQuimPrep.val().length >= 4) {
                        data = self.buscarCoincidenciaProductosQuimicos("nom", self.$nomQuimPrep.val());
                        if (data != null) {
                            self.$codQuimPrep.val(data.codProduct);

                            if (data.codUndMedida.idUndMedida === 2) {
                                self.$cantGrLtPrep.attr('disabled', false);
                                self.$cantPctjPrep.val("");
                                self.$cantPctjPrep.attr('disabled', true);
                            } else if (data.codUndMedida.idUndMedida === 5) {
                                self.$cantGrLtPrep.val("");
                                self.$cantGrLtPrep.attr('disabled', true);
                                self.$cantPctjPrep.attr('disabled', false);
                            }
                        }
                    }
                });

                $(self.$eCodQuimPrep).on('keyup keypress change', function() {
                    self.$eNomQuimPrep.val("");

                    if (self.$eCodQuimPrep.val() !== "" && self.$eCodQuimPrep.val().length >= 4) {
                        data = self.buscarCoincidenciaProductosQuimicos("cod", self.$eCodQuimPrep.val());
                        if (data != null) {
                            self.$eNomQuimPrep.val(data.nomProducto);

                            if (data.codUndMedida.idUndMedida === 2) {
                                self.$eCantGrLtPrep.attr('disabled', false);
                                self.$eCantPctjPrep.val("");
                                self.$eCantPctjPrep.attr('disabled', true);
                            } else if (data.codUndMedida.idUndMedida === 5) {
                                self.$eCantGrLtPrep.val("");
                                self.$eCantGrLtPrep.attr('disabled', true);
                                self.$eCantPctjPrep.attr('disabled', false);
                            }
                        }
                    }
                });

                $(self.$eNomQuimPrep).on('keyup keypress change', function() {
                    self.$eCodQuimPrep.val("");

                    if (self.$eNomQuimPrep.val() !== "" && self.$eNomQuimPrep.val().length >= 4) {
                        data = self.buscarCoincidenciaProductosQuimicos("nom", self.$eNomQuimPrep.val());
                        if (data != null) {
                            self.$eCodQuimPrep.val(data.codProduct);

                            if (data.codUndMedida.idUndMedida === 2) {
                                self.$eCantGrLtPrep.attr('disabled', false);
                                self.$eCantPctjPrep.val("");
                                self.$eCantPctjPrep.attr('disabled', true);
                            } else if (data.codUndMedida.idUndMedida === 5) {
                                self.$eCantGrLtPrep.val("");
                                self.$eCantGrLtPrep.attr('disabled', true);
                                self.$eCantPctjPrep.attr('disabled', false);
                            }
                        }
                    }
                });
            },
            buscarCoincidenciaProductosQuimicos: function(tipo, quimico) {
                var self = this;
                var dato = null;

                if (tipo === 'cod') {
                    self.oQuimicos.forEach(function(data) {
                        if (data.codProduct === quimico) {
                            dato = data;
                        }
                    });
                } else if (tipo === 'nom') {
                    self.oQuimicos.forEach(function(data) {
                        if (data.nomProducto === quimico) {
                            dato = data;
                        }
                    });
                }
                return dato;
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
                var numbers;
                var cadena;

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
              
              co.camposObligatorios(campos, '1');
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
            cantidadDeProductoQuimico: function(data) {
                var self = this;
                var aNum = data.val.split(",", 3);
                var aux;
                var millones;
                var miles;
                var cientos;
                var decimas;

                if (data.input === "grlt") {
                    if (aNum.length === 3) {
                        millones = aNum[0];
                        miles = aNum[1];
                        aux = aNum[2].split(".", 3);
                        cientos = aux[0];
                        decimas = aux[1];
                    } else if (aNum.length === 2) {
                        miles = aNum[0];
                        aux = aNum[1].split(".", 3);
                        cientos = aux[0];
                        decimas = aux[1];
                    } else if (aNum.length === 1) {
                        aux = aNum[0].split(".", 3);
                        cientos = aux[0];
                        decimas = aux[1];
                    }

                    millones = parseFloat(millones);
                    miles = parseFloat(miles);
                    cientos = parseFloat(cientos);
                    decimas = parseFloat(decimas);

                    return false;
                } else {
                    if (aNum.length > 1) {
                        return true;
                    } else if (aNum.length === 1) {
                        aux = aNum[0].split(".", 3);
                        cientos = aux[0];
                        decimas = aux[1];
                    }

                    cientos = parseFloat(cientos);
                    decimas = parseFloat(decimas);

                    if (cientos > 100) {
                        return true;
                    } else if (cientos === 100 && decimas > 0) {
                        return true;
                    } else {
                        return false;
                    }
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

                    campObligQuim = co.camposObligatorios(campos, '2');

                    var b = true;

                    if (self.cantidadDeProductoQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Gramos por Litro', cuerpoMensaje: '...'});

                    } else if (self.cantidadDeProductoQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'});
                    }

                    if (b && campObligQuim) {
                        if (!self.noRepetirQuimicos("+", self.$codQuimPrep.val())) {
                            var fila = document.createElement('tr');
                            var codQuim = document.createElement('td');
                            var nomQuim = document.createElement('td');
                            var cantGrLt = document.createElement('td');
                            var cantPctj = document.createElement('td');
                            var btnDel = document.createElement('td');
                        
                            codQuim.textContent = self.$codQuimPrep.val();
                            $(codQuim).attr('style', 'text-align: center');

                            nomQuim.textContent = self.$nomQuimPrep.val();

                            cantGrLt.textContent = self.$cantGrLtPrep.val();
                            $(cantGrLt).attr('style', 'text-align: center');

                            cantPctj.textContent = self.$cantPctjPrep.val();
                            $(cantPctj).attr('style', 'text-align: center');

                            btnDel.innerHTML = '<div class="form-group col-md-12">' +
                                                    '<button type="button" class="btn" id="btnDelLineaPrep">' +
                                                        '<i class="fa fa-trash-o"></i>' +
                                                    '</button>' +
                                               '</div>';

                            $(fila).append(codQuim);
                            $(fila).append(nomQuim);
                            $(fila).append(cantGrLt);
                            $(fila).append(cantPctj);
                            $(fila).append(btnDel);

                            self.$tBodyNewQPreparacion.append(fila);

                            self.$codQuimPrep.val("");
                            self.$nomQuimPrep.val("");
                            self.$cantGrLtPrep.val("");
                            self.$cantPctjPrep.val("");

                            self.$btnSavePrep.attr('disabled', false);
                        }
                    }
                });
            },
            borrarLineaPreparacion: function() {
                var self = this;
                
                self.$dataTableNewQPreparacion.on('click', '#btnDelLineaPrep', function(e) {
                    var fila = $(this).closest('tr');
                    fila.remove();
                    
                    self.noRepetirQuimicos("-", fila[0].cells[0].textContent);

                    if ($('#dataTableNewQPreparacion tbody tr').length - 1 == 0) {
                        self.$btnSavePrep.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
            },
            noRepetirQuimicos: function(tipo, codQuimico) {
                var self = this;
                var existe = false;

                if (tipo === "+") {

                    for (var i = 0; i < self.quimicosPorPrep.length; i++) {
                        if (self.quimicosPorPrep[i] === codQuimico) {
                            existe = true;
                            break;
                        }
                    }

                    if (existe) {
                        self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                    } else {
                        self.quimicosPorPrep.push(codQuimico);
                    }

                } else if (tipo === "-") {
                    for (var i = 0; i < self.quimicosPorPrep.length; i++) {
                        if (self.quimicosPorPrep[i] === codQuimico) {
                            if (i === 0) {
                                self.quimicosPorPrep.splice(0, 1);
                            } else {
                                self.quimicosPorPrep.splice(i, i);
                                break;
                            }
                        }
                    }
                }

                return existe;
            },
            agregarPreparacion: function() {
                var self = this;

                self.$btnSavePrep.on("click", function(e) {
                    e.preventDefault();
                    var campObligPrep = false;
                    var campos = [];
                    
                    campos.push(self.$nomPrep);
                    campos.push(self.$cbxfibraPrep);

                    campObligPrep = co.camposObligatorios(campos, '2');

                    var b = true;

                    if (self.cantidadDeProductoQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                    } else if (self.cantidadDeProductoQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                    }

                    if (b && campObligPrep) {

                        $.ajax({
                            url: '../ServletPreparaciones',
                            type: 'GET',
                            dataType: 'text',
                            data: {
                                accion: 'buscarNombre',
                                nombre: self.$nomPrep.val() + " (" + self.$cbxfibraPrep.val() + ")"
                            },
                            success: function(data) {
                                var response = JSON.parse(data);

                                if (response === 'true') {

                                    self.mensajeObligatoriedad({
                                        titulo: 'Nombre de Preparación Existente.',
                                        cuerpoMensaje: 'Ya hay un nombre de preparación para la fibra seleccionada, por favor intente nuevamente.'
                                    });

                                } else if (response === 'false') {

                                    var datos = new Object();
                                    datos.nomPrep = null;
                                    datos.idFib = null;
                                    datos.codQuimico = null;
                                    datos.cantGr = null;
                                    datos.cantPtj = null;

                                    $('#dataTableNewQPreparacion tbody tr').each(function(index) {
                                        if (index > 0) {
                                            $(this).children('td').each(function(index2) {
                                                switch (index2) {
                                                    case 0: //Código Quimico
                                                        if (datos.codQuimico === null) {
                                                            datos.codQuimico = $(this).text();
                                                        } else {
                                                            datos.codQuimico += ";" + $(this).text();
                                                        }
                                                        break;
                                                    case 1: //Nombre Quimico                                            
                                                        break;
                                                    case 2: //Cantidad Gr
                                                        if (datos.cantGr === null) {
                                                            datos.cantGr = $(this).text();
                                                        } else {
                                                            datos.cantGr += ";" + $(this).text();
                                                        }
                                                        break;
                                                    case 3: //Cantidad Porcentaje
                                                        if (datos.cantPtj === null) {
                                                            datos.cantPtj = $(this).text();
                                                        } else {
                                                            datos.cantPtj += ";" + $(this).text();
                                                        }
                                                        break;
                                                }
                                            });
                                        }
                                    });

                                    datos.codQuimico = datos.codQuimico.split(";");
                                    datos.cantGr = datos.cantGr.split(";")
                                    datos.cantPtj = datos.cantPtj.split(";");

                                    datos.nomPrep = self.$nomPrep.val() + " (" + self.$cbxfibraPrep.val() + ")";

                                    for (var i = 0; self.oFibras.length; i++) {
                                        if (self.oFibras[i].nomFibra === self.$cbxfibraPrep.val()) {
                                            datos.idFib = "" + self.oFibras[i].idFibra;
                                            break;
                                        }
                                    }
                                    consultas.guardarNuevaPreparacion(datos);
                                }
                            },
                            error: function(response, status, er) {
                                console.log("error: " + response + " status: " + status + " er:" + er);
                            }
                        });
                    }
                });
            },
            verPreparacion: function() {
                var self = this;

                $(document).on('click', '#btnViewPrep', function (e) {
                    self.idPreparacion = 0;
                    var fila = $(this).closest('tr');
                    var id = fila[0].cells[0].textContent;
                    var trTemplate = '<tr>' +
                                        '<td style="text-align: center">:eCodQuimPrep:</td>' +
                                        '<td>:eNomQuimPrep:</td>' +
                                        '<td style="text-align: center">:eCantGrLtPrep:</td>' +
                                        '<td style="text-align: center">:eCantPctjPrep:</td>' +
                                        '<td>' +
                                            '<div class="form-group col-md-12">' +
                                                '<button type="button" class="btn" id="eBtnDelLineaPrep">' +
                                                    '<i class="fa fa-trash-o"></i>' +
                                                '</button>' +
                                            '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div class="form-group col-md-12">' +
                                                '<button type="button" class="btn" id="eBtnEditLineaPrep">' +
                                                    '<span class="glyphicon glyphicon-edit"></span>' +
                                                '</button>' +
                                            '</div>' +
                                        '</td>' +
                                     '</tr>';

                    self.idPreparacion = parseInt(id);

                    $("#tableEditPrep tr:gt(1)").remove();
                    self.quimicosPorPrep = [];

                    for (var i = 0; i < self.oPreparaciones.length; i++) {
                        if (self.oPreparaciones[i].idNomPreparacion === self.idPreparacion) {
                            self.$eNomPrep.val(self.nombrePreparacionModificacion({
                                nombre: self.oPreparaciones[i].nomPreparacion,  
                                fibra: self.oPreparaciones[i].idFibra.nomFibra
                            }));
                            
                            self.$eCbxfibraPrep.val(self.oPreparaciones[i].idFibra.nomFibra);

                            for (var j = 0; j < self.oPreparaciones[i].preparacionCollection.length; j++) {
                                for (var k = 0; k < self.oQuimicos.length; k++) {

                                    if (self.oPreparaciones[i].preparacionCollection[j].codQuimico === self.oQuimicos[k].codProduct) {
                                        self.noRepetirQuimicos('+', self.oPreparaciones[i].preparacionCollection[j].codQuimico);
                                        var newTr = trTemplate
                                            .replace(':eCodQuimPrep:', self.oPreparaciones[i].preparacionCollection[j].codQuimico)
                                            .replace(':eCantGrLtPrep:', self.oPreparaciones[i].preparacionCollection[j].cantGr)
                                            .replace(':eCantPctjPrep:', self.oPreparaciones[i].preparacionCollection[j].cantPtj)
                                            .replace(':eNomQuimPrep:', self.oQuimicos[k].nomProducto);
                                        break;
                                    }
                                }
                                self.$tBodyEditPrep.append($(newTr));
                            }
                            break;
                        }
                    }
                    self.$modalEditPrep.modal("show");

                    e.stopPropagation();
                });
            },
            
            nombrePreparacionModificacion: function(prep) {
                return prep.nombre.substring(0, (prep.nombre.length - (prep.fibra.length + 3)));
            },
            
            modificarQuimicoPreparacion: function() {
                var self = this;
                
                $(document).on('click', '#eBtnDelLineaPrep', function (e){
                    var fila = $(this).closest('tr');
                    fila.remove();

                    self.noRepetirQuimicos("-", fila[0].cells[0].textContent);

                    if ($('#dataTableNewQPreparacion tbody tr').length - 1 == 0) {
                        self.$btnSavePrep.attr('disabled', true);
                    }
                    e.stopPropagation();
                });
                
                $(document).on('click', '#eBtnEditLineaPrep', function (e) {
                    var fila = $(this).closest('tr');
                    
                    e.stopPropagation();
                });
                
                self.$eBtnAddLineaPrep.on('click', function(e) {
                    e.preventDefault();
                    var campObligQuim = false;
                    var campos = [];
                    
                    campos.push(self.$eCodQuimPrep);
                    campos.push(self.$eNomQuimPrep);
                    campos.push(self.$eCantGrLtPrep);
                    campos.push(self.$eCantPctjPrep);

                    campObligQuim = co.camposObligatorios(campos, '2');

                    var b = true;

                    if (self.cantidadDeProductoQuimico({val: self.$cantGrLtPrep.val(), input: 'grlt'})) {
                        b = false;
                        self.mensajeObligatoriedad({
                            titulo: 'Unidad de Medida Gramos por Litro',
                            cuerpoMensaje: '...'
                        });

                    } else if (self.cantidadDeProductoQuimico({val: self.$cantPctjPrep.val(), input: 'pctj'})) {
                        b = false;
                        self.mensajeObligatoriedad({
                            titulo: 'Unidad de Medida Porcentaje por Kilo',
                            cuerpoMensaje: 'El porcentaje debe estar entre 0.00001 y 100.00000.'
                        });
                    }

                    if (b && campObligQuim) {
                        if (!self.noRepetirQuimicos("+", self.$eCodQuimPrep.val())) {
                            var trTemplate = '<tr>' +
                                                '<td style="text-align: center">:eCodQuimPrep:</td>' +
                                                '<td>:eNomQuimPrep:</td>' +
                                                '<td style="text-align: center">:eCantGrLtPrep:</td>' +
                                                '<td style="text-align: center">:eCantPctjPrep:</td>' +
                                                '<td>' +
                                                    '<div class="form-group col-md-12">' +
                                                        '<button type="button" class="btn" id="eBtnDelLineaPrep">' +
                                                            '<i class="fa fa-trash-o"></i>' +
                                                        '</button>' +
                                                    '</div>' +
                                                '</td>' +
                                             '</tr>';
                            //AQUI <>
                            var newFila = trTemplate
                                .replace(':eCodQuimPrep:', self.$eCodQuimPrep.val())
                                .replace(':eNomQuimPrep:', self.$eNomQuimPrep.val())
                                .replace(':eCantGrLtPrep:', self.$eCantGrLtPrep.val())
                                .replace(':eCantPctjPrep:', self.$eCantPctjPrep.val());

                            self.$tBodyEditPrep.append($(newFila));

                            self.$eCodQuimPrep.val("");
                            self.$eNomQuimPrep.val("");
                            self.$eCantGrLtPrep.val("");
                            self.$eCantPctjPrep.val("");
                        }
                    }
                });
            },
            
            solicitarModificarPreparacion: function() {
                var self = this;
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