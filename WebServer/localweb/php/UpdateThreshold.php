<?php

$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());

mysqli_query($connection, "UPDATE threshold SET t_min = '" . $_POST['t_min'] . "', t_max = '" . $_POST['t_max'] ."',h_min = '" . $_POST['h_min'] . "', h_max = '" . $_POST['h_max'] . "' WHERE '1'");

mysqli_close($connection);

?>
