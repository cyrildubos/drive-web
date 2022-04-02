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
