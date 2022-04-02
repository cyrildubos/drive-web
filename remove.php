<?php
if (isset($_GET['path'])) {
	$path = $_GET['path'];

	if (is_file($path)) unlink($path);
	else if (is_dir($path)) rmdir($path);
}
