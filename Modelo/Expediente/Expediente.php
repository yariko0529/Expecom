<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Expediente
 *
 * @author yariko
 */
include_once ('../Modelo/conection.php');

class Expediente {

    public function Expediente() {
        $this->conn = new conection();
    }
    
    public function insertarExpediente($id_elaborador, $fecha, $responsable, $uo) {
        $sql = "INSERT INTO expediente (id_elaborador,responsable,id_uo,fecha)
                                VALUES('$id_elaborador','$responsable','$uo','$fecha')";
        $result = mysql_query($sql, $this->conn->get_conection());
        $res = array();
        if ($result != '') {
            $res['Msg'] = "Expediente insertado satisfactoriamente";
            $res['success'] = true;
        } else {
            $res['Msg'] = "El expediente no se ha podido insertar";
            $res['success'] = false;
        }
        return $res;
    }
    
    public function editarExpediente($id_elaborador,$fecha, $responsable, $uo, $num_exp) {
        $result= mysql_query("UPDATE expediente SET  id_elaborador='$id_elaborador',fecha='$fecha',id_uo='$uo',responsable='$responsable' WHERE num_exp='".$num_exp."'",$this->conn->get_conection());
        $resultCon=array();
        if($result!='') {
            $resultCon['success']=true;
            $resultCon['Msg']="Expediente  No. ".$num_exp." editado satisfactoriamente";
        }else {
            $resultCon['Msg']="Disculpe, Intente editar más tarde";
            $resultCon['failure']=true;
        }
        return $resultCon;
    }
    
    public function cambiarRespExp($id_elaborador, $num_exp) {
        $result= mysql_query("UPDATE expediente SET  id_elaborador='$id_elaborador' WHERE num_exp='".$num_exp."'",$this->conn->get_conection());
        $resultCon=array();
        if($result!='') {
            $resultCon['success']=true;
            $resultCon['Msg']="Expediente  No. ".$num_exp." editado satisfactoriamente";
        }else {
            $resultCon['Msg']="Disculpe, Intente editar más tarde";
            $resultCon['failure']=true;
        }
        return $resultCon;
    }
    
    public function getExpedientesUsuario($start, $limit,$id) {
        $sql = "SELECT * FROM equipam.expediente INNER JOIN equipam.estado ON(estado.id_estado=expediente.estado)"
                .                  "INNER JOIN nomencladores.nom_uo ON(nom_uo.id_uo=expediente.id_uo)"
                .                  "INNER JOIN equipam.usuario ON(usuario.id=expediente.id_elaborador)"
                .                  "INNER JOIN equipam.persona ON(persona.id_persona=expediente.responsable)"
                .                  "WHERE expediente.id_elaborador='$id'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "num_exp" => $row['num_exp'],
                "nombre" => $row['nombre'],
                "id_elaborador" => $row['id_elaborador'],
                "id_persona" =>$row['id_persona'],
               "responsable" => $row['nombre_completo'],
               "descrip_uo" => $row['descrip_uo'],
                "uo"=> $row['id_uo'],
                "fecha" => $row['fecha'],
                "estado" => $row['descrip_estado']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }
    public function getExpedientes($start, $limit) {
        $sql = "SELECT * FROM equipam.expediente INNER JOIN equipam.estado ON(estado.id_estado=expediente.estado)"
                .                  "INNER JOIN nomencladores.nom_uo ON(nom_uo.id_uo=expediente.id_uo)"
                .                  "INNER JOIN equipam.usuario ON(usuario.id=expediente.id_elaborador)"
                .                  "INNER JOIN equipam.persona ON(persona.id_persona=expediente.responsable)";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "num_exp" => $row['num_exp'],
                "nombre" => $row['nombre'],
                "id_elaborador" => $row['id_elaborador'],
                "privilegio" =>$row['privilegio'],
                "id_persona" =>$row['id_persona'],
                "responsable" => $row['nombre_completo'],
                "descrip_uo" => $row['descrip_uo'],
                "uo"=> $row['id_uo'],
                "fecha" => $row['fecha'],
                "estado" => $row['descrip_estado']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }
    
    public function getExpedientesUo($start, $limit,$uo) {
        $sql = "SELECT * FROM expediente INNER JOIN persona ON(expediente.responsable=persona.id_persona) WHERE id_uo='$uo'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "num_exp" => $row['num_exp'].'-'.$row['id_persona'],
                "num_exp_text"=>"Exp # ".$row['num_exp']." - ".$row['nombre_completo']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }

}
