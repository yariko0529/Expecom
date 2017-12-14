//Toolbar de Administracion
Ext.ns("Exp.Exp");

Exp.Exp.tbExpJefTec = Ext.extend(Ext.Toolbar, {
    constructor: function(options) {
        var _this = this;
        this.id_usuario = options.id_usuario;

        this.btnChgRepConf = new Ext.Button({
            iconCls: 'chgresconf',
            tooltip: 'Cambiar Responsable',
            scale: 'large',
            iconAlign: 'top',
            handler: function() {
              var record = pnlListarExpedientes.gpListarExpedientes.getSelectionModel().getSelected();
              if(record){
                  winCambiarResponsable=new Exp.Exp.winCambiarResConf({record:record});
                  winCambiarResponsable.show();
              }else{
                  Ext.example.msg('Error','Debe seleccionar un expediente');
              }
            }
        });

        this.btnExp = new Ext.Button({
            // text:'Cerrar Sesión',
            iconCls: 'lis_exp',
            scale: 'large',
            disabled:true,
            tooltip: 'Listado de Expedientes',
            iconAlign: 'top',
            handler: function() {
                window.location = 'expedientesJefTec.html';
            }
        });
        this.btnReportes = new Ext.Button({
            // text:'Cerrar Sesión',
            iconCls: 'mis_reportes',
            scale: 'large',
            tooltip: 'Reportes sin Asignar',
            iconAlign: 'top',
            handler: function() {
                window.location = 'reportes.html';
            }
        });

        this.btnSalir = new Ext.Button({
            // text:'Cerrar Sesión',
            iconCls: 'cerrar',
            scale: 'large',
            iconAlign: 'top',
            handler: function() {
                Ext.Ajax.request({
                    url: '../Controlador/ControladorLogin.php',
                    method: 'POST',
                    params: {
                        accion: 'desloguearse'
                    }, success: function(res, opt) {
                        window.location = 'login.html';

                    }, failure: function() {
                        Ext.example.msg("ERROR", "No hay conexión con el servidor");
                    }
                });
            }
        });

        Exp.Exp.tbExpJefTec.superclass.constructor.apply(this, [{//Heredar todo del padre
                height: 40,
                cls: 'mytoolbar',
                border: false,
                items: [this.btnChgRepConf, "->",this.btnExp,this.btnReportes, this.btnSalir]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});
