Ext.ns("Exp.Est");

Exp.Est.pnlComponentes = Ext.extend(Ext.Panel, {
    constructor: function(options) {

        var _this = this;

        this.pnlListarPropiedades = new Exp.Est.pnlListarPropiedades({id: -1});

        this.treeComponentes = new Ext.tree.TreePanel({
            useArrows: true,
            region: 'north',
            height: 300,
            id: 'id_tree_componentes',
            autoScroll: true,
            animate: true,
            //enableDD: true,
            containerScroll: true,
            border: false,
            dataUrl: '../Controlador/ControladorComponente.php',
            root: {
                nodeType: 'async',
                text: 'Componentes',
                draggable: false,
                iconCls: 'estructura16',
                id: -1
            }
        });

        this.treeComponentes.expandAll();

//        this.treeComponentes.on('movenode', function(tree, node, padreviejo, padrenuevo) {
//            Ext.Ajax.request({
//                url: '../Controlador/ControladorComponente.php',
//                method: 'POST',
//                params: {
//                    accion: 'mover_componente',
//                    id: node.id,
//                    id_padre_nuevo: padrenuevo.id
//                },
//                success: function(res, opt) {
//                    obj = Ext.decode(res.responseText);
//                    Ext.example.msg("Informaci\u00f3n", "Componente movido de " + padreviejo.text + " a " + padrenuevo.text);
//                },
//                failure: function() {
//                    Ext.Msg.alert("Error", "No hay conexi\u00f3n con el servidor");
//                }
//            });
//        });


        this.treeComponentes.on('contextmenu', function(node, event) {
            var insertar_componente = true;
            var insertar_propiedad = true;
            var editar_componente = true;
            var eliminar_componente = true;
            if (node.getDepth() == 0) {
                insertar_componente = false;
            } else if (node.getDepth() == 1) {
                insertar_componente=false;
                editar_componente=false;
                eliminar_componente=false;
            }else{
                editar_componente=false;
                eliminar_componente=false;
                insertar_propiedad = false;
            }
            new Ext.menu.Menu({
                items: [{
                        text: 'Insertar Componente',
                        iconCls: 'insertar',
                        hidden: insertar_componente,
                        handler: function() {
                            var winInsertarComponente = new Exp.Est.winInsertarComponente({node: node});
                            winInsertarComponente.show();
                        }
                    }, {
                        text: 'Editar Componente',
                        iconCls: 'editar',
                        hidden: editar_componente,
                        handler: function() {
                            if (node.id == -1) {
                                Ext.example.msg('ERROR', "Esta operaci\u00f3n no es posible");
                            } else {
                                Ext.Ajax.request({
                                    url: '../Controlador/ControladorComponente.php',
                                    method: 'POST',
                                    params: {
                                        accion: 'get_datos_componente',
                                        id: node.id
                                    },
                                    success: function(res, opt) {
                                        obj = Ext.decode(res.responseText);
                                        winInsertarComponente = new Exp.Est.winInsertarComponente({
                                            node: node
                                        });
                                        winInsertarComponente.denominacion.setValue(obj.text);
                                        winInsertarComponente.cantMax.setValue(obj.cant_max);
                                        winInsertarComponente.critico.setValue(obj.critico);
                                        winInsertarComponente.setTitle("Editar Estructura");
                                        winInsertarComponente.btnAceptar.setHandler(function() {
                                            if (winInsertarComponente.fpInsertarComponente.getForm().isValid()) {
                                                Ext.Ajax.request({
                                                    url: '../Controlador/ControladorComponente.php',
                                                    method: 'POST',
                                                    params: {
                                                        accion: 'editar_componente',
                                                        id: node.id,
                                                        denominacion: winInsertarComponente.denominacion.getValue(),
                                                        cantMax: winInsertarComponente.cantMax.getValue(),
                                                        critico: (winInsertarComponente.critico.getValue())?"1":"0"
                                                    },
                                                    success: function(res, opt) {
                                                        obj = Ext.decode(res.responseText);
                                                        Ext.example.msg('Atenci\u00f3n', obj.Msg);
                                                        winInsertarComponente.close();
                                                        _this.treeComponentes.getRootNode().reload();
                                                        _this.treeComponentes.expandAll();
                                                    },
                                                    failure: function() {
                                                        Ext.Msg.alert("ERROR", "No hay conexi\u00f3n");
                                                    }
                                                });
                                            }
                                        });
                                        winInsertarComponente.show();
                                    },
                                    failure: function() {
                                        Ext.Msg.alert("ERROR", "No ha conexi\u00f3n con el servidor");
                                    }
                                });
                            }

                        }
                    }, {
                        text: "Eliminar Componente",
                        iconCls: 'eliminar',
                        hidden: eliminar_componente,
                        handler: function() {

                        }
                    }, {
                        text: "Insertar Propiedad",
                        iconCls: 'insertar',
                        hidden: insertar_propiedad,
                        handler: function() {
                            if (node.id == -1) {
                                Ext.example.msg('ERROR', "Esta operaci\u00f3n no es posible");
                            } else {
                                _this.pnlListarPropiedades.setDisabled(false);
                                _this.pnlListarPropiedades.setTitle("Propiedades del Componente: " + node.text);
                                winInsertarPropiedad = new Exp.Est.winInsertarPropiedad({id: node.id});
                                winInsertarPropiedad.show();
                            }
                        }
                    }]
            }).showAt(event.xy);
        });

        this.treeComponentes.on('click', function(node, event) {
            if (node.id != -1 && node.getDepth() != 1) {
                _this.pnlListarPropiedades.id = node.id;
                _this.pnlListarPropiedades.setDisabled(false);
                _this.pnlListarPropiedades.setTitle("Propiedades del Componente: " + node.text);
                _this.pnlListarPropiedades.store.load({
                    params: {
                        id: node.id
                    }
                });
            }

        });


        Exp.Est.pnlComponentes.superclass.constructor.apply(this, [{//Heredar todo del padre
                resizable: false,
                region: 'north',
                height: 300,
                border: false,
                layout: 'border',
                items: [this.treeComponentes, this.pnlListarPropiedades]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});