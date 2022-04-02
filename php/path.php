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
