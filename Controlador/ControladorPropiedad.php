<?php
include_once '../Modelo/Componente/Propiedad.php';

$action=$_POST['accion'];

$propiedad=new Propiedad();

if($action=='listar_propiedad_componente'){
    $start = isset($_POST['start'])?$_POST['start']:0; //posición a iniciar
    $limit = isset($_POST['limit'])?$_POST['limit']:30;
    $id=$_POST['id'];
    $result=$propiedad->getPropiedades($start, $limit, $id);
    echo json_encode($result);
}if($action=='eliminar_propiedad'){
    $id=$_POST['id'];
    $id_comp=$_POST['id_comp'];
    $result=$propiedad->eliminarPropiedad($id,$id_comp);
    echo json_encode($result);
}if($action=='insertar_propiedad'){
    $id=$_POST['id'];
    $descrip=$_POST['descrip'];
    $result=$propiedad->insertarPropiedad($descrip, $id);
    echo json_encode($result);
}else if ($action == 'editar_propiedad') {
    $campo = $_POST['nombre_campo'];
    $valor = $_POST['valor_campo'];
    $id = $_POST['id'];
    $result = $propiedad->editarPropiedad($id, $campo, $valor);
    echo json_encode($result);
}else if ($action == 'listar_all_registro_propiedad') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 1000000;
    $id_ppd = $_POST['id_ppd'];
    $id_componente = $_POST['id_componente'];
    $result = $propiedad->getAllRegistroPropiedad($start, $limit, $id_componente, $id_ppd);
    echo json_encode($result);
}else if ($action == 'listar_all_registros_propiedad_nombre') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 1000000;
    $id_ppd = $_POST['id_ppd'];
    $id_componente = $_POST['id_componente'];
    $nombre = $_POST['nombre'];
    $result =$propiedad->getALLRegistrosXNombre($start, $limit, $nombre, $id_componente, $id_ppd);
    echo json_encode($result);
}