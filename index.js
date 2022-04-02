var GLOBAL_PATH = new Path([]);

setEntries();

// Add directory

document.getElementById('directory-add').addEventListener('click', function (event) {
    event.preventDefault();

    var name = document.getElementById('directory-name').value;

    if (name == '') return;

    $.ajax({
        url: 'add.php',
        type: 'GET',
        data: {
            path: GLOBAL_PATH.next(name).withRoot().toString()

        },
        success: function () {
            setEntries();

            document.getElementById('directory-name').value = '';
        }
    });
});

// Upload file

document.getElementById('file-upload').addEventListener('click', function () {
    document.getElementById('file-upload-input').click();
});

document.getElementById('file-upload-input').addEventListener("change", () => {
    if (document.getElementById('file-upload-input').files.length) {
        var formData = new FormData();
        formData.append('file', document.getElementById('file-upload-input').files[0]);
        formData.append('path', GLOBAL_PATH.withRoot().toString());

        var request = new XMLHttpRequest();
        request.open("POST", "upload.php", true);

        request.onload = function (event) {
            if (request.status == 200) {
                setEntries();

                document.getElementById('file-upload-input').value = '';
            }
        }

        request.send(formData);
    }
});

