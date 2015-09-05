<?php
	$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());

	// perform select on sensorID
	$result = mysqli_query($connection, "SELECT * FROM log WHERE sensorID = '" . $_POST['sensorID'] . "' ORDER BY timestamp");
	$numOfRows = mysqli_num_rows($result);
	$rowRequested = $_POST['requestedNumOfRows'];
	$rowValidator = 0;
	
	if ($numOfRows == 0)
	{
		echo "";
	}
	else
	{
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) 
		{
			if ($rowRequested >= $numOfRows || (($numOfRows - $rowValidator) <= $rowRequested))
				echo $row['sensorID'] . "," . $row['timestamp'] . "," . $row['temperature'] . "," . $row['humidity'] . "," . $row['voltage'] . "\n";
			else
				$rowValidator++;
		}
	}
	
	mysqli_close($connection);
?>
