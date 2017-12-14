<?php

include_once '../Modelo/Componente/Componente.php';
include_once '../Modelo/Componente/Propiedad.php';


$componente = new Componente();
if (isset($_POST['node'])) {
    $node = $_POST['node'];
    $arr = array();
    $result = $componente->getTree($node, $arr);
    echo json_encode($result);
} else {
    $action = $_POST['accion'];
    if ($action == 'insertar_componente') {
        $descrip_componente = $_POST['denominacion'];
        $cantMax = $_POST['cantMax'];
        $id = $_POST['id'];
        $critico = $_POST['critico'];
        $result = $componente->insertarComponente($descrip_componente, $id, $cantMax, $critico);
        echo json_encode($result);
    } else if ($action == 'editar_componente') {
        $id = $_POST['id'];
        $descrip = $_POST['denominacion'];
        $cantMax = $_POST['cantMax'];
        $critico = $_POST['critico'];
        $result = $componente->editarComponente($id, $descrip, $cantMax, $critico);
        echo json_encode($result);
    } else if ($action == 'get_datos_componente') {
        $id = $_POST['id'];
        $result = $componente->NodoInfo($id);
        echo json_encode($result);
    } else if ($action == 'listar_componentes_hijos') {
        $start = isset($_POST['start']) ? $_POST['start'] : 0; //posición a iniciar
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 100000;
        $result = $componente->getComponenteHijo($start, $limit);
        echo json_encode($result);
    } else if ($action == 'cargar_componente_propiedades') {
        $start = isset($_POST['start']) ? $_POST['start'] : 0; //posición a iniciar
        $limit = isset($_POST['limit']) ? $_POST['limit'] : 100000;
        $id = $_POST['id'];
        $num_exp = $_POST['num_exp'];
        $propiedades = json_decode($_POST['propiedades'], true);
        $result = $componente->cargarDatosComponente($start, $limit, $id, $num_exp, $propiedades);
        echo json_encode($result);
    } else if ($action == 'insertar_componente_expediente') {
        $campos = $_POST;
        unset($campos['accion']);
        $cantMax = $_POST['cant_max'];
        unset($campos['cant_max']);
        $propiedad = new Propiedad();
        // $flag=$propiedad->existePropiedadRegistro($_POST['id_'], $id_ppd, $nombre)
        $result = $componente->insertarComponenteExpediente($campos, $cantMax);
        echo json_encode($result);
    } else if ($action == 'eliminar_componente_expediente') {
        $id_componente = $_POST['id_componente'];
        $id_cmp = $_POST['id_cmp'];
        $result = $componente->eliminarComponenteExpediente($id_componente, $id_cmp);
        echo json_encode($result);
    } else if ($action == 'editar_registro_propiedad_expediente') {
        $campo = $_POST['nombre_campo'];
        $valor = $_POST['valor_campo'];
        $id_cmp = $_POST['id_cmp'];
        $id_componente = $_POST['id_componente'];
        $valor_original = $_POST['valor_original'];
        $result = $componente->editarRegistroPropiedadExpediente($id_componente, $id_cmp, $campo, $valor, $valor_original);
        echo json_encode($result);
    }else if ($action == 'existeCmpExp') {
    $id_cmp = $_POST['id_cmp'];
    $num_exp = $_POST['num_exp'];
    $result = $componente->existeCmpExp($id_cmp,$num_exp);
    echo json_encode($result);
}else if ($action == 'getAllDataExp') {
    $result = $componente->getAllDataExp(1);
    echo json_encode($result);
} 

//   else if ($action == "listar_estructuras") {
//    $start = isset($_POST['start']) ? $_POST['start'] : 0; //posición a iniciar
//    $limit = isset($_POST['limit']) ? $_POST['limit'] : 1000;
//    $result=$estructura->getEstructuras($start, $limit);   
//    echo json_encode($result);
//   }else if($action=="eliminar_estructura"){
//    $id=$_POST['id_estructura'];
//    $result=$estructura->eliminarEstructura($id);
//    echo json_encode($result);
//    } 
}
?>
