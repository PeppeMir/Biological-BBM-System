<?php

$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());

// perform select for checking the existence of the sensorID and, if does not existsm insert it
$result = mysqli_query($connection, "SELECT * FROM sensors WHERE sensorID = '" . $_POST['id'] . "'");
$r = mysqli_query($connection, "SELECT * FROM threshold");
$thresholds = mysqli_fetch_array($r, MYSQL_ASSOC);
if (mysqli_num_rows($result) == 0)
{
	mysqli_query($connection, "INSERT INTO sensors (sensorID,X,Y,current_voltage) VALUES('" . $_POST['id'] . "',NULL,NULL,'" . $_POST['voltage'] . "')");
}
else
{
	mysqli_query($connection, "UPDATE sensors SET current_voltage = '" . $_POST['voltage'] . "' WHERE sensorID = '" . $_POST['id'] . "'");
}

// insert received values into log table
mysqli_query($connection, "INSERT INTO Log (sensorID,timestamp,temperature,humidity,voltage) VALUES 
('" . $_POST['id'] . "','" . $_POST['timestamp'] . "','" . $_POST['temperature'] . "','" . $_POST['humidity'] . "','" . $_POST['voltage'] . "')");

if ($_POST['temperature'] < $thresholds['t_min'] || $_POST['temperature'] > $thresholds['t_max'] || $_POST['humidity'] < $thresholds['h_min'] || $_POST['humidity'] > $thresholds['h_max'])
{
				mysqli_query($connection, "UPDATE sensors SET state_ok = '0' WHERE sensorID='". $_POST['id']. "'");
}

mysqli_close($connection);


?>
