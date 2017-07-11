<?php
	//inserimento punteggio
	include "classi.php";
 	$connessione = new connessione();
 	$connessione->connect();
	session_start();
	//gestisce quale funzione richiamare quando viene ricaricata la pagina
	$username=$_SESSION["user"];
	$score=$_POST['score'];
	$action=$_POST['action'];
	$connessione->setTable("punteggio");
	$risultato=$connessione->inputPoint($username,$score);
	//nel caso di logout
	if ($action=="logout") {
		unset($_SESSION["start"]);
		header("Location: logout.php");
	}
	//nel caso di ritorno al menu
	elseif ($action=="tomenu") {
		unset($_SESSION["start"]);
		header("Location: ../index.php");
	}
	//nel caso di click to retry
	else {
		$_SESSION["start"]="yes";
		header("Location: ../index.php");
	}
?>