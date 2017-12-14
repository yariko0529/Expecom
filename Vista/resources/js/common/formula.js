Ext.formula = function(){
    function contieneOperando(op,formula){
        if(formula.indexOf(op)==-1){
            return false;
        }else{
            return true;
        }
    }
    function sacarOperandosFormula(formula,store,campo){
        var cantOperandos=store.getCount();
        var cont=0;
        var operandos=[];
        for(i=0;i<cantOperandos;i++){
          if(formula.indexOf('c'+i)!==-1 && ('c'+i)!==campo){
             operandos[cont]=i;
             cont++;
          }  
        }
        return operandos;
    }
    return {
        hayRedundancia : function(campo,store,formula){
            operandos=sacarOperandosFormula(formula,store,campo); //Operandos extraidos de la formula de Cx
            redundancia=false;
            formulas=[];
            contadorFormulas=0;
            for(i=0;i<store.getCount();i++){ //Sacar las formulas de los operandos que componen las formula de Cx
                recordCampo=store.getAt(i);
                for(j=0;j<store.getCount();j++){
                if(recordCampo.get('refe_campo')==operandos[j]){
                    formulas[contadorFormulas]=recordCampo.get('formula');
                    contadorFormulas++;
                }
            }
        }
        
            for(i=0;i<formulas.length;i++){
               if(contieneOperando(campo,formulas[i])){
                   redundancia=true;
               } 
            }
            return redundancia;
        }
    };
}();
