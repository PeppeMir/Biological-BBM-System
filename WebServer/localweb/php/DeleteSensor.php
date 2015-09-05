<?php

$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());

mysqli_query($connection,"DELETE FROM log WHERE sensorID='" . $_POST['sensorID'] . "'");
mysqli_query($connection,"DELETE FROM sensors WHERE sensorID='" . $_POST['sensorID'] . "'");

mysqli_close($connection);

echo "Delete ok";
?>
