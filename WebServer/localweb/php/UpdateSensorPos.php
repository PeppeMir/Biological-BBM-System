<?php

$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());

mysqli_query($connection, "UPDATE sensors SET X = '" . $_POST['SensorPosX'] . "', Y = '" . $_POST['SensorPosY'] . "' WHERE sensorID = '" . $_POST['sensorID'] . "'");

mysqli_close($connection);

?>
