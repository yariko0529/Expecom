<?php
class conection
{
	private $conn;
	private $db;
	private $host;
        private $port;

	public function conection($host="localhost",$port="3306",$db="equipam",$user="root",$pass="")
	{
		$this->host = $host;
		$this->db = $db;
		@$this->conn = mysql_connect($this->host,$user,$pass);
		mysql_select_db($this->db,$this->conn);
		//$pdo = new PDO('mysql:host=example.com;dbname=database', 'user', 'password');
		//$statement = $pdo->query("SELECT 'Hello, dear MySQL user!' AS _message FROM DUAL");
		//$row = $statement->fetch(PDO::FETCH_ASSOC);
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