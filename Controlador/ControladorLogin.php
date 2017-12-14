<?php
include_once '../Modelo/Usuario/Usuario.php';
session_start();
$accion=$_POST['accion'];
$usuario=new Usuario();
if($accion=='loguearse'){
    $result=null;
    $privilegio=$_POST['privilegio'];
    if(isset($_SESSION['id_usuario']) && $privilegio==$_SESSION['privilegio'] ){
        $result['Msg']='Bienvenido';
        $result['success']=true;
        $us=array("id_usuario"=>$_SESSION['id_usuario'],
                       "usuario"   =>$_SESSION['usuario'],
                       "privilegio"=>$_SESSION['privilegio'],
                //       "id_responsable"=>$_SESSION['id_responsable']
                );     
        $result['usuario']=$us;
    }else{
        $result['Msg']='No Eres Bienvenido';
        $result['success']=false;
    }
    echo json_encode($result);
}else if($accion=='desloguearse'){
    session_destroy();
    $result['success']=true;
}else if($accion=='login'){
    $user=$_POST['user'];
    $pass=$_POST['pass'];
    $result=$usuario->login($user, $pass);
    if($result['success']){
            $_SESSION['id_usuario']=$result['usuario']['id_usuario'];
            $_SESSION['usuario']=$result['usuario']['usuario'];
            $_SESSION['privilegio']=$result['usuario']['privilegio'];
          //  $_SESSION['id_responsable']=$result['usuario']['id_responsable'];
            echo json_encode($result);
    }else{
        session_destroy();
        echo json_encode($result);
    }
}
