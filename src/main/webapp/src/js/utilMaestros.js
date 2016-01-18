(function(document, window, $, undefined) {
    (function() {
        return um = {
            cargarComboBox: function(oCbx, oDatos) {
                var option = document.createElement('option');

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
            
            cargarDataList: function(oElement, oDatos) {
                var optionCodQ;
                var optionNomQ;

                oDatos.forEach(function(quimico) {
                    optionCodQ = document.createElement('option');
                    optionNomQ = document.createElement('option');

                    optionCodQ.value = quimico.codProduct;
                    optionNomQ.value = quimico.nomProducto;

                    oElement[0].append(optionCodQ);
                    oElement[1].append(optionNomQ);
                });
            },
            
            destruirDataTable: function(tabla, t) {
                var self = this;
                tabla.fnDestroy();
                
                if (t === '1') {
                    $('#dataTablePreparacion tr:gt(0)').remove();
                } else if (t === '2') {
                    
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
            
            cargarCoincidenciaProductoQuimico: function(tipo, elemento, oDatos) {
                var self = this;
                var data = [];

                if (elemento[0].val() !== "" && elemento[0].val().length >= 4) {
                    elemento[1].val("");
                    data = self.buscarCoincidenciaProductosQuimicos(tipo, elemento[0].val(), oDatos);
                    if (data != null) {
                        if (tipo === 'cod') {
                            elemento[1].val(data.nomProducto);
                        } else if (tipo === 'nom') {
                            elemento[1].val(data.codProduct);
                        }
                        
                        if (data.codUndMedida.idUndMedida === 2) {
                            elemento[2].attr('disabled', false);
                            elemento[3].val("");
                            elemento[3].attr('disabled', true);
                        } else if (data.codUndMedida.idUndMedida === 5) {
                            elemento[2].val("");
                            elemento[2].attr('disabled', true);
                            elemento[3].attr('disabled', false);
                        }
                    }
                }
            },
            
            buscarCoincidenciaProductosQuimicos: function(tipo, quimico, oDatos) {
                var self = this;
                var dato = null;

                if (tipo === 'cod') {
                    oDatos.forEach(function(data) {
                        if (data.codProduct === quimico) {
                            dato = data;
                        }
                    });
                } else if (tipo === 'nom') {
                    oDatos.forEach(function(data) {
                        if (data.nomProducto === quimico) {
                            dato = data;
                        }
                    });
                }
                return dato;
            },
                
            cantidadDeQuimico: function(data) {
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
                    
                    if ((cientos === 0 && decimas === 0)) {
                        return true;
                    } else if ((cientos === 0 && isNaN(decimas))) {
                        return true;
                    }else {
                        return false;
                    }
                    
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
                    } else if (cientos === 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            
            agregarLinea: function(elemento, oDatos) {
                
                if (oDatos.tipo === 'nuevo'){                    
                    var trTemplate = '<tr>' +
                                        '<td style="text-align: center">:codQuim:</td>' +
                                        '<td>:nomQuim:</td>' +
                                        '<td style="text-align: center">:cantGrLt:</td>' +
                                        '<td style="text-align: center">:cantPctj:</td>' +
                                        '<td>' +
                                            '<div class="form-group col-md-12">' +
                                                '<button type="button" class="btn" id="btnDelLineaPrep">' +
                                                    '<i class="fa fa-trash-o"></i>' +
                                                '</button>' +
                                            '</div>' +
                                        '</td>' +
                                     '</tr>';
                    
                    var newTr = trTemplate
                                    .replace(':codQuim:', oDatos.codQuim)
                                    .replace(':nomQuim:', oDatos.nomQuim)
                                    .replace(':cantGrLt:', oDatos.cantGrLt)
                                    .replace(':cantPctj:', oDatos.cantPctj);
                    
                    elemento.append(newTr);
                    
                } else if (oDatos.tipo === 'editar'){                    
                    if (oDatos.cantGrLt !== '') {
                        elemento[0].cells[2].textContent = oDatos.cantGrLt;
                    } else {
                        elemento[0].cells[3].textContent = oDatos.cantPctj;
                    }
                    
                }
            },
            
            noRepetirQuimicos: function(d, oQuimicos) {
                var existe = false;
                
                if (d.tipo === "+") {
                    if (d.maestro === 'prep') {
                        for (var i = 0; i < oQuimicos.length; i++) {
                            if (oQuimicos[i].codQ === d.codQ) {
                                existe = true;
                                break;
                            }
                        }
                    } else if (d.maestro === 'aux') {
                        for (var i = 0; i < oQuimicos.length; i++) {
                            if ((oQuimicos[i].codQ === d.codQ) && (oQuimicos[i].codQ !== d.codQpermitido)) {
                                existe = true;
                                break;
                            }
                        }
                    }
                    
                } else if (d.tipo === "-") {
                    if (d.maestro === 'prep') {
                        for (var i = 0; i < oQuimicos.length; i++) {
                            if (oQuimicos[i].codQ === d.codQ) {
                                if (i === 0) {
                                    oQuimicos.splice(0, 1);
                                    break;
                                } else {
                                    oQuimicos.splice(i, i);
                                    break;
                                }
                            }
                        }
                    } else if (d.maestro === 'aux') {
                        for (var i = 0; i < oQuimicos.length; i++) {
                            if ((oQuimicos[i].codQ === d.codQ && oQuimicos[i].cant1 === d.cant1 && oQuimicos[i].cant2 === d.cant2)) {
                                if (i === 0) {
                                    oQuimicos.splice(0, 1);
                                    break;
                                } else {
                                    oQuimicos.splice(i, i);
                                    break;
                                }
                            }
                        }
                    }
                }
                return {existe: existe, oQuim: oQuimicos};
            },
            
            guardarRegistro: function(d) {
                var self = this;
                var datos = new Object();
                
                if (d.form === 'prep') {
                    datos.nombre = d.nombre;
                    datos.idFib = d.idFib;
                    datos.codQuimico = null;
                    datos.cantGr = null;
                    datos.cantPtj = null;
                    
                    datos = self.obtenerDatosTabla(d.tabla, datos, 'nuevo');
                    
                    consultas.guardarNuevaPreparacion(datos);
                } else if (d.form === 'aux') {
                    
                }
            },
            
            obtenerDatosTabla: function(tabla, oArr, tipo) {
                
                if (tipo === 'nuevo') {
                    $(tabla).find('tbody tr').each(function(index) {
                        if (index > 0) {
                            $(this).children('td').each(function(index2) {
                                switch (index2) {
                                    case 0: //Código Quimico
                                        if (oArr.codQuimico === null) {
                                            oArr.codQuimico = $(this).text();
                                        } else {
                                            oArr.codQuimico += ";" + $(this).text();
                                        }
                                        break;
                                    case 1: //Nombre Quimico                                            
                                        break;
                                    case 2: //Cantidad Gr
                                        if (oArr.cantGr === null) {
                                            oArr.cantGr = $(this).text();
                                        } else {
                                            oArr.cantGr += ";" + $(this).text();
                                        }
                                        break;
                                    case 3: //Cantidad Porcentaje
                                        if (oArr.cantPtj === null) {
                                            oArr.cantPtj = $(this).text();
                                        } else {
                                            oArr.cantPtj += ";" + $(this).text();
                                        }
                                        break;
                                }
                            });
                        }
                    });

                    oArr.codQuimico = oArr.codQuimico.split(";");
                    oArr.cantGr = oArr.cantGr.split(";");
                    oArr.cantPtj = oArr.cantPtj.split(";");
                
                } else if (tipo === 'editar') {
                    $(tabla).find('tbody tr').each(function(index) {
                        if (index > 0) {
                            var f = {codQuimicoNue: '', cantGrNue: '', cantPtjNue: ''};
                            $(this).children('td').each(function(index2) {
                                switch (index2) {
                                    case 0: //Código Quimico
                                        f.codQuimicoNue = $(this).text();
                                        break;
                                    case 1: //Nombre Quimico                                            
                                        break;
                                    case 2: //Cantidad Gr
                                        f.cantGrNue = $(this).text();
                                        break;
                                    case 3: //Cantidad Porcentaje
                                        f.cantPtjNue = $(this).text();
                                        break;
                                }
                            });
                            oArr.preparacionCollectionNue.push(f);
                        }
                    });
                }
                return oArr;
            },
            
            verRegistro: function(oDatos) {
                var self = this;
                var resp = [];
                var trTemplate = '<tr>' +
                                    '<td style="text-align: center">:codQuim:</td>' +
                                    '<td>:nomQuim:</td>' +
                                    '<td style="text-align: center">:cantGrLt:</td>' +
                                    '<td style="text-align: center">:cantPctj:</td>' +
                                    '<td>' +
                                        '<div class="form-group col-md-12">' +
                                            '<button type="button" class="btn" id="btnDelLineaPrep">' +
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

                if (oDatos.frm === 'prep'){
                    
                    for (var i = 0; i < oDatos.registros.length; i++) {
                        if (oDatos.registros[i].idNomPreparacion === oDatos.idReg) {
                            
                            oDatos.eNombre.val(self.separarNombreDeFibra({
                                nombre: oDatos.registros[i].nomPreparacion,  
                                fibra: oDatos.registros[i].idFibra.nomFibra
                            }));
                            
                            oDatos.eNombreFib.val(oDatos.registros[i].idFibra.nomFibra);

                            for (var j = 0; j < oDatos.registros[i].preparacionCollection.length; j++) {
                                for (var k = 0; k < oDatos.quimicos.length; k++) {

                                    if (oDatos.registros[i].preparacionCollection[j].codQuimico === oDatos.quimicos[k].codProduct) {                                        
                                        resp.push({
                                            codQ: oDatos.registros[i].preparacionCollection[j].codQuimico,
                                            cant1: parseFloat(oDatos.registros[i].preparacionCollection[j].cantGr),
                                            cant2: parseFloat(oDatos.registros[i].preparacionCollection[j].cantPtj)
                                        });
                                        var newTr = trTemplate
                                            .replace(':codQuim:', oDatos.registros[i].preparacionCollection[j].codQuimico)
                                            .replace(':cantGrLt:', oDatos.registros[i].preparacionCollection[j].cantGr)
                                            .replace(':cantPctj:', oDatos.registros[i].preparacionCollection[j].cantPtj)
                                            .replace(':nomQuim:', oDatos.quimicos[k].nomProducto);
                                        break;
                                    }
                                }
                                oDatos.eTabla.append($(newTr));
                            }
                            break;
                        }
                    }
                    oDatos.eModal.modal('show', 'slow');
                    
                } else if (oDatos.frm === 'aux'){
                    
                }
                
                return resp;
            },
            
            separarNombreDeFibra: function(prep) {
                return prep.nombre.substring(0, (prep.nombre.length - (prep.fibra.length + 3)));
            },
            
            modificarRegistro: function(reg, oArr) {
                
                for (var i = 0; i < oArr.length; i++) {
                    if (reg.codQ === oArr[i].codQ) {
                        
                        if (oArr[i].cantGrLt > 0) {
                            if (parseFloat(reg.cantGrLtNue) !== oArr[i].cantGrLt) {
                                oArr[i].tipo = reg.tipo;
                                oArr[i].cantGrLtNue = parseFloat(reg.cantGrLtNue);
                                oArr[i].cantPctjNue = 0;
                            } else {
                                oArr[i].tipo = '';
                                oArr[i].cantGrLtNue = 0;
                                oArr[i].cantPctjNue = 0;
                            }
                        } else {
                            if (parseFloat(reg.cantPctjNue) !== oArr[i].cantPctj) {
                                oArr[i].tipo = reg.tipo;
                                oArr[i].cantGrLtNue = 0;
                                oArr[i].cantPctjNue = parseFloat(reg.cantPctjNue);
                            } else {
                                oArr[i].tipo = '';
                                oArr[i].cantGrLtNue = 0;
                                oArr[i].cantPctjNue = 0;
                            }                            
                        }
                        break;
                    }
                }
                return oArr;
            },
            
            SolicitarModificarRegistro: function(oBas, oQmod, oQnue) {
                var usuario = JSON.parse(sessionStorage.user);
                var datos = new Object();
                datos.idReg = oBas.idPrep;
                datos.nombreReg = oBas.nombre;
                datos.nombreRegNue = oBas.nombreNue;
                datos.idFibra = oBas.idFib;
                datos.idFibraNue = oBas.idFibNue;
                datos.idSolicitante = usuario.idUsuario.idPersonal;
                datos.comentario = oBas.coment;
                datos.quimicoMod = new Array();
                datos.quimicoNue = new Array();
                
                for (var i = 0; i < oQmod.length; i++) {
                    if (oQmod[i].tipo !== '') {
                        datos.quimicoMod.push(oQmod[i]);
                    }
                }
                
                for (var i = 0; i < oQnue.length; i++) {
                    datos.quimicoNue.push(oQnue[i]);
                }
                
                if (datos.nombreRegNue !== '' || datos.idFibraNue !== '' || datos.quimicoMod.length > 0 || datos.quimicoNue.length > 0) {
                    consultas.solicitarModificarPreparacion(datos);
                } else {
                    $.gritter.add({
                        title: "Modificar Registro",
                        text: "¡No hay datos a modificar.!",
                        class_name: "growl-warning",
                        sticky: false,
                        time: ""
                    });
                }
            }
        }
    })();

})(document, window, jQuery)