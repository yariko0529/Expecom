<?php
class conection_n
{
	private $conn;
	private $db;
	private $host;
        private $port;

	public function conection_n($host="localhost",$port="3306",$db="nomencladores",$user="root",$pass="")
	{
		$this->host = $host;
		$this->db = $db;
		@$this->conn = mysql_connect($this->host,$user,$pass);
		mysql_select_db($this->db,$this->conn);
	}

	public function get_conection()
	{
		return $this->conn;
	}

    public function close()
	{
		mysql_close($this->conn);
	}
}


?>