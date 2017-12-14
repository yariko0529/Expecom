Ext.ns('Rep.Rep');
Ext.onReady(function() {

    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';

    var stUo = new Ext.data.JsonStore({
        url: '../Controlador/ControladorNomenclador.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
            accion: 'listar_uo'
        },
        fields: ['id_uo', 'descrip_uo']
    });


    var cbUo = new Ext.form.ComboBox({
        fieldLabel: 'Unidad Organizativa',
        name: 'descrip_uo',
        width: 200,
        allowBlank: false,
        forceSelection: true,
        store: stUo, //asignandole el store
        emptyText: 'Unidad Organizativa',
        triggerAction: 'all',
        editable: false,
        displayField: 'descrip_uo',
        valueField: 'id_uo',
        listeners: {
            "beforeselect": function(combo, data, index) {
                cbExpUo.setDisabled(false);
                cbExpUo.reset();
                stExpUo.load({
                    params: {
                        uo: data.get('id_uo')
                    }
                });
            }
        }
    });

    var stExpUo = new Ext.data.JsonStore({
        url: '../Controlador/ControladorExpediente.php',
        root: 'data',
        totalProperty: 'total',
        baseParams: {
            accion: 'listar_expedientes_uo'
        },
        fields: ['num_exp', 'num_exp_text']
    });


    var cbExpUo = new Ext.form.ComboBox({
        fieldLabel: 'No. Expediente Medio',
        name: 'num_exp',
        width: 200,
        mode: 'local',
        disabled: true,
        allowBlank: false,
        forceSelection: true,
        store: stExpUo, //asignandole el store
        emptyText: 'No. Expediente Medio',
        triggerAction: 'all',
        editable: false,
        displayField: 'num_exp_text',
        valueField: 'num_exp'
    });

    var descrip = new Ext.form.TextArea({
        fieldLabel: 'Breve Descripcion',
        name: 'descrip',
        emptyText: 'Breve Descripcion del Problema',
        width: 200
    });

    var pnlImgWest = new Ext.Panel({
        width: 100,
        height: 100,
        border: false,
        bodyStyle: 'padding:5px;background-color:#fff;margin:0px auto;',
        html: '<img id="img_center" src="resources/images/utiles/pc.png" style="width: 100%; height: 100%;"/>'
    });

    var fpInsertarReporte = new Ext.form.FormPanel({
        border: false,
        fieldLabel: 'Ubicar',
        labelAlign: 'top',
        border: false,
                defaults: {
                    msgTarget: 'top'
                },
        items: [cbUo, cbExpUo, descrip]
    });

    var btnReportar = new Ext.Button({
        text: 'Reportar',
        handler: function() {
            if (fpInsertarReporte.getForm().isValid()) {
                fpInsertarReporte.getForm().submit({
                    url: '../Controlador/ControladorReporte.php',
                    method: 'POST',
                    params: {
                        accion: 'insertar_reporte',
                        num_exp_persona: cbExpUo.getValue(),
                        uo: cbUo.getValue()
                    },
                    success: function(form, action) {
                        swal({
                            title: action.result.title,
                            text: action.result.Msg,
                            timer: 5000,
                            imageUrl: action.result.url,
                            showConfirmButton: false
                        });
                        fpInsertarReporte.getForm().reset();
                    },
                    failure: function() {
                        swal({
                            title: "Error",
                            text: "No hay conexion con el servidor",
                            timer: 1300,
                            imageUrl: "resources/images/utiles/error.png",
                            showConfirmButton: false
                        });
                    }
                });
            } else {
                swal({
                    title: "Error",
                    text: "Campos Obligatorios",
                    timer: 1300,
                    imageUrl: "resources/images/utiles/error.png",
                    showConfirmButton: false
                });

            }
        }
    });

    var winInsertarReporte = new Ext.Window({
        title: '<p style="color: #FFF; font-size: 15px; font-weight: bold;">Entre los Datos del Reporte</p>',
        cls: 'mywindow',
        bodyStyle: 'padding:5px;background-color:#fff;',
        layout: 'column',
        width: 330,
        height: 265,
        closable: false,
        resizable: false,
        movable: false,
        draggable: false,
        items: [pnlImgWest, fpInsertarReporte],
        buttons: [btnReportar]
    }).show();

});
