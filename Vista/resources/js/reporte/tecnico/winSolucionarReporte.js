Ext.ns("Exp.Rep");

Exp.Rep.winSolucionarReporte = Ext.extend(Ext.Window, {
    constructor: function(options) {
        var _this = this;
        this.record = options.record;
        this.index = 0;

        this.cbTipoReporte = new Ext.form.ComboBox({
            fieldLabel: 'Tipo de Reporte',
            name: 'tipo_reporte',
            width: 180,
            allowBlank: false,
            forceSelection: true,
            store: ['Hardware', 'Software', 'Error de Usuario', 'Redes', 'Mantenimiento'], //asignandole el store
            triggerAction: 'all',
            editable: false
        });

        this.cbSolucionado = new Ext.form.ComboBox({
            fieldLabel: 'Dar Solucion',
            name: 'tipo_reporte',
            width: 180,
            allowBlank: false,
            forceSelection: true,
            store: ['Si', 'No'], //asignandole el store
            triggerAction: 'all',
            //value:'Si',
            editable: false
        });

        this.storeComponentes = new Ext.data.JsonStore({
            url: '../Controlador/ControladorComponente.php',
            root: 'data',
            totalProperty: 'total',
            baseParams: {
                accion: 'listar_componentes_hijos'
            },
            fields: ['id_componente', 'descrip_componente', 'id_componente_padre', 'cant_max']
        });

        this.storeComponentes.load();

        this.sm = new Ext.grid.CheckboxSelectionModel({
            checkOnly: true,
            header: ' ',
            listeners: {
                rowselect: function(sm, rowIndex, recChk) {
                    Ext.Ajax.request({
                        url: '../Controlador/ControladorComponente.php',
                        method: 'POST',
                        params: {
                            accion: 'existeCmpExp',
                            num_exp: _this.record.get('num_exp'),
                            id_cmp: recChk.get('id_componente')
                        },
                        success: function(res, opt) {
                            obj = Ext.decode(res.responseText);
                            if (!obj.existe) {
                                Ext.example.msg('Error', obj.Msg);
                                sm.deselectRow(rowIndex);
                            }
                        },
                        failure: function() {

                        }
                    });
                }
            }
        });

        this.gpListarComponentes = new Ext.grid.GridPanel({
            store: this.storeComponentes,
            columnLines: true,
            frame: true,
            height: 320,
            border: false,
            sm: this.sm,
            columns: [
                _this.sm,
                {
                    header: 'Id',
                    width: 22,
                    hidden: true,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'id_componente'
                },
                {
                    header: '<p style="color: #000; font-size: 12px; font-weight: bold;">Marque los componentes con problema</p>',
                    width: 270,
                    resizable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'descrip_componente'
                }
                , {
                    header: 'Cantidad',
                    width: 200,
                    hidden: true,
                    dataIndex: 'cant_max',
                    resizable: false,
                    hideable: false,
                    menuDisabled: true
                }
            ]
        });

        this.pnlStep1 = new Ext.Panel({
            layout: 'form',
            border: false,
            padding: 10,
            items: [{html: "<h2>Datos del Reporte</h2><br> " +
                            "<p style='font-size:12px;'> El Reporte No. " + _this.record.get('id_reporte') + " referente al expediente No. " +
                            _this.record.get('num_exp') + " el cual responde a " + _this.record.get('responsable') + " como responsable se defecta como:" +
                            "</p><br><br>", border: false}, this.cbTipoReporte,
                {html: "<br><p style='font-size:12px;'><b>Nota</b>: Recuerde que el tipo de reporte corresponde a la defectacion que hace usted al medio informatico</p><br><br>", border: false}
            ]
        });

        this.pnlStep2 = new Ext.Panel({
            layout: 'form',
            border: false,
            padding: 10,
            items: []
        });

        this.formWizard = new Ext.FormPanel({// step 1  
            layout: "card", //step2  
            border: false,
            activeItem: this.index, //step3  
            items: [this.pnlStep1, this.pnlStep2] //step 4  
        });

        this.btnCancelar = new Ext.Button({
            text: 'Cancelar',
            handler: function() {
                _this.close();
            }
        });

        this.btnNext = new Ext.Button({
            text: 'Siguiente',
            handler: function() {
                var cardLayout = _this.formWizard;
                if (_this.index == 0 && _this.cbTipoReporte.isValid()) {
                    _this.index++;
                    cardLayout.getLayout().setActiveItem(_this.index);
                    _this.btnNext.hide();
                    _this.btnPrevious.show();
                    _this.btnFinish.show();
                    //Casos para cada uno de los tipo de Reporte
                    //1-Hardware
                    if (_this.cbTipoReporte.getValue() == 'Hardware' && _this.pnlStep2.getComponent(0)==null) {
                        _this.pnlStep2.add(_this.gpListarComponentes);
                        _this.pnlStep2.add({html: '<br>', border: false});
                        _this.pnlStep2.add(_this.cbSolucionado);
                    } else {

                    }
                } else {

                }
            }
        });

        this.btnPrevious = new Ext.Button({
            text: 'Atras',
            hidden: true,
            handler: function() {
                var cardLayout = _this.formWizard;
                if (_this.index == 1) {
                  _this.index--;
                  cardLayout.getLayout().setActiveItem(_this.index);
                  _this.btnPrevious.hide();
                  _this.btnFinish.hide();
                  _this.btnNext.show();
                }
            }
        });

        this.btnFinish = new Ext.Button({
            text: 'Terminar',
            hidden: true,
            handler: function() {
                //  var componentes = _this.sm.getSelections();

            }
        });

        Exp.Rep.winSolucionarReporte.superclass.constructor.apply(this, [{//Heredar todo del padre
                title: "Solucionar Reporte",
                layout: 'fit',
                border: false,
                frame: true,
                modal: true,
                activeItem: this.index,
                height: 450,
                width: 450,
                closable: false,
                bodyCssClass: "computer", //step 3
                cls: 'mywindow',
                resizable: false,
                items: [this.formWizard],
                fbar: [this.btnCancelar, this.btnNext, this.btnPrevious, this.btnFinish]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});



