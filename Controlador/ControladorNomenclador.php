<?php

include_once '../Modelo/Nomencladores/Unidad.php';
$action = $_POST['accion'];

if ($action == 'listar_uo') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 1000;
    $unidad = new Unidad();
    $unidades = $unidad->getUnidades($start, $limit);
    echo json_encode($unidades);
} 
//else if ($action == 'eliminar_unidad') {
//    $id = $_POST['id'];
//    $unidad = new Unidad();
//    $contrato = new Contrato();
//    $response = array();
//    $existe = $contrato->existeContratoconUnidad($id);
//    $response = $unidad->eliminarUnidad($id);
//    if ($existe) {
//        $response['Msg'] = 'Esta Unidad no se puede eliminar, hay contratos que depende de ella';
//        $response['success'] = true;
//        $response['existe'] = true;
//    } else {
//        $response['existe'] = false;
//        $response = $unidad->eliminarUnidad($id);
//    }
//    echo json_encode($response);
//} else if ($action == 'desactivar_unidad') {
//    $id = $_POST['id'];
//    $unidad = new Unidad();
//    $response = $unidad->desactivarUnidad($id);
//    echo json_encode($response);
//} else if ($action == 'activar_unidad') {
//    $id = $_POST['id'];
//    $unidad = new Unidad();
//    $response = $unidad->activarUnidad($id);
//    echo json_encode($response);
//} else if ($action == 'eliminar_denominacion') {
//    $id = $_POST['id'];
//    $denominacion = new Denominacion();
//    $response = $denominacion->eliminarDenominacion($id);
//    echo json_encode($response);
//} else if ($action == 'desactivar_denominacion') {
//    $id = $_POST['id'];
//    $denominacion = new Denominacion();
//    $response=$denominacion->desactivarDenominacion($id);
//    echo json_encode($response);
//} else if ($action == 'activar_denominacion') {
//    $id = $_POST['id'];
//    $denominacion = new Denominacion();
//    $response = $denominacion->activarDenominacion($id);
//    echo json_encode($response);
//}
?>
