<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Document</title>

    <link rel="stylesheet" href="css/fileicon.css"> <!-- https://picturepan2.github.io/fileicon.css/ -->

    <script src="https://cdn.tailwindcss.com"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <script src="js/drag-n-drop.js"></script>
    <script src="js/entry.js"></script>
    <script src="js/path.js"></script>
    <script src="js/preview.js"></script>
    <script src="index.js"></script>
</head>

<body class="h-screen truncate">
    <div class="h-full grid grid-cols-2">
        <div id="entries" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);"></div>
        <div id="preview" class="bg-gray-100 flex"></div>
    </div>

    <script>
        var GLOBAL_PATH = new Path([]);

        setEntries();
    </script>
</body>

</html>