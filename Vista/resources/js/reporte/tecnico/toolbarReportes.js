Ext.ns("Exp.Rep");

Exp.Rep.tbReportes = Ext.extend(Ext.Toolbar, {
    constructor: function(options) {
        var _this = this;

        this.btnLisExp = new Ext.Button({
            iconCls: 'lis_exp user_exp',
            scale: 'large',
            tooltip: 'Listado Expedientes',
            iconAlign: 'top',
            handler: function() {
                window.location = 'expedientes.html';
            }
        });

        this.btnSolucionarReporte = new Ext.Button({
            iconCls: 'solucionar_reporte',
            scale: 'large',
            tooltip: 'Solucionar Reporte',
            iconAlign: 'top',
            handler: function() {
                var record = pnlRepTec.gpListarRepTec.getSelectionModel().getSelected();
                if (record) {
                   winSolucionarReporte = new Exp.Rep.winSolucionarReporte({record:record});
                   winSolucionarReporte.show();
                } else {
                    Ext.example.msg("Atencion", "Debe seleccionar un reporte");
                }
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

        Exp.Rep.tbReportes.superclass.constructor.apply(this, [{//Heredar todo del padre
                height: 40,
                cls: 'mytoolbar',
                border: false,
                items: [this.btnSolucionarReporte, "->", this.btnLisExp, this.btnSalir]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});

