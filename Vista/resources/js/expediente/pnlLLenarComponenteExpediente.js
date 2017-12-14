Ext.ns("Exp.Exp");

Exp.Exp.pnlLLenarComponenteExpediente = Ext.extend(Ext.Panel, {
    constructor: function(options) {
        var _this = this;
        this.num_exp = options.num_exp;

        this.id_componente = options.id_componente;
        this.nombre_componente = options.nombre_componente;
        this.cant_max = options.cant_max;

        Ext.Ajax.request({
            url: '../Controlador/ControladorPropiedad.php',
            method: 'POST',
            params: {
                accion: 'listar_propiedad_componente',
                id: _this.id_componente
            },
            success: function(res, opt) {
                obj = Ext.decode(res.responseText);

                _this.removeAll();
                _this.doLayout();

                var fields = new Array();
                fields[0] = 'id_cmp';
                fields[1] = 'num_exp';

                var columns = new Array();
                columns[0] = {
                    "header": '',
                    hidden: false,
                    "dataIndex": fields[0],
                    "width": 20,
                    "renderer": function(value, meta) {
                        meta.css = 'eliminar';
                    }
                };
                columns[1] = {
                    "header": 'Num Exp',
                    hidden: true,
                    "dataIndex": fields[1]
                };
                var cont = 0;
                for (var i = 2; i < obj.total + 2; i++) {
                    fields[i] = "ppd_" + obj.data[cont].id_propiedad;
                    columns[i] = {
                        "header": obj.data[cont].descrip_propiedad,
                        "dataIndex": "ppd_" + obj.data[cont].id_propiedad,
                        "id_ppd": obj.data[cont].id_propiedad,
                        "editor": {
                            "xtype": 'textfield',
                            "allowBlank": false
                        }
                    };
                    cont++;
                }

                _this.cargarCampos = function() {
                    var items = [];
                    for (var j = 0; j < fields.length; j++) {
                        if (j == 0) {
                            items[j] = {
                                "xtype": 'textfield',
                                "emptyText": columns[j].header,
                                "hidden": true,
                                "allowBlank": false,
                                value: _this.id_componente,
                                "name": fields[j],
                                "width": 205
                            }
                        } else if (j == 1) {
                            items[j] = {
                                "xtype": 'textfield',
                                "emptyText": columns[j].header,
                                "hidden": true,
                                "allowBlank": false,
                                value: _this.num_exp,
                                "name": fields[j],
                                "width": 205
                            }
                        } else {
                            items[j] = {
                                "xtype": 'combo',
                                "emptyText": columns[j].header,
                                "allowBlank": false,
                                "name": fields[j],
                                "width": 205,
                                store: new Ext.data.JsonStore({
                                    url: '../Controlador/ControladorPropiedad.php',
                                    root: 'data',
                                    totalProperty: 'total',
                                    baseParams: {
                                        accion: 'listar_all_registro_propiedad',
                                        id_componente: _this.id_componente,
                                        id_ppd: columns[j].id_ppd
                                    },
                                    fields: ['ppd']
                                }),
                                triggerAction: 'all',
                               // editable: true,
                                displayField: 'ppd',
                                valueField: 'ppd',
                                listeners: {
                                    "beforequery": function(obj) {
                                        this.store.load({
                                            params: {
                                                accion: 'listar_all_registros_propiedad_nombre',
                                                nombre: obj.query
                                            }
                                        });
                                        obj.cancel = true;
                                        obj.query = false;

                                    }
                                }
                            };
                        }

                    }
                    return items;
                };

                _this.toolbar = new Ext.Toolbar({
                    cls: 'mytoolbar',
                    scope: this,
                    items: [{
                            text: 'Insertar',
                            handler: function() {
                                if (fields.length == 2) {
                                    Ext.example.msg("Error", "Este componente no tienes propiedades para gestionar");
                                } else {
                                    var fpIIComp = new Ext.form.FormPanel({
                                        border: false,
                                        hideLabels: true,
                                        items: [_this.cargarCampos()]
                                    });

                                    var winIIComp = new Ext.Window({
                                        title: 'Insertar Datos de ' + _this.nombre_componente,
                                        cls: 'mywindow',
                                        bodyStyle: 'padding:5px;background-color:#fff;',
                                        width: 250,
                                        height: 300,
                                        modal: true,
                                        frame: true,
                                        items: [fpIIComp],
                                        buttons: [{
                                                text: 'Cancelar',
                                                handler: function() {
                                                    winIIComp.close();
                                                }
                                            }, {
                                                text: 'Aceptar',
                                                handler: function() {
                                                    if (fpIIComp.getForm().isValid()) {
                                                        fpIIComp.getForm().submit({
                                                            url: '../Controlador/ControladorComponente.php',
                                                            method: 'POST',
                                                            params: {
                                                                accion: 'insertar_componente_expediente',
                                                                cant_max : _this.cant_max
                                                            },
                                                            success: function(form, action) {
                                                                obj = action.result;
                                                                Ext.example.msg("Atencion", obj.Msg);
                                                                winIIComp.close();
                                                                _this.store.load();
                                                            },
                                                            failure: function() {
                                                                Ext.example.msg("Error", "No hay respuesta del servidor");
                                                            }
                                                        });
                                                    }
                                                }
                                            }]
                                    });
                                    winIIComp.show();
                                }
                            }
                        }]
                });

                _this.store = new Ext.data.JsonStore({
                    url: '../Controlador/ControladorComponente.php',
                    root: 'data',
                    totalProperty: 'total',
                    baseParams: {
                        accion: 'cargar_componente_propiedades',
                        num_exp: _this.num_exp,
                        id: _this.id_componente,
                        propiedades: Ext.encode(fields)

                    },
                    fields: fields
                });
                _this.store.load();

                _this.grid = new Ext.grid.EditorGridPanel({
                    store: _this.store,
                    columnLines: true,
                    frame: true,
                    clicksToEdit: 1,
                    stripeRows: true,
                    columns: columns,
                    tbar: _this.toolbar,
                    listeners: {
                        "validateedit": function(rec) {
                            Ext.Ajax.request({
                                url: '../Controlador/ControladorComponente.php',
                                method: 'POST',
                                params: {
                                    accion: 'editar_registro_propiedad_expediente',
                                    nombre_campo: rec.field,
                                    valor_campo: rec.value,
                                    valor_original:rec.originalValue,
                                    id_cmp: rec.record.get('id_cmp'),
                                    id_componente:_this.id_componente
                                },
                                success: function(response, opt) {
//                                    obj = Ext.decode(response.responseText);
//                                    Ext.example.msg("Atención", "Propiedad editado satisfactoriamente");
//                                    _this.store.load({
//                                        params: {
//                                            id: rec.record.get('id_componente')
//                                        }
//                                    });
                                },
                                failure: function() {
                                    Ext.Msg.alert("Atención", "No hay conexión con el servidor");
                                }
                            });
                        },
                        "cellclick": function(grid, row, column, event) {
                            var store = grid.getStore();
                            var record = store.getAt(row);
                            if (column == 0) {
                                Ext.MessageBox.show({
                                    title: 'Eliminar?',
                                    cls:'mywindow',
                                    msg: 'Estas seguro al eliminar este Componente del Expediente?',
                                    buttons: Ext.MessageBox.YESNO,
                                    fn: function(btn) {
                                        if (btn == 'yes') {
                                            Ext.Ajax.request({
                                                url: '../Controlador/ControladorComponente.php',
                                                method: 'POST',
                                                params: {
                                                    accion: 'eliminar_componente_expediente',
                                                    id_componente: _this.id_componente,
                                                    id_cmp: record.get('id_cmp')
                                                },
                                                success: function(res, opt) {
                                                    obj = Ext.decode(res.responseText);
                                                    _this.store.load();
                                                    Ext.example.msg("Atencion", obj.Msg);

                                                },
                                                failure: function() {
                                                    Ext.example.msg("Error", "No hay conexion con el srvidor");
                                                }
                                            });
                                        }
                                    },
                                    icon: Ext.MessageBox.QUESTION
                                });

                            }
                        }
                    }
                });
                _this.add(_this.grid);
                _this.doLayout();
            },
            failure: function() {
                alert("Error de Servidor, Intentelo mas tarde");
            },
            scope: this
        });

        Exp.Exp.pnlLLenarComponenteExpediente.superclass.constructor.apply(this, [{//Heredar todo del padre
                layout: 'fit',
                items: []
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});

