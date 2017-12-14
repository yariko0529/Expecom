Ext.ns("Exp.Exp");

Exp.Exp.pnlListarExpedientes = Ext.extend(Ext.Panel, {
    constructor: function(options) {
        var _this = this;
        this.id_usuario = options.id_usuario;
        this.privilegio = options.privilegio;

        this.store = new Ext.data.JsonStore({
            url: '../Controlador/ControladorExpediente.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_expedientes'
            },
            fields: ['num_exp', 'nombre', 'id_persona', 'descrip_uo', 'fecha', 'estado', 'id_elaborador', 'responsable', 'uo', 'privilegio']
        });

        this.store.load();


        this.gpListarExpedientes = new Ext.grid.GridPanel({
            store: this.store,
            columnLines: true,
            frame: true,
            columns: [
                {
                    header: 'No',
                    width: 40,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'num_exp'
                },
                {
                    header: 'Elaborado Por',
                    width: 200,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'nombre'
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
                    width: 100,
                    dataIndex: 'fecha',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }, {
                    header: 'Estado',
                    width: 100,
                    dataIndex: 'estado',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }, {
                    header: '',
                    dataIndex: 'num_exp',
                    menuDisabled: true,
                    width: 30,
                    renderer: function(value, meta, record) {
                        if (record.get('id_elaborador') == _this.id_usuario || _this.privilegio == 2) {
                            meta.css = 'conformar';
                        }

                    }
                }, {
                    header: '',
                    dataIndex: 'num_exp',
                    menuDisabled: true,
                    width: 30,
                    renderer: function(value, meta, record) {
                        if (record.get('id_elaborador') == _this.id_usuario || _this.privilegio == 2) {
                            meta.css = 'pdf';
                        }

                    }
                }, {
                    header: 'Id Persona',
                    width: 200,
                    dataIndex: 'id_persona',
                    resizable: false,
                    hidden: true,
                    hideable: false,
                    menuDisabled: true
                }, {
                    header: 'Id Elaborador',
                    width: 200,
                    dataIndex: 'id_elaborador',
                    resizable: false,
                    hidden: true,
                    hideable: false,
                    menuDisabled: true
                }
            ],
            listeners: {
                "cellclick": function(grid, row, column, event) {
                    var store = _this.store;
                    var record = store.getAt(row);
                    if (column == 6) {
                        if (record.get('id_elaborador') == _this.id_usuario || _this.privilegio == 2) {
                            _this.pnlConfeccionarExpediente = new Exp.Exp.pnlConfeccionarExpediente({
                                record: record
                            });
                            if (_this.get(1)) {
                                var panel = _this.get(1);
                                _this.remove(panel);
                            }
                            _this.add(_this.pnlConfeccionarExpediente);

                            _this.getLayout().setActiveItem(1);
                            if (_this.privilegio != 2) {
                                tbAdmin.btnInsertar.setDisabled(true);
                                tbAdmin.btnEditar.setDisabled(true);
                                tbAdmin.btnLisExp.setDisabled(false);
                                tbAdmin.btnUserExp.setDisabled(false);
                            } else {
                                toolbar.btnExp.setDisabled(false);
                            }

                        } else {
                            Ext.example.msg('Error', "Usted no tiene permiso para editar este Expediente");
                        }
                    } else if (column == 7) {
                        window.open("../Controlador/exportarExpedientePDF_1.php?num_exp="+record.get('num_exp')+"&tecnico="+record.get('nombre')+"&responsable="+record.get('responsable')+"&uo="+record.get('descrip_uo')+"&fecha="+record.get('fecha'));
                    }
                }
            },
            viewConfig: {
                getRowClass: function(record, index) {
                    var id_elaborador = record.get('id_elaborador');
                    if (id_elaborador == _this.id_usuario) {
                        return 'mis_expedientes';
                    }
                }
            }
        });



        Exp.Exp.pnlListarExpedientes.superclass.constructor.apply(this, [{//Heredar todo del padre
                layout: 'card',
                border: false,
                index: 0,
                region: 'center',
                activeItem: 0,
                items: [_this.gpListarExpedientes]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});