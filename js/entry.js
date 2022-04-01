
function createDirectoyEntry(name) {
    // file icon element
    var fileIcon = document.createElement('div');
    fileIcon.classList.add('file-icon');
    fileIcon.classList.add('m-4');

    // file name element
    var fileName = document.createElement('span');
    fileName.innerText = name;

    // left element
    var left = document.createElement('div');
    left.classList.add('flex');
    left.classList.add('items-center');
    left.appendChild(fileIcon);
    left.appendChild(fileName);


    $.ajax({
        url: 'directories_and_files.php',
        type: 'get',
        dataType: 'json',
        data: {
            'path': GLOBAL_PATH.next(name).toString()
        },
        success: function (data) {
            var length = data['directories'].length + data['files'].length - 1;

            if (GLOBAL_PATH.next(name).toString() == "") length--;

            files.innerText = length + ' file(s)';
        }
    });

    // files element
    var files = document.createElement('div');
    files.classList.add('rounded-full');
    files.classList.add('bg-gray-500/75');
    files.classList.add('text-white');
    files.classList.add('m-2');
    files.classList.add('p-2');


    // remove button
    var remove = document.createElement('button');
    remove.classList.add('rounded-full');
    remove.classList.add('bg-red-700/75');
    remove.classList.add('hover:bg-red-700');
    remove.classList.add('text-white');
    remove.classList.add('m-2');
    remove.classList.add('p-2');
    remove.innerText = 'Remove';

    remove.addEventListener('click', function (event) {
        event.preventDefault();

        console.log('remove');

        // TODO: ajax call to remove file (remove.php)
    });

    // right element
    var right = document.createElement('div');
    right.classList.add('flex');
    right.classList.add('items-center');
    right.classList.add('mr-2');
    right.appendChild(files);
    right.appendChild(remove);

    // entry element
    var entry = document.createElement('div');
    entry.classList.add('directory-entry');
    entry.classList.add('flex');
    entry.classList.add('items-center');
    entry.classList.add('justify-between');
    entry.classList.add('hover:bg-gray-200/50');
    entry.classList.add('active:bg-gray-200');
    entry.dataset.name = name;
    entry.appendChild(left);
    entry.appendChild(right);

    return entry;
}

function createFileEntry(name, type) {
    // file icon element
    var fileIcon = document.createElement('div');
    fileIcon.classList.add('file-icon');
    fileIcon.classList.add('m-4');
    fileIcon.dataset.type = type.split('/')[1];

    // file name element
    var fileName = document.createElement('span');
    fileName.innerText = name;

    // left element
    var left = document.createElement('div');
    left.classList.add('flex');
    left.classList.add('items-center');
    left.appendChild(fileIcon);
    left.appendChild(fileName);

    // download button
    var download = document.createElement('a');
    download.classList.add('rounded-full');
    download.classList.add('bg-green-700/75');
    download.classList.add('hover:bg-green-700');
    download.classList.add('text-white');
    download.classList.add('m-2');
    download.classList.add('p-2');
    download.innerText = 'Download';
    download.href = GLOBAL_PATH.next(name).withRoot().toString();
    download.download = name;

    // revmove button
    var remove = document.createElement('button');
    remove.classList.add('rounded-full');
    remove.classList.add('bg-red-700/75');
    remove.classList.add('hover:bg-red-700');
    remove.classList.add('text-white');
    remove.classList.add('m-2');
    remove.classList.add('p-2');
    remove.innerText = 'Remove';

    remove.addEventListener('click', function (event) {
        event.preventDefault();

        console.log('remove');

        // TODO: ajax call to remove file (remove.php)
    })

    // right element
    var right = document.createElement('div');
    right.classList.add('flex');
    right.classList.add('items-center');
    right.classList.add('mr-2');
    right.appendChild(download);
    right.appendChild(remove);

    // entry element
    var entry = document.createElement('div');
    entry.classList.add('file-entry');
    entry.classList.add('flex');
    entry.classList.add('justify-between');
    entry.classList.add('hover:bg-gray-200/50');
    entry.classList.add('active:bg-gray-200');
    entry.dataset.name = name;
    entry.dataset.type = type;
    entry.appendChild(left);
    entry.appendChild(right);

    return entry;
}

function activateDirectoryEntries() {
    for (var directoryEntry of document.getElementsByClassName('directory-entry'))
        directoryEntry.addEventListener('click', function (event) {
            event.preventDefault();

            var name = event.currentTarget.dataset.name;

            if (name == '..')
                GLOBAL_PATH = GLOBAL_PATH.previous();
            else
                GLOBAL_PATH = GLOBAL_PATH.next(name);

            setEntries();
        })
}

function activateFileEntries() {
    for (var fileEntry of document.getElementsByClassName('file-entry'))
        fileEntry.addEventListener('click', function (event) {
            // event.preventDefault();

            var name = event.currentTarget.dataset.name;
            var type = event.currentTarget.dataset.type;

            setPreview(name, type);
        });
}

function setEntries() {
    $.ajax({
        url: 'directories_and_files.php',
        type: 'get',
        dataType: 'json',
        data: {
            'path': GLOBAL_PATH.toString()
        },
        success: function (data) {
            setPreview('', '');

            var entries = document.getElementById('entries');
            entries.innerHTML = '';

            data['directories'].forEach(directory => {
                entries.appendChild(createDirectoyEntry(directory));
            });

            data['files'].forEach(file => {
                entries.appendChild(createFileEntry(file['name'], file['type']));
            });

            activateDirectoryEntries();
            activateFileEntries();

            var breadcrumb = document.getElementById('breadcrumb');
            breadcrumb.innerHTML = GLOBAL_PATH.toFormatedString();
        }
    });
}