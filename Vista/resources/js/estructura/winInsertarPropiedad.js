Ext.ns("Exp.Est");

Exp.Est.winInsertarPropiedad = Ext.extend(Ext.Window, {
    constructor: function(options) {
        this.id=options.id;
        var _this = this;

        this.descrip = new Ext.form.TextField({
            name: 'descripcion',
            fieldLabel: 'Descripción',
            allowBlank: false,
            width: 180
        });

        this.fpInsertarPropiedad = new Ext.form.FormPanel({
            border: false,
            fieldLabel: 'Ubicar',
            labelAlign: 'top',
            border: false,
                    defaults: {
                        msgTarget: 'top'
                    },
            items: [this.descrip]
        });

        this.pnlImgWest = new Ext.Panel({
            width: 70,
            height: 70,
            border: false,
            bodyStyle: 'padding:5px;background-color:#fff;margin:0px auto;',
            html: '<img id="img_center" src="resources/images/utiles/propiedad.png" style="width: 100%; height: 100%;"/>'
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
                
               if(_this.fpInsertarPropiedad.getForm().isValid()){
                   Ext.Ajax.request({
                       url:'../Controlador/ControladorPropiedad.php',
                       method:'POST',
                       params:{
                           accion:'insertar_propiedad',
                           id:_this.id,
                           descrip:_this.descrip.getValue()
                       },
                       success:function(res,opt){
                           obj=Ext.decode(res.responseText);
                           Ext.example.msg('Atenci\u00f3n',obj.Msg);
                           _this.close();
                           pnlComponentes.pnlListarPropiedades.store.load({
                              params:{
                                  id:_this.id
                              } 
                           });
                           
                           
                       },
                       failure:function(){
                          Ext.Msg.alert("ERROR","No hay conexi\u00f3n"); 
                       }
                   });
                }
            }
            
        });
        
        Exp.Est.winInsertarPropiedad.superclass.constructor.apply(this, [{//Heredar todo del padre
                title: 'Insertar Propiedad',
                modal: true,
                bodyStyle: 'padding:5px;background-color:#fff;',
                layout: 'column',
                frame: true,
                height: 180,
                cls:'mywindow',
                width: 310,
                resizable: false,
                items: [this.pnlImgWest, this.fpInsertarPropiedad],
                buttons:[this.btnCancelar,this.btnAceptar]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});


