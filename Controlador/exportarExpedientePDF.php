<?php

require '../Modelo/lib/fpdf17/fpdf.php';
include_once '../Modelo/Componente/Componente.php';
$num_exp = $_GET['num_exp'];
$responsable = $_GET['responsable'];
$tecnico = $_GET['tecnico'];
$uo = $_GET['uo'];
$componente = new Componente();
$datosExpediente = $componente->getAllDataExp($num_exp);
//echo json_encode($datosExpediente);

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', '', 11);
$pdf->Cell(0, 10, 'MODELO DE EXPEDIENTES DE MEDIOS INFORMATICOS CAP ARTEMISA', 0, 1, 'C');
$pdf->SetFont('Arial', 'B', 11);
$pdf->Cell(0, 10, 'CENTRO DE INFOCOMUNICACIONES', 0, 1, 'C');
$pdf->SetFont('Arial', '', 11);
$pdf->Cell(0, 10, '# Expediente: ' . $num_exp . '                          Entidad: CAP                            Dpto: ' . $uo, 0, 1);

for ($i = 0; $i < count($datosExpediente); $i++) {
    $pdf->SetFont('Arial', 'B', 8);
    $propiedades = $datosExpediente[$i]['propiedades'];
    $cmp_datos = $datosExpediente[$i]['datosCmp'];
    if ($datosExpediente[$i]['datosCmp'] != []) {
        $pdf->Cell(25, 4, $datosExpediente[$i]['descrip_cmp'], 0, 0, 'C');
        $pdf->Ln();
        for ($j = 0; $j < count($propiedades); $j++) {
            // $pdf->SetDrawColor(0, 80, 180);
            //  $pdf->SetFillColor(64, 64, 64);
            // $pdf->SetTextColor(248, 248, 248);
            $pdf->Cell(25, 4, $propiedades[$j]['descrip_propiedad'], 1);
        }
        $pdf->Ln();
        $pdf->SetFont('Arial', '', 7);
        for ($j = 0; $j < count($cmp_datos); $j++) {
            for ($k = 0; $k < count($propiedades); $k++) {
                $pdf->Cell(25, 4, $cmp_datos[$j]['ppd_' . $propiedades[$k]['id_propiedad']], 1);
            }
            $pdf->Ln();
        }
    }
}
$pdf->Ln();
$pdf->Ln();
$pdf->Ln();
$pdf->Ln();
$pdf->SetFont('Arial', 'B', 9);
$pdf->Cell(25, 6, 'Responsable:  ', 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(85, 6, $responsable, 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(20, 6, "Firma:________________", 0);
$pdf->SetFont('Arial', 'B', 9);
$pdf->Ln();
$pdf->Cell(40, 6, 'Elaborador Expediente:  ', 0);
$pdf->SetFont('Arial', '', 9);
$pdf->Cell(70, 6, $tecnico, 0);

$pdf->Cell(20, 6, 'Firma:________________ ', 0);
$pdf->Output();
?>