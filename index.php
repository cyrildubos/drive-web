<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Drive</title>

    <link rel="stylesheet" href="css/fileicon.css"> <!-- https://picturepan2.github.io/fileicon.css/ -->
    <link rel="stylesheet" href="css/tailwind.css">

    <script src="js/jquery.min.js"></script>
    <script src="js/entry.js"></script>
    <script src="js/path.js"></script>
    <script src="js/preview.js"></script>

    <style>
        * {
            user-select: none;
        }
    </style>
</head>

<body class="truncate h-screen">
    <div class="fixed top-0 left-0 right-0 h-16 bg-gray-600 px-4 flex items-center justify-between">
        <div id="breadcrumb" class="font-semibold text-white"></div>
        <div>
            <input class="mx-2 px-2 py-1 rounded" type="text" id="directory-name">
            <button class="px-4 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-full" id="directory-add">Add directory</button>

            <button class="ml-8 px-4 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-full" id="file-upload">Upload file</button>
            <input type="file" id="file-upload-input" class="hidden">
        </div>
    </div>
    <div class="h-full pt-16 flex">
        <div class="grow grid grid-cols-5 w-full">
            <div id="entries" class="col-span-3 overflow-y-scroll" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);"></div>
            <div id="preview" class="col-span-2 bg-gray-100 flex truncate"></div>
        </div>
    </div>

    <script src="index.js"></script>
</body>

</html>