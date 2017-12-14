Ext.ns("Exp.Rep");

Exp.Rep.pnlListarReportes = Ext.extend(Ext.Panel, {
    constructor: function(options) {
        var _this = this;

        this.store = new Ext.data.JsonStore({
            url: '../Controlador/ControladorReporte.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_reportes'
            },
            fields: ['id_reporte', 'descrip_uo', 'num_exp', 'fecha', 'descrip', 'responsable', 'id_tecnico']
        });

        this.storeTecnico = new Ext.data.JsonStore({
            url: '../Controlador/ControladorUsuario.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_usuarios_tecnico'
            },
            fields: ['id', 'nombre']
        });

        this.store.load();

        this.gpListarReportes = new Ext.grid.EditorGridPanel({
            store: this.store,
            columnLines: true,
            clicksToEdit: 1,
            frame: true,
            columns: [
                {
                    header: 'ID Reporte',
                    width: 200,
                    resizable: false,
                    hideable: false,
                    //hidden: true,
                    menuDisabled: true,
                    dataIndex: 'id_reporte'
                },
                {
                    header: 'No. Exp',
                    width: 50,
                    dataIndex: 'num_exp',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                },
                {
                    header: 'Responsable',
                    width: 200,
                    dataIndex: 'responsable',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                },
                {
                    header: 'Unidad Organizativa',
                    width: 200,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'descrip_uo'
                }
                , {
                    header: 'Fecha',
                    width: 200,
                    dataIndex: 'fecha',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }, {
                    header: 'descrip',
                    width: 400,
                    dataIndex: 'descrip',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                },
                {
                    header: 'Asignado a:',
                    width: 200,
                    dataIndex: 'id_tecnico',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    editor: {
                        xtype: 'combo',
                        store: _this.storeTecnico,
                        valueField: 'id',
                        triggerAction: 'all',
                        displayField: 'nombre',
                    },
                    renderer: function(value, meta) {
                        if (value == 0) {
                            return "NO ASIGNADO";
                        }
                    }
                }
            ], listeners: {
                "afteredit": function(e) {
                    Ext.Ajax.request({
                        url: '../Controlador/ControladorReporte.php',
                        method: 'POST',
                        params: {
                            accion: 'asignar_reporte',
                            id_tecnico: e.value,
                            id_reporte: e.record.get('id_reporte')
                        },
                        success: function(response, opt) {
                            _this.store.load();
                           
                        },
                        failure: function() {

                        }
                    });
                }
            }
        });
        Exp.Rep.pnlListarReportes.superclass.constructor.apply(this, [{//Heredar todo del padre
                layout: 'card',
                border: false,
                index: 0,
                title: 'Reportes sin Asignar',
                region: 'center',
                activeItem: 0,
                items: [_this.gpListarReportes]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});