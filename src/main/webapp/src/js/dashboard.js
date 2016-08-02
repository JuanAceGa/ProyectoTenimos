(function (document, window, $, undefined){
    (function (){
        return dashboard = {
            user: "",
            ubicacionActual: $("#ubicacionActual"),
            logout1: $('#logout1'),
            logout2: $('#logout2'),
            nav: $("#nav"),
            navDash: $('#navDash'),
            navEmail: $('#navEmail'),
            navLab: $("#navLab"),
            navProd: $("#navProd"),
            navProg: $("#navProg"),
            nomUser: $("#nomUser"),
            nomUser2: $("#nomUser2"),
            rowMaestrosPendientes: $('#rowMaestrosPendientes'),
            tblMaestroPend: $('#tblMaestroPend'),
            rowEditarPendientes: $('#rowEditarPendientes'),
            tblEditarPend: $('#tblEditarPend'),
            rowPreparacion: $("#rowPreparacion"),
            frmMaestroPrep: $("#frmMaestroPrep"),
            tblMaestroPrep: $("#tblMaestroPrep"),
            rowAuxiliares: $("#rowAuxiliar"),
            frmMaestroAux: $("#frmMaestroAux"),
            tblMaestroAux: $("#tblMaestroAux"),
            rowProcPos: $("#rowProcPos"),
            frmMaestroProcPos: $("#frmMaestroProcPos"),
            tblMaestroProcPos: $("#tblMaestroProcPos"),
            rowFibra: $("#rowFibra"),
            frmMaestroFibra: $("#frmMaestroFibra"),
            tblMaestroFibra: $("#tblMaestroFibra"),
            rowFormular: $("#rowFormular"),
            frmFormular: $("#frmFormular"),
            tblMaestroFormulas: $("#tblMaestroFormulas"),
            rowProceso: $("#rowProceso"),
            frmMaestroProceso: $("#frmMaestroProceso"),
            tblMaestroProceso: $("#tblMaestroProceso"),
            rowCurva: $("#rowCurva"),
            frmMaestroCurva: $("#frmMaestroCurva"),
            tblMaestroCurva: $("#tblMaestroCurva"),
            rowFormsLL: $('#rowFormsLL'),
            rowTablesLL: $('#rowTablesLL'),
            frmMaestroLabel: $('#frmMaestroLabel'),
            frmMaestroLista: $('#frmMaestroLista'),
            tblMaestroLabel: $('#tblMaestroLabel'),
            tblMaestroLista: $('#tblMaestroLista'),
            rowPendFormular: $('#rowPendFormular'),
            rowProgMaquinas: $('#rowProgMaquinas'),
            $contenido: $("#contenido"),
            
            init: function() {
                this.ocultarFormularios();
                this.cargarSesion();
                //this.menuPrincipal();
                this.listaDeOpciones();
                this.verificarRol();
                this.cerrarSesion();
            },
            
            cerrarSesion: function () {
                var self = this;
                
                self.logout1.on('click', function(e){
                    e.preventDefault();
                    
                    window.location = '../../../index.jsp';
                });
                
                self.logout2.on('click', function(e){
                    e.preventDefault();
                    
                    window.location = '../../../index.jsp';
                });
            },
            
            ocultarFormularios: function() {
                var self = this;
                
                self.rowMaestrosPendientes.hide();
                self.rowPreparacion.hide();
                self.rowAuxiliares.hide();
                self.rowProcPos.hide();
                self.rowFibra.hide();
                self.rowProceso.hide();
                self.rowCurva.hide();
                self.rowFormsLL.hide();
                self.rowTablesLL.hide();
                self.rowFormular.hide();
                self.rowEditarPendientes.hide();
                self.rowPendFormular.hide();
                self.rowProgMaquinas.hide();
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
                    
                } else {
                    window.location = '../../../index.jsp';
                }
            },
            
            verificarRol: function() {
                var self = this;
                var modulo = self.user.rolUsuario.nombreModulo;
                var subMod = self.user.rolUsuario.nombreSubmodulo.split(';');
                var mod = [self.navLab, self.navProd, self.navProg];
                
                switch (modulo) {
                    case "TODOS":
                        
                        if (subMod[0] !== 'TODOS') {
                            for (var m = 0; m < mod.length; m++) {
                                var a = mod[m].find('ul li a');                                
                                for (var x = 0; x < a.length; x++) {
                                    var t = $(a[x]).text();
                                    for (var i = 0; i < subMod.length; i++) {
                                        if (t.toUpperCase() === subMod[i]) {
                                            $(a[x]).show();
                                            a.splice(x, 1);
                                            x--;
                                            
                                            if (subMod.length > 1) {
                                                subMod.splice(i, 1);
                                                i--;
                                            }
                                            
                                            break;
                                        } else {
                                            $(a[x]).hide();
                                        }
                                    }
                                }
                            }
                        }
                        break;
                        
                    case 'LABORATORIO':
                        
                        for (var m = 0; m < mod.length; m++) {
                            var am = mod[m].find('a span');
                            var tm = am.text();
                            if (tm.toUpperCase() === modulo) {
                                if (subMod[0] !== 'TODOS') {
                                    var asm = mod[m].find('ul li a');
                                    for (var x = 0; x < asm.length; x++) {
                                        var tsm = $(asm[x]).text();
                                        for (var i = 0; i < subMod.length; i++) {                                            
                                            if (tsm.toUpperCase() === subMod[i]) {
                                                $(asm[x]).show();
                                                asm.splice(x, 1);
                                                x--;
                                            
                                                if (subMod.length > 1) {
                                                    subMod.splice(i, 1);
                                                    i--;
                                                }
                                                
                                                break;
                                            } else {
                                                $(asm[x]).hide();
                                            }
                                        }
                                    }
                                }
                            } else {
                                mod[m].hide();
                            }
                        }
                        
                        break;
                        
                    case 'PRODUCCIÓN':
                        
                        for (var m = 0; m < mod.length; m++) {
                            var am = mod[m].find('a span');
                            var tm = am.text();
                            if (tm.toUpperCase() === modulo) {
                                if (subMod[0] !== 'TODOS') {
                                    var asm = mod[m].find('ul li a');
                                    for (var x = 0; x < asm.length; x++) {
                                        var tsm = $(asm[x]).text();
                                        for (var i = 0; i < subMod.length; i++) {
                                            if (tsm.toUpperCase() === subMod[i]) {
                                                $(asm[x]).show();
                                                asm.splice(x, 1);
                                                x--;
                                            
                                                if (subMod.length > 1) {
                                                    subMod.splice(i, 1);
                                                    i--;
                                                }
                                                break;
                                            } else {
                                                $(asm[x]).hide();
                                            }
                                        }
                                    }
                                }
                            } else {
                                mod[m].hide();
                            }
                        }
                        
                        break;
                    
                    case 'PROGRAMACIÓN':
                        
                        for (var m = 0; m < mod.length; m++) {
                            var am = mod[m].find('a span');
                            var tm = am.text();
                            if (tm.toUpperCase() === modulo) {
                                if (subMod[0] !== 'TODOS') {
                                    var asm = mod[m].find('ul li a');
                                    for (var x = 0; x < asm.length; x++) {
                                        var tsm = $(asm[x]).text();
                                        for (var i = 0; i < subMod.length; i++) {                                            
                                            if (tsm.toUpperCase() === subMod[i]) {
                                                $(asm[x]).show();
                                                asm.splice(x, 1);
                                                x--;
                                            
                                                if (subMod.length > 1) {
                                                    subMod.splice(i, 1);
                                                    i--;
                                                }
                                                break;
                                            } else {
                                                $(asm[x]).hide();
                                            }
                                        }
                                    }
                                }
                            } else {
                                mod[m].hide();
                            }
                        }
                        
                        break;
                }
            },
            
            listaDeOpciones: function() {
                var self = this;
                
                self.nav.on("click", function(e) {
                    
                    var padres = self.nav.find('#navDash, #navEmail, #navLab, #navProd, #navProg');
                    var selec = e.toElement.textContent;
                    var modulo = '';
                    
                    if (selec === 'Dashboard') {
                        modulo = 'Dashboard';
                    } else if (selec === 'Email') {
                        modulo = 'Email';
                    } else {
                        var elem = $(e.toElement).parent().parent().parent()[0].firstChild;
                        modulo = $(elem).text();
                    }
                    
                    switch (selec) {
                        case "Dashboard":
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-home'></i> Dashboard";
                            self.ocultarFormularios();
                           
                            break;
                            
                        case "Email":
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-envelope-o'></i> Email";
                            self.ocultarFormularios();
                            
                            break;
                        
                        case "Maestros Pendientes por Aprobar":
                            
                            pa.consultarPendientes();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-flask'></i> Laboratorio / Maestros Pendientes por Aprobar";
                            self.ocultarFormularios();
                            
                            self.rowMaestrosPendientes.show();
                            //self.tblMaestroPend.children(".minimize").click();
                            
                            break;
                        
                        case "Solicitudes Enviadas":
                            
                            pa.consultarPendientesParaEditar();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-flask'></i> Laboratorio / Solicitudes Enviadas para Aprobación";
                            self.ocultarFormularios();
                            
                            self.rowEditarPendientes.show();;
                            //self.tblEditarPend.children(".minimize").click();
                            
                            break;
                        
                        case "Maestro Preparación":
                            
                            frmPreparacion.consultasPreparacion();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-flask'></i> Laboratorio / Maestro Preparación";
                            self.ocultarFormularios();
                            
                            self.rowPreparacion.show();
                            //self.frmMaestroPrep.children(".minimize").click();
                            //self.tblMaestroPrep.children(".minimize").click();
                            
                            break;
                        
                        case "Maestro Auxiliares":
                            
                            frmAuxiliar.consultasAuxiliares();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-flask'></i> Laboratorio / Maestro Auxiliares";
                            self.ocultarFormularios();
                            
                            self.rowAuxiliares.show();
                            //self.frmMaestroAux.children(".minimize").click();
                            //self.tblMaestroAux.children(".minimize").click();
                            
                            break;
                            
                        case "Maestro Procesos Posteriores":
                            
                            frmProcPos.consultasProcPos();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-flask'></i> Laboratorio / Maestro Procesos Posteriores";
                            self.ocultarFormularios();
                            
                            self.rowProcPos.show();
                            //self.frmMaestroProcPos.children(".minimize").click();
                            //self.tblMaestroProcPos.children(".minimize").click();
                            
                            break;
                            
                        case "Maestro Fibras":
                            
                            frmFibra.consultasFibras();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-flask'></i> Laboratorio / Maestro Fibras";
                            self.ocultarFormularios();
                            
                            self.rowFibra.show();
                            //self.frmMaestroFibra.children(".minimize").click();
                            //self.tblMaestroFibra.children(".minimize").click();
                            
                            break;
                        
                        case "Maestro Formulación":
                            
                            frmFormula.consultasFormulas();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-flask'></i> Laboratorio / Maestro Formulación";
                            self.ocultarFormularios();
                            
                            self.rowFormular.show();
                            //self.frmFormular.children(".minimize").click();
                            //self.tblMaestroFormulas.children(".minimize").click();
                            
                            break;
                            
                        /*case "Maestro Lista de Chequeo":
                            
                            frmListaC.consultasListaCheck();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-gears'></i> Producción / Maestro Lista de Chequeo";
                            self.ocultarFormularios();
                            
                            self.rowFormsLL.show();
                            self.rowTablesLL.show();
                            //self.frmMaestroLabel.children(".minimize").click();
                            //self.frmMaestroLista.children(".minimize").click();
                            //self.tblMaestroLabel.children(".minimize").click();
                            //self.tblMaestroLista.children(".minimize").click();
                            
                            break;
                        */
                        case "Maestro Curvas":
                            
                            frmCurva.consultasCurvas();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-gears'></i> Producción / Maestro Curvas";
                            self.ocultarFormularios();
                            
                            self.rowCurva.show();
                            //self.frmMaestroCurva.children(".minimize").click();
                            //self.tblMaestroCurva.children(".minimize").click();
                            
                            break;
                        
                        case "Maestro Procesos":
                            
                            frmProceso.consultasProcesos();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-gears'></i> Producción / Maestro Procesos";
                            self.ocultarFormularios();
                            
                            self.rowProceso.show();
                            //self.frmMaestroProceso.children(".minimize").click();
                            //self.tblMaestroProceso.children(".minimize").click();
                            
                            break;
                            
                        case "Pendiente por Formular":
                            
                            frmPendForm.consultasPendFormular();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-clock-o'></i> Programación / Pendiente por formular";
                            self.ocultarFormularios();
                            
                            self.rowPendFormular.show();
                            //self.frmMaestroProceso.children(".minimize").click();
                            //self.tblMaestroProceso.children(".minimize").click();
                            
                            break;
                        
                        case "Programación Maquinas":
                            
                            frmProgMaq.consultasProgMaq();
                            
                            self.menuActivo(padres, modulo, selec);
                            
                            self.ubicacionActual[0].innerHTML = "<i class='fa fa-clock-o'></i> Programación / Programación Maquinas";
                            self.ocultarFormularios();
                            
                            self.rowProgMaquinas.show();
                            
                            break;
                    }
                });
            },
            
            menuActivo: function (padres, modulo, selec) {

                for (var i = 0; i < padres.length; i++) {
                    var aTexto = $(padres[i]).find('a')[0].textContent;
                    if (aTexto === modulo) {
                        var hijos = $(padres[i]).find('ul li');

                        if (hijos.length > 0) {
                            $(padres[i]).addClass('nav-active active');
                            $(padres[i]).find('ul').css('display', 'block');
                            for (var j = 0; j < hijos.length; j++) {
                                var h = $(hijos[j])[0].firstChild;
                                var texto = $(h).text();

                                if (texto === selec) {
                                    $(hijos[j]).addClass('active');
                                } else {
                                    $(hijos[j]).removeClass('active');
                                }
                            }
                        } else {
                            $(padres[i]).addClass('active');
                        }

                    } else {
                        $(padres[i]).removeClass('nav-active active');
                        $(padres[i]).find('ul li').removeClass('active');
                        $(padres[i]).find('ul').css('display', 'none');
                    }
                }
            },
            
            nombre: function(nom1, nom2) {
                var len;
                
                len = nom1.length;
                
                nom1 = nom1.toLowerCase();
                nom1 = nom1.substr(0,1).toUpperCase() + nom1.substr(1, len);
                
                try {
                    len = nom2.length;
                
                    nom2 = nom2.toLowerCase();
                    nom2 = nom2.substr(0,1).toUpperCase() + nom2.substr(1, len);
                } catch (e) {
                    nom2 = '';
                }
                
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

