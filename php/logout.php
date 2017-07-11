<?php
//gestisce il logout dalla sessione
session_start();
unset($_SESSION["log"]);
unset($_SESSION["reg"]);
unset($_SESSION["user"]);
unset($_SESSION["start"]);
header("Location: ../index.php");
?>