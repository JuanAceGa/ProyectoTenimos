(function (document, window, $, undefined){
    (function() {
        return frmPreparacion = {
            oFibras: {},
            oQuimicos: {},
            oPreparaciones: {},
            $frmPreparacion: $("#frmPreparacion"),
            $dataTableNewQPreparacion: $("#dataTableNewQPreparacion"),
            $tBodyNewQPreparacion: $("#tBodyNewQPreparacion"),
            $dataTablePreparacion: $('#dataTablePreparacion'),
            $btnNewPrep: $("#btnNewPrep"),
            $idPrep: $("#idPrep"),
            $nomPrep: $("#nomPrep"),
            $cbxfibraPrep: $("#cbxfibraPrep"),
            $codQuimPrep: $("#codQuimPrep"),
            $nomQuimPrep: $("#nomQuimPrep"),
            $dlCodQuimPrep: $("#dlCodQuimPrep"),
            $dlNomQuimPrep: $("#dlNomQuimPrep"),
            $cantGrLtPrep: $("#cantGrLtPrep"),
            $cantPctjPrep: $("#cantPctjPrep"),
            $btnAddLineaPrep: $("#btnAddLineaPrep"),
            $btnSavePrep: $("#btnSavePrep"),
            $btnCleanPrep: $("#btnCleanPrep"),
            $modalMensaje: $("#myModal"),
            $tituloMensaje: $("#myModalLabel"),
            $cuerpoMensaje: $("#cuerpoMensaje"),
            campObligQuim: true,
            campObligPrep: true,
            
            init: function (){
                this.disabledFields();
                this.getCode();
                this.loadChemicalProductCoincidence();
                this.inputFormat();
                this.utilMethods();
                this.cleanForm();
                this.camposObligatorios();
                this.addLineaPrep();
                this.deleteLineaPrep();
                this.addPreparacion();
            },
            
            loadObjt: function(data, opc){
                var self = this;
                
                if(opc === "f"){
                    self.oFibras = data;
                    self.loadCombos();
                }
                
                if(opc === "q"){
                    self.oQuimicos = data;
                    self.loadCodesAndNamesQuimProduct();
                }
                
                if(opc === "pr"){
                    self.oPreparaciones = data;
                    self.startDataTables();
                }
                
                if (opc === "preparacion") {
                    self.$idPrep.val(data.code);
                }                
            },
            
            startDataTables: function() {
                var self = this;
                var i;
                var data;
                
                for (i = 0; i < self.oPreparaciones.length; i++) {
                    self.oPreparaciones[i].btnView = "<div class='form-group col-md-5'><button type='button' class='btn' id='btnViewPrep'><i class='glyphicon glyphicon-eye-open'></i></button></div>"
                }
                
                $(self.$dataTablePreparacion).dataTable({
                    "data": self.oPreparaciones,
                    "columns":[
                        {data: 'idPrep', className: 'center'},
                        {data: 'nomPrep', className: 'left'},
                        {data: 'codFibra', className: 'center'},
                        {data: 'costo', className: 'right'},
                        {data: 'ultFechaUso', className: 'center'},
                        {data: 'btnView'}
                    ],
                    "sPaginationType": "full_numbers",
                    "bAutoWidth": false
                });
            },
            
            disabledFields: function() {
                var self = this;
                
                self.$idPrep.attr("disabled", true);
                self.$nomPrep.attr("disabled", true);
                self.$cbxfibraPrep.attr("disabled", true);
                self.$codQuimPrep.attr("disabled", true);
                self.$nomQuimPrep.attr("disabled", true);
                self.$cantGrLtPrep.attr("disabled", true);
                self.$cantPctjPrep.attr("disabled", true);
                self.$btnAddLineaPrep.attr("disabled", true);
                self.$btnSavePrep.attr("disabled", true);
            },
            
            loadDataTables: function(data) {
                var self = this;
                
            },
            
            loadCombos: function() {
                var self = this;
             
                $(self.$cbxfibraPrep).empty();
                var option = document.createElement("option");
                
                $(option).text("Seleccione una...");
                
                $(self.$cbxfibraPrep).append(option);
                
                self.oFibras.forEach( function( fibra ) {
                    if (fibra.nomFibra !== "") {
                        option = document.createElement("option");
                        $(option).text(fibra.nomFibra);
                        $(self.$cbxfibraPrep).append(option);
                    }
                });
            },
            
            loadCodesAndNamesQuimProduct: function() {
                var self = this;
                
                self.oQuimicos.forEach( function( codigo ) {
                    var optCodQ = document.createElement("option");
                    optCodQ.value = codigo.codProducto;
                    $(self.$dlCodQuimPrep).append(optCodQ);
                });
                
                self.oQuimicos.forEach( function( producto ) {
                    var optNomQ = document.createElement("option");
                    optNomQ.value = producto.nomProducto;
                    $(self.$dlNomQuimPrep).append(optNomQ);
                });   
            },
            
            getCode: function() {
                var self = this;
                
                self.$btnNewPrep.on( "click", function( e ) {
                    e.preventDefault();
                    
                    self.$nomPrep.attr("disabled", false);
                    self.$cbxfibraPrep.attr("disabled", false);
                    self.$codQuimPrep.attr("disabled", false);
                    self.$nomQuimPrep.attr("disabled", false);
                    self.$btnAddLineaPrep.attr("disabled", false);                    
                });
                
                self.$cbxfibraPrep.on("change", function(val){
                    var fiber = $(this).val();
                    
                    if (fiber === "Seleccione una...") {
                        self.$idPrep.val("");
                    } else {
                        for (var i = 0; self.oFibras.length; i++) {
                            if(self.oFibras[i].nomFibra === fiber) {
                                c.consultarCodigoId(self.oFibras[i].codFibra, "preparacion");
                                break;
                            }
                        }    
                    }
                })                
            },
            
            loadChemicalProductCoincidence: function () {
                var self = this;
                var data = [];
                
                $(self.$codQuimPrep).on( "keyup change", function() {
                    self.$nomQuimPrep.val("");
                    
                    if (self.$codQuimPrep.val() !== "" && self.$codQuimPrep.val().length >= 4) {
                        data = self.searchCoincidenceChemicalProduct("cod", self.$codQuimPrep.val());
                        if (data != null) {
                            self.$nomQuimPrep.val(data.nomProducto);
                                    
                            if (data.grLt) {
                                self.$cantGrLtPrep.attr("disabled", false);
                                self.$cantPctjPrep.val("");
                                self.$cantPctjPrep.attr("disabled", true);
                            } else {
                                self.$cantGrLtPrep.val("");
                                self.$cantGrLtPrep.attr("disabled", true);
                                self.$cantPctjPrep.attr("disabled", false);
                            }   
                        }
                    }
                });
                
                $(self.$nomQuimPrep).on( "keyup change", function() {
                    self.$codQuimPrep.val("");
                    
                    if (self.$nomQuimPrep.val() !== "" && self.$nomQuimPrep.val().length >= 4) {
                        data = self.searchCoincidenceChemicalProduct("nom", self.$nomQuimPrep.val());
                        if(data != null) {
                            self.$codQuimPrep.val(data.codProducto);
                                    
                            if (data.grLt) {
                                self.$cantGrLtPrep.attr("disabled", false);
                                self.$cantPctjPrep.val("");
                                self.$cantPctjPrep.attr("disabled", true);
                            } else {
                                self.$cantGrLtPrep.val("");
                                self.$cantGrLtPrep.attr("disabled", true);
                                self.$cantPctjPrep.attr("disabled", false);
                            }
                        }
                    }
                });
            },
            
            searchCoincidenceChemicalProduct: function( tipo, quimico ) {
                var self = this;
                var dato = null;
                
                if (tipo === "cod"){                    
                    self.oQuimicos.forEach( function( data ) {
                        if(data.codProducto === quimico) {
                            dato = data;
                        }
                    });
                } else if (tipo === "nom") {
                    self.oQuimicos.forEach( function( data ) {
                        if (data.nomProducto === quimico) {
                            dato = data;
                        }
                    });
                }
                return dato;
            },
            
            inputFormat: function(){
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
                
            },
            
            utilMethods: function (){
                var self = this;
                var numbers;
                var cadena;
                
                self.$nomPrep.on("keyup", function() {
                    self.$nomPrep.val(self.$nomPrep.val().toUpperCase());
                });
                
                self.$nomQuimPrep.on("keyup", function() {
                    self.$nomQuimPrep.val(self.$nomQuimPrep.val().toUpperCase());
                });
                
                self.$codQuimPrep.on("keypress", function(eve) {
                    if (eve.keyCode < 48 || eve.keyCode > 57) {
                        eve.preventDefault();
                    }
                });
            },
            
            cleanForm: function() {
                var self = this;
                
                self.$btnCleanPrep.on("click", function( e ) {
                    e.preventDefault();
                    
                    self.$idPrep.val("");
                    self.$nomPrep.val("");
                    self.$cbxfibraPrep.val("Seleccione una...");
                    self.$codQuimPrep.val("");
                    self.$nomQuimPrep.val("");
                    self.$cantGrLtPrep.val("");
                    self.$cantPctjPrep.val("");
                    
                    $("#dataTableNewQPreparacion tr:gt(1)").remove();
                    
                    self.disabledFields();
                });
            },
            
            camposObligatorios: function() {
                var self = this;
                
                // FORMULARIO MAESTRO PREPARACIÓN PARA AGREGAR LINEA DE QUIMICO
                self.$btnAddLineaPrep.on("click", function (e) {
                    e.preventDefault();
                    self.campObligQuim = true;
                    var vacios = 3;
                    
                    if (self.$codQuimPrep.val() == "") {
                        self.$codQuimPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.$codQuimPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.$nomQuimPrep.val() == "") {
                        self.$nomQuimPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.$nomQuimPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.$cantGrLtPrep[0].disabled == false && self.$cantGrLtPrep.val() == "") {
                        self.$cantGrLtPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        if (self.$cantGrLtPrep[0].disabled != true) {
                            self.$cantGrLtPrep.closest('.form-group').removeClass('has-error');
                            vacios--;
                        }
                    }
                    
                    if (self.$cantPctjPrep[0].disabled == false && self.$cantPctjPrep.val() == "") {
                        self.$cantPctjPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        if(self.$cantPctjPrep[0].disabled != true) {
                            self.$cantPctjPrep.closest('.form-group').removeClass('has-error');
                            vacios--;
                        }
                    }
                    
                    if (vacios > 0) {   
                        self.campObligQuim = false;
                        self.mensajeObligatoriedad({"titulo": "Campos obligatorios",
                            "cuerpoMensaje": "Los campos resaltados con rojo son obligatorios, favor diligenciar el campo."
                        });
                    }
                });
                
             // FORMULARIO MAESTRO PREPARACIÓN PARA GUARDAR TODA LA PREPARACIÓN
                self.$btnSavePrep.on("click", function(e) {
                    e.preventDefault();
                    self.campObligPrep = true;
                    var vacios = 3;
                    
                    if (self.$idPrep.val() == "") {
                        self.$idPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.$idPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.$nomPrep.val() == "") {
                        self.$nomPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.$nomPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.$cbxfibraPrep.val() == "Seleccione una...") {
                        self.$cbxfibraPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.$cbxfibraPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (vacios > 0) {
                        self.campObligPrep = false;
                        self.mensajeObligatoriedad({
                            "titulo": "Campos obligatorios",
                            "cuerpoMensaje": "Los campos resaltados con rojo son obligatorios, favor diligenciar el campo."
                        });
                    }
                });
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
            
            amountOfChemicProduc: function(data){
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
            
            addLineaPrep: function() {
                var self = this;
                
                self.$btnAddLineaPrep.on("click", function( e ) {
                    e.preventDefault();
                    var b = true;
                    
                    if (self.amountOfChemicProduc({"val": self.$cantGrLtPrep.val(), "input": "grlt"})) {
                        b = false;
                        self.mensajeObligatoriedad({"titulo": "Unidad de Medida Gramos por Litro","cuerpoMensaje": "..."});
                    
                    } else if (self.amountOfChemicProduc({"val": self.$cantPctjPrep.val(), "input": "pctj"})) {
                        b = false;
                        self.mensajeObligatoriedad({"titulo": "Unidad de Medida Porcentaje por Kilo",
                                "cuerpoMensaje": "El porcentaje debe estar entre 0.00001 y 100.00000."});
                    }
                    
                    if (b && self.campObligQuim) {
                        var fila = document.createElement("tr");
                        var codQuim = document.createElement("td");
                        var nomQuim = document.createElement("td");
                        var cantGrLt = document.createElement("td");
                        var cantPctj = document.createElement("td");
                        var btnDel = document.createElement("td");
                        
                        codQuim.textContent = self.$codQuimPrep.val();
                        nomQuim.textContent = self.$nomQuimPrep.val();
                        cantGrLt.textContent = self.$cantGrLtPrep.val();
                        cantPctj.textContent = self.$cantPctjPrep.val();
                        btnDel.innerHTML = "<div class='form-group col-md-12'><button type='button' class='btn' id='btnDelLineaPrep'><i class='fa fa-trash-o'></i></button></div>";
                        
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
                        
                        self.$btnSavePrep.attr("disabled", false);
                    }
                });                
            },
            
            deleteLineaPrep: function() {
                var self = this;
                
                $(document).on("click", "#btnDelLineaPrep", function( e ) {
                    var fila = $(this).parent().parent().parent();
                    fila.remove();
                    e.stopPropagation();
                });
            }, 
            
            addPreparacion: function() {
                var self = this;
                
                self.$btnSavePrep.on("click", function( e ) {
                    e.preventDefault();
                    var b = true;
                    
                    if (self.amountOfChemicProduc({"val": self.$cantGrLtPrep.val(), "input": "grlt"})) {
                        b = false;
                        self.mensajeObligatoriedad({"titulo": "Unidad de Medida Gramos por Litro","cuerpoMensaje": "..."});
                    
                    } else if (self.amountOfChemicProduc({"val": self.$cantPctjPrep.val(), "input": "pctj"})) {
                        b = false;
                        self.mensajeObligatoriedad({"titulo": "Unidad de Medida Porcentaje por Kilo",
                                "cuerpoMensaje": "El porcentaje debe estar entre 0.00001 y 100.00000."});
                    }
                    
                    if (b && self.campObligPrep) {
                        
                    }
                });                
            }
        };
    })();
    
    frmPreparacion.init();
    
})(document, window, jQuery)