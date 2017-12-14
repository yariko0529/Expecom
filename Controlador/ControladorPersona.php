<?php

$action = $_POST['accion'];

include_once '../Modelo/Nomencladores/Persona.php';

$persona= new Persona();
if ($action == 'listar_personas') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 1000000;
    $result = $persona->getPersonas($start, $limit);
    echo json_encode($result);
}else if ($action == 'listar_personas_nombre') {
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 1000000;
    $nombre=$_POST['nombre'];
    $result = $persona->getPersonasXNombre($start, $limit, $nombre);
    echo json_encode($result);
}
