(function (document, window, $, undefined){
    (function (){
        return ingreso = {
            //variables: "",
            URLgetUser: "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getUser",
            txtUser: $("#UserSignIn"),
            txtPass: $("#PassSignIn"),
            btnIngresar: $("#ingresar"),
            modalMensaje: $("#myModal"),
            tituloMensaje: $("#myModalLabel"),
            cuerpoMensaje: $("#cuerpoMensaje"),  
            
            init: function (){
                this.consultarUsuario();
            },
            
            consultarUsuario: function (){
                var self = this;
                
                $(self.btnIngresar).on("click", function (e) {
                    e.preventDefault();
                    
                   $.ajax( self.URLgetUser, {
                       type: "POST",
                       data: "user=" + $(self.txtUser).val() + "&pass=" + $(self.txtPass).val() 
                   })
                   .done( function(data) {
                       if (data.find) {
                           localStorage.setItem("uss", JSON.stringify(data));
                           window.location = "index.html";
                           //menu.menuPrincipal();
                       }else{
                           try {
                               self.tituloMensaje.text("Identificación de usuario");
                               self.cuerpoMensaje.text("Nombre de usuario o contraseña inválidos.");
                               self.modalMensaje.modal("show");
                           } catch (e) {
                               alert("Nombre de usuario o contraseña inválidos.");
                           }
                        }
                    })
                    .fail( function(err) {
                        try {
                            self.tituloMensaje.text("Conexión con el servidor");
                            self.cuerpoMensaje.text("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
                            self.modalMensaje.modal("show");
                        } catch (e) {
                            alert("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
                        }
                    });
                });
            }
        };
    })();
    
    (function() {
        return definirElementos = {
            frmPreparacion: $("#frmPreparacion"),
            dataTableNewQPreparacion: $("#dataTableNewQPreparacion"),
            dataTablePreparacion: $('#dataTablePreparacion'),
            frmAuxiliares: $("#frmAuxiliares"),
            dataTableNewQAuxiliar: $("#dataTableNewQAuxiliar"),
            dataTableAuxiliar: $("#dataTableAuxiliar"),
            
            init: function (){
                this.iniciarDataTables();
            },
            
            iniciarDataTables: function() {
                var self = this;
                
                $(document).ready(function() {
                    self.dataTableNewQPreparacion.dataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bSort": false,
                        "bInfo": false,
                        "bAutoWidth": false
                    });
                    
                    self.dataTableNewQAuxiliar.dataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bSort": false,
                        "bInfo": false,
                        "bAutoWidth": false
                    });
                    
                    self.dataTableAuxiliar.dataTable({
                        "sPaginationType": "full_numbers",
                        "bAutoWidth": false
                    });
                });
            }
        };
    })();
    
    (function (){
        return menu = {
            user: "",
            ubicacionActual: $("#ubicacionActual"),
            nav: $("#nav"),
            navLab: $("#navLab"),
            nomUser: $("#nomUser"),
            nomUser2: $("#nomUser2"),
            rowPreparacion: $("#rowPreparacion"),
            frmMaestroPrep: $("#frmMaestroPrep"),
            tblMaestroPrep: $("#tblMaestroPrep"),
            rowAuxiliares: $("#rowAuxiliares"),
            frmMaestroAux: $("#frmMaestroAux"),
            tblMaestroAux: $("#tblMaestroAux"),
            
            init: function() {
                this.ocultarMenu();
                this.ocultarFormularios();
                this.cargarSesion();
                this.menuPrincipal();
                this.listaDeOpciones();
            },
            
            ocultarMenu: function() {
                var self = this;
                
                $(self.navLab).hide();
            },
            
            ocultarFormularios: function() {
                var self = this;
                
                self.rowPreparacion.hide();
                self.rowAuxiliares.hide();
            },
            
            cargarSesion: function(){
                var self = this;
                
                self.user = JSON.parse(localStorage.getItem("uss"));
                //localStorage.removeItem("uss");
                this.menuPrincipal();
            },
            
            menuPrincipal: function() {
                var self = this;
                
                
                if (self.user != null) {
                    if (self.user.permiso) {
                        self.navLab.show();
                    }
                    
                    self.nomUser.text(this.nombre(self.user.nombre1, self.user.nombre2));
                    self.nomUser2.text(self.nomUser);
                }
            },
            
            listaDeOpciones: function() {
                var self = this;
                self.nav.on("click", function(e) {
                    var selec = e.toElement.textContent;
                    
                    switch (selec) {
                        case "Dashboard":
                            this.children[0].className = "active";
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-home'></i>Dashboard";
                            self.ocultarMenu();
                            self.ocultarFormularios();
                            self.menuPrincipal();
                            
                            this.children[1].className = "";
                            this.children[2].className = "nav-parent";
                            
                            break;
                            
                        case "Email":
                            this.children[1].className = "active";
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-envelope-o'></i>Email";
                            self.ocultarMenu();
                            self.ocultarFormularios();
                            self.menuPrincipal();
                            
                            this.children[0].className = "";
                            this.children[2].className = "nav-parent";
                            
                            break;
                            
                        case "Maestro Preparación":
                            this.children[2].className = "nav-parent active";
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-edit'></i>Laboratorio / Maestro Preparación";
                            self.ocultarMenu();
                            self.ocultarFormularios();
                            self.menuPrincipal();
                            
                            self.rowPreparacion.show();
                            self.frmMaestroPrep.children(".minimize").click();
                            self.tblMaestroPrep.children(".minimize").click();
                            
                            this.children[0].className = "";
                            this.children[1].className = "";
                            break;
                        
                        case "Maestro Auxiliares":
                            this.children[2].className = "nav-parent active";
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-edit'></i>Laboratorio / Maestro Auxiliares";
                            self.ocultarMenu();
                            self.ocultarFormularios();
                            self.menuPrincipal();
                            
                            self.rowAuxiliares.show();
                            self.frmMaestroAux.children(".minimize").click();
                            self.tblMaestroAux.children(".minimize").click();
                            
                            this.children[0].className = "";
                            this.children[1].className = "";
                            break;
                            
                        case "Maestro Procesos Posteriores":
                            /*this.children[2].className = "nav-parent active";
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-edit'></i>Laboratorio / ";
                            self.ocultarMenu();
                            self.ocultarFormularios();
                            self.menuPrincipal();
                            
                            self.rowPreparacion.show();
                            self.frmMaestroPrep.children(".minimize").click();
                            self.tblMaestroPrep.children(".minimize").click();
                            
                            this.children[0].className = "";
                            this.children[1].className = "";
                            break;*/
                            
                        case "Maestro Fibras":
                            /*this.children[2].className = "nav-parent active";
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-edit'></i>Laboratorio / ";
                            self.ocultarMenu();
                            self.ocultarFormularios();
                            self.menuPrincipal();
                            
                            self.rowPreparacion.show();
                            self.frmMaestroPrep.children(".minimize").click();
                            self.tblMaestroPrep.children(".minimize").click();
                            
                            this.children[0].className = "";
                            this.children[1].className = "";
                            break;*/
                    }
                });
            },
            
            nombre: function(nom1, nom2) {
                var len;
                
                len = nom1.length;
                
                nom1 = nom1.toLowerCase();
                nom1 = nom1.substr(0,1).toUpperCase() + nom1.substr(1, len);
                
                len = nom2.length;
                
                nom2 = nom2.toLowerCase();
                nom2 = nom2.substr(0,1).toUpperCase() + nom2.substr(1, len);
                
                if (nom1 != "" && nom2 != "") {
                    return nom1 + " " + nom2;
                } else if (nom1 != "" && nom2 == "") {
                    return nom1;
                }
            }
        };
    })();
    
    (function (){
        return cargarInformacion = {
            URLgetFibras: "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getFibras",
            URLgetProductosQuimicos: "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getProductosQuimicos",
            URLgetPreparaciones: "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getPreparaciones",
            btnNewPrep: $("#btnNewPrep"),
            idPrep: $("#idPrep"),
            nomPrep: $("#nomPrep"),
            cbxfibraPrep: $("#cbxfibraPrep"),
            codQuimPrep: $("#codQuimPrep"),
            nomQuimPrep: $("#nomQuimPrep"),
            dlCodQuimPrep: $("#dlCodQuimPrep"),
            dlNomQuimPrep: $("#dlNomQuimPrep"),
            cantGrLtPrep: $("#cantGrLtPrep"),
            cantPctjPrep: $("#cantPctjPrep"),
            btnAddLineaPrep: $("#btnAddLineaPrep"),
            btnSavePrep: $("#btnSavePrep"),
            btnCleanPrep: $("#btnCleanPrep"),
            btnNewAux: $("#btnNewAux"),
            idAux: $("#idAux"),
            nomAux: $("#nomAux"),
            cbxfibraAux: $("#cbxfibraAux"),
            codQuimAux: $("#codQuimAux"),
            nomQuimAux: $("#nomQuimAux"),
            dlCodQuimAux: $("#dlCodQuimAux"),
            dlNomQuimAux: $("#dlNomQuimAux"),
            cantGrLtAux: $("#cantGrLtAux"),
            cantPctjAux: $("#cantPctjAux"),
            btnAddLineaAux: $("#btnAddLineaAux"),
            btnSaveAux: $("#btnSaveAux"),
            btnCleanAux: $("#btnCleanAux"),
            dataTablePreparacion: $('#dataTablePreparacion'),
            dataTableAuxiliar: $("#dataTableAuxiliar"),
            tBodyTablePreparacion: $("#tBodyTablePreparacion"),
            productosQuim: [],
            fibras: [],
            preparaciones: [],
            
            init: function() {
                this.deshabilitarCampos();
                this.consultarMateriales();
                this.solicitarCodigo();
                this.cargarCoincidenciasProdQuimPreparacion();
                this.cargarCoincidenciasProdQuimAuxiliares();
                this.cargarDataTables();
                this.convertirMinusToMayus();
                this.limpiarFormularios();
            },
            
            deshabilitarCampos: function() {
                var self = this;
                
                /*FORMULARIO MAESTRO PREPARACION*/
                self.idPrep.attr("disabled", true);
                self.nomPrep.attr("disabled", true);
                self.cbxfibraPrep.attr("disabled", true);
                self.codQuimPrep.attr("disabled", true);
                self.nomQuimPrep.attr("disabled", true);
                self.cantGrLtPrep.attr("disabled", true);
                self.cantPctjPrep.attr("disabled", true);
                self.btnAddLineaPrep.attr("disabled", true);
                self.btnSavePrep.attr("disabled", true);
                
                /*FORMULARIO MAESTRO AUXILIARES*/
                self.idAux.attr("disabled", true);
                self.nomAux.attr("disabled", true);
                self.cbxfibraAux.attr("disabled", true);
                self.codQuimAux.attr("disabled", true);
                self.nomQuimAux.attr("disabled", true);
                self.cantGrLtAux.attr("disabled", true);
                self.cantPctjAux.attr("disabled", true);
                self.btnAddLineaAux.attr("disabled", true);
                self.btnSaveAux.attr("disabled", true);
            },
            
            consultarMateriales: function() {
                var self = this;
                
             /* CONSULTA DE TODAS LAS FIBRAS, LLEGA CODIGO FIBRA Y NOMBRE DE LA FIBRA*/
                $.getJSON(self.URLgetFibras, function( data ){
                    self.fibras = data;
                    self.cargarCombos( data );
                });
                
             /* CONSULTA DE TODOS LOS PRODUCTOS QUIMICOS Y COLORANTES, */
                $.getJSON(self.URLgetProductosQuimicos, function( data ) {
                    self.cargarCodigosAndNombresProductQuim( data );
                });
            
             /* CONSULTA DE TODOS LAS PREPARACIONES, */
                $.getJSON(self.URLgetPreparaciones, function( data ) {
                    self.cargarDataTables(data);
                });
            },
            
            cargarDataTables: function(data) {
                var self = this;
                var i = 0;
                var datos = [];
                
                
                $("#dataTablePreparacion tr:gt(0)").remove();
                
                if (data != undefined) {
                    for (i = 0; i < data.length; i++) {
                        
                        var fila = document.createElement("tr");
                        var idPrep = document.createElement("td"); 
                        var nomPrep = document.createElement("td"); 
                        var fibra = document.createElement("td"); 
                        var costo = document.createElement("td"); 
                        var ultFechaUso = document.createElement("td"); 
                        var edit = document.createElement("td"); 
                        var view = document.createElement("td");
                        
                        $(idPrep).text(data[i].idPrep);
                        $(nomPrep).text(data[i].nomPrep.toUpperCase());
                        $(fibra).text(function() {
                            for(var x = 0; x < self.fibras.length; x++){
                                if(data[i].codFibra == self.fibras[x].codFibra){
                                    return self.fibras[x].nomFibra.toUpperCase();
                                }
                            }
                        });
                        $(costo).text(data[i].costo);
                        $(ultFechaUso).text(data[i].ultFechaUso);
                        $(edit).text("E");
                        $(view).text("F");
                        
                        $(fila).append(idPrep);
                        $(fila).append(nomPrep);
                        $(fila).append(fibra);
                        $(fila).append(costo);
                        $(fila).append(ultFechaUso);
                        $(fila).append(edit);
                        $(fila).append(view);
                        
                        $(self.tBodyTablePreparacion).append(fila);
                    }
                    
                    self.dataTablePreparacion.dataTable({
                        "sPaginationType": "full_numbers",
                        "bAutoWidth": false,
                    });
                } 
                
            },
            
            cargarCombos: function(data) {
                var self = this;
                
             /* LIMPIANDO COMBOBOX DE LOS FORMULARIO */
                $(self.cbxfibraPrep).empty();
                $(self.cbxfibraAux).empty();           
             /***************************************/
                
             /* INICIO DE CARGA DE INFORMACION PARA LOS COMBOBOX QUE CONTIENEN LA MISMA INFORMACION */
                var option = document.createElement("option");          //PARA FORMULARIO PREPARACION
                var option2 = document.createElement("option");         // PARA FORMULARIO AUXILIARES
                
                $(option).text("Seleccione una...");
                $(option2).text("Seleccione una...");
                
                $(self.cbxfibraPrep).append(option);
                $(self.cbxfibraAux).append(option2);
                
                data.forEach( function( fibra ) {
                    option = document.createElement("option");
                    option2 = document.createElement("option");
                    var str = fibra.nomFibra;
                    $(option).text(str.toUpperCase());
                    $(option2).text(str.toUpperCase());
                    
                    $(self.cbxfibraPrep).append(option);
                    $(self.cbxfibraAux).append(option2);
                } );
             /***************************************************************************************/
            },
            
            cargarCodigosAndNombresProductQuim: function( data ) {
                var self = this;
                
                self.productosQuim = data;
                
             /* CARGAR DATALIST DE CODIGOS DE LOS FORMULARIO */
                data.forEach( function(codigo) {
                    var optCodQ = document.createElement("option");
                    var optCodQ2 = document.createElement("option");
                    
                    optCodQ.value = codigo.codProducto;
                    optCodQ2.value = codigo.codProducto;
                    
                    self.dlCodQuimPrep.append(optCodQ);
                    self.dlCodQuimAux.append(optCodQ2);
                });
                
                data.forEach( function( producto ) {
                    var optNomQ = document.createElement("option");
                    var optNomQ2 = document.createElement("option");
                    
                    optNomQ.value = producto.nomProducto;
                    optNomQ2.value = producto.nomProducto;
                    
                    self.dlNomQuimPrep.append(optNomQ);
                    self.dlNomQuimAux.append(optNomQ2);
                });   
            },
            
            solicitarCodigo: function() {
                var self = this;
                
                $(self.btnNewPrep).on( "click", function( e ) {
                    e.preventDefault();
                    
                    //$.getJSON();
                    
                    self.idPrep.val(1);                    
                    if (self.idPrep.val() != "") {
                        self.nomPrep.attr("disabled", false);
                        self.cbxfibraPrep.attr("disabled", false);
                        self.codQuimPrep.attr("disabled", false);
                        self.nomQuimPrep.attr("disabled", false);
                        self.btnAddLineaPrep.attr("disabled", false);
                    }
                });
                
                $(self.btnNewAux).on( "click", function( e ) {
                    e.preventDefault();
                    
                    //$.getJSON();
                    
                    self.idAux.val(1);
                    if (self.idAux.val() != "") {
                        self.nomAux.attr("disabled", false);
                        self.cbxfibraAux.attr("disabled", false);
                        self.codQuimAux.attr("disabled", false);
                        self.nomQuimAux.attr("disabled", false);
                        self.btnAddLineaAux.attr("disabled", false);
                    }
                });
            },
            
            cargarCoincidenciasProdQuimPreparacion: function () {
                var self = this;
                var data = [];
                
             /* FORMULARIO MAESTRO DE PREPARACION */
                $(self.codQuimPrep).on( "keyup change", function() {
                    self.nomQuimPrep.val("");
                    
                    if (self.codQuimPrep.val() !== "" && self.codQuimPrep.val().length >= 4) {
                        data = self.buscarCoincidenciasProdQuim("cod", self.codQuimPrep.val());
                        if (data != null) {
                            self.nomQuimPrep.val(data.nomProducto);
                                    
                            if (data.grLt) {
                                self.cantGrLtPrep.attr("disabled", false);
                                self.cantPctjPrep.val("");
                                self.cantPctjPrep.attr("disabled", true);
                            } else {
                                self.cantGrLtPrep.val("");
                                self.cantGrLtPrep.attr("disabled", true);
                                self.cantPctjPrep.attr("disabled", false);
                            }   
                        }
                    }
                });
                
                $(self.nomQuimPrep).on( "keyup change", function() {
                    self.codQuimPrep.val("");
                    
                    if (self.nomQuimPrep.val() !== "" && self.nomQuimPrep.val().length >= 4) {
                        data = self.buscarCoincidenciasProdQuim("nom", self.nomQuimPrep.val());
                        if(data != null) {
                            self.codQuimPrep.val(data.codProducto);
                                    
                            if (data.grLt) {
                                self.cantGrLtPrep.attr("disabled", false);
                                self.cantPctjPrep.val("");
                                self.cantPctjPrep.attr("disabled", true);
                            } else {
                                self.cantGrLtPrep.val("");
                                self.cantGrLtPrep.attr("disabled", true);
                                self.cantPctjPrep.attr("disabled", false);
                            }
                        }
                    }
                });
            },
            
            cargarCoincidenciasProdQuimAuxiliares: function() {
                var self = this;
                var data = [];
                
                $(self.codQuimAux).on( "keyup change", function() {
                    self.nomQuimAux.val("");
                    
                    if (self.codQuimAux.val() !== "" && self.codQuimAux.val().length >= 4) {
                        data = self.buscarCoincidenciasProdQuim("cod", self.codQuimAux.val());
                        if (data != null) {
                            self.nomQuimAux.val(data.nomProducto);
                                    
                            if (data.grLt) {
                                self.cantGrLtAux.attr("disabled", false);
                                self.cantPctjAux.val("");
                                self.cantPctjAux.attr("disabled", true);
                            } else {
                                self.cantGrLtAux.val("");
                                self.cantGrLtAux.attr("disabled", true);
                                self.cantPctjAux.attr("disabled", false);
                            }   
                        }
                    }
                });
                
                $(self.nomQuimAux).on( "keyup change", function() {
                    self.codQuimAux.val("");
                    
                    if (self.nomQuimAux.val() !== "" && self.nomQuimAux.val().length >= 4) {
                        data = self.buscarCoincidenciasProdQuim("nom", self.nomQuimAux.val());
                        if(data != null) {
                            self.codQuimAux.val(data.codProducto);
                                    
                            if (data.grLt) {
                                self.cantGrLtAux.attr("disabled", false);
                                self.cantPctjAux.val("");
                                self.cantPctjAux.attr("disabled", true);
                            } else {
                                self.cantGrLtAux.val("");
                                self.cantGrLtAux.attr("disabled", true);
                                self.cantPctjAux.attr("disabled", false);
                            }   
                        }
                    }
                });
            },
            
            buscarCoincidenciasProdQuim: function( tipo, quimico ) {
                var self = this;
                var dato = null;
                
                if (tipo == "cod"){                    
                    self.productosQuim.forEach( function( data ) {
                        if(data.codProducto === quimico) {
                            dato = data;
                        }
                    });
                } else if (tipo == "nom") {
                    self.productosQuim.forEach( function( data ) {
                        if (data.nomProducto === quimico) {
                            dato = data;
                        }
                    });
                }
                return dato;
            },
            
            convertirMinusToMayus: function() {
                var self = this;
                
                $(self.nomPrep).on("keyup", function() {
                    self.nomPrep.val(self.nomPrep.val().toUpperCase());
                });
                
                $(self.nomQuimPrep).on("keyup", function() {
                    self.nomQuimPrep.val(self.nomQuimPrep.val().toUpperCase());
                });
                
                $(self.nomAux).on("keyup", function() {
                    self.nomAux.val(self.nomAux.val().toUpperCase());
                });
                
                $(self.nomQuimAux).on("keyup", function() {
                    self.nomQuimAux.val(self.nomQuimAux.val().toUpperCase());
                });
            }, 
            
            limpiarFormularios: function() {
                var self = this;
                
                self.btnCleanPrep.on("click", function( e ) {
                    e.preventDefault();
                    
                    self.idPrep.val("");
                    self.nomPrep.val("");
                    self.cbxfibraPrep.val("Seleccione una...");
                    self.codQuimPrep.val("");
                    self.nomQuimPrep.val("");
                    self.cantGrLtPrep.val("");
                    self.cantPctjPrep.val("");
                    
                    self.deshabilitarCampos();
                });
                
                self.btnCleanAux.on("click", function( e ) {
                    e.preventDefault();
                    
                    self.idAux.val("");
                    self.nomAux.val("");
                    self.cbxfibraAux.val("Seleccione una...");
                    self.codQuimAux.val("");
                    self.nomQuimAux.val("");
                    self.cantGrLtAux.val("");
                    self.cantPctjAux.val("");
                    
                    self.deshabilitarCampos();
                });
            }
        };
    })();
    
    (function (){
        return validarCamposFrm = {
            modalMensaje: $("#myModal"),
            tituloMensaje: $("#myModalLabel"),
            cuerpoMensaje: $("#cuerpoMensaje"),  
            frmPreparacion: $("#frmPreparacion"),
            btnNewPrep: $("#btnNewPrep"),
            idPrep: $("#idPrep"),
            nomPrep: $("#nomPrep"),
            cbxfibraPrep: $("#cbxfibraPrep"),
            codQuimPrep: $("#codQuimPrep"),
            nomQuimPrep: $("#nomQuimPrep"),
            cantGrLtPrep: $("#cantGrLtPrep"),
            cantPctjPrep: $("#cantPctjPrep"),
            btnAddLineaPrep: $("#btnAddLineaPrep"),
            btnSavePrep: $("#btnSavePrep"),
            frmAuxiliares: $("#frmAuxiliares"),
            btnNewAux: $("#btnNewAux"),
            idAux: $("#idAux"),
            nomAux: $("#nomAux"),
            cbxfibraAux: $("#cbxfibraAux"),
            codQuimAux: $("#codQuimAux"),
            nomQuimAux: $("#nomQuimAux"),
            cantGrLtAux: $("#cantGrLtAux"),
            cantPctjAux: $("#cantPctjAux"),
            btnAddLineaAux: $("#btnAddLineaAux"),
            btnSaveAux: $("#btnSaveAux"),
            
            /*Frm Preparacion
            idPrep
            btnNewPrep
            nomPrep
            cbxfibraPrep
            dataTableNewQPreparacion
            codQuimPrep
            nomQuimPrep
            cantGrLtPrep
            cantPctjPrep
            btnAddLineaPrep
            btnEditLinePrep
            btnTrahsLinePrep
            btnSavePrep
            dataTablePreparacion
            btnEditAllPrep*/
            
            /*Frm Auxiliares
            idAux
            btnNewAux
            nomAux
            cbxfibraAux
            dataTableNewQAuxiliar
            codQuimAux
            nomQuimAux
            cantGrLtAux
            cantPctjAux
            btnAddLineaAux
            btnEditLineAux
            btnTrahsLineAux
            btnSaveAux
            dataTableAuxiliar
            btnEditAllAuxiliar*/
            
            init: function (){
                this.camposObligatorios();
            },
            
            camposObligatorios: function() {
                var self = this;
                
             /* FORMULARIO MAESTRO PREPARACIÓN PARA AGREGAR LINEA DE QUIMICO */
                self.btnAddLineaPrep.on("click", function (e) {
                    e.preventDefault();
                    var vacios = 3;
                    
                    if (self.codQuimPrep.val() == "") {
                        self.codQuimPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.codQuimPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.nomQuimPrep.val() == "") {
                        self.nomQuimPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.nomQuimPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.cantGrLtPrep[0].disabled == false && self.cantGrLtPrep.val() == "") {
                        self.cantGrLtPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        if (self.cantGrLtPrep[0].disabled != true) {
                            self.cantGrLtPrep.closest('.form-group').removeClass('has-error');
                            vacios--;
                        }
                    }
                    
                    if (self.cantPctjPrep[0].disabled == false && self.cantPctjPrep.val() == "") {
                        self.cantPctjPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        if(self.cantPctjPrep[0].disabled != true) {
                            self.cantPctjPrep.closest('.form-group').removeClass('has-error');
                            vacios--;
                        }
                    }
                    
                    if (vacios > 0) {
                        self.mensajeObligatoriedad({
                            "titulo": "Campos obligatorios",
                            "cuerpoMensaje": "Los campos resaltados con rojo son obligatorios, favor diligenciar el campo."
                        });
                    }
                    
                });
                
             /* FORMULARIO MAESTRO PREPARACIÓN PARA GUARDAR TODA LA PREPARACIÓN */
                self.btnSavePrep.on("click", function(e) {
                    e.preventDefault();
                    var vacios = 3;
                    
                    if (self.idPrep.val() == "") {
                        self.idPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.idPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.nomPrep.val() == "") {
                        self.nomPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.nomPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.cbxfibraPrep.val() == "Seleccione una...") {
                        self.cbxfibraPrep.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.cbxfibraPrep.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (vacios > 0) {
                        self.mensajeObligatoriedad({
                            "titulo": "Campos obligatorios",
                            "cuerpoMensaje": "Los campos resaltados con rojo son obligatorios, favor diligenciar el campo."
                        });
                    }
                });
                
             /* FORMULARIO MAESTRO AUXILIARES PARA AGREGAR LINEA DE QUIMICO */
                self.btnAddLineaAux.on("click", function (e) {
                    e.preventDefault();
                    var vacios = 3;
                    
                    if (self.codQuimAux.val() == "") {
                        self.codQuimAux.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.codQuimAux.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.nomQuimAux.val() == "") {
                        self.nomQuimAux.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.nomQuimAux.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.cantGrLtAux[0].disabled == false && self.cantGrLtAux.val() == "") {
                        self.cantGrLtAux.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        if (self.cantGrLtAux[0].disabled != true) {
                            self.cantGrLtAux.closest('.form-group').removeClass('has-error');
                            vacios--;
                        }
                    }
                    
                    if (self.cantPctjAux[0].disabled == false && self.cantPctjAux.val() == "") {
                        self.cantPctjAux.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        if(self.cantPctjAux[0].disabled != true) {
                            self.cantPctjAux.closest('.form-group').removeClass('has-error');
                            vacios--;
                        }
                    }
                    
                    if (vacios > 0) {
                        self.mensajeObligatoriedad({
                            "titulo": "Campos obligatorios",
                            "cuerpoMensaje": "Los campos resaltados con rojo son obligatorios, favor diligenciar el campo."
                        });
                    }
                    
                });   
                
             /* FORMULARIO MAESTRO AUXILIARES PARA GUARDAR TODO */
                self.btnSaveAux.on("click", function(e){
                    e.preventDefault();
                    var vacios = 3;
                    
                    if (self.idAux.val() == "") {
                        self.idAux.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.idAux.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.nomAux.val() == "") {
                        self.nomAux.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.nomAux.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (self.cbxfibraAux.val() == "Seleccione una...") {
                        self.cbxfibraAux.closest('.form-group').removeClass('has-success').addClass('has-error');
                    } else {
                        self.cbxfibraAux.closest('.form-group').removeClass('has-error');
                        vacios--;
                    }
                    
                    if (vacios > 0) {
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
                    self.tituloMensaje.text(mensaje.titulo);
                    self.cuerpoMensaje.text(mensaje.cuerpoMensaje);
                    self.modalMensaje.modal("show");
                } catch (e) {
                    alert(mensaje.cuerpoMensaje);
                }
            }
        };
    })();
    
    /*
    (function (){
        return nombreFuncion = {
        
        };
    })();
    */
    
    ingreso.init();
    definirElementos.init();
    menu.init();
    cargarInformacion.init();
    validarCamposFrm.init();

})(document, window, jQuery);

