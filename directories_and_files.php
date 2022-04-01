<?php
class Path
{
    private static array $ROOT_PATH = array("drive");

    private array $path;


    function __construct(array $path)
    {
        $this->path = $path;
    }

    static function get(): Path
    {
        return new Path(isset($_GET["path"]) && $_GET["path"] != "" ? explode("/", $_GET["path"]) : array());
    }


    function with_root()
    {
        return new Path(array_merge(Path::$ROOT_PATH, $this->path));
    }

    function is_root(): bool
    {
        return $this->path == array() || $this->path == Path::$ROOT_PATH;
    }

    function next(string $path)
    {
        return new Path(array_merge($this->path, array($path)));
    }

    function previous()
    {
        $path = array_merge($this->path);

        unset($path[count($path) - 1]);

        return new Path($path);
    }

    function __toString()
    {
        return implode("/", $this->path);
    }
}
?>

<?php
class File
{
    public string $name;
    public string $type;

    function __construct(string $name, string $type)
    {
        $this->name = $name;
        $this->type = $type;
    }
}
?>

<?php
function separate_names(Path $path, array $names): array
{
    list($directories, $files) = array(array(), array());

    foreach ($names as $name)
        is_dir($path->next($name)->with_root())
            ? array_push($directories, $name)
            : array_push($files, new File($name, mime_content_type($path->next($name)->with_root()->__toString())));

    return array("directories" => $directories, "files" => $files);
}

$path = Path::get();

$names = scandir($path->with_root());

unset($names[0]); // remove "." directory

if ($path->is_root()) // if the path is the root path...
    unset($names[1]); // ...remove ".." directory

print(json_encode(separate_names($path, $names)));
