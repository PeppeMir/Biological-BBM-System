<?php

$connection = mysqli_connect("localhost","root","","biologicaldb") or die("DB connection failed: " . mysql_error());
mysqli_query($connection, "UPDATE sensors SET state_ok = '1' WHERE 1");
mysqli_close($connection);
echo "ok";

?>