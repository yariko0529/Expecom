Ext.ns("Exp.Exp");

Exp.Exp.winInsertarExpediente = Ext.extend(Ext.Window, {
    constructor: function(options) {
        var _this = this;
        this.id_usuario = options.id_usuario;
        this.title = options.title;
        this.accion = options.accion;
        this.record=options.record;

        this.stResponsable = new Ext.data.JsonStore({
            url: '../Controlador/ControladorPersona.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_personas'
            },
            fields: ['id', 'nombre']
        });

        this.cbResponsable = new Ext.form.ComboBox({
            fieldLabel: 'Responsable',
            name: 'responsable',
            width: 180,
            store: this.stResponsable,
            emptyText: 'Responsable del Medio',
            allowBlank: false,
            triggerAction: 'all',
            displayField: 'nombre',
            valueField: 'id',
            listeners: {
                "beforequery": function(obj) {
                    _this.stResponsable.load({
                        params: {
                            accion: 'listar_personas_nombre',
                            nombre: obj.query
                        }
                    });
                    obj.cancel = true;
                    obj.query = false;

                }
            }
        });

        this.stUo = new Ext.data.JsonStore({
            url: '../Controlador/ControladorNomenclador.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_uo'
            },
            fields: ['id_uo', 'descrip_uo']
        });


        this.cbUo = new Ext.form.ComboBox({
            fieldLabel: 'Unidad Organizativa',
            name: 'descrip_uo',
            width: 180,
            allowBlank: false,
            forceSelection: true,
            store: this.stUo, //asignandole el store
            emptyText: 'Unidad Organizativa',
            triggerAction: 'all',
            editable: false,
            displayField: 'descrip_uo',
            valueField: 'id_uo'
        });

        this.dfFecha = new Ext.form.DateField({
            fieldLabel: 'Fecha de Confecci\u00f3n',
            name: 'fecha',
            emptyText: 'Fecha de Confecci\u00f3n',
            width: 180,
            editable: false,
            allowBlank: false
        });



        this.fpInsertarExpediente = new Ext.form.FormPanel({
            border: false,
            fieldLabel: 'Ubicar',
            labelAlign: 'top',
            border: false,
                    defaults: {
                        msgTarget: 'top'
                    },
            items: [this.cbResponsable, this.cbUo, this.dfFecha]
        });

        this.pnlImgWest = new Ext.Panel({
            width: 100,
            height: 100,
            border: false,
            bodyStyle: 'padding:5px;background-color:#fff;margin:0px auto;',
            html: '<img id="img_center" src="resources/images/utiles/pc.png" style="width: 100%; height: 100%;"/>'
        });
//        
        this.btnCancelar = new Ext.Button({
            text: 'Cancelar',
            handler: function() {
                _this.close();
            }
        });
        
        this.btnAceptar = new Ext.Button({
            text: 'Aceptar',
            handler: function() {
                if (_this.fpInsertarExpediente.getForm().isValid()) {
                    if (_this.accion == 'insertar') {
                        Ext.Ajax.request({
                            url: '../Controlador/ControladorExpediente.php',
                            method: 'POST',
                            params: {
                                accion: 'insertar_expediente',
                                elaborador: _this.id_usuario,
                                id_persona: _this.cbResponsable.getValue(),
                                responsable: _this.cbResponsable.getRawValue(),
                                uo: _this.cbUo.getValue(),
                                fecha: _this.dfFecha.getValue()
                            },
                            success: function(res, opt) {
                                obj = Ext.decode(res.responseText);
                                _this.close();
                                Ext.example.msg('Atenci\u00f3n', obj.Msg);
                                pnlListarExpedientes.store.load();

                            },
                            failure: function() {
                                Ext.Msg.alert("ERROR", "No hay conexi\u00f3n");
                            }
                        });
                    }else{
                        var resp_aux=(!isNaN(_this.cbResponsable.getValue()))?_this.cbResponsable.getValue():_this.record.get('id_persona');
                        var uo_aux = (!isNaN(_this.cbUo.getValue()))?_this.cbUo.getValue():_this.record.get('uo');
                        Ext.Ajax.request({
                            url: '../Controlador/ControladorExpediente.php',
                            method: 'POST',
                            params: {
                                accion: 'editar_expediente',
                                elaborador: _this.id_usuario,
                                id_persona: resp_aux,
                                responsable: _this.cbResponsable.getRawValue(),
                                uo: uo_aux,
                                fecha: _this.dfFecha.getValue(),
                                num_exp: _this.record.get('num_exp')
                            },
                            success: function(res, opt) {
                                obj = Ext.decode(res.responseText);
                                _this.close();
                                Ext.example.msg('Atenci\u00f3n', obj.Msg);
                                pnlListarExpedientes.store.load();

                            },
                            failure: function() {
                                Ext.Msg.alert("ERROR", "No hay conexi\u00f3n");
                            }
                        });
                    }

                }
            }
        });

        Exp.Exp.winInsertarExpediente.superclass.constructor.apply(this, [{//Heredar todo del padre
                title: _this.title,
                modal: true,
                bodyStyle: 'padding:5px;background-color:#fff;',
                layout: 'column',
                frame: true,
                cls: 'mywindow',
                height: 280,
                cls:'mywindow',
                        width: 310,
                resizable: false,
                items: [this.pnlImgWest, this.fpInsertarExpediente],
                buttons: [this.btnCancelar, this.btnAceptar]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});

