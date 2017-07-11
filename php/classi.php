<?php
	//classe utile per la gestione delle funzioni php
		class connessione
			{
			public $prima_volta="si";
		    private $nome_db="user";
		    private $username="root";
		    private $password="";
		    private $host="localhost";
		    private $table;
		    //funzione per la connessione
		    public function connect() {
		    	$connessione=mysql_connect($this->host,$this->username,$this->password) or die ("connessione non riuscita: " .mysql_error());
				$selezione=mysql_select_db($this->nome_db, $connessione) or die ("connessione con database non riuscita: " .mysql_error());
				return true;
			}
    		//funzione per il login
   			public function login($username,$password) {
       	 		$query="select Username from " .$this->table. " where BINARY(Username) = BINARY('" .$username. "') and Password ='" .$password."'";  
       	 		$risultato=mysql_query($query);
        		if ($risultato)
        			{
        			$num_righe=mysql_num_rows($risultato);
        			return $num_righe;
        			}
        		else return 0;
			}
    		//funzione per la registrazione
    		public function registrazione($username,$password) {
			    $query = "INSERT INTO ". $this->table."  (Username,Password) VALUES ('" .$username. "','" .$password. "')";
			    $result = mysql_query($query);
			    if ($result)
			    	return 1;
			    else
			    	return 0;
     		}
     		//funzione per inserimento punti
     		public function inputPoint($username,$score) {
			    $query = "INSERT INTO ". $this->table."  (User,Punteggio) VALUES ('" .$username. "','" .$score. "')";
			    $result = mysql_query($query);
			    if ($result)
			    	return 1;
			    else
			    	return 0;
     		}
			//richiamata negli altri file php,indica quale tabella usare per le query
		    public function setTable($table) {
		      	$this->table = $table;
		    }
		    //funzione per lettura classifica
  			public function tableRank() {
  				$query = "select Punteggio,User from " .$this->table. " ORDER BY `punteggio`.`Punteggio` DESC LIMIT 0,10";
  				$result = mysql_query($query);
  				while($row = mysql_fetch_assoc($result)){
     			$json[] = $row["Punteggio"];
     			$json[] = $row["User"];
				}
				return json_encode($json);;
			}
		}
?>