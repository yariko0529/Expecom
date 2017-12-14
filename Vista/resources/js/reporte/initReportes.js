Ext.ns('Exp.Rep');
Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';


    Ext.Ajax.request({
        url: '../Controlador/ControladorLogin.php',
        method: 'POST',
        params: {
            accion: 'loguearse',
            privilegio: 2
        }, success: function(res, opt) {
            obj = Ext.decode(res.responseText);
            if (obj.success) {

                toolbar = new Exp.Rep.tbAdmin();
                pnlListarReportes = new Exp.Rep.pnlListarReportes();

                Exp.Rep.viewport = new Ext.Viewport({
                    layout: 'border',
                    border: false,
                    id: 'viewport',
                    items: [{
                            xtype: 'box',
                            region: 'north',
                            border: false,
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
                                    border: false,
                                    height: 45,
                                    layout: 'fit',
                                    items: [toolbar]
                                }, {
                                    xtype: 'panel',
                                    region: 'center',
                                    border: false,
                                    layout: 'fit',
                                    items: [pnlListarReportes]
                                }]
                        }
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

