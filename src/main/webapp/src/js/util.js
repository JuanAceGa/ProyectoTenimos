(function(document, window, $, undefined) {
    (function() {
        return u = {
            $modalMensaje: $('#myModal'),
            $tituloMensaje: $('#myModalLabel'),
            $cuerpoMensaje: $('#cuerpoMensaje'),
            
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
                    } 
                    
                    if (estado === '2') {

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
                    
                    if (estado === '3') {
                        for (var i = 0; i < campos.length; i++) {
                            campos[i].closest('.form-group').removeClass('has-error has-success');
                        }
                    }
                    
                    if (estado === '4') {

                        for (var i = 0; i < campos.length; i++) {
                            if ($(campos[i][0]).attr('disabled')) {
                                campos[i].closest('.form-group').removeClass('has-error has-success');
                            } else if ($(campos[i][0]).val() !== "" && $(campos[i][0]).val() !== "Seleccione una...") {
                                campos[i].closest('.form-group').removeClass('has-error');
                            } else {
                                campos[i].closest('.form-group').addClass('has-error');
                            }
                        }
                    }
                    
                    return resp;
                }
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
            
            limpiarCampos: function (oElementos){
                for (var i = 0; i < oElementos.length; i++){
                    oElementos[i].val('');
                }
            }, 
            
            habilitarDeshabilitarCampos: function (oElementos, accion) {
                
                for (var i = 0; i < oElementos.length; i++){
                    if (accion === 'des') { 
                        $(oElementos[i]).attr('disabled', true);
                    } else if (accion === 'hab') {
                        $(oElementos[i]).attr('disabled', false);
                    }
                }
            },
            
            /**
             * Método que sirve para agregar la cantidad de decimales que desea mostrar. Debe enviar un arreglo en formato JSON o simplemente con los valores a formatear.
             * @param {arreglo} oDatos que contiene los números a formatear.
             * @param {entero} decimales corresponde a la cantidad de decimales para el formato.
             * @param {string} tipo si se envía vacío "", se dará formato de decimales en cada posición del arreglo, de lo contrario se dará un manejo especial al tipo de arreglo enviado según el formulario a cargar, es decir para el formulario de Maestro de Preparación, el campo que se debe formatear en el arreglo es oDatos[i].costoPreparacion... por eso es necesario especificar el tipo de formulario en estos casos así: <br> <strong>Maestro Preparacion</strong> "preparacion" <br>, <strong>Maestro Auxiliares</strong> "auxiliar" <br>, <strong>Maestro Procesos Posteriores</strong> "proPosterior".
             * @returns {arreglo} con los datos ya formateados.
             */
            cantidadDecimales: function(oDatos, decimales, tipo) {
                
                if (tipo === '') {
                    
                    for (var i = 0; i < oDatos.length; i++) {
                        oDatos[i] = oDatos[i].toFixed(decimales);
                    }
                    
                } else if (tipo === 'preparacion') {
                    
                    for (var i = 0; i < oDatos.length; i++) {
                        oDatos[i].costoPreparacion = oDatos[i].costoPreparacion.toFixed(decimales);
                    }
                    
                } else if (tipo === 'auxiliar'){
                    
                    for (var i = 0; i < oDatos.length; i++) {
                        oDatos[i].costoAuxiliar = oDatos[i].costoAuxiliar.toFixed(decimales);
                    }
                    
                } else if (tipo === 'proPosterior') {
                    
                    for (var i = 0; i < oDatos.length; i++) {
                        oDatos[i].costoProcPost = oDatos[i].costoProcPost.toFixed(decimales);
                    }
                }
                
                return oDatos;
            }
        }
    })();

})(document, window, jQuery)