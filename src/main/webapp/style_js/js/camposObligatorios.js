(function(document, window, $, undefined) {
    (function() {
        return co = {
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