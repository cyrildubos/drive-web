<?php
if (isset($_POST['path']) && isset($_FILES['file'])) {
    $uploadfile = $_POST['path'] . "/" . basename($_FILES['file']['name']);

    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
        echo "File is valid, and was successfully uploaded.\n";
    } else {
        echo "Possible file upload attack!\n";
    }
}
