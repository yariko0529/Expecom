<?php

require '../Modelo/lib/fpdf17/fpdf.php';
include_once '../Modelo/Componente/Componente.php';
$num_exp = $_GET['num_exp'];
$responsable = $_GET['responsable'];
$tecnico = $_GET['tecnico'];
$uo = $_GET['uo'];
$fecha = $_GET['fecha'];
$componente = new Componente();
$datosExpediente = $componente->getAllCmpDataPpd($num_exp);
//echo json_encode($datosExpediente);
$pdf = new FPDF();
$pdf = new FPDF('P', 'mm', 'A4');
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 8);
$pdf->Image('../Vista/resources/images/utiles/marco.png', 0, 0, 226, 296, 'PNG', '');
$pdf->SetXY(30, 30);
$pdf->Cell(10, 50, '# de Inventario: _______________', 0, 0, 'C');
$pdf->SetXY(100, 30);
$pdf->Cell(10, 50, 'Entidad: CAP', 0, 0, 'C');
$pdf->SetXY(160, 30);
$pdf->Cell(10, 50, 'Dpto: ' . $uo, 0, 0, 'C');
$pdf->SetXY(30, 40);
$pdf->Cell(-10, 50, '# de Expediente:' . $num_exp, 0, 0, 'C');
//$pdf->SetXY(100,40);
//$pdf->Cell(10, 50,'Entidad: CAP', 0, 0, 'C');
$pdf->SetXY(160, 40);
$pdf->Cell(10, 50, 'Fecha: ' . $fecha, 0, 0, 'C');
$x = 8;
$y = 90;
$pdf->SetFillColor(90, 88, 91);
$pdf->SetXY($x, $y);
$pdf->Cell(30, 6, 'Componentes', 1, 0, 'C', true);
$pdf->SetXY(38, $y);
$pdf->Cell(30, 6, 'Marca', 1, 0, 'C', true);
$pdf->SetXY(68, $y);
$pdf->Cell(30, 6, 'No. Serie', 1, 0, 'C', true);
$pdf->SetXY(98, $y);
$pdf->Cell(25, 6, 'Capacidad', 1, 0, 'C', true);
$pdf->SetXY(123, $y);
$pdf->Cell(25, 6, 'Velocidad', 1, 0, 'C', true);
$pdf->SetXY(148, $y);
$pdf->Cell(25, 6, 'Tipo', 1, 0, 'C', true);
$pdf->SetXY(173, $y);
$pdf->Cell(30, 6, 'No. Inventario', 1, 0, 'C', true);
//columna de los componentes
$x = 8;
$y = 96;
for ($i = 0; $i < count($datosExpediente); $i++) {
    $pdf->SetFont('Arial', '', 8);
    $pdf->SetXY($x, $y);
    $cantFila = count($datosExpediente[$i]['marca']);
    $marcas = $datosExpediente[$i]['marca'];
    $noserie = $datosExpediente[$i]['noserie'];

    $pdf->Cell(30, 6 * $cantFila, $datosExpediente[$i]['descrip_cmp'], 1, 0, 'C');

    $pdf->SetFont('Arial', '', 7);
    $y+=6 * $cantFila;
}
//columna de las marcas
$y = 96;
$x = 38;
//columna de la marca
for ($i = 0; $i < count($datosExpediente); $i++) {
    $marcas = $datosExpediente[$i]['marca'];
    $pdf->SetFont('Arial', '', 7);
    $pdf->SetXY($x, $y);
    $cantFila = count($datosExpediente[$i]['marca']);
    for ($j = 0; $j < $cantFila; $j++) {
        $pdf->SetXY($x, $y);
        $pdf->Cell(30, 6, $marcas[$j], 1, 0, 'C');
        $y+=6;
    }
}
$y = 96;
$x = 68;
//columna No. Serie
for ($i = 0; $i < count($datosExpediente); $i++) {
    $noserie = $datosExpediente[$i]['noserie'];
    $pdf->SetFont('Arial', '', 7);
    $pdf->SetXY($x, $y);
    $cantFila = count($datosExpediente[$i]['marca']);
    for ($j = 0; $j < $cantFila; $j++) {
        $pdf->SetXY($x, $y);
        $pdf->Cell(30, 6, $noserie[$j], 1, 0, 'C');
        $y+=6;
    }
}
$y = 96;
$x = 98;
//columna Capacidad
for ($i = 0; $i < count($datosExpediente); $i++) {
    $capacidad = $datosExpediente[$i]['capacidad'];
    $pdf->SetFont('Arial', '', 7);
    $pdf->SetXY($x, $y);
    $cantFila = count($datosExpediente[$i]['marca']);
    for ($j = 0; $j < $cantFila; $j++) {
        $pdf->SetXY($x, $y);
        $pdf->Cell(25, 6, $capacidad[$j], 1, 0, 'C');
        $y+=6;
    }
}
$y = 96;
$x = 123;
//columna Velocidad
for ($i = 0; $i < count($datosExpediente); $i++) {
    $velocidad = $datosExpediente[$i]['velocidad'];
    $pdf->SetFont('Arial', '', 7);
    $pdf->SetXY($x, $y);
    $cantFila = count($datosExpediente[$i]['marca']);
    for ($j = 0; $j < $cantFila; $j++) {
        $pdf->SetXY($x, $y);
        $pdf->Cell(25, 6, $velocidad[$j], 1, 0, 'C');
        $y+=6;
    }
}
$y = 96;
$x = 148;
//columna Tipo
for ($i = 0; $i < count($datosExpediente); $i++) {
    $tipo = $datosExpediente[$i]['tipo'];
    $pdf->SetFont('Arial', '', 7);
    $pdf->SetXY($x, $y);
    $cantFila = count($datosExpediente[$i]['marca']);
    for ($j = 0; $j < $cantFila; $j++) {
        $pdf->SetXY($x, $y);
        $pdf->Cell(25, 6, $tipo[$j], 1, 0, 'C');
        $y+=6;
    }
}
$y = 96;
$x = 173;
//columna Tipo
for ($i = 0; $i < count($datosExpediente); $i++) {
    $noinventario = $datosExpediente[$i]['noinventario'];
    $pdf->SetFont('Arial', '', 7);
    $pdf->SetXY($x, $y);
    $cantFila = count($datosExpediente[$i]['marca']);
    for ($j = 0; $j < $cantFila; $j++) {
        $pdf->SetXY($x, $y);
        $pdf->Cell(30, 6, $noinventario[$j], 1, 0, 'C');
        $y+=6;
    }
}
$pdf->SetFont('Arial', 'B', 9);
$pdf->SetXY(21, 250);
$pdf->Cell(30, 6, 'Responsable: ' . $responsable, 0, 0, 'C');
$pdf->SetXY(25, 260);
$pdf->Cell(30, 6, 'Elaborado por: ' . $tecnico, 0, 0, 'C');
$pdf->SetXY(150, 250);
$pdf->Cell(30, 6, 'Firma: ____________________', 0, 0, 'C');
$pdf->SetXY(151, 260);
$pdf->Cell(30, 6, 'Firma: ____________________', 0, 0, 'C');
$pdf->Output();
?>