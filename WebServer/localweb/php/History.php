<?php
	$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());

	// perform select on sensorID
	echo "<p><b>History:</b></p>";
	
	$result = mysqli_query($connection, "SELECT * FROM log ORDER BY timestamp DESC");
	$r = mysqli_query($connection, "SELECT * FROM threshold");
	$thresholds = mysqli_fetch_array($r, MYSQL_ASSOC);
	
	while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) 
	{
			if ($row['temperature'] < $thresholds['t_min'] || $row['temperature'] > $thresholds['t_max'] || $row['humidity'] < $thresholds['h_min'] || $row['humidity'] > $thresholds['h_max'])
				echo "<p class = 'history terror'>";
			else
				echo "<p class = 'history'>";
			
			echo "Date: " . $row['timestamp'] . ", Sensor ID: " . $row['sensorID'] . ", Temperature: " . $row['temperature'] . "°C, Humidity: " . $row['humidity'] . "%</p>";	
	}
		
	mysqli_close($connection);
?>
