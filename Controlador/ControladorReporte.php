<?php

include_once '../Modelo/Reporte/Reporte.php';


$reporte = new Reporte();
$action = $_POST['accion'];
if ($action == 'insertar_reporte') {
    $fecha = date('Y:m:d');
    $descrip = $_POST['descrip'];
    $uo = $_POST['uo'];
    $num_exp_persona = explode("-", $_POST['num_exp_persona']);
    $num_exp = $num_exp_persona[0];
    $responsable = $num_exp_persona[1];

    $result = $reporte->insertarReporte($uo, $num_exp, $fecha, $descrip, $responsable);
    echo json_encode($result);
} else if ($action == 'listar_reportes') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0; //posición a iniciar
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100000;
    $result = $reporte->getReportes($start, $limit);
    echo json_encode($result);
}else if($action=='asignar_reporte'){
    $id=$_POST['id_tecnico'];
    $id_reporte =$_POST['id_reporte'];
    $result= $reporte->asignarTecnico($id, $id_reporte);
    echo json_encode($result);
}else if ($action == 'listar_reporte_tecnicos') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0; //posición a iniciar
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100000;
    $id_usuario=$_POST['id_usuario'];
    $result = $reporte->getReportesTenicos($start, $limit, $id_usuario);
    echo json_encode($result);
}
?>
