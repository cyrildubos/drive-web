<?php
class _Directory
{
    public string $name;
    public string $size;

    function __construct(string $name, string $size)
    {
        $this->name = $name;
        $this->size = $size;
    }
}
