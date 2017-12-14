//Toolbar de Administracion
Ext.ns("Exp.Exp");

Exp.Exp.tbAdmin = Ext.extend(Ext.Toolbar, {
    constructor: function(options) {
        var _this = this;
        this.id_usuario = options.id_usuario;

        this.btnInsertar = new Ext.Button({
            // text:'Insertar Expediente',
            iconCls: 'addExp',
            tooltip: 'Insertar Expediente',
            scale: 'large',
            iconAlign: 'top',
            handler: function() {
                winInsertarExpediente = new Exp.Exp.winInsertarExpediente({
                    id_usuario: _this.id_usuario,
                    title: "Insertar Expediente",
                    accion: "insertar",
                    record: null
                });
                winInsertarExpediente.show();
            }
        });

//        this.btnInsertar = new Ext.Button({
//           text:'Insertar Expediente',
//            tooltip: 'Inventariando',
//            scale: 'large',
//            iconAlign: 'top',
//            handler: function() {
//                window.open("../Controlador/inventariandoPdf.php");
//            }
//        });


        this.btnUserExp = new Ext.Button({
            // text:'Insertar Expediente',
            iconCls: 'user_exp',
            tooltip: 'Mis Expediente',
            scale: 'large',
            iconAlign: 'top',
            handler: function() {
                pnlListarExpedientes.store.load({
                    params: {
                        accion: 'listar_expedientes_usuario',
                        id: _this.id_usuario
                    }
                });
                _this.btnLisExp.setDisabled(false);
                _this.btnUserExp.setDisabled(true);
                _this.btnInsertar.setDisabled(false);
                _this.btnEditar.setDisabled(false);
                pnlListarExpedientes.getLayout().setActiveItem(0);
            }
        });

        this.btnEditar = new Ext.Button({
            // text:'Insertar Expediente',
            iconCls: 'edit_exp',
            tooltip: 'Editar Expediente',
            scale: 'large',
            iconAlign: 'top',
            handler: function() {
                var record = pnlListarExpedientes.gpListarExpedientes.getSelectionModel().getSelected();
                if (record) {
                    if (record.get('id_elaborador') == _this.id_usuario) {
                        winEditarExpediente = new Exp.Exp.winInsertarExpediente({
                            id_usuario: _this.id_usuario,
                            title: "Editar Expediente",
                            accion: "editar",
                            record: record
                        });
                        winEditarExpediente.fpInsertarExpediente.getForm().loadRecord(record);
                        winEditarExpediente.show();
                    } else {
                        Ext.example.msg('Error', "Usted no tiene permiso para editar este Expediente");
                    }
                } else {
                    Ext.example.msg('Atencion', "debe seleccionar un expediente");
                }
            }
        });


        this.btnLisExp = new Ext.Button({
            // text:'Conformar Expediente',
            iconCls: 'lis_exp user_exp',
            scale: 'large',
            disabled: true,
            tooltip: 'Listado Expedientes',
            iconAlign: 'top',
            handler: function() {
                pnlListarExpedientes.getLayout().setActiveItem(0);
                pnlListarExpedientes.remove(pnlListarExpedientes.pnlConfeccionarExpediente);
                _this.btnInsertar.setDisabled(false);
                _this.btnEditar.setDisabled(false);
                _this.btnLisExp.setDisabled(true);
                _this.btnUserExp.setDisabled(false);
                pnlListarExpedientes.store.load({
                    params: {
                        accion: 'listar_expedientes'
                    }
                });

            }
        });

        this.btnReportes = new Ext.Button({
            // text:'Cerrar Sesión',
            iconCls: 'mis_reportes',
            scale: 'large',
            tooltip: 'Mis Reportes',
            iconAlign: 'top',
            handler: function() {
                window.location = 'reportes_tecnico.html';
            }
        });

        this.btnSalir = new Ext.Button({
            // text:'Cerrar Sesión',
            iconCls: 'cerrar',
            scale: 'large',
            iconAlign: 'top',
            handler: function() {
                Ext.Ajax.request({
                    url: '../Controlador/ControladorLogin.php',
                    method: 'POST',
                    params: {
                        accion: 'desloguearse'
                    }, success: function(res, opt) {
                        window.location = 'login.html';

                    }, failure: function() {
                        Ext.example.msg("ERROR", "No hay conexión con el servidor");
                    }
                });
            }
        });

        Exp.Exp.tbAdmin.superclass.constructor.apply(this, [{//Heredar todo del padre
                height: 40,
                cls: 'mytoolbar',
                border: false,
                items: [this.btnInsertar, "-", this.btnEditar, '-', this.btnUserExp, "->", this.btnReportes, this.btnLisExp, this.btnSalir]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});