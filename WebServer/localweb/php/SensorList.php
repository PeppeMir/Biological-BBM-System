<?php

$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());
$result = mysqli_query($connection, "SELECT * FROM sensors");
$numOfRows = mysqli_num_rows($result);

if ($numOfRows == 0)
{
	echo "";
}
else
{
	while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) 
	{
		echo $row['sensorID'] . "," . $row['X'] . "," . $row['Y'] ."," . $row['current_voltage'] ."," . $row['state_ok'] . "\n";
	}
}
	
mysqli_close($connection);

?>
