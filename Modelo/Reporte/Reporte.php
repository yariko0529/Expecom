<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Reporte
 *
 * @author yariko
 */
include_once ('../Modelo/conection.php');

class Reporte {

    private $conn;

    public function Reporte() {
        $this->conn = new conection();
    }

    private function existeReporte($num_exp) {
        $sql = "SELECT * FROM reportes WHERE num_exp='$num_exp'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "fecha" => $row['fecha']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        return $paging;
    }

    public function insertarReporte($uo, $num_exp, $fecha, $descrip, $responsable) {
        $existe = $this->existeReporte($num_exp);
        $res = array();
        if ($existe['total'] == 0) {
            $sql = "INSERT INTO reportes (id_uo,num_exp,fecha,descrip,responsable)
                                VALUES('$uo','$num_exp','$fecha','$descrip','$responsable')";
            $result = mysql_query($sql, $this->conn->get_conection());
            if ($result != '') {
                $res['Msg'] = "En un momento le atenderemos";
                $res['success'] = true;
                $res['url'] = 'resources/images/utiles/success.png';
                $res['title'] = 'Gracias!!!';
            } else {
                $res['Msg'] = "El Reporte no se ha podido insertar";
                $res['success'] = false;
                $res['url'] = 'resources/images/utiles/error.png';
            }
        } else {
            $res['Msg'] = "Ya este medio esta reportado";
            $res['success'] = true;
            $res['url'] = 'resources/images/utiles/warning.png';
            $res['title'] = 'Atención';
        }

        return $res;
    }

    public function getReportes($start, $limit) {
        $sql = "SELECT * FROM equipam.reportes INNER JOIN nomencladores.nom_uo ON(reportes.id_uo=nom_uo.id_uo) "
                . "INNER JOIN equipam.persona ON (reportes.responsable=persona.id_persona) WHERE reportes.id_tecnico=0";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_reporte" => $row['id_reporte'],
                "descrip_uo" => $row['descrip_uo'],
                "num_exp" => $row['num_exp'],
                "fecha" => $row['fecha'],
                "descrip" => $row['descrip'],
                "responsable" => $row['nombre_completo'],
                "id_tecnico" => $row['id_tecnico'],
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }
    
    public function getReportesTenicos($start, $limit,$id_usuario) {
        $sql = "SELECT * FROM equipam.reportes INNER JOIN nomencladores.nom_uo ON(reportes.id_uo=nom_uo.id_uo) "
                . "INNER JOIN equipam.persona ON (reportes.responsable=persona.id_persona) "
                . "INNER JOIN equipam.usuario ON(reportes.id_tecnico=usuario.id) WHERE reportes.id_tecnico='$id_usuario'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_reporte" => $row['id_reporte'],
                "descrip_uo" => $row['descrip_uo'],
                "num_exp" => $row['num_exp'],
                "fecha" => $row['fecha'],
                "descrip" => $row['descrip'],
                "responsable" => $row['nombre_completo'],
                "id_tecnico" => $row['id_tecnico'],
                "nombre_tecnico" => $row['nombre']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }

    public function asignarTecnico($id,$id_reporte) {
        $sql = mysql_query("UPDATE reportes SET id_tecnico='$id' WHERE id_reporte='$id_reporte'", $this->conn->get_conection());
        $result = mysql_query($sql, $this->conn->get_conection());
        if ($result == '') {
            $men['Msg'] = 'Reporte editado satisfactoriamete';
            $men['success'] = true;
        } else {
            $men['Msg'] = 'Ha ocurrido un error';
            $men['failure'] = true;
        }
        return $men;
    }

}
