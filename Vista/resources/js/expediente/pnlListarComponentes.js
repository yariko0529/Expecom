Ext.ns("Exp.Exp");

Exp.Exp.pnlListarComponentes = Ext.extend(Ext.Panel, {
    constructor: function(options) {
        var _this = this;
        this.panel=options.panel;
        this.num_exp=options.num_exp;
       

        this.store = new Ext.data.JsonStore({
            url: '../Controlador/ControladorComponente.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_componentes_hijos'
            },
            fields: ['id_componente', 'descrip_componente', 'id_componente_padre', 'cant_max']
        });

        this.store.load();

        this.gpListarComponentes = new Ext.grid.GridPanel({
            store: this.store,
            columnLines: true,
            frame: true,
            columns: [
                {
                    header: 'Id',
                    width: 22,
                    hidden:true,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'id_componente'
                },
                {
                    header:'<p style="color: #000; font-size: 12px; font-weight: bold;">Componente que Conforman Expediente</p>',
                    width: 270,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'descrip_componente'
                }
                , {
                    header: 'Cantidad',
                    width: 200,
                    hidden:true,
                    dataIndex: 'cant_max',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }
            ]
            ,
            listeners: {
                "rowclick": function(grid, row, event) {
                    var store = _this.store;
                    var record = store.getAt(row);
                    _this.panel.removeAll();
                    _this.panel.setTitle(record.get('descrip_componente'));
                    pnlDatosComponente = new Exp.Exp.pnlLLenarComponenteExpediente({
                                num_exp:_this.num_exp,
                                id_componente:record.get('id_componente'),
                                nombre_componente:record.get('descrip_componente'),
                                cant_max: record.get('cant_max')            
                    });
                    _this.panel.add(pnlDatosComponente);
                    _this.panel.doLayout();

                }
            }
        });

        Exp.Exp.pnlListarComponentes.superclass.constructor.apply(this, [{//Heredar todo del padre
                region: 'west',
                width:280,
                border:false,
                layout: 'fit',
                items: [this.gpListarComponentes]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});

