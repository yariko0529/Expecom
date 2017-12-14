<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Propiedad
 *
 * @author yariko
 */
require_once ('../Modelo/conection.php');

class Propiedad {

    public function Propiedad() {
        $this->conn = new conection();
    }

    public function getPropiedades($start, $limit, $id) {
        $sql = "SELECT * FROM propiedades WHERE id_componente='$id' ";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_propiedad" => $row['id_propiedad'],
                "id_componente" => $row['id_componente'],
                "descrip_propiedad" => $row['descrip_propiedad']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }

    public function editarPropiedad($id, $campo, $valor) {
        $sql = mysql_query("UPDATE propiedades SET $campo='$valor' WHERE id_propiedad='" . $id . "'", $this->conn->get_conection());
        $result = mysql_query($sql, $this->conn->get_conection());
        if ($result == '') {
            $men['Msg'] = 'Popiedad editada satisfactoriamete';
            $men['success'] = true;
        } else {
            $men['Msg'] = 'Ha ocurrido un error';
            $men['failure'] = true;
        }
        return $men;
    }

    public function insertarPropiedad($descrip, $id) {

        $sql = "INSERT INTO propiedades(id_componente,descrip_propiedad)
                                VALUES('$id','$descrip')";
        $result = mysql_query($sql, $this->conn->get_conection());
        $id_insert_propiedad = mysql_insert_id();

        $sql1 = "ALTER TABLE zzcomp_" . $id . " ADD COLUMN ppd_" . $id_insert_propiedad . "   VARCHAR(100) DEFAULT NULL";

        $result1 = mysql_query($sql1, $this->conn->get_conection());

        $res = array();
        if ($result != '' && $result1 != '') {
            $res['Msg'] = "Propiedad insertada satisfactoriamente";
            $res['success'] = true;
        } else {
            $res['Msg'] = "La propiedad no se ha podido insertar";
            $res['success'] = false;
        }

        return $res;
    }

    function eliminarPropiedad($id, $id_comp) {
        $sql = "DELETE FROM propiedades WHERE id_propiedad='$id'";
        $sql1 = "ALTER TABLE zzcomp_" . $id_comp . " DROP COLUMN ppd_" . $id;
        $result = mysql_query($sql, $this->conn->get_conection());
        $result1 = mysql_query($sql1, $this->conn->get_conection());
        if ($result && $result1) {
            $men['Msg'] = 'Propiedad eliminada';
            $men['success'] = true;
        } else {
            $men['Msg'] = 'No se pudo eliminar';
            $men['success'] = false;
        }
        return $men;
    }

    public function getAllRegistroPropiedad($start, $limit, $id_componente, $id_ppd) {
        $result = mysql_query("SELECT DISTINCT ppd_" . $id_ppd . " FROM zzcomp_" . $id_componente . " ORDER BY ppd_" . $id_ppd, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "ppd" => $row["ppd_" . $id_ppd]
            ));
        }
        $paging = array(
            'success' => true,
            'total' => count($data),
            'data' => array_splice($data, $start, $limit)
        );
        return $paging;
    }

    public function existePropiedadRegistro($id_componente, $id_ppd, $nombre) {
        $result = mysql_query("SELECT ppd_" . $id_ppd . ",id_cmp FROM zzcomp_" . $id_componente . " WHERE ppd_" . $id_ppd . "='$nombre'", $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_cmp" => $row["id_cmp"],
                "ppd" => $row["ppd_" . $id_ppd]
            ));
        }
        return $data;
    }

    public function getALLRegistrosXNombre($start, $limit, $nombre, $id_componente, $id_ppd) {
        $result = mysql_query("SELECT  DISTINCT ppd_" . $id_ppd . " FROM zzcomp_" . $id_componente . " WHERE ppd_" . $id_ppd . " LIKE '$nombre%' ORDER BY ppd_" . $id_ppd, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "ppd" => $row["ppd_" . $id_ppd]
            ));
        }
        $paging = array(
            'success' => true,
            'total' => count($data),
            'data' => array_splice($data, $start, $limit)
        );
        return $paging;
    }
    //devuelve el id de la propiedad perteneceiente a l componente con id_componente y la descrip_propiedad
    public function getIdPropiedad($id_componente, $descrip_propiedad) {
        $sql = "SELECT id_propiedad FROM propiedades WHERE id_componente='$id_componente' AND descrip_propiedad='$descrip_propiedad'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_propiedad" => $row['id_propiedad'],
            ));
        }
        if (count($data) == 0) {
            return -1;
        } else {
            return $data[0]['id_propiedad'];
        }
    }
}
