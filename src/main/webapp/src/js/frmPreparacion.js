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
                this.coincidenciaQuimico();
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
                    um.cargarComboBox(elementos, self.oFibras);
                }

                if (opc === 'q') {
                    self.oQuimicos = data;
                    elementos.push(self.$dlCodQuimPrep);
                    elementos.push(self.$dlNomQuimPrep);
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
                    var elementos = [];
                    elementos.push(self.$codQuimPrep);
                    elementos.push(self.$nomQuimPrep);
                    elementos.push(self.$cantGrLtPrep);
                    elementos.push(self.$cantPctjPrep);

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
                        
                        var d = um.noRepetirQuimicos({tipo: '+', codQ: self.$codQuimPrep.val(), maestro: 'prep', codQpermitido: '1550'}, self.quimicosPorPrep); 
                        if (!d.existe) {
                            
                            self.quimicosPorPrep.push(self.$codQuimPrep.val());
                            
                            um.agregarLinea(self.$tBodyNewQPreparacion, {
                                tipo: 'nuevo',
                                codQuim: self.$codQuimPrep.val(),
                                nomQuim: self.$nomQuimPrep.val(),
                                cantGrLt: self.$cantGrLtPrep.val(),
                                cantPctj: self.$cantPctjPrep.val()
                            });
                            
                            self.$codQuimPrep.val("");
                            self.$nomQuimPrep.val("");
                            self.$cantGrLtPrep.val("");
                            self.$cantPctjPrep.val("");

                            self.$btnSavePrep.attr('disabled', false);
                        } else {
                            self.mensajeObligatoriedad({titulo: 'Registro de Químicos',
                            cuerpoMensaje: 'No puede agregar más de una vez un mismo químico.'});
                        }
                    }
                });
            },
            borrarLineaPreparacion: function() {
                var self = this;
                
                self.$dataTableNewQPreparacion.on('click', '#btnDelLineaPrep', function(e) {
                    var fila = $(this).closest('tr');
                    fila.remove();
                    var d = um.noRepetirQuimicos({tipo: '-', codQ: fila[0].cells[0].textContent, maestro: 'prep', codQpermitido: ''}, self.quimicosPorPrep); 
                    
                    self.quimicosPorPrep = d.oQuim;

                    if ($('#dataTableNewQPreparacion tbody tr').length - 1 == 0) {
                        self.$btnSavePrep.attr('disabled', true);
                    }

                    e.stopPropagation();
                });
            },
            agregarPreparacion: function() {
                var self = this;

                self.$btnSavePrep.on("click", function(e) {
                    e.preventDefault();
                    var campObligPrep = false;
                    var campos = [];
                    
                    campos.push(self.$nomPrep);
                    campos.push(self.$cbxfibraPrep);

                    campObligPrep = u.camposObligatorios(campos, '2');

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

                    campObligQuim = u.camposObligatorios(campos, '2');

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