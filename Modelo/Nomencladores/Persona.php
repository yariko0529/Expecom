<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Persona
 *
 * @author yariko
 */
include_once ('../Modelo/conection.php');

class Persona {

    private $conn;

    public function Persona() {
        $this->conn = new conection();
    }

    public function getPersonas($start, $limit) {
        $result = mysql_query("SELECT * FROM persona ORDER BY nombre_completo", $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id" => $row["id_persona"],
                "nombre" => $row["nombre_completo"]
            ));
        }
        $paging = array(
            'success' => true,
            'total' => count($data),
            'data' => array_splice($data, $start, $limit)
        );
        return $paging;
    }
    
    public function getPersonasXNombre($start,$limit,$nombre) {
        $result= mysql_query("SELECT * FROM persona WHERE nombre_completo LIKE '$nombre%'  ORDER BY nombre_completo",$this->conn->get_conection());
        $data = array();
        while($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id" => $row["id_persona"],
                "nombre" => $row["nombre_completo"]
            ));
        }
        $paging = array(
            'success'=>true,
            'total'=>count($data),
            'data'=> array_splice($data,$start,$limit)
        );
        return $paging;
    }
    
    public function existePersona($nombre) {
        $result= mysql_query("SELECT * FROM persona WHERE nombre_completo='$nombre'",$this->conn->get_conection());
        $data = array();
        $id=false;
        while($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id" => $row["id_persona"],
                "objeto" => $row["nombre_completo"]
            ));
            $id=$row['id_persona'];
        }
        return $id;
    }

    public function insertarPersona($nombre) {
        $sql="INSERT INTO persona(nombre_completo)
                            VALUES('$nombre')";
        $result=mysql_query($sql,$this->conn->get_conection());
        $id=mysql_insert_id();
        if($result!='') {
            return $id;
        }else
            return 0;
    }
}
