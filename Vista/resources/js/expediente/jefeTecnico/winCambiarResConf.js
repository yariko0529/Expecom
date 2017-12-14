Ext.ns("Exp.Exp");

Exp.Exp.winCambiarResConf = Ext.extend(Ext.Window, {
    constructor: function(options) {
        this.record=options.record;
        var _this = this;
        
        this.stResponsable = new Ext.data.JsonStore({
            url: '../Controlador/ControladorUsuario.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_usuarios_tecnico'
            },
            fields: ['id', 'usuario']
        });
        
        this.stResponsable.load();

        this.tecnicos = new Ext.form.ComboBox({
            fieldLabel: 'Tecnicos',
            name: 'tecnico',
            width: 180,
            store:this.stResponsable,
            emptyText: 'Tecnicos',
            mode: 'local',
            editable: false,
            allowBlank: false,
            triggerAction: 'all',
            valueField:'id',
            displayField:'usuario'
        });




        this.fpCambiarResponsable = new Ext.form.FormPanel({
            border: false,
            fieldLabel: 'Ubicar',
            labelAlign: 'top',
            border: false,
                    defaults: {
                        msgTarget: 'top'
                    },
            items: [this.tecnicos]
        });

        this.btnCancelar = new Ext.Button({
            text: 'Cancelar',
            handler: function() {
                _this.close();
            }
        });

        this.btnAceptar = new Ext.Button({
            text: 'Aceptar',
            handler: function() {
                if (_this.fpCambiarResponsable.getForm().isValid()) {
                    Ext.Ajax.request({
                    url: '../Controlador/ControladorExpediente.php',
                    method: 'POST',
                    params: {
                        accion: 'cambiarRespConf',
                        num_exp:_this.record.get('num_exp'),
                        id_elaborador:_this.tecnicos.getValue()
                        
                    }, success: function(res, opt) {
                         obj = Ext.decode(res.responseText);
                         Ext.example.msg('Atenci\u00f3n', obj.Msg);
                         _this.close();
                         pnlListarExpedientes.store.load();
                    }, failure: function() {
                        Ext.example.msg("ERROR", "No hay conexión con el servidor");
                    }
                });
                }
            }
        });

        Exp.Exp.winCambiarResConf.superclass.constructor.apply(this, [{//Heredar todo del padre
                title: "Cambiar Tecnico",
                modal: true,
                bodyStyle: 'padding:5px;background-color:#fff;',
                frame: true,
                cls:'mywindow',
                height: 150,
                width: 220,
                resizable: false,
                items: [this.fpCambiarResponsable],
                buttons: [this.btnCancelar, this.btnAceptar]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});