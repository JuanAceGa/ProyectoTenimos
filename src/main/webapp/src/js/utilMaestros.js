(function(document, window, $, undefined) {
    (function() {
        return um = {
            cargarComboBox: function(oCbx, oDatos, frm) {
                
                for (var i = 0; i < oCbx.length; i++) {
                    var option = document.createElement('option');
                    oCbx[i].empty();
                    
                    $(option).text('Seleccione una...');
                    
                    oCbx[i].append(option);
                    
                    if (frm === 'preparacion' || frm === 'auxiliares' || frm === 'proPost' || frm === 'formula') {
                        oDatos.forEach(function(fibra){
                            if (fibra.nomFibra !== "") {
                                option = document.createElement('option');
                                $(option).text(fibra.nomFibra);
                                oCbx[i].append(option);
                            }
                        });
                    }
                    
                    if (frm === 'formula') {
                        
                    }
                    
                    if (frm === 'curvas') {
                        oDatos.forEach(function(l){
                            if (l.nomListaCheck !== "") {
                                option = document.createElement('option');
                                $(option).text(l.nomListaCheck);
                                oCbx[i].append(option);
                            }
                        });
                    }
                    
                    if (frm === 'compos') {
                        oDatos.forEach(function(c) {
                            if (c.tipoCompos !== '') {
                                option = document.createElement('option');
                                $(option).text(c.tipoCompos);
                                oCbx[i].append(option);
                            }
                        });
                    }
                    
                    if (frm === 'color') {
                        oDatos.forEach(function(c) {
                            if (c.nomColor !== '') {
                                option = document.createElement('option');
                                $(option).text(c.nomColor);
                                oCbx[i].append(option);
                            }
                        });
                    }
                    
                    if (frm === 'tono') {
                        oDatos.forEach(function(c) {
                            if (c.nomTono !== '') {
                                option = document.createElement('option');
                                $(option).text(c.nomTono);
                                oCbx[i].append(option);
                            }
                        });
                    }
                }
            },
            
            cargarDataList: function(oElement, oDatos, tipo) {
                var option1;
                var option2;

                if (tipo === 'q') {//Carga de los quimicos o colorantes.
                    oElement[0].empty();
                    oElement[1].empty();
                    oDatos.forEach(function(quimico) {
                        if (quimico.auxEsp !== true) {
                            option1 = document.createElement('option');
                            option2 = document.createElement('option');

                            option1.value = quimico.codProduct;
                            option2.value = quimico.nomProducto;

                            oElement[0].append(option1);
                            oElement[1].append(option2);
                        }
                    });
                } else if (tipo === 'c') {//Carga de las curvas.
                    oElement[0].empty();
                    oElement[1].empty();
                    oDatos.forEach(function(curva) {
                        option1 = document.createElement('option');
                        option2 = document.createElement('option');

                        option1.value = curva.idCurva;
                        option2.value = curva.nomCurva;

                        oElement[0].append(option1);
                        oElement[1].append(option2);
                    });
                } else if (tipo === 'll') {//Carga Label para lista de chequeo.
                    
                    oElement[0].empty();
                    oElement[1].empty();
                    
                    oDatos.forEach(function(label) {
                        option1 = document.createElement('option');
                        option2 = document.createElement('option');
                        
                        option1.value = label.nombreLabel;
                        option2.value = label.nombreLabel;
                        
                        $(oElement[0]).append(option1);
                        $(oElement[1]).append(option2);
                    });
                } else if (tipo === 'auxEsp') {//Carga de los quimicos para Auxiliareas especiales.
                    oElement[0].empty();
                    oElement[1].empty();
                    oDatos.forEach(function(quimico) {
                        if (quimico.auxEsp === true) {
                            option1 = document.createElement('option');
                            option2 = document.createElement('option');

                            option1.value = quimico.codProduct;
                            option2.value = quimico.nomProducto;

                            oElement[0].append(option1);
                            oElement[1].append(option2);
                        }
                    });
                }
            },
            
            destruirDataTable: function(tabla, tt) {
                
                var t = tabla.dataTable();
                t.fnDestroy();
                
                $(tabla).find('tr:gt(0)').remove();
                
                /*
                if (t === '1') {
                    $('#dataTablePreparacion tr:gt(0)').remove();
                } 
                
                if (t === '2') {
                    $('#dataTableAuxiliar tr:gt(0)').remove();
                }
                
                if (t === '3') {
                    $('#dataTableProcPos tr:gt(0)').remove();
                }
                
                if (t === '4') {
                    $('#dataTableFibra tr:gt(0)').remove();
                }
                
                if (t === '5') {
                    $('#dataTableProceso tr:gt(0)').remove();
                }
                
                if (t === '6') {
                    $('#dataTableCurva tr:gt(0)').remove();
                }
                
                if (t === '7') {
                    $('#dataTableLista ')
                }
                */
            },
            
            renderDataTables: function(tabla, oDatos, tipo) {
                var i;

                if (tipo !== 'formula' || tipo.frm !== 'formula') {
                    for (i = 0; i < oDatos.length; i++) {
                        oDatos[i].btnView = '<button id="btnView" title="Ver/Editar" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                                '<i class="glyphicon glyphicon-eye-open"></i>' +
                                            '</button>';
                        oDatos[i].fechaUso = (oDatos[i].fechaUso === 'null') ? oDatos[i].fechaUso = '' : oDatos[i].fechaUso;
                    }
                }
            
                if (tipo === 'prep' || tipo === 'aux' || tipo === 'pp') {
                    
                    $(tabla).dataTable({
                        data: oDatos,
                        columns: [
                            {data: 'idMaestro', className: 'center'},
                            {data: 'nombMaestro', className: 'left'},
                            {data: 'codFibra', className: 'center'},
                            {data: 'costo', className: 'right'},
                            {data: 'fechaUso', className: 'center'},
                            {data: 'btnView', className: 'center'}
                        ],
                        sPaginationType: 'full_numbers',
                        bAutoWidth: false
                    });
                }
                
                /*if (tipo === 'aux') {
                    
                    $(tabla).dataTable({
                        data: oDatos,
                        columns: [
                            {data: 'idNomAuxiliar', className: 'center'},
                            {data: 'nomAuxiliar', className: 'left'},
                            {data: 'idFibra.codFibra', className: 'center'},
                            {data: 'costoAuxiliar', className: 'right'},
                            {data: 'fechaUso', className: 'center'},
                            {data: 'btnView', className: 'center'}
                        ],
                        sPaginationType: 'full_numbers',
                        bAutoWidth: false
                    });
                }
                
                if (tipo === 'pp') {
                    $(tabla).dataTable({
                        data: oDatos,
                        columns: [
                            {data: 'idNomProcPost', className: 'center'},
                            {data: 'nomProcPost', className: 'center'},
                            {data: 'idFibra.codFibra', className: 'center'},
                            {data: 'costoProcPost', className: 'center'},
                            {data: 'fechaUso', className: 'center'},
                            {data: 'btnView', className: 'center'}
                        ],
                        sPaginationType: 'full_numbers',
                        dAutoWidth: false
                    });
                }*/
                
                if (tipo === 'f') { //Maestro Fibras
                    $(tabla).dataTable({
                        data: oDatos,
                        columns: [
                            {data: 'idFibra', className: 'center'},
                            {data: 'nomFibra', className: 'left'},
                            {data: 'codFibra', className: 'center'},
                            {data: 'composicion', className: 'center'},
                            {data: 'btnView', className: 'center'}
                        ],
                        sPaginationType: 'full_numbers',
                        dAutoWidth: false
                    });
                }
                
                if (tipo === 'proc') { //Procesos
                    $(tabla).dataTable({
                        data: oDatos,
                        columns: [
                            {data: 'idProceso', className: 'center'},
                            {data: 'nomProceso', className: 'left'},
                            {data: 'idCurvas', className: 'center'},
                            {data: 'tiempoEst', className: 'center'},
                            {data: 'btnView', className: 'center'}
                        ],
                        sPaginationType: 'full_numbers',
                        dAutoWidth: false
                    });
                }
                
                if (tipo === 'c') { //Curva
                    $(tabla).dataTable({
                        data: oDatos,
                        columns: [
                            {data: 'idCurva', className: 'center'},
                            {data: 'nomCurva', className: 'left'},
                            {data: 'tiempoCurva', className: 'center'},
                            {data: 'llenadoCurva', className: 'center'},
                            {data: 'rinseCurva', className: 'center'},
                            {data: 'checkList', className: 'center'},
                            {data: 'btnView', className: 'center'}
                        ],
                        sPaginationType: 'full_numbers',
                        dAutoWidth: false
                    });
                }
                
                if (tipo === 'll') {//Label Lista de chequeo.
                    $(tabla).dataTable({
                        data: oDatos,
                        columns: [
                            {data: 'idLabel', className: 'center'},
                            {data: 'nombreLabel', className: 'left'},
                            {data: 'btnView', className: 'center'}
                        ],
                        sPaginationType: 'full_numbers',
                        dAutoWidth: false
                    });
                }
                
                if (tipo === 'lc') {
                    $(tabla).dataTable({
                        data: oDatos,
                        columns: [
                            {data: 'idNomLista', className: 'center'},
                            {data: 'nomListaCheck', className: 'left'},
                            {data: 'btnView', className: 'center'}
                        ],
                        sPaginationType: 'full_numbers',
                        dAutoWidth: false
                    });
                }
                
                if (tipo.frm === 'formula') {
                    if (tipo.tbl !== 'formulas') {
                        var trTemplate = '<tr>' +
                                            '<td class="col-md-5 left">:nombre:</td>' +
                                            '<td class="col-md-1 center">:codFibra:</td>' +
                                            '<td class="col-md-1 right">:costo:</td>' +
                                            '<td class="col-md-2 center">:fechaUso:</td>' +
                                            '<td class="col-md-1 center">' + 
                                                '<button id="btnAdd" title="Agregar" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                                    '<i class="fa fa-plus-square"></i>' +
                                                '</button>' +
                                            '</td>' +
                                        '</tr>';
                    }
                    
                    if (tipo.tbl === 'procesos') {
                        
                        for (var i = 0; i < oDatos.length; i++) {
                            oDatos[i].btnAdd = '<button id="btnAdd" title="Agregar" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                                    '<i class="fa fa-plus-square"></i>' +
                                                '</button>';
                        }
                        
                        $(tabla).dataTable({
                            data: oDatos,
                            columns: [
                                {data: 'nomProceso', className: 'left'},
                                {data: 'idCurvas', className: 'center'},
                                {data: 'tiempoEst', className: 'center'},
                                {data: 'btnAdd', className: 'center'}
                            ],
                            sPaginationType: 'full_numbers',
                            dAutoWidth: false
                        });
                    }
                    
                    if (tipo.tbl === 'preparacion') {
                        $(tabla).append('<tbody></tbody>');
                        var tbody = $(tabla).find('tbody');
                        
                        for (var i = 0; i < oDatos.length; i++) {
                            var tr = trTemplate;
                            
                            var d = new Date(oDatos[i].fechaUso);
                            
                            var newTr = tr.replace(':nombre:', oDatos[i].nomPreparacion)
                                          .replace(':codFibra:', oDatos[i].codFibra)
                                          .replace(':costo:', oDatos[i].costoPreparacion)
                                          .replace(':fechaUso:', (d > 1/1/1900) ? d.toLocaleDateString() : '');

                            $(tbody).append(newTr);
                        }    
                    
                        $(tabla).dataTable({
                            sPaginationType: 'full_numbers',
                            dAutoWidth: false
                        });
                    }
                    
                    if (tipo.tbl === 'auxiliar') {
                        $(tabla).append('<tbody></tbody>');
                        var tbody = $(tabla).find('tbody');
                        
                        for (var i = 0; i < oDatos.length; i++) {
                            var tr = trTemplate;
                            
                            var d = new Date(oDatos[i].fechaUso);
                            
                            var newTr = tr.replace(':nombre:', oDatos[i].nomAuxiliar)
                                          .replace(':codFibra:', oDatos[i].codFibra)
                                          .replace(':costo:', oDatos[i].costoAuxiliar)
                                          .replace(':fechaUso:', (d > 1/1/1900) ? d.toLocaleDateString() : '');

                            $(tbody).append(newTr);
                        }    
                    
                        $(tabla).dataTable({
                            sPaginationType: 'full_numbers',
                            dAutoWidth: false
                        });
                    }

                    if (tipo.tbl === 'proPost') {
                        $(tabla).append('<tbody></tbody>');
                        var tbody = $(tabla).find('tbody');
                        
                        for (var i = 0; i < oDatos.length; i++) {
                            var tr = trTemplate;
                            
                            var d = new Date(oDatos[i].fechaUso);
                            
                            var newTr = tr.replace(':nombre:', oDatos[i].nomProcPost)
                                          .replace(':codFibra:', oDatos[i].codFibra)
                                          .replace(':costo:', oDatos[i].costoProcPost)
                                          .replace(':fechaUso:', (d > 1/1/1900) ? d.toLocaleDateString() : '');

                            $(tbody).append(newTr);
                        }    
                    
                        $(tabla).dataTable({
                            sPaginationType: 'full_numbers',
                            dAutoWidth: false
                        });
                    }
                    
                    if (tipo.tbl === 'formulas') {
                        $(tabla).append('<tbody></tbody>');
                        var tbody = $(tabla).find('tbody');
                        
                        for (var i = 0; i < oDatos.length; i++) {
                            var trTemplate = '<tr>' +
                                                '<td class="col-md-1 center" style="display: none">:id:</td>' +
                                                '<td class="col-md-1 center">:codFormula:</td>' +
                                                '<td class="col-md-3">:nombreForm:</td>' +
                                                '<td class="col-md-1 center">:codFibra:</td>' +
                                                '<td class="col-md-1 center">:compos:</td>' +
                                                '<td class="col-md-1" style="background: rgb(:rgb:)"></td>' +
                                                '<td class="col-md-1 center">:fechaUso:</td>' +
                                                '<td class="col-md-1 center">:costoFormula:</td>' +
                                                '<td class="col-md-1 center">:estado:</td>' +
                                                '<td class="col-md-1 center">' +
                                                    '<button id="btnView" title="Ver/Editar" data-placement="right" data-toggle="tooltip" class="btn tooltips" type="button">' +
                                                        '<i class="glyphicon glyphicon-eye-open"></i>' +
                                                    '</button>' +
                                                '</td>' +
                                            '</tr>';
                        
                        var d = new Date(oDatos[i].fechaUso);
                        var estado = '';
                        
                        var codFormula = oDatos[i].codFibra + oDatos[i].codColor + oDatos[i].codTono + oDatos[i].consecutivo;
                        
                        if (oDatos[i].estado) {
                            estado = 'DETENIDA';
                        }
                            
                        var newTr = trTemplate
                                    .replace(':id:', oDatos[i].idFormula)
                                    .replace(':codFormula:', codFormula)
                                    .replace(':nombreForm:', oDatos[i].nombreForm)
                                    .replace(':codFibra:', oDatos[i].codFibra)
                                    .replace(':compos:', oDatos[i].compos)
                                    .replace(':rgb:', oDatos[i].color)
                                    .replace(':fechaUso:', (d > 1/1/1900) ? d.toLocaleDateString() : '')
                                    .replace(':costoFormula:', oDatos[i].costoFormula.toFixed(0))
                                    .replace(':estado:', estado);
                        
                        $(tbody).append(newTr);
                    }    
                    
                    $(tabla).dataTable({
                        sPaginationType: 'full_numbers',
                        dAutoWidth: false
                    });
                        
                    /*codColor:"3"
                    codFibra:"313"
                    codTono:"0"
                    color:"#ff93b4"
                    compos:"80/20"
                    consecutivo:"860"
                    estado:true
                    fechaCreacion:993618000000
                    fechaModificacion:1390453200000
                    fechaUso:1390453200000
                    idFormula:51
                    labFormulaDetalleCollection:Array[13]
                            cantGrs:1
                            cantPtje:0
                            codProducto:"3350"
                            idFrmDetalle:351
                            seccion:2
                    nombreForm:"P/A (2F) ROSADO CLARO"
                    observ:"Preblanqueo"
                    pantone:"no Pantone"
                    phFormula:"no PH"
                    proceso:76*/
                    }
                }
            },
            
            cargarCoincidenciaProductoQuimico: function(tipo, elemento, oDatos) {
                var self = this;
                var data = [];

                if (elemento[0].val() !== "" && elemento[0].val().length >= 4) {
                    elemento[1].val("");
                    data = self.buscarCoincidenciaProductosQuimicos(tipo, elemento[0].val(), oDatos);
                    if (data !== null) {
                        if (tipo === 'cod') {
                            elemento[1].val(data.nomProducto);
                        } else if (tipo === 'nom') {
                            elemento[1].val(data.codProduct);
                        }
                        
                        if (elemento.length > 2) {
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
                }
            },
            
            buscarCoincidenciaProductosQuimicos: function(tipo, quimico, oDatos) {
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
            
            cargarCoincidenciaCurvas: function(tipo, elementos, oDatos) {
                var self = this;
                var data = [];
                var cellTiempo = elementos[2][0].cells[2];
                var cellLlenado = elementos[2][0].cells[3];
                var cellRinse = elementos[2][0].cells[4];
                
                cellTiempo.textContent = "";
                cellLlenado.textContent = "";
                cellRinse.textContent = "";
                
                if (elementos[0].val() !== "" && elementos[0].val().length >= 1) {
                    elementos[1].val("");
                    
                    data = self.buscarCoincidenciaCurvas(tipo, elementos[0].val(), oDatos);
                    if (data != null) {
                        if (tipo === 'cod') {
                            elementos[1].val(data.nomCurva);
                            cellTiempo.textContent = data.tiempoCurva;
                            cellLlenado.textContent = data.llenadoCurva;
                            cellRinse.textContent = data.rinseCurva;
                            
                        } else if (tipo === 'nom') {
                            elementos[1].val(data.idCurva);
                            cellTiempo.textContent = data.tiempoCurva;
                            cellLlenado.textContent = data.llenadoCurva;
                            cellRinse.textContent = data.rinseCurva;
                        }
                    }
                }
            },
            
            buscarCoincidenciaCurvas: function(tipo, curva, oDatos) {
                var dato = null;

                if (tipo === 'cod') {
                    oDatos.forEach(function(data) {
                        if (data.idCurva === parseInt(curva)) {
                            dato = data;
                        }
                    });
                } else if (tipo === 'nom') {
                    oDatos.forEach(function(data) {
                        if (data.nomCurva === curva) {
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
                    } else if (cientos === 0 && decimas === 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            
            /**
             * Método para agregar una fila al final de una tabla que contenga 5 columnas y la última columna tendrá un botón para eliminar la misma fila.
             * @param {html JQuery Object} elemento 
             * Es el tbody de la tabla donde se va a agregar la nueva fila.
             * @param {JSON} oDatos 
             * Contiene los siguientes atributos: <br>
             * <strong>tipo:</strong> corresponde a si es una nueva fila o si se va a editar una fila; para los formularios que son diferentes al maestro de fórmulas, se debe enviar como parámetro <strong>nuevo</strong> o <strong>editar</strong>; para el maestro de fórmulas se debe enviar <strong>nuevoColor</strong> o <strong>editarColor</strong> para la tabla donde se agregan los colorantes, para la tabla donde se agregan los auxiliares especiales se debe enviar <strong>nuevoAuxEsp</strong> o <strong>editarAuxEsp</strong>.<br>
             * <strong>codQuim:</strong> cogido del químico a agregar.<br>
             * <strong>nomQuim:</strong> nombre del químico.<br>
             * <strong>cant:</strong> es la cantidad en gramos o porcentaje del químico a agregar. Según la tabla se debe cambiar el nombre del atributo a <strong>cantGrLt</strong> o <strong>cantPctj</strong>.<br>
             * @returns {undefined} No retorna elementos.
             */
            agregarLinea: function(elemento, oDatos) {
                
                if (oDatos.tipo === 'nuevo'){
                    var trTemplate = '<tr>' +
                                        '<td style="text-align: center">:codQuim:</td>' +
                                        '<td>:nomQuim:</td>' +
                                        '<td style="text-align: center">:cantGrLt:</td>' +
                                        '<td style="text-align: center">:cantPctj:</td>' +
                                        '<td>' +
                                            '<div class="form-group col-md-12">' +
                                                '<button type="button" class="btn" id="btnDelLinea">' +
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
                    
                } else if (oDatos.tipo === 'nuevoColor'){
                    var trTemplate = '<tr>' +
                                        '<td class="center">:codQuim:</td>' +
                                        '<td>:nomQuim:</td>' +
                                        '<td class="center">:cantPctj:</td>' +
                                        '<td class="center">' +
                                            '<button type="button" class="btn" id="btnDelLinea">' +
                                                '<i class="fa fa-trash-o"></i>' +
                                            '</button>' +
                                        '</td>' +
                                     '</tr>';
                    
                    var newTr = trTemplate
                                    .replace(':codQuim:', oDatos.codQuim)
                                    .replace(':nomQuim:', oDatos.nomQuim)
                                    .replace(':cantPctj:', oDatos.cantPctj);
                    
                    elemento.append(newTr);
                    
                } else if (oDatos.tipo === 'nuevoAuxEsp'){
                    var trTemplate = '<tr>' +
                                        '<td class="center">:codQuim:</td>' +
                                        '<td>:nomQuim:</td>' +
                                        '<td class="center">:cantGrs:</td>' +
                                        '<td class="center">' +
                                            '<button type="button" class="btn" id="btnDelLinea">' +
                                                '<i class="fa fa-trash-o"></i>' +
                                            '</button>' +
                                        '</td>' +
                                     '</tr>';
                    
                    var newTr = trTemplate
                                    .replace(':codQuim:', oDatos.codQuim)
                                    .replace(':nomQuim:', oDatos.nomQuim)
                                    .replace(':cantGrs:', oDatos.cantGrLt);
                    
                    elemento.append(newTr);
                }
            },
            
            noRepetirQuimicos: function(d, oQuimicos) {
                var existe = false;
                
                if (d.tipo === "+") {
                    if (d.maestro !== 'aux') {
                        for (var i = 0; i < oQuimicos.length; i++) {
                            if (oQuimicos[i].codQuimico === d.codQuimico) {
                                existe = true;
                                break;
                            }
                        }
                    }
                    
                    if (d.maestro === 'aux') {
                        for (var i = 0; i < oQuimicos.length; i++) {
                            if ((oQuimicos[i].codQuimico === d.codQuimico) && (oQuimicos[i].codQuimico !== d.codQpermitido)) {
                                existe = true;
                                break;
                            }
                        }
                    }
                }
                
                if (d.tipo === "-") {
                    var oQuim = new Array();

                    for (var i = 0; i < oQuimicos.length; i++) {
                        if (i !== d.pos) {
                            oQuim.push(oQuimicos[i]);
                        }
                    }
                }
                return {existe: existe, oQuim: oQuim};
            },
            
            guardarParaAprobar: function(d, oQuim, form){
                var datos = new Object();
                
                //var idMaestro = null;
                datos.nombMaestro = d.nombre;
                //var fechaUso = null;
                datos.idFibra = d.idFib;
                //var codFibra;
                //var nomFibra;
                //var composFibra;
                //var costo;
                datos.quimicos = new Array();
                
                for (var i = 0; i < oQuim.length; i++) {
                    datos.quimicos.push(oQuim[i]);
                }
                
                consultas.guardarParaAprobar(datos, form);
            },
            
            guardarRegistro: function(d, oQuim, form) {
                var usuario = JSON.parse(sessionStorage.user);
                var self = this;
                var datos = new Object();
                
                if (d.form === 'fibra'){
                    /*datos.nombMaestro = d.nombre;
                    datos.idFibra = d.idFib;
                    datos.codQuimico = null;
                    datos.cantGr = null;
                    datos.cantPtj = null;
                    datos.compos = d.compos;*/
                    
                    //var idMaestro = null;
                    datos.nombMaestro = null;
                    datos.fechaUso = null;
                    datos.idFibra = null;
                    datos.codFibra = d.idFib;
                    datos.nomFibra = d.nombre;
                    datos.composFibra = d.compos;
                    datos.costo = null;
                    datos.quimicos = new Array();
                    
                    datos = self.obtenerDatosTabla(d.tabla, datos, {frm: d.form, tipo: 'nuevo'});
                    
                } else if (d.form === 'proceso') {
                    datos.nombre = d.nombre;
                    datos.idCurvas = null;
                    
                    datos = self.obtenerDatosTabla(d.tabla, datos, {frm: d.form, tipo: 'nuevo'});
                
                } else if (d.form === 'curva') {
                    datos.nombre = d.nombre;
                    datos.tiempo = d.tiempo;
                    datos.llenado = d.llenado;
                    datos.rinse = d.rinse;
                    datos.idListaCheck = null;
                    
                    datos = self.obtenerDatosTabla(d.tabla, datos, {frm: d.form, tipo: 'nuevo'});
                    
                } else if (d.form === 'label') {
                    datos.nombre = d.nombre;
                    
                } else if (d.form === 'listaCheck') {
                    datos.nomLista = d.nombre;
                    datos.idLabel = null;
                    
                    datos = self.obtenerDatosTabla(d.tabla, datos, {frm: d.form, tipo: 'nuevo'});
                }
                
                if (form === 'preparacion' || form === '' || form === '') {
                    consultas.guardarParaAprobar(datos, form);
                } else {
                    consultas.guardarNuevoMaestro(datos, form);
                }
            },
            
            obtenerDatosTabla: function(tabla, oArr, t) {
                
                if (t.frm === '') {
                    if (t.tipo === 'nuevo' && tabla !== '') {
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
                    
                    } else if (t.tipo === 'editar' && tabla !== '') {
                        $(tabla).find('tbody tr').each(function(index) {
                            if (index > 0) {
                                var f = {codQuimicoNue: '', cantGrNue: '', cantPtjNue: ''};
                                $(this).children('td').each(function(index2) {
                                    switch (index2) {
                                        case 0: //Código Quimico
                                            f.codQuimicoNue = $(this).text();
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
                        
                } else if (t.frm === 'proceso') {
                    
                    if ((t.tipo === 'nuevo' || t.tipo === 'editar') && tabla !== '') {
                        $(tabla).find('tbody tr').each(function(index) {
                            if (index > 0) {
                                $(this).children('td').each(function(index2) {
                                    switch (index2) {
                                        case 0: //Id Curva
                                            if (oArr.idCurvas === null) {
                                                oArr.idCurvas = $(this).text();
                                            } else {
                                                oArr.idCurvas += "-" + $(this).text();
                                            }
                                            break;
                                    }
                                });
                            }
                        });
                    }
                    
                } else if (t.frm === 'curva') {
                    if ((t.tipo === 'nuevo' || t.tipo === 'editar') && tabla !== '') {
                        $(tabla).find('tbody tr').each(function(index) {
                            if (index > 0) {
                                $(this).children('td').each(function(index2) {
                                    switch (index2) {
                                        case 0: //Id Lista Chequeo
                                            if (oArr.idListaCheck === null) {
                                                oArr.idListaCheck = $(this).text();
                                            } else {
                                                oArr.idListaCheck += "-" + $(this).text();
                                            }
                                            break;
                                    }
                                });
                            }
                        });
                    }
                    
                } else if (t.frm === 'listaCheck') {
                    if ((t.tipo === 'nuevo' || t.tipo === 'editar') && tabla !== '') {
                        $(tabla).find('tbody tr').each(function(index) {
                            if (index > 0) {
                                $(this).children('td').each(function(index2) {
                                    switch (index2) {
                                        case 0: //Id Etiquetas
                                            if (oArr.idLabel === null) {
                                                oArr.idLabel = $(this).text();
                                            } else {
                                                oArr.idLabel += "-" + $(this).text();
                                            }
                                            break;
                                    }
                                });
                            }
                        });
                    }
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
                                            '<button type="button" class="btn" id="btnDelLinea">' +
                                                '<i class="fa fa-trash-o"></i>' +
                                            '</button>' +
                                        '</div>' +
                                    '</td>' +
                                    '<td>' +
                                        '<div class="form-group col-md-12">' +
                                            '<button type="button" class="btn" id="eBtnEditLinea">' +
                                                '<span class="glyphicon glyphicon-edit"></span>' +
                                            '</button>' +
                                        '</div>' +
                                    '</td>' +
                                 '</tr>';

                if (oDatos.frm === 'prep' || oDatos.frm === 'aux'){
                    
                    for (var i = 0; i < oDatos.registros.length; i++) {
                        if (oDatos.registros[i].idMaestro === oDatos.idReg) {
                            
                            oDatos.eNombre.val(self.separarNombreDeFibra({
                                nombre: oDatos.registros[i].nombMaestro,  
                                fibra: oDatos.registros[i].nomFibra
                            }));
                            
                            oDatos.eNombreFib.val(oDatos.registros[i].nomFibra);

                            for (var j = 0; j < oDatos.registros[i].quimicos.length; j++) {
                                for (var k = 0; k < oDatos.quimicos.length; k++) {

                                    if (oDatos.registros[i].quimicos[j].codQuimico === oDatos.quimicos[k].codProduct) {                                        
                                        resp.push({
                                            codQuimico: oDatos.registros[i].quimicos[j].codQuimico,
                                            cantGr: parseFloat(oDatos.registros[i].quimicos[j].cantGr),
                                            cantPtj: parseFloat(oDatos.registros[i].quimicos[j].cantPtj)
                                        });
                                        var newTr = trTemplate
                                            .replace(':codQuim:', oDatos.registros[i].quimicos[j].codQuimico)
                                            .replace(':cantGrLt:', oDatos.registros[i].quimicos[j].cantGr)
                                            .replace(':cantPctj:', oDatos.registros[i].quimicos[j].cantPtj)
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
                    
                } 
                
                /*if (oDatos.frm === 'aux'){
                    
                    for (var i = 0; i < oDatos.registros.length; i++) {
                        if (oDatos.registros[i].idNomAuxiliar === oDatos.idReg) {
                            
                            oDatos.eNombre.val(self.separarNombreDeFibra({
                                nombre: oDatos.registros[i].nomAuxiliar,  
                                fibra: oDatos.registros[i].idFibra.nomFibra
                            }));
                            
                            oDatos.eNombreFib.val(oDatos.registros[i].idFibra.nomFibra);

                            for (var j = 0; j < oDatos.registros[i].auxiliarCollection.length; j++) {
                                for (var k = 0; k < oDatos.quimicos.length; k++) {

                                    if (oDatos.registros[i].auxiliarCollection[j].codQuimico === oDatos.quimicos[k].codProduct) {                                        
                                        resp.push({
                                            codQ: oDatos.registros[i].auxiliarCollection[j].codQuimico,
                                            cant1: parseFloat(oDatos.registros[i].auxiliarCollection[j].cantGr),
                                            cant2: parseFloat(oDatos.registros[i].auxiliarCollection[j].cantPtj)
                                        });
                                        var newTr = trTemplate
                                            .replace(':codQuim:', oDatos.registros[i].auxiliarCollection[j].codQuimico)
                                            .replace(':cantGrLt:', oDatos.registros[i].auxiliarCollection[j].cantGr)
                                            .replace(':cantPctj:', oDatos.registros[i].auxiliarCollection[j].cantPtj)
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
                }*/
                
                if (oDatos.frm === 'pp'){
                    
                    for (var i = 0; i < oDatos.registros.length; i++) {
                        if (oDatos.registros[i].idNomProcPost === oDatos.idReg) {
                            
                            oDatos.eNombre.val(self.separarNombreDeFibra({
                                nombre: oDatos.registros[i].nomProcPost,  
                                fibra: oDatos.registros[i].idFibra.nomFibra
                            }));
                            
                            oDatos.eNombreFib.val(oDatos.registros[i].idFibra.nomFibra);

                            for (var j = 0; j < oDatos.registros[i].procesosPosterioresCollection.length; j++) {
                                for (var k = 0; k < oDatos.quimicos.length; k++) {

                                    if (oDatos.registros[i].procesosPosterioresCollection[j].codQuimico === oDatos.quimicos[k].codProduct) {                                        
                                        resp.push({
                                            codQ: oDatos.registros[i].procesosPosterioresCollection[j].codQuimico,
                                            cant1: parseFloat(oDatos.registros[i].procesosPosterioresCollection[j].cantGr),
                                            cant2: parseFloat(oDatos.registros[i].procesosPosterioresCollection[j].cantPtj)
                                        });
                                        var newTr = trTemplate
                                            .replace(':codQuim:', oDatos.registros[i].procesosPosterioresCollection[j].codQuimico)
                                            .replace(':cantGrLt:', oDatos.registros[i].procesosPosterioresCollection[j].cantGr)
                                            .replace(':cantPctj:', oDatos.registros[i].procesosPosterioresCollection[j].cantPtj)
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
                }
                
                if (oDatos.frm === 'f'){//Maestro Fibras
                    
                    for (var i = 0; i < oDatos.registros.length; i++) {
                        if (oDatos.registros[i].idFibra === oDatos.idReg) {
                            
                            oDatos.eNombre.val(oDatos.registros[i].codFibra);
                            oDatos.eNombreFib.val(oDatos.registros[i].nomFibra);
                            oDatos.eCompos.val(oDatos.registros[i].composicion);
                            break;
                        }
                    }
                    oDatos.eModal.modal('show', 'slow');
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
            
            solicitarModificarRegistro: function(oBas, oQmod, oQnue, btnCerrar, form) {
                var self = this;
                var usuario = JSON.parse(sessionStorage.user);
                var datos = new Object();
                
                if (form === 'preparacion' || form === '' || form === '') {
                    datos.idReg = oBas.idMaestro;
                    datos.nombreReg = oBas.nombre;
                    datos.nombreRegNue = oBas.nombreNue;
                    datos.idFibra = oBas.idFib;
                    datos.idFibraNue = oBas.idFibNue;
                    datos.idSolicitante = usuario.idUsuario.idPersonal;
                    datos.comentario = oBas.coment;
                    datos.quimicoMod = new Array();
                    datos.quimicoNue = new Array();
                    datos.compos = oBas.compos;
                    datos.composNue = oBas.composNue;

                    for (var i = 0; i < oQmod.length; i++) {
                        if (oQmod[i].tipo !== '') {
                            datos.quimicoMod.push(oQmod[i]);
                        }
                    }

                    for (var i = 0; i < oQnue.length; i++) {
                        datos.quimicoNue.push(oQnue[i]);
                    }

                    if (datos.nombreRegNue !== '' || datos.idFibraNue !== '' || datos.quimicoMod.length > 0 || datos.quimicoNue.length > 0) {

                        consultas.solicitarModificarMaestro(datos, btnCerrar, form);

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
                
                /*if (servlet === 'ServletCurvas'){
                    var lista = 0;
                    var listaNue = 0;
                    
                    datos.nombre = oBas.nombre;
                    datos.tiempo = oBas.tiempo;
                    datos.llenado = oBas.llenado;
                    datos.rinse = oBas.rinse;
                    datos.idMaestro = oBas.idMaestro;
                    datos.coment = oBas.coment;
                    datos.idListaCheck = null;
                    
                    datos = self.obtenerDatosTabla(oBas.tabla, datos, {frm: 'curva', tipo: 'editar'});
                    
                    if (oBas.org.checkList !== null) {
                        var lista = oBas.org.checkList.length;
                    }
                    
                    if (datos.idListaCheck !== null) {
                        var listaNue = datos.idListaCheck.length;
                    }
                    
                    var c = 0;
                    
                    if (lista > listaNue) {
                        c = 1;
                    } if (lista < listaNue) {
                        c = 1;
                    } else if (lista === listaNue) {
                        if (oBas.org.checkList === datos.idListaCheck) {
                            c = 0;
                        } else {
                            c = 1;
                        }
                    }
                    
                    if (datos.nombre !== oBas.org.nomCurva || datos.tiempo !== oBas.org.tiempoCurva || datos.llenado !== oBas.org.llenadoCurva || datos.rinse !== oBas.org.rinseCurva || c > 0) {

                        consultas.solicitarModificarMaestro(datos, btnCerrar, servlet);

                    } else {
                        $.gritter.add({
                            title: "Modificar Registro",
                            text: "¡No hay datos a modificar.!",
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });
                    }
                    
                } else if (servlet === 'ServletProcesos') {
                    datos.idProceso = oBas.idMaestro;
                    datos.nombre = oBas.nombre;
                    datos.idCurvas = null;
                    
                    datos = self.obtenerDatosTabla(oBas.tabla, datos, {frm: 'proceso', tipo: 'editar'});
                    
                    var curvas = oBas.org.idCurvas.length;
                    var curvasNue = datos.idCurvas.length;
                    var c = 0;
                    
                    if (curvas > curvasNue) {
                        c = 1;
                    } if (curvas < curvasNue) {
                        c = 1;
                    } else if (curvas === curvasNue) {
                        if (oBas.org.idCurvas === datos.idCurvas) {
                            c = 0;
                        } else {
                            c = 1;
                        }
                    }
                    
                    if (datos.nombre !== oBas.org.nomProceso || c > 0) {

                        consultas.solicitarModificarMaestro(datos, btnCerrar, servlet);

                    } else {
                        $.gritter.add({
                            title: "Modificar Registro",
                            text: "¡No hay datos a modificar.!",
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });
                    }
                    
                } else if (servlet === 'ServletLabelList'){
                    datos.nombre = oBas.nombre;
                    datos.idMaestro = oBas.idMaestro;
                    datos.coment = oBas.coment;
                    
                    if (datos.nombre !== oBas.org.nombreLabel) {

                        consultas.solicitarModificarMaestro(datos, btnCerrar, servlet);

                    } else {
                        $.gritter.add({
                            title: "Modificar Registro",
                            text: "¡No hay datos a modificar.!",
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });
                    }
                    
                } else if (servlet === 'ServletListaCheck') {
                    
                    datos.idLista = oBas.idMaestro;
                    datos.nomLista = oBas.nombre;
                    datos.idLabel = null;
                    
                    datos = self.obtenerDatosTabla(oBas.tabla, datos, {frm: 'listaCheck', tipo: 'editar'});
                    
                    var label = oBas.org.idLabel.length;
                    var labelNue = datos.idLabel.length;
                    var c = 0;
                    
                    if (label > labelNue) {
                        c = 1;
                    } if (label < labelNue) {
                        c = 1;
                    } else if (label === labelNue) {
                        if (oBas.org.idLabel === datos.idLabel) {
                            c = 0;
                        } else {
                            c = 1;
                        }
                    }
                    
                    if (datos.nomLista !== oBas.org.nomListaCheck || c > 0) {

                        consultas.solicitarModificarMaestro(datos, btnCerrar, servlet);

                    } else {
                        $.gritter.add({
                            title: "Modificar Registro",
                            text: "¡No hay datos a modificar.!",
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });
                    }
                } else if (servlet !== 'ServletCurvas') {
                    datos.idReg = oBas.idMaestro;
                    datos.nombreReg = oBas.nombre;
                    datos.nombreRegNue = oBas.nombreNue;
                    datos.idFibra = oBas.idFib;
                    datos.idFibraNue = oBas.idFibNue;
                    datos.idSolicitante = usuario.idUsuario.idPersonal;
                    datos.comentario = oBas.coment;
                    datos.quimicoMod = new Array();
                    datos.quimicoNue = new Array();
                    datos.compos = oBas.compos;
                    datos.composNue = oBas.composNue;

                    for (var i = 0; i < oQmod.length; i++) {
                        if (oQmod[i].tipo !== '') {
                            datos.quimicoMod.push(oQmod[i]);
                        }
                    }

                    for (var i = 0; i < oQnue.length; i++) {
                        datos.quimicoNue.push(oQnue[i]);
                    }

                    if (datos.nombreRegNue !== '' || datos.idFibraNue !== '' || datos.quimicoMod.length > 0 || datos.quimicoNue.length > 0) {

                        consultas.solicitarModificarMaestro(datos, btnCerrar, servlet);

                    } else {
                        $.gritter.add({
                            title: "Modificar Registro",
                            text: "¡No hay datos a modificar.!",
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });
                    }
                }*/
            },
            
            verificarSolicitudes: function(codigo, oElement, arrSolicitudes, arrB) {
                var estado = false;
                var solcNombre = false;
                var solcFibra = false;
                var solcCompos = false;
                
                for (var i = 0; i < arrSolicitudes.length; i++) {
                    if (arrSolicitudes[i].nombreNue !== null && arrB.solcNombre === false) {
                        u.habilitarDeshabilitarCampos(oElement[0], 'des');
                        solcNombre = true;
                        
                        $.gritter.add({
                            title: 'Nombre del Maestro',
                            text: 'Ya solicitaron cambiar el nombre de este maestro, está pendiente por aprobación.',
                            class_name: 'growl-warning',
                            sticky: false,
                            time: '60000',
                            position: 'left'
                        });
                    } 
                    if (arrSolicitudes[i].idFibraNue !== null && arrB.solcFibra === false) {
                        u.habilitarDeshabilitarCampos(oElement[1], 'des');
                        solcFibra = true;
                        
                        $.gritter.add({
                            title: 'Fibra del Maestro',
                            text: 'Ya solicitaron cambiar la fibra de este maestro, está pendiente por aprobación.',
                            class_name: 'growl-warning',
                            sticky: false,
                            time: '60000'
                        });
                    }
                    
                    if (arrSolicitudes[i].codQuimicoAct === codigo && arrSolicitudes[i].tipo === 'eliminado') {
                        estado = true;
                        u.habilitarDeshabilitarCampos(oElement, 'des');
                        
                        $.gritter.add({
                            title: "Eliminar Registro",
                            text: "¡Ya solicitaron eliminar este elemento, está pendiente por aprobación.!",
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });

                        break;
                    }
                    
                    if (arrSolicitudes[i].codQuimicoAct === codigo && arrSolicitudes[i].tipo === 'modificado') {
                        estado = true;
                        u.habilitarDeshabilitarCampos(oElement, 'des');
                        
                        $.gritter.add({
                            title: "Modificar Registro",
                            text: "¡Ya solicitaron una modificación a este elemento, está pendiente por aprobación.!",
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });

                        break;
                    }
                    
                    if (arrSolicitudes[i].codQuimicoNue === codigo && arrSolicitudes[i].tipo === 'nuevo') {
                        estado = true;
                        u.habilitarDeshabilitarCampos(oElement, 'des');
                        
                        $.gritter.add({
                            title: "Nuevo Registro",
                            text: "¡Ya solicitaron agregar este elemento al maestro, está pendiente por aprobación.!",
                            class_name: "growl-warning",
                            sticky: false,
                            time: ""
                        });

                        break;
                    }
                    
                    if (arrSolicitudes[i].composicion !== null && arrB.solcCompos === false) {
                        u.habilitarDeshabilitarCampos(oElement[2], 'des');
                        solcCompos = true;
                        
                        $.gritter.add({
                            title: 'Fibra del Maestro',
                            text: 'Ya solicitaron cambiar la composición de este maestro, está pendiente por aprobación.',
                            class_name: 'growl-warning',
                            sticky: false,
                            time: '60000'
                        });
                    }
                }
                
                return {estado: estado, solcNombre: solcNombre, solcFibra: solcFibra, solcCompos: solcCompos};
            }
        }
    })();

})(document, window, jQuery)