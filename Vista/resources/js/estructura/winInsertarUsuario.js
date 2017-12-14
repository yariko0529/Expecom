Ext.ns("Exp.Est");

Exp.Est.winInsertarUsuario = Ext.extend(Ext.Window, {
    constructor: function(options) {
        var _this = this;
        this.store=options.store;

        this.usuario = new Ext.form.TextField({
            name: 'usuario',
            fieldLabel: 'Usuario',
            allowBlank: false,
            width: 180
        });
        this.nombre = new Ext.form.TextField({
            name: 'nombre',
            fieldLabel: 'Nombre',
            allowBlank: false,
            width: 180
        });
        this.password = new Ext.form.TextField({
            name: 'password',
            fieldLabel: "Contraseña",
            allowBlank: false,
            width: 180,
            inputType: 'password'
        });

        this.cbPrivilegio = new Ext.form.ComboBox({
            id: 'id_cmb_privilegios',
            xtype: 'combo',
            name: 'combo_privilegios',
            typeAhead: true,
            triggerAction: 'all',
            width: 180,
            fieldLabel: 'Privilegios',
            editable: false,
            allowBlank: false,
            emptyText: 'Seleccione Privilegio',
            mode: 'local',
            valueField: 'valor',
            displayField: 'privilegio',
            store: new Ext.data.ArrayStore({
                fields: ['privilegio', 'valor'],
                data: [['Administrador Sistema               ' + '           <img   src="resources/images/utiles/1.png"  style="margin-left:20px" />', 1],
                    ["Tecnico                              " + '  <img   src="resources/images/utiles/3.png"  style="margin-left:97px" />', 3],
                    ["Jefe Técnico                         " + '                     <img   src="resources/images/utiles/2.png"  style="margin-left:70px" />', 2]]
            })
        });
////Form insertar enlace
        this.fpinsertarUsuario = new Ext.form.FormPanel({
            border: false,
            fieldLabel: 'Ubicar',
            labelAlign: 'top',
            border: false,
                    defaults: {
                        //  anchor: '95%',
                        msgTarget: 'top'
                    },
            items: [
              this.nombre,  this.usuario, this.password, this.cbPrivilegio
            ]
        });
//Panel que contiene la imagen
        this.panelImagenUsuario = new Ext.Panel({
            width: 100,
            height: 100,
            border: false,
            bodyStyle: 'padding:5px;background-color:#fff;margin:0px auto;',
            html: '<img id="img_center" src="resources/images/utiles/insertar_usuario_large.png" style="width: 100%; height: 100%;"/>'
        });

        this.btnAceptar = new Ext.Button({
            text: '<p style="color: #fff; font-size: 13px; font-weight: bold;">Insertar</p>',
            cls: 'button_o',
            overCls: 'button_over_o',
            iconCls: 'insertar_usuario',
            listeners: {
                'mouseover': function(btn, eve) {
                    btn.removeClass('x-btn-over');
                }
            },
            handler: function() {
                            if (_this.fpinsertarUsuario.getForm().isValid()) {
                                _this.fpinsertarUsuario.getForm().submit({
                                    url: '../Controlador/ControladorUsuario.php',
                                    method: 'POST',
                                    params: {
                                        accion: 'insertar_usuario',
                                        valor_privilegio: _this.cbPrivilegio.getValue()

                                    },
                                    success: function(form, action) {
                                        var obj = action.result;
                                        Ext.example.msg("Atencion", obj.Msg);
                                        _this.close();
                                        _this.store.load();
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert("Error", action.result.Msg);
                                    }
                                });
                            }

            }
        });

        this.btnCancelar = new Ext.Button({
            text: '<p style="color: #fff; font-size: 13px; font-weight: bold;">Cancelar</p>',
            cls: 'button_o',
            overCls: 'button_over_o',
            iconCls: 'cancelar',
            listeners: {
                'mouseover': function(btn, eve) {
                    btn.removeClass('x-btn-over');
                }
            },
            handler: function() {
                _this.close();
            }
        });

        Exp.Est.winInsertarUsuario.superclass.constructor.apply(this, [{//Heredar todo del padre
                title: '<p style="color: ; font-size: 14px; font-weight: bold; text-align:"center">Insertar Usuario</p>',
                bodyStyle: 'padding:5px;background-color:#fff;',
                modal: true,
                layout: 'column',
                closable: false,
                width: 310,
                resizable: false,
                height: 270,
                cls: 'mywindow',
                items: [this.panelImagenUsuario, this.fpinsertarUsuario],
                bbar: new Ext.Toolbar({
                    height: 35,
                    items: [this.btnAceptar,'->', this.btnCancelar]
                })
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});
