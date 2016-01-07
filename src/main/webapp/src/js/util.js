(function(document, window, $, undefined) {
    (function() {
        return u = {
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            
            cargarComboBox: function(oCbx, oDatos) {
                var self = this;
                var option = document.createElement('option');
                var $option2 = $('option');
                
                for (var i = 0; i < oCbx.length; i++) {
                    oCbx[i].empty();
                    
                    $(option).text('Seleccione una...');
                    
                    oCbx[i].append(option);
                    
                    oDatos.forEach(function(fibra){
                        if (fibra.nomFibra !== "") {
                            option = document.createElement('option');
                            $(option).text(fibra.nomFibra);
                            oCbx[i].append(option);
                        }
                    })
                    
                }
            },
            
            renderDataTables: function(tabla, oDatos) {
                var i;

                for (i = 0; i < oDatos.length; i++) {
                    oDatos[i].btnView = '<div class="form-group col-md-5">' +
                                            '<button id="btnViewPrep" title="Ver/Editar" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                                '<i class="glyphicon glyphicon-eye-open"></i>' +
                                            '</button>' +
                                       '</div>';
                }

                $(tabla).dataTable({
                    data: oDatos,
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
            camposObligatorios: function(campos, estado) {
                var self = this;
                var vacios = 0;

                if (!$.isEmptyObject(campos)) {
                    var resp = true;
                    vacios = campos.length;

                    if (estado === '1') {

                        for (var i = 0; i < campos.length; i++) {
                            campos[i].closest('.form-group').removeClass('has-success').addClass('has-error');
                        }

                    } else if (estado === '2') {

                        for (var i = 0; i < campos.length; i++) {
                            if ($(campos[i][0]).attr('disabled')) {
                                campos[i].closest('.form-group').removeClass('has-error has-success');
                                vacios--;
                            } else if ($(campos[i][0]).val() !== "" && $(campos[i][0]).val() !== "Seleccione una...") {
                                campos[i].closest('.form-group').removeClass('has-error').addClass('has-success');
                                vacios--;
                            } else {
                                campos[i].closest('.form-group').removeClass('has-success').addClass('has-error');
                            }
                        }

                        if (vacios > 0) {
                            resp = false;

                            self.mensajeObligatoriedad({
                                titulo: 'Campos obligatorios',
                                cuerpoMensaje: 'Los campos resaltados con rojo son obligatorios, favor diligenciar el campo.'
                            });
                        }
                    }
                    return resp;
                }
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
            mensajeObligatoriedad: function(mensaje) {
                var self = this;

                try {
                    self.$tituloMensaje.text(mensaje.titulo);
                    self.$cuerpoMensaje.text(mensaje.cuerpoMensaje);
                    self.$modalMensaje.modal("show");
                } catch (e) {
                    alert(mensaje.cuerpoMensaje);
                }
            }
        }
    })();

})(document, window, jQuery)