<?php

include_once '../Modelo/Expediente/Expediente.php';
include_once '../Modelo/Nomencladores/Persona.php';

$action = $_POST['accion'];

$expediente = new Expediente();

if ($action == 'insertar_expediente') {
    $id_elaborador = $_POST['elaborador'];
    $fecha = $_POST['fecha'];
    $responsable = $_POST['responsable'];
    $id_persona = $_POST['id_persona'];
    $uo = $_POST['uo'];

    $persona = new Persona();
    $existePersona = $persona->existePersona($responsable);
    if (!$existePersona) {
        $id_persona = $persona->insertarPersona($responsable);
    }

    $result = $expediente->insertarExpediente($id_elaborador, $fecha, $id_persona, $uo);
    echo json_encode($result);
} else if ($action == 'listar_expedientes_usuario') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0; //posición a iniciar
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100000;
    $id = $_POST['id'];
    $result = $expediente->getExpedientesUsuario($start, $limit, $id);
    echo json_encode($result);
} else if ($action == 'listar_expedientes') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0; //posición a iniciar
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100000;
    $result = $expediente->getExpedientes($start, $limit);
    echo json_encode($result);
} else if ($action == 'listar_expedientes_uo') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0; //posición a iniciar
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100000;
    $uo = $_POST['uo'];
    $result = $expediente->getExpedientesUo($start, $limit, $uo);
    echo json_encode($result);
} else if ($action == 'editar_expediente') {
    $id_elaborador = $_POST['elaborador']; //
    $fecha = $_POST['fecha']; //
    $responsable = $_POST['responsable']; //
    $id_persona = $_POST['id_persona']; //
    $uo = $_POST['uo']; //
    $num_exp = $_POST['num_exp']; //

    $persona = new Persona();
    $existePersona = $persona->existePersona($responsable);
    if (!$existePersona) {
        $id_persona = $persona->insertarPersona($responsable);
    }

    $result = $expediente->editarExpediente($id_elaborador, $fecha, $id_persona, $uo, $num_exp);
    echo json_encode($result);
} else if ($action == 'cambiarRespConf') {
    $id_elaborador = $_POST['id_elaborador'];
    $num_exp = $_POST['num_exp'];
    $result = $expediente->cambiarRespExp($id_elaborador, $num_exp);
    echo json_encode($result);
} 

