//Toolbar de Administracion
var toolbarAdmin = new Ext.Toolbar({
    height:40,
    cls:'mytoolbar',
    items:["->",{
            text:'Cerrar Sesión',
            iconCls:'cerrar',
            scale:'large',
            iconAlign: 'top',
            handler:function(){
                Ext.Ajax.request({
                    url:'../Controlador/ControladorLogin.php',
                    method:'POST',
                    params:{
                        accion:'desloguearse'
                    },success:function(res,opt){
                        window.location='login.html';
                        
                    },failure:function(){
                        Ext.example.msg("ERROR","No hay conexión con el servidor");
                    }
                });
            }
        }]
});