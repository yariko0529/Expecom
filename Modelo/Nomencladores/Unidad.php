<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Unidad
 *
 * @author yariko
 */
include_once ('../Modelo/conection_n.php');

class Unidad {

    private $conn;

    public function Unidad() {
        $this->conn = new conection_n();
    }

    public function getUnidades($start, $limit) {
        $result = mysql_query("SELECT * FROM nom_uo", $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_uo" => $row["id_uo"],
                "descrip_uo" => $row["descrip_uo"],
                "abreviatura"=>$row['abreviatura']
            ));
        }
        $paging = array(
            'success' => true,
            'total' => count($data),
            'data' => array_splice($data, $start, $limit)
        );
        return $paging;
    }
//    public function getIdUnidadXNombre($nombre) {
//        $result = mysql_query("SELECT id_uo FROM nom_uo WHERE descrip_uo='$nombre'", $this->conn->get_conection());
//        $data = array();
//        $id=null;
//        while ($row = mysql_fetch_array($result)) {
//            array_push($data, array(
//                "id_uo" => $row["id_uo"]
//            ));
//        $id=$row["id_uo"];
//        }
//        return $id;
//    }
//    public function eliminarUnidad($id){
//       $sql="DELETE FROM nom_uo WHERE id_uo='$id'";
//       $result=mysql_query($sql,$this->conn->get_conection());
//       if($result=='') {
//            $men['Msg']='Unidad Eliminada';
//            $men['success']=true;
//        }
//        else {
//            $men['Msg']='Ha ocurrido un error';
//            $men['failure']=true;
//        }
//        return $men;
//    }
//    public function desactivarUnidad($id){
//        $sql="UPDATE nom_uo set activo='0' WHERE id_uo='$id'";
//        $result=mysql_query($sql,$this->conn->get_conection() );
//        $resultCon=array();
//        if($result!='') {
//            $resultCon['success']=true;
//            $resultCon['Msg']="Unidad desactivado";
//        }else {
//            $resultCon['Msg']="Disculpe, Intente cambiar el estado más tarde";
//            $resultCon['failure']=true;
//        }
//
//        return $resultCon;
//    }
//    public function activarUnidad($id){
//        $sql="UPDATE nom_uo set activo='1' WHERE id_uo='$id'";
//        $result=mysql_query($sql,$this->conn->get_conection() );
//        $resultCon=array();
//        if($result!='') {
//            $resultCon['success']=true;
//            $resultCon['Msg']="Unidad activado";
//        }else {
//            $resultCon['Msg']="Disculpe, Intente cambiar el estado más tarde";
//            $resultCon['failure']=true;
//        }
//
//        return $resultCon;
//    }
//    public function existeUnidad($descrip) {
//        $result= mysql_query("SELECT * FROM nom_uo WHERE descrip_uo='$descrip'",$this->conn->get_conection());
//        $data = array();
//        $id=false;
//        while($row = mysql_fetch_array($result)) {
//            array_push($data, array(
//                "id_uo" => $row["id_uo"],
//                "descrip_uo" => $row["descrip_uo"]
//            ));
//            $id=$row['id'];
//        }
//        return $id;
//    }
//    public function insertarUnidad($unidad) {
//        $sql="INSERT INTO nom_uo(descrip_uo,activo)
//                            VALUES('$unidad','1')";
//        $result=mysql_query($sql,$this->conn->get_conection());
//        $id=mysql_insert_id();
//        if($result!='') {
//            return $id;
//        }else
//            return 0;
//    }
}
