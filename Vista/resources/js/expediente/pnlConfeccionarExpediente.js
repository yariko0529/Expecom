Ext.ns("Exp.Exp");

Exp.Exp.pnlConfeccionarExpediente = Ext.extend(Ext.Panel, {
    constructor: function(options) {
        var _this = this;
        _this.record=options.record;
        
        this.panelContienepnlDatosComponente= new Ext.Panel({
           title:'Datos del componente a llenar',
           region:'center',
           layout:'fit'
       });
       
       this.pnlListarComponentes =new Exp.Exp.pnlListarComponentes({panel:_this.panelContienepnlDatosComponente,num_exp:_this.record.get('num_exp')});
       
       
        Exp.Exp.pnlConfeccionarExpediente.superclass.constructor.apply(this, [{//Heredar todo del padre
                title: "Expediente número: "+_this.record.get('num_exp')+ " Confeccionado el "+_this.record.get('fecha'),
                layout:"border",
                border:false,
                items: [this.pnlListarComponentes,this.panelContienepnlDatosComponente]
            }]);
        Ext.apply(this, options || {}); //Aplicar las opciones que se pasan al obj al crearlo
    }
});