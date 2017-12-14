Ext.ns("Exp.Est");

Exp.Est.winInsertarComponente = Ext.extend(Ext.Window, {
    constructor: function(options) {
        var _this = this;

        this.denominacion = new Ext.form.TextField({
            name: 'denominacion',
            fieldLabel: 'Nombre del Componente',
            allowBlank: false,
            width: 180      
        });
        this.cantMax = new Ext.form.NumberField({
            name: 'cantMax',
            fieldLabel: 'Cantidad Máxima',
            allowBlank: false,
            width: 180      
        });
        
        this.critico = new Ext.form.Checkbox({
            boxLabel:'Componente Critico',
            
        }); 
        
        this.fpInsertarComponente = new Ext.form.FormPanel({
            border: false,
            fieldLabel: 'Ubicar',
            labelAlign: 'top',
            border: false,
                    defaults: {
                        msgTarget: 'top'
                    },
            items: [this.denominacion,this.cantMax,this.critico]
        });

        this.pnlImgWest = new Ext.Panel({
            width: 100,
            height: 100,
            border: false,
            bodyStyle: 'padding:5px;background-color:#fff;margin:0px auto;',
            html: '<img id="img_center" src="resources/images/utiles/pc.png" style="width: 100%; height: 100%;"/>'
        });
        
        this.btnCancelar=new Ext.Button({
            text:'Cancelar',
            handler:function(){
                _this.close();
            }
        });
        
        this.btnAceptar=new Ext.Button({
            text:'Aceptar',
            handler:function(){
                if(_this.fpInsertarComponente.getForm().isValid()){
                   Ext.Ajax.request({
                       url:'../Controlador/ControladorComponente.php',
                       method:'POST',
                       params:{
                           accion:'insertar_componente',
                           id:_this.node.id,
                           denominacion:_this.denominacion.getValue(),
                           cantMax:_this.cantMax.getValue(),
                           critico:(_this.critico.getValue())?"1":"0"
                       },
                       success:function(res,opt){
                           obj=Ext.decode(res.responseText);
                           _this.close();
                           Ext.example.msg('Atenci\u00f3n',obj.Msg);
                           
                           pnlComponentes.treeComponentes.getRootNode().reload();
                           pnlComponentes.treeComponentes.expandAll();
                       },
                       failure:function(){
                          Ext.Msg.alert("ERROR","No hay conexi\u00f3n"); 
                       }
                   });
                }
            }
        });
        
        Exp.Est.winInsertarComponente.superclass.constructor.apply(this, [{//Heredar todo del padre
                title: 'Insertar Componente',
                modal: true,
                bodyStyle: 'padding:5px;background-color:#fff;',
                layout: 'column',
                frame: true,
                height: 220,
                cls:'mywindow',
                width: 310,
                resizable: false,
                items: [this.pnlImgWest, this.fpInsertarComponente],
                buttons:[this.btnCancelar,this.btnAceptar]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});


