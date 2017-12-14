Ext.ns("Exp.Est");

Exp.Est.pnlListarPropiedades = Ext.extend(Ext.Panel, {
    constructor: function(options) {
        var _this = this;
        this.id=options.id;
            this.store = new Ext.data.JsonStore({
                url: '../Controlador/ControladorPropiedad.php',
                root: 'data',
                totalProperty: 'total',
                baseParams: {
                    accion: 'listar_propiedad_componente'
                },
                fields: ['id_propiedad', 'id_componente', 'descrip_propiedad']
            });


        this.gpListarPropiedades = new Ext.grid.EditorGridPanel({
            store: this.store,
            columnLines: true,
            autoExpandColumn: 'descrip_propiedad', // column with this id will be expanded
            frame: true,
                clicksToEdit: 1,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Descripción',
                    id: 'descrip_propiedad',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'descrip_propiedad',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }, {
                    header: '',
                    dataIndex: 'id_propiedad',
                    menuDisabled: true,
                    width: 30,
                    renderer: function(value, meta) {
                        meta.css = 'eliminar';
                    }
                }],
            listeners: {"validateedit": function(rec) {
                    Ext.Ajax.request({
                        url: '../Controlador/ControladorPropiedad.php',
                        method: 'POST',
                        params: {
                            accion: 'editar_propiedad',
                            nombre_campo: rec.field,
                            valor_campo: rec.value,
                            id: rec.record.get('id_propiedad')
                        },
                        success: function(response, opt) {
                            obj = Ext.decode(response.responseText);
                            Ext.example.msg("Atención", "Propiedad editado satisfactoriamente");
                            _this.store.load({
                                params: {
                                    id: rec.record.get('id_componente')
                                }
                            });
                        },
                        failure: function() {
                            Ext.Msg.alert("Atención", "No hay conexión con el servidor");
                        }
                    });
                },
                "cellclick": function(grid, row, column, event) {
                    var store = grid.getStore();
                    var record = store.getAt(row);
                    if (column == 2) {
                        Ext.Ajax.request({
                            url: '../Controlador/ControladorPropiedad.php',
                            method: 'POST',
                            params: {
                                accion: 'eliminar_propiedad',
                                id: record.get('id_propiedad'),
                                id_comp:_this.id
                            },
                            success: function(res, opt) {
                                obj = Ext.decode(res.responseText);
                                Ext.example.msg('Atención', obj.Msg);
                                _this.store.load({
                                    params: {
                                        id: record.get('id_componente')
                                    }
                                });
                            },
                            failure: function() {
                                Ext.example.msg('ERROR', 'No hay conexión con la base de datos');
                            }
                        });
                    }
                }
            }
        });

        Exp.Est.pnlListarPropiedades.superclass.constructor.apply(this, [{//Heredar todo del padre
                title: 'Propiedades',
                layout: 'fit',
                disabled: true,
                region: 'center',
                items: [_this.gpListarPropiedades]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});