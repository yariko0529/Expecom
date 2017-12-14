<?php
include_once '../Modelo/Usuario/Usuario.php';

$usuario=new Usuario();

$action= $_POST['accion'];

if($action=='store_listar_usuarios'){
    $start = isset($_POST['start'])?$_POST['start']:0; //posición a iniciar
    $limit = isset($_POST['limit'])?$_POST['limit']:300;
    $result= $usuario->getUsuarios($start, $limit);
    echo json_encode($result);
}else if($action=='listar_usuarios_tecnico'){
    $start = isset($_POST['start'])?$_POST['start']:0; //posición a iniciar
    $limit = isset($_POST['limit'])?$_POST['limit']:300;
    $result= $usuario->getUsuariosTecnicos($start, $limit);
    echo json_encode($result);
}
else if($action=='insertar_usuario'){
    $user=$_POST['usuario'];
    $password=$_POST['password'];
    $privilegio=$_POST['valor_privilegio'];
    $nombre= $_POST['nombre'];
    $result = $usuario->insertarUsuario($user, $password, $privilegio, $nombre);
    echo json_encode($result);
}else if($action=='eliminar_usuario'){
    $id=$_POST['id'];
    $result = $usuario->eliminarUsuario($id);
    echo json_encode($result);
}

