Ext.ns("Exp.Rep");

Exp.Rep.pnlListarRepTec = Ext.extend(Ext.Panel, {
    constructor: function(options) {
        var _this = this;
        this.id_usuario = options.id_usuario;

        this.store = new Ext.data.JsonStore({
            url: '../Controlador/ControladorReporte.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_reporte_tecnicos',
                id_usuario: _this.id_usuario
            },
            fields: ['id_reporte', 'descrip_uo', 'num_exp', 'fecha', 'descrip', 'responsable', 'id_tecnico', 'nombre_tecnico']
        });

        this.store.load();


        this.gpListarRepTec = new Ext.grid.GridPanel({
            store: this.store,
            columnLines: true,
            frame: true,
            columns: [
                {
                    header: 'No. Reporte',
                    width: 75,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'id_reporte'
                },
                {
                    header: 'No. Exp',
                    width: 50,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'num_exp'
                },
                {
                    header: 'Asignado a:',
                    width: 200,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'nombre_tecnico'
                }, {
                    header: 'Responsable Medio',
                    width: 200,
                    dataIndex: 'responsable',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }
                , {
                    header: 'Unidad organizativa',
                    width: 200,
                    dataIndex: 'descrip_uo',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }, {
                    header: 'Fecha',
                    width: 200,
                    dataIndex: 'fecha',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }, {
                    header: 'Descripcion',
                    width: 200,
                    dataIndex: 'descrip',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }
            ]
        });



        Exp.Rep.pnlListarRepTec.superclass.constructor.apply(this, [{//Heredar todo del padre
                layout: 'card',
                border: false,
                index: 0,
                region: 'center',
                activeItem: 0,
                items: [_this.gpListarRepTec]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});