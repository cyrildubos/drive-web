
function createDirectoyEntry(name) {
    var entry = document.createElement('div');
    entry.classList.add('directory-entry');
    entry.classList.add('flex');
    entry.classList.add('items-center');
    entry.classList.add('justify-between');
    entry.classList.add('hover:bg-gray-100');
    entry.classList.add('active:bg-gray-200');
    entry.dataset.name = name;

    var fileIcon = document.createElement('div');
    fileIcon.classList.add('file-icon');
    fileIcon.classList.add('m-4');

    var fileName = document.createElement('span');
    fileName.innerText = name;

    var left = document.createElement('div');
    left.classList.add('flex');
    left.classList.add('items-center');
    left.appendChild(fileIcon);
    left.appendChild(fileName);

    var right = document.createElement('div');
    right.classList.add('m-4');
    right.innerText = 999 + ' files';

    entry.appendChild(left);
    entry.appendChild(right);

    return entry;
}

function createFileEntry(name, type) {
    var entry = document.createElement('div');
    entry.classList.add('file-entry');
    entry.classList.add('flex');
    entry.classList.add('justify-between');
    entry.classList.add('hover:bg-gray-100');
    entry.classList.add('active:bg-gray-200');
    entry.dataset.name = name;
    entry.dataset.type = type;

    var fileIcon = document.createElement('div');
    fileIcon.classList.add('file-icon');
    fileIcon.classList.add('m-4');
    fileIcon.dataset.type = type.split('/')[1];

    var fileName = document.createElement('span');
    fileName.innerText = name;

    var left = document.createElement('div');
    left.classList.add('flex');
    left.classList.add('items-center');
    left.appendChild(fileIcon);
    left.appendChild(fileName);

    var download = document.createElement('button');
    download.classList.add('rounded-full');
    download.classList.add('bg-green-600/75');
    download.classList.add('text-white');
    download.classList.add('m-2');
    download.classList.add('p-2');
    download.innerText = 'Download';

    var remove = document.createElement('button');
    remove.classList.add('rounded-full');
    remove.classList.add('bg-red-600/75');
    remove.classList.add('text-white');
    remove.classList.add('m-2');
    remove.classList.add('p-2');
    remove.innerText = 'Remove';

    var right = document.createElement('div');
    right.classList.add('flex');
    right.classList.add('items-center');
    right.appendChild(download);
    right.appendChild(remove);

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
            event.preventDefault();

            var name = event.currentTarget.dataset.name;
            var type = event.currentTarget.dataset.type;

            setPreview(name, type);
        });
}

function setEntries() {
    $.ajax({
        url: 'json.php',
        type: 'get',
        dataType: 'json',
        data: {
            'path': GLOBAL_PATH.toString()
        },
        success: function (data) {
            console.log(data);

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
        },
        error: function (data) {
            console.log(data);
        }
    });
}