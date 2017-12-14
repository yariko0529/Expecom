<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Estructura
 *
 * @author yariko
 */
require ('../Modelo/conection.php');
require ('Propiedad.php');

class Componente {

    private $conn;

    public function Componente() {
        $this->conn = new conection();
    }

    public function crearTablaComponente($nombre_tabla) {
        $campos = "";
        $sql1 = "CREATE TABLE $nombre_tabla (
              id_cmp INTEGER(11) NOT NULL AUTO_INCREMENT , num_exp INTEGER(11),estado tinyint(1) DEFAULT '0',";

        /*        for ($i = 0; $i < count($propiedades); $i++) {
          $campos.="campo_" . $i . " VARCHAR(100) DEFAULT NULL";
          if ($i != count($propiedades)) {
          $campos.=",";
          }
          } */
        $sql1.=$campos . "PRIMARY KEY (id_cmp),
            FOREIGN KEY (num_exp)
            REFERENCES expediente (num_exp)
  ON DELETE CASCADE
        ) ENGINE=InnoDB
        CHECKSUM=0
        DELAY_KEY_WRITE=0
        PACK_KEYS=0
        AUTO_INCREMENT=0
        AVG_ROW_LENGTH=0
        MIN_ROWS=0
        MAX_ROWS=0
        ROW_FORMAT=DEFAULT
        KEY_BLOCK_SIZE=0;";
        $result = mysql_query($sql1, $this->conn->get_conection());
        $flag = false;
        if ($result) {
            $flag = true;
        }
        return $flag;
    }

    /* public function insertarPropiedades($id_modelo, $campos, $tipos) {
      $values = "";
      for ($i = 0; $i < count($campos); $i++) {
      $values.="('$id_modelo','$campos[$i]','$i','$i','c$i','$tipos[$i]')";
      if ($i != count($campos) - 1) {
      $values.=",";
      }
      }
      $sql = "INSERT INTO campos (id_modelo,descrip_campo,refe_campo,orden,formula,tipo)
      VALUES" . $values . ";";
      $result = mysql_query($sql, $this->conn->get_conection());
      $flag = false;
      if ($result != '') {
      $flag = true;
      }
      return $flag;
      } */

    public function NodoInfo($id) {
        $sql = "SELECT * FROM componente WHERE id_componente='$id'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $row = mysql_fetch_array($result);
        return array(
            'text' => $row['descrip_componente'],
            "id" => $row['id_componente'],
            "id_componente_padre" => $row['id_componente_padre'],
            "cant_max" => $row['cant_max'],
            "critico" => $row['critico']
        );
    }

    public function getHijos($id) {
        $sql = "SELECT * FROM componente WHERE id_componente_padre='$id' ORDER BY descrip_componente";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "text" => $row['descrip_componente'],
                "id" => $row['id_componente']
            ));
        }
        return $data;
    }

    public function getTree($id, $nodos) {
        $nodos = array();                       //reinicio el arreglo
        $hijos = $this->getHijos($id);        //lista de hijos del nodo con id=$id
        if (count($hijos) != 0) {
            for ($i = 0; $i < count($hijos); $i++) {
                $params = $this->NodoInfo($hijos[$i]['id']);
                array_push($nodos, array(
                    "text" => $params['text'],
                    "id" => $params['id'],
                    "id_componente_padre" => $params['id_componente_padre']
                ));
                if (count($this->getHijos($params['id'])) == 0) {
                    $this->getTree($params['id'], $nodos);
                    $nodos[$i]['iconCls'] = 'hijo16';
                    $nodos[$i]['leaf'] = true;
                } else {
                    $children = $this->getTree($params['id'], $nodos);
                    $nodos[$i]['children'] = $children;
                    $nodos[$i]['iconCls'] = "estructura16";
                }
            }
        } else if ($id != -1) {

            $params = $this->NodoInfo($id);
            array_push($nodos, array(
                "text" => $params['text'],
                "id" => $params['id'],
                "id_componente_padre" => $params['id_componente_padre'],
                "iconCls" => 'hijo16',
                "leaf" => true
            ));
        }
        return $nodos;
    }

    public function insertarComponente($descrip, $id, $cantMax, $critico) {
        $sql = "INSERT INTO componente(descrip_componente,id_componente_padre,cant_max,critico)
                                VALUES('$descrip','$id','$cantMax','$critico')";
        $result = mysql_query($sql, $this->conn->get_conection());
        $res = array();
        if ($result != '') {
            $id_componente = mysql_insert_id();
            if ($this->crearTablaComponente('zzcomp_' . $id_componente)) {
                $res['Msg'] = "Componente con nombre: <b>" . $descrip . "</b> insertado satisfactoriamente";
                $res['success'] = true;
            } else {
                $res['Msg'] = "Error Grave consulte al administrador del sistema";
                $res['success'] = false;
            }
        } else {
            $res['Msg'] = "El Componente no se ha podido insertar";
            $res['success'] = false;
        }

        return $res;
    }

    public function editarComponente($id, $descrip, $cantMax, $critico) {
        $result = mysql_query("UPDATE componente SET descrip_componente='$descrip', cant_max='$cantMax',critico='$critico' WHERE id_componente='" . $id . "'", $this->conn->get_conection());
        $resultCon = array();
        if ($result != '') {
            $resultCon['success'] = true;
            $resultCon['Msg'] = "Componente editado satisfactoriamente";
        } else {
            $resultCon['Msg'] = "Disculpe, Intente editar más tarde";
            $resultCon['failure'] = true;
        }
        return $resultCon;
    }

    public function moverComponente($id, $id_padre) {
        $result = mysql_query("UPDATE componente SET id_componente_padre='$id_padre' WHERE id_componente='" . $id . "'", $this->conn->get_conection());
        $resultCon = array();
        if ($result != '') {
            $resultCon['success'] = true;
            $resultCon['Msg'] = "Componente movida satisfactoriamente";
        } else {
            $resultCon['Msg'] = "Disculpe, Intente editar más tarde";
            $resultCon['failure'] = true;
        }
        return $resultCon;
    }

    public function getComponenteHijo($start, $limit) {
        $sql = "SELECT * FROM componente WHERE NOT id_componente_padre=-1";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_componente" => $row['id_componente'],
                "descrip_componente" => $row['descrip_componente'],
                "id_componente_padre" => $row['id_componente_padre'],
                "cant_max" => $row['cant_max'],
                "critico" => $row['critico']
            ));
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }

    public function cargarDatosComponente($start, $limit, $id, $num_exp, $propiedades) {
        $sql = "SELECT  * FROM zzcomp_" . $id . " WHERE num_exp='$num_exp'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            $data1 = array();
            for ($i = 0; $i < count($propiedades); $i++) {
                $data1[$propiedades[$i]] = $row[$propiedades[$i]];
            }
            array_push($data, $data1);
        }
        $paging['success'] = true;
        $paging['total'] = count($data);
        $paging['data'] = array_splice($data, $start, $limit);
        return $paging;
    }

    private function getCantComponenteXExpediente($id_componente, $num_exp) {
        $sql = "SELECT * FROM zzcomp_" . $id_componente . " WHERE  num_exp='$num_exp'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "id_cmp" => $row['id_cmp'],
            ));
        }
        return count($data);
    }

    public function insertarComponenteExpediente($campos, $cant) {
        $cantMax = $this->getCantComponenteXExpediente($campos['id_cmp'], $campos['num_exp']);
        $res = array();
        if ($cant > $cantMax) {
            $sql = "INSERT INTO zzcomp_" . $campos['id_cmp'];
            unset($campos['id_cmp']);
            $auxcolumnas = array_keys($campos);
            $auxvalues = array_values($campos);
            $columnas = implode(",", $auxcolumnas);
            $values = implode("','", $auxvalues);
            $columnas = "(" . $columnas . ")";
            $values = "VALUES('" . $values . "')";
            $sql = $sql . $columnas . " " . $values;

            $result = mysql_query($sql, $this->conn->get_conection());
            if ($result != '') {
                $res['Msg'] = "Se ha insertado el componente exitosamente : ";
                $res['success'] = true;
            } else {
                $res['Msg'] = "Error No hay conexion con el servidor";
                $res['success'] = false;
            }
        } else {
            $res['Msg'] = "Ha alcanzado el numero maximo de componentes para este expediente";
            $res['success'] = true;
        }


        return $res;
    }

    public function eliminarComponenteExpediente($id_componente, $id_cmp) {
        $sql = "DELETE FROM zzcomp_" . $id_componente . " WHERE id_cmp='$id_cmp'";
        $result = mysql_query($sql, $this->conn->get_conection());
        if ($result != '') {
            $men['Msg'] = 'Componente Eliminado Satisfactoriamente';
            $men['success'] = true;
        } else {
            $men['Msg'] = 'Ha ocurrido un error';
            $men['failure'] = true;
        }
        return $men;
    }

    public function editarRegistroPropiedadExpediente($id_componente, $id_cmp, $campo, $valor) {
        $sql = mysql_query("UPDATE zzcomp_" . $id_componente . " SET $campo='$valor' WHERE id_cmp='$id_cmp'", $this->conn->get_conection());
        $result = mysql_query($sql, $this->conn->get_conection());
        if ($result == '') {
            $men['Msg'] = 'Registro editado satisfactoriamete';
            $men['success'] = true;
        } else {
            $men['Msg'] = 'Ha ocurrido un error';
            $men['failure'] = true;
        }
        return $men;
    }

    public function existeCmpExp($id_cmp, $num_exp) {
        $sql = "SELECT * FROM zzcomp_" . $id_cmp . " WHERE  num_exp='$num_exp'";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        $cont = 0;
        while ($row = mysql_fetch_array($result)) {
            $data[$cont] = $row['estado'];
            $cont++;
        }
        if (count($data) == 0) {
            $men['Msg'] = 'En este expediente no existe ese componente';
            $men['existe'] = false;
        } else {
            $men['existe'] = true;
            $men['Msg'] = 'sdfsdf';
            $men['estado'] = $data;
        }
        return $men;
    }

    public function getAllDataExp($num_exp) {
        $data = array();
        $propiedad = new Propiedad();
        $componentes = $this->getComponenteHijo(0, 10000)['data'];
        $cont = 0;
        for ($i = 0; $i < count($componentes); $i++) {
            $propiedades = $propiedad->getPropiedades(0, 1000, $componentes[$i]['id_componente'])['data'];
            $propiedadesAux = array();
            for ($j = 0; $j < count($propiedades); $j++) {
                $propiedadesAux[$j] = "ppd_" . $propiedades[$j]['id_propiedad'];
            }
            $data[$i]['descrip_cmp'] = $componentes[$i]['descrip_componente'];
            $data[$i]['id_cmp'] = $componentes[$i]['id_componente'];
            $data[$i]['datosCmp'] = $this->cargarDatosComponente(0, 1000, $componentes[$i]['id_componente'], $num_exp, $propiedadesAux)['data'];
            $data[$i]['propiedades'] = $propiedades;
        }
        return $data;
    }

//Devuelve los valores de una propiedad=$descrip_propiedad perteneciente a un componente de id=$id_cmp con num de Exp=$num_exp
    public function getDatosCmpDescripPpd($num_exp, $descrip_propiedad, $id_cmp) {
        $propiedad = new Propiedad();
        $id_propiedad = $propiedad->getIdPropiedad($id_cmp, $descrip_propiedad);
        if ($id_propiedad == -1) {
            return -1;
        } else {
            $sql = "SELECT * FROM zzcomp_" . $id_cmp . " WHERE  num_exp='$num_exp'";
            $result = mysql_query($sql, $this->conn->get_conection());
            $data = array();
            $cont = 0;
            while ($row = mysql_fetch_array($result)) {
                $data[$cont] = $row['ppd_' . $id_propiedad];
                $cont++;
            }
            if (count($data) == 0) {
                return -1;
            } else {
                return $data;
            }
        }
    }

//Devuelve un array con 
    public function getAllCmpDataPpd($num_exp) {
        $componentes = $this->getComponenteHijo(0, 1000)['data'];
        $data = array();
        $cont = 0;
        for ($i = 0; $i < count($componentes); $i++) {
            $dataPpdCMp = $this->getDatosCmpDescripPpd($num_exp, 'Marca', $componentes[$i]['id_componente']);
            if ($dataPpdCMp != -1) {
                $data[$cont]['descrip_cmp'] = $componentes[$i]['descrip_componente'];
                $data[$cont]['id_cmp'] = $componentes[$i]['id_componente'];
                $data[$cont]['marca'] = $dataPpdCMp;
                $data[$cont]['noserie'] = $this->getDatosCmpDescripPpd($num_exp, 'No. Serie', $componentes[$i]['id_componente']);
                $data[$cont]['estado'] = $this->existeCmpExp($componentes[$i]['id_componente'], $num_exp)['estado'];
                $data[$cont]['capacidad'] = $this->getDatosCmpDescripPpd($num_exp, 'Capacidad', $componentes[$i]['id_componente']);
                $data[$cont]['tipo'] = $this->getDatosCmpDescripPpd($num_exp, 'Tipo', $componentes[$i]['id_componente']);
                $data[$cont]['velocidad'] = $this->getDatosCmpDescripPpd($num_exp, 'Velocidad', $componentes[$i]['id_componente']);
                $data[$cont]['noinventario'] = $this->getDatosCmpDescripPpd($num_exp, 'No. Inventario', $componentes[$i]['id_componente']);
                $cont++;
            }
        }
        return $data;
    }

    public function getAllDataExp1($num_exp) {
        return $this->getAllCmpDataPpd($num_exp);
    }

    public function getChasis() {
        $sql = "SELECT  * FROM equipam.zzcomp_2 INNER JOIN equipam.expediente  ON(zzcomp_2.num_exp=expediente.num_exp) "
                . "INNER JOIN nomencladores.nom_uo ON(nom_uo.id_uo=expediente.id_uo)";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "num_exp" => $row['num_exp'],
                "noinventario" => $row['ppd_5'],
                "descrip_uo" => $row['descrip_uo'],
                "tipo_cmp"=>'pc'
            ));
        }
        return $data;
    }
    public function getMonitores() {
        $sql = "SELECT  * FROM equipam.zzcomp_10 INNER JOIN equipam.expediente  ON(zzcomp_10.num_exp=expediente.num_exp) "
                . "INNER JOIN nomencladores.nom_uo ON(nom_uo.id_uo=expediente.id_uo)";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "num_exp" => $row['num_exp'],
                "noinventario" => $row['ppd_31'],
                "descrip_uo" => $row['descrip_uo'],
                "tipo_cmp"=>'monitor'
            ));
        }
        return $data;
    }
    public function getUps() {
        $sql = "SELECT  * FROM equipam.zzcomp_14 INNER JOIN equipam.expediente  ON(zzcomp_14.num_exp=expediente.num_exp) "
                . "INNER JOIN nomencladores.nom_uo ON(nom_uo.id_uo=expediente.id_uo)";
        $result = mysql_query($sql, $this->conn->get_conection());
        $data = array();
        while ($row = mysql_fetch_array($result)) {
            array_push($data, array(
                "num_exp" => $row['num_exp'],
                "noinventario" => $row['ppd_52'],
                "descrip_uo" => $row['descrip_uo']
            ));
        }
        return $data;
    }

}
