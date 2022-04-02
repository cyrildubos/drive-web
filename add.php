<?php
if (isset($_GET['path'])) {
    $path = $_GET['path'];

    if (!is_file($path) && !is_dir($path))
        mkdir($path);
}
