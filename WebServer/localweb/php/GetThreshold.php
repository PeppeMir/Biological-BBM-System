<?php

$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());
$result = mysqli_query($connection, "SELECT * FROM threshold");

while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) 
{
	echo $row['t_min'] . "," . $row['t_max'] . "," . $row['h_min'] ."," . $row['h_max'] . "\n";
}
	
mysqli_close($connection);

?>
