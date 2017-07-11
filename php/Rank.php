<?php
	//funzione per la gestione della classifica. Viene richiamata tramite il link "Rank" allocato nell'index
	include "classi.php";

	session_start();
	$connessione = new connessione();
	$connessione->connect();
	$connessione->setTable("punteggio");
	//indica quale funzione deve essere richiamata una volta ricaricata la pagina. Utile anche per passare i risultati della query
	$_SESSION["rank"] = $connessione->tableRank();
	header("Location: ../index.php");
?>