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
                    oElementos[i].val("");
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
            }
        }
    })();

})(document, window, jQuery)