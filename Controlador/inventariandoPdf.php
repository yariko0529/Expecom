<?php

require '../Modelo/lib/fpdf17/fpdf.php';
include_once '../Modelo/Componente/Componente.php';
//echo json_encode($datosExpediente);
$pdf = new FPDF();
$pdf = new FPDF('P', 'mm', 'A4');
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 8);

$componente = new Componente();
$ups = $componente->getUps();
$monitores = $componente->getMonitores();
$pcs = $componente->getChasis();
//echo json_encode($pcs);
$pdf->SetFont('Arial', 'B', 8);
$pdf->Cell(40, 6 ,'Monitores', 0, 1, 'C');
for ($i = 0; $i < count($monitores); $i++) {
    $pdf->SetFont('Arial', '', 8);

    $pdf->Cell(50, 6 ,$monitores[$i]['descrip_uo'], 1, 0, 'C');
    $pdf->Cell(30, 6 ,$monitores[$i]['noinventario'], 1, 1, 'C');
}
$pdf->SetFont('Arial', 'B', 8);
$pdf->Cell(40, 6 ,'UPS', 0, 1, 'C');
for ($i = 0; $i < count($ups); $i++) {
    $pdf->SetFont('Arial', '', 8);

    $pdf->Cell(50, 6 ,$ups[$i]['descrip_uo'], 1, 0, 'C');
    $pdf->Cell(30, 6 ,$ups[$i]['noinventario'], 1, 1, 'C');
}
$pdf->SetFont('Arial', 'B', 8);
$pdf->Cell(40, 6 ,'PC', 0, 1, 'C');
for ($i = 0; $i < count($monitores); $i++) {
    $pdf->SetFont('Arial', '', 8);

    $pdf->Cell(50, 6 ,$pcs[$i]['descrip_uo'], 1, 0, 'C');
    $pdf->Cell(30, 6 ,$pcs[$i]['noinventario'], 1, 1, 'C');
}
////columna de las marcas
//$y = 96;
//$x = 38;
////columna de la marca
//for ($i = 0; $i < count($datosExpediente); $i++) {
//    $marcas = $datosExpediente[$i]['marca'];
//    $pdf->SetFont('Arial', '', 7);
//    $pdf->SetXY($x, $y);
//    $cantFila = count($datosExpediente[$i]['marca']);
//    for ($j = 0; $j < $cantFila; $j++) {
//        $pdf->SetXY($x, $y);
//        $pdf->Cell(30, 6, $marcas[$j], 1, 0, 'C');
//        $y+=6;
//    }
//}
//$y = 96;
//$x = 68;
////columna No. Serie
//for ($i = 0; $i < count($datosExpediente); $i++) {
//    $noserie = $datosExpediente[$i]['noserie'];
//    $pdf->SetFont('Arial', '', 7);
//    $pdf->SetXY($x, $y);
//    $cantFila = count($datosExpediente[$i]['marca']);
//    for ($j = 0; $j < $cantFila; $j++) {
//        $pdf->SetXY($x, $y);
//        $pdf->Cell(30, 6, $noserie[$j], 1, 0, 'C');
//        $y+=6;
//    }
//}
//$y = 96;
//$x = 98;
////columna Capacidad
//for ($i = 0; $i < count($datosExpediente); $i++) {
//    $capacidad = $datosExpediente[$i]['capacidad'];
//    $pdf->SetFont('Arial', '', 7);
//    $pdf->SetXY($x, $y);
//    $cantFila = count($datosExpediente[$i]['marca']);
//    for ($j = 0; $j < $cantFila; $j++) {
//        $pdf->SetXY($x, $y);
//        $pdf->Cell(25, 6, $capacidad[$j], 1, 0, 'C');
//        $y+=6;
//    }
//}
//$y = 96;
//$x = 123;
////columna Velocidad
//for ($i = 0; $i < count($datosExpediente); $i++) {
//    $velocidad = $datosExpediente[$i]['velocidad'];
//    $pdf->SetFont('Arial', '', 7);
//    $pdf->SetXY($x, $y);
//    $cantFila = count($datosExpediente[$i]['marca']);
//    for ($j = 0; $j < $cantFila; $j++) {
//        $pdf->SetXY($x, $y);
//        $pdf->Cell(25, 6, $velocidad[$j], 1, 0, 'C');
//        $y+=6;
//    }
//}
//$y = 96;
//$x = 148;
////columna Tipo
//for ($i = 0; $i < count($datosExpediente); $i++) {
//    $tipo = $datosExpediente[$i]['tipo'];
//    $pdf->SetFont('Arial', '', 7);
//    $pdf->SetXY($x, $y);
//    $cantFila = count($datosExpediente[$i]['marca']);
//    for ($j = 0; $j < $cantFila; $j++) {
//        $pdf->SetXY($x, $y);
//        $pdf->Cell(25, 6, $tipo[$j], 1, 0, 'C');
//        $y+=6;
//    }
//}
//$y = 96;
//$x = 173;
////columna Tipo
//for ($i = 0; $i < count($datosExpediente); $i++) {
//    $noinventario = $datosExpediente[$i]['noinventario'];
//    $pdf->SetFont('Arial', '', 7);
//    $pdf->SetXY($x, $y);
//    $cantFila = count($datosExpediente[$i]['marca']);
//    for ($j = 0; $j < $cantFila; $j++) {
//        $pdf->SetXY($x, $y);
//        $pdf->Cell(30, 6, $noinventario[$j], 1, 0, 'C');
//        $y+=6;
//    }
//}
//$pdf->SetFont('Arial', 'B', 9);
//$pdf->SetXY(21, 250);
//$pdf->Cell(30, 6, 'Responsable: ' . $responsable, 0, 0, 'C');
//$pdf->SetXY(25, 260);
//$pdf->Cell(30, 6, 'Elaborado por: ' . $tecnico, 0, 0, 'C');
//$pdf->SetXY(150, 250);
//$pdf->Cell(30, 6, 'Firma: ____________________', 0, 0, 'C');
//$pdf->SetXY(151, 260);
//$pdf->Cell(30, 6, 'Firma: ____________________', 0, 0, 'C');
$pdf->Output();
?>