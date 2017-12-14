Ext.ns("Exp.Est");

Exp.Est.pnlUsuarios = Ext.extend(Ext.Panel, {
    constructor: function(options) {

        var _this = this;
        
        this.store_listar_usuarios = new Ext.data.JsonStore({
            url: '../Controlador/ControladorUsuario.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'store_listar_usuarios'
            },
            fields: ['id', 'usuario', 'password', 'privilegio', 'nombre']
        });
        this.store_listar_usuarios.load();


        this.gpListarUsuarios = new Ext.grid.GridPanel({
            store: this.store_listar_usuarios,
            columns: [
                {
                    header: '<p style="color: #000; font-size: 13px; font-weight: bold;">Usuario</p>',
                    dataIndex: 'usuario',
                    sortable: false,
                    width: 120,
                    renderer: function(value, meta) {
                        return '<p style="color: #000; font-size: 11px; font-weight: bold;">' + value + '</p>';
                    }
                },{
                    header: '<p style="color: #000; font-size: 13px; font-weight: bold;">Nombre</p>',
                    dataIndex: 'nombre',
                    sortable: false,
                    width: 200,
                    renderer: function(value, meta) {
                        return '<p style="color: #000; font-size: 11px; font-weight: bold;">' + value + '</p>';
                    }
                },
                {
                    header: '<p style="color: #000; font-size: 13px; font-weight: bold;">Contraseña</p>',
                    dataIndex: 'password',
                    sortable: false,
                    width: 120,
                    renderer: function(value, meta) {
                        return '<p style="color: #000; font-size: 11px; font-weight: bold;">' + value + '</p>';
                    }
                },
                {
                    header: '<p style="color: #000; font-size: 13px; font-weight: bold;">Privilegio</p>',
                    dataIndex: 'privilegio',
                    sortable: false,
                    width: 75,
                    renderer: function(value, meta) {
                        if (value == "1") {
                            meta.css = 'admin';
                        } else if (value == "2") {
                            meta.css = "tec";
                        }
                        else 
                            meta.css = 'jefetec';
                    }
                },
                 {
                    header: '<p style="color: #000; font-size: 14px; font-weight: bold;">ID</p>',
                    dataIndex: 'id_usuario',
                    sortable: false,
                    hidden: true,
                    width: 160 
                }
            ],
            tbar: [
                {
                    text: '<p style="color: #fff; font-size: 13px; font-weight: bold;">Insertar</p>',
                    cls: 'button_o',
                    iconCls:'insertar',
                    //overCls: 'button_over_o',
                    listeners: {
                        'mouseover': function(btn, eve) {
                            btn.removeClass('x-btn-over');
                        }
                    },
                    handler:function(){
                        winInsertarUsuario=new Exp.Est.winInsertarUsuario({
                            store:_this.store_listar_usuarios
                        });
                        winInsertarUsuario.show();
                    }
                },{
                    text: '<p style="color: #fff; font-size: 13px; font-weight: bold;">Eliminar</p>',
                    cls: 'button_o',
                    iconCls:'eliminar',
                    listeners: {
                        'mouseover': function(btn, eve) {
                            btn.removeClass('x-btn-over');
                        }
                    },
                    handler: function() {
                        var record = _this.gpListarUsuarios.getSelectionModel().getSelected();
                        if (!record) {
                            Ext.example.msg("Error", "Debe seleccionar un usuario");
                        } else {
                            Ext.Ajax.request({
                                url: '../Controlador/ControladorUsuario.php',
                                method: 'POST',
                                params: {
                                    accion: 'eliminar_usuario',
                                    id: record.get('id')
                                },
                                success: function(res, opt) {
                                    obj = Ext.decode(res.responseText);
                                    Ext.example.msg('Atencion',obj.Msg)
                                    _this.store_listar_usuarios.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Error", "No hay respuesta del servidor");
                                }
                            });

                        }
                    }
                }
            ],
            border: false,
            stripeRows: true,
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            }),
//            listeners: {
//                "celldblclick": function(grid, rowIndex, columnIndex, e) {
//                    var record = grid.getSelectionModel().getSelected();
//                    editUsuario.getForm().loadRecord(record);
//                    winEditarUsuario.show();
//                }
//            }
        });


        Exp.Est.pnlUsuarios.superclass.constructor.apply(this, [{//Heredar todo del padre
                resizable: false,
                height: 300,
                border: false,
                layout: 'fit',
                items: [this.gpListarUsuarios]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});