(function (document, window, $, undefined){
    (function (){
        return dashboard = {
            user: "",
            ubicacionActual: $("#ubicacionActual"),
            nav: $("#nav"),
            navLab: $("#navLab"),
            nomUser: $("#nomUser"),
            nomUser2: $("#nomUser2"),
            rowPreparacion: $("#rowPreparacion"),
            frmMaestroPrep: $("#frmMaestroPrep"),
            tblMaestroPrep: $("#tblMaestroPrep"),
            rowAuxiliares: $("#rowAuxiliar"),
            frmMaestroAux: $("#frmMaestroAux"),
            tblMaestroAux: $("#tblMaestroAux"),
            rowProcPos: $("#rowProcPos"),
            frmMaestroProcPos: $("#frmMaestroProcPos"),
            tblMaestroProcPos: $("#tblMaestroProcPos"),
            $contenido: $("#contenido"),
            
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
                self.rowProcPos.hide();
            },
            
            cargarSesion: function(){
                var self = this;
                
                self.user = JSON.parse(sessionStorage.getItem("user"));
                //sessionStorage.removeItem("user");
                this.menuPrincipal();
            },
            
            menuPrincipal: function() {
                var self = this;
                
                if (!$.isEmptyObject(self.user)) {
                    
                    if (self.user.rolUsuario === 1) {
                        self.navLab.show();
                    }
                    
                    self.nomUser.text(this.nombre(self.user.idUsuario.priNombre, self.user.idUsuario.segNombre));
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
                            this.children[2].className = "nav-parent active";
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-edit'></i>Laboratorio / Maestro Procesos Posteriores";
                            self.ocultarMenu();
                            self.ocultarFormularios();
                            self.menuPrincipal();
                            
                            self.rowProcPos.show();
                            self.frmMaestroProcPos.children(".minimize").click();
                            self.tblMaestroProcPos.children(".minimize").click();
                            
                            this.children[0].className = "";
                            this.children[1].className = "";
                            break;
                            
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
                
                if (nom1 !== "" && nom2 !== "") {
                    return nom1 + " " + nom2;
                } else if (nom1 !== "" && nom2 === "") {
                    return nom1;
                }
            }
        };
    })();
    
    dashboard.init();

})(document, window, jQuery);

