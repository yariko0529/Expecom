Ext.ns('Exp.Est');
Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';
    //variable globales
    //Viewport principal de la app.
    Ext.Ajax.request({
        url: '../Controlador/ControladorLogin.php',
        method: 'POST',
        params: {
            accion: 'loguearse',
            privilegio: 1
        }, success: function(res, opt) {
            obj = Ext.decode(res.responseText);
            if (obj.success) {

                pnlComponentes = new Exp.Est.pnlComponentes();
                pnlUsuarios = new Exp.Est.pnlUsuarios();

                Exp.Est.viewport = new Ext.Viewport({
                    layout: 'border',
                    border: false,
                    id: 'viewport',
                    items: [{
                            xtype: 'box',
                            region: 'north',
                            applyTo: 'header',
                            height: 35
                        }, {
                            region: 'center',
                            xtype: "panel",
                            border: false,
                            id: 'panelCenter',
                            layout: 'border',
                            items: [{
                                    region: 'north',
                                    xtype: 'panel',
                                    height: 45,
                                    layout: 'fit',
                                    items: [toolbarAdmin]
                                }, {
                                    xtype: 'panel',
                                    region: 'west',
                                    title: "Listado de Componentes",
                                    collapsible: true,
                                    width: '50%',
                                    layout: 'fit',
                                    items: [pnlComponentes]
                                }, {
                                    title: "Listado de Usuarios",
                                    xtype: 'panel',
                                    region: 'center',
                                    id: 'id_panel_east',
                                    layout: 'fit',
                                    items: [pnlUsuarios]
                                }]
                        }
//            {
//                region:'south',
//                xtype:'panel',
//                id:'id_toolbar_foo',
//                height:160,
//                items:[]
//            }
                    ]
                });
            } else {
                window.location = 'acceso_denegado.html';
            }

        }, failure: function() {
            Ext.Msg.alert("ERROR", "No hay conexión con el servidor, Inténtelo mas tarde.");
        }
    });
    //

});
