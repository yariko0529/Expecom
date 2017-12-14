Ext.ns('Exp.Exp');
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
            privilegio: 3
        }, success: function(res, opt) {
            obj = Ext.decode(res.responseText);
            if (obj.success) {

                //  pnlComponentes = new Exp.Est.pnlComponentes();
                pnlListarExpedientes = new Exp.Exp.pnlListarExpedientes({id_usuario: obj.usuario.id_usuario});
                tbAdmin = new Exp.Exp.tbAdmin({
                    id_usuario: obj.usuario.id_usuario
                });
                pnlDatosExpediente = new Ext.Panel({
                    title: 'Datos del expediente',
                    html: 'asdasd',
                    tbar: [{
                            text: 'Algo',
                            handler: function() {
                                Ext.Ajax.request({
                                    url: '../Controlador/ControladorComponente.php',
                                    method: 'POST',
                                    params: {
                                        accion: 'getAllDataExp'
                                    },
                                    success: function(res, opt) {
                                        obj = Ext.decode(res.responseText);
                                         alert(obj)

                                    },
                                    failure: function() {
                                        Ext.Msg.alert("ERROR", "No hay conexi\u00f3n");
                                    }
                                });
                            }
                        }]
                });
                Exp.Exp.viewport = new Ext.Viewport({
                    layout: 'border',
                    border: false,
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
                                    items: [tbAdmin]
                                }, {
                                    xtype: 'panel',
                                    region: 'center',
                                    border: false,
                                    layout: 'fit',
                                    items: [pnlListarExpedientes]
                                }, {
                                    region: 'east',
                                    layout: 'fit',
                                    width: 400,
                                    border: false,
                                    items: []
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
