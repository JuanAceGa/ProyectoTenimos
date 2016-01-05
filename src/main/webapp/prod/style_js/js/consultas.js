var c = {};
(function (){
    var fibras;
    var quimicos;
    var preparaciones;
    
    this.consultarFibras = function() {
        var URLgetFibras = "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getFibras";
        
        $.ajax( {
            url: URLgetFibras,
            type: "GET",
            dataType: "JSON",
            success: function( data ) {
                    fibras = data;
                    frmPreparacion.loadObjt(data, "f");
                },
            error: function() {
                alert("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
            }
        });
    }
    
    this.consultarQuimicos = function(){
        var URLgetProductosQuimicos = "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getProductosQuimicos";
        
        $.ajax( {
            url: URLgetProductosQuimicos,
            type: "GET",
            dataType: "JSON",
            success: function( data ) {
                    quimicos = data;
                    frmPreparacion.loadObjt(data, "q");
                },
            error: function() {
                alert("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
            }
        });
    }
    
    this.consultarPreparaciones = function(){
        var URLgetPreparaciones = "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getPreparaciones";
        
        $.ajax( {
            url: URLgetPreparaciones,
            type: "GET",
            dataType: "JSON",
            success: function( data ) {
                    preparaciones = data;
                    frmPreparacion.loadObjt(data, "pr");
                },
            error: function() {
                alert("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
            }
        });
    }
    
    this.consultarCodigoId = function(codQuery, master){
        var URLgetPreparaciones = "http://localhost:8084/APPServiciosLaboratorio/rest/servicelab/getCode";
        
        $.ajax( {
            url: URLgetPreparaciones,
            type: "GET",
            dataType: "JSON",
            data: "codFibra=" + codQuery,
            success: function( data ) {
                    frmPreparacion.loadObjt(data, master);
                },
            error: function() {
                alert("Ha ocurrido un problema con el servidor, favor intentar más tarde.");
            }
        });
    }
    
    this.getFibras = function() {
        return fibras;
    }
    
    this.getQuimicos = function() {
        return quimicos;
    }
    
}).apply(c);