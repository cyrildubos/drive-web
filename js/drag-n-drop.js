function dragOverHandler(event) {
    event.preventDefault();

    document.getElementById('entries').classList.add('bg-red-200');
}


function dragLeaveHandler(event) {
    event.preventDefault();

    console.log(event)

    document.getElementById('entries').classList.remove('bg-red-200');
}

function dropHandler(ev) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't file_names, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
                var file = ev.dataTransfer.items[i].getAsFile();
                console.log('... file[' + i + '].name = ' + file.name);
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.file_names.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.file_names[i].name);
        }
    }
}