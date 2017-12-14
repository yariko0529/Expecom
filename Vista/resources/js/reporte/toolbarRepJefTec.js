Ext.ns("Exp.Rep");

Exp.Rep.tbAdmin = Ext.extend(Ext.Toolbar, {
    constructor: function(options) {
        var _this = this;

        this.btnLisExp = new Ext.Button({
            // text:'Conformar Expediente',
            iconCls: 'lis_exp user_exp',
            scale: 'large',
            //disabled: true,
            tooltip: 'Listado Expedientes',
            iconAlign: 'top',
            handler: function() {
               window.location='expedientesJefTec.html';
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

        Exp.Rep.tbAdmin.superclass.constructor.apply(this, [{//Heredar todo del padre
                height: 40,
                cls: 'mytoolbar',
                border: false,
                items: ['->',this.btnLisExp,this.btnSalir]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});

