var GLOBAL_PATH = new Path([]);

setEntries();

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
        success: function (data) {
            setEntries();
        }
    });
});