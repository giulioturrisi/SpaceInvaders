<?php
 	include "classi.php";


	$connessione=new connessione();
	$connessione->connect();
	//prende i dati dalla form
	$username=$_POST['user_name'];
	$password=$_POST['password'];
	//setta la tabella da usare per la query
	$connessione->setTable("utente");
	//se viene premuto il pulsante per il Login..
	if($_POST['Login']){
			$risultato = $connessione->login($username,$password);
			//se l'utente è stato trovato,setta log=0,per gestire dal main quale funzione richiamare una volta ricaricata la pagina tremite echo del php
			if ($risultato > 0)	{
				session_start();
				//resetta la variabile reg(utile anch'essa per gestire dal main quale funzione richiamare)
				if(isset($_SESSION["reg"]))
					unset($_SESSION["reg"]);
				$_SESSION["log"]=0;
				$_SESSION["user"]=$username;
				header("Location: ../index.php");	
			}
			else {
				session_start();
				$_SESSION["log"]=1;
				if(isset($_SESSION["reg"]))
					unset($_SESSION["reg"]);
				header("Location: ../index.php");
				}
	}
	//se viene premuto il pulsante per la registrazione
	else {
		$risultato = $connessione->registrazione($username,$password);
		if ($risultato == 1)	{
			session_start();
			//registrazione avvenuta
			if(isset($_SESSION["log"]))
				 unset($_SESSION["log"]);
			$_SESSION["reg"]=0;
			header("Location: ../index.php");
				
		}
		else {
			session_start();
			//registrazione con problemi
			if(isset($_SESSION["log"]))
				 unset($_SESSION["log"]);
			$_SESSION["reg"]=1;
			header("Location: ../index.php");
			
		}
	}
	
	
 ?>