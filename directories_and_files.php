<?php
require_once "php/directory.php";
require_once "php/file.php";
require_once "php/path.php";

$path = Path::get();

$names = scandir($path->with_root());

unset($names[0]); // remove "." directory

if ($path->is_root()) // if the path is the root path...
    unset($names[1]); // ...remove ".." directory


list($directories, $files) = array(array(), array());

foreach ($names as $name)
    is_dir($path->next($name)->with_root())
        ? array_push($directories, new _Directory($name, count(glob($path->next($name)->with_root()->__toString() . "/*"))))
        : array_push($files, new File($name, mime_content_type($path->next($name)->with_root()->__toString())));

print(json_encode(array("directories" => $directories, "files" => $files)));
