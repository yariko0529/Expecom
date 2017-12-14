<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Usuario
 *
 * @author yariko
 */
include_once ('../Modelo/conection.php');

class Usuario {

    private $conn;

    public function Usuario() {
        $this->conn = new conection();
    }

    public function login($user, $pass) {
        $sql = "SELECT * FROM usuario WHERE usuario='$user' AND password='$pass'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_usuario" => $row['id'],
                "usuario" => $row['usuario'],
                "password" => $row['password'],
                "privilegio" => $row['privilegio'],
                "nombre" => $row['nombre']
            ));
        }
        $cantUsuario = count($data);
        $result = null;
        if ($cantUsuario == 1) {
            $result['Msg'] = 'Bienvenido, Esperamos que tenga un buen día';
            $result['success'] = true;
            $result['usuario'] = $data[0];
        } else {
            $result['Msg'] = 'Problema con las credenciales';
            $result['success'] = false;
        }
        return $result;
    }

    public function existeUser($user) {
        $sql = "SELECT * FROM usuario WHERE usuario='$user'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_usuario" => $row['id'],
                "usuario" => $row['usuario'],
                "password" => $row['password'],
                "privilegio" => $row['privilegio'],
                "nombre" => $row['nombre']
            ));
        }
        $cantUsuario = count($data);
        if ($cantUsuario == 1) {
            return true;
        } else {
            return false;
        }
    }

    public function getUsuarios($start, $limit) {
        $sql = "SELECT * FROM usuario";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id" => $row['id'],
                "usuario" => $row['usuario'],
                "password" => $row['password'],
                "privilegio" => $row['privilegio'],
                "nombre" => $row['nombre']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }
    
    public function getUsuariosTecnicos($start, $limit) {
        $sql = "SELECT * FROM usuario WHERE privilegio='3'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id" => $row['id'],
                "usuario" => $row['usuario'],
                "password" => $row['password'],
                "privilegio" => $row['privilegio'],
                "nombre" => $row['nombre']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }

    public function insertarUsuario($usuario, $pass, $privilegio, $nombre) {
        if ($this->existeUser($usuario)) {
            $res['Msg'] = "Ya existe ese usuario";
            $res['success'] = true;
        } else {
            $sql = "INSERT INTO usuario(usuario,password,privilegio,nombre)
                                VALUES('$usuario','$pass','$privilegio','$nombre')";
            $result = mysql_query($sql, $this->conn->get_conection());
            $res = array();
            if ($result != '') {
                $res['Msg'] = "Usuario insertado satisfactoriamente";
                $res['success'] = true;
            } else {
                $res['Msg'] = "El usuario no se ha podido insertar";
                $res['success'] = false;
            }
        }


        return $res;
    }
    
    function eliminarUsuario($id) {
        $sql = "DELETE FROM usuario WHERE id='$id'";
        $result = mysql_query($sql, $this->conn->get_conection());
        if ($result) {
            $men['Msg'] = 'Usuario eliminado satisfactoriamente';
            $men['success'] = true;
        } else {
            $men['Msg'] = 'No se pudo eliminar';
            $men['success'] = false;
        }
        return $men;
    }

}
