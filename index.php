<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=us-ascii">
		<title> Battlestar </title>
		<link rel="stylesheet" type="text/css" href="css/indexcss.css">
		<script type="text/javascript" src="javascript/Principal-js.js"> </script>
		<script type="text/javascript" src="javascript/Enemy-Movement.js"> </script>
		<script type="text/javascript" src="javascript/Arena.js"> </script>
		<script type="text/javascript" src="javascript/Bullet-Movement.js"> </script>
		<script type="text/javascript" src="javascript/Ship-Movement.js"> </script>
		<script type="text/javascript" src="javascript/BonusPoint.js"> </script>
		<script type="text/javascript" src="javascript/InterfaceLogin.js"> </script>
		
	</head>
	<body>
		<!-- Faccio il preload delle immagini che utilizzerò all'interno del gioco,per evitare problemi nella loro visualizazzione  -->
		<div id="preload">
			<img src="images/navicella.png" width="1" height="1" alt="Image 01">
   			<img src="images/Explosion.png" width="1" height="1" alt="Image 02">
   			<img src="images/rocket.png" width="1" height="1" alt="Image 03">
   			<img src="images/rocket2.png" width="1" height="1" alt="Image 04">
   			<img src="images/nemico.png" width="1" height="1" alt="Image 05">
   			<img src="images/bonus.png" width="1" height="1" alt="Image 06">
		</div>


		<div id="game">
			<!-- paragrafo contente nome Utente collegato. Viene mostrato a video dopo il login -->
			<p id="namecaptain"> <?php session_start(); if(isset($_SESSION["log"]) && $_SESSION["log"]==0) echo "Captain."."&nbsp;".$_SESSION["user"] ?> </p>
			<a class="smartLink" id="BackToMenu" href="index.php">Back To Menu</a> 
			<div id="game-area">
				<a class="linkgame" id="login" href="javascript:login()">Login</a> <br>
				<a class="linkgame" href="php/Rank.php">Rank </a>	<br>
				<a class="linkgame" href="javascript:information()">Information</a>
				<div id="game-image">
					<!-- la tabella della classifica e la liste delle informazioni vengono inserite in questo div -->
					<img id="indeximage" src="images/Untitled.png" alt="fotoastronave">
				</div>
			</div>
			<div id="game-info">
				<div id="game-life"> <p> Life:  </p> 
					<div class="information"> <p id="life"> 3 </p> </div>
				</div>
				<div id="game-point"><p> Points: </p> 	
					<div class="information"> <p id="score"> 0 </p> </div>
				</div>
				<div id="game-enemy"> <p> Enemies Left:   </p>
					<div class="information"> <p id="enemyleft"> 20 </p> </div>
				</div>
			</div>
		</div>
		
		<!--Dopo aver richiamato il php e dopo esser stata ricaricata questa pagina,veicolo le azioni da fare in base all'evento svolto-->
		<script type="text/javascript">
		<?php
			if(isset($_SESSION["log"])) {
				if($_SESSION["log"]==1) {
					echo "unfoundedUser()";
					unset($_SESSION["log"]);
				}
				else echo"InterfaceStart();";
			}
			if(isset($_SESSION["start"])) {
				if($_SESSION["start"]=="yes") {
					echo "start()";
					unset($_SESSION["start"]);
				}
			}
			if(isset($_SESSION["reg"])){
				if($_SESSION["reg"]==1) {
					echo "alreadyExistUser()";
					unset($_SESSION["reg"]);
				}
				else echo"RegistrationCompleted()";
			};
			if(isset($_SESSION["rank"])) {
				echo "rank(".$_SESSION["rank"].");";
				unset($_SESSION["rank"]);
			}
		?>
		</script>
	</body>
</html>