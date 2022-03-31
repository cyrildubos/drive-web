function setPreview(name, type) {
    const PICTURE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
    const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
    const TEXT_TYPES = ['text/plain', 'text/html', 'text/css', 'text/javascript'];

    var preview = document.getElementById('preview');
    preview.innerHTML = "";

    if (PICTURE_TYPES.includes(type)) {
        var img = document.createElement('img');

        img.src = GLOBAL_PATH.next(name).withRoot();
        img.classList.add('m-auto');

        preview.appendChild(img);
    } else if (VIDEO_TYPES.includes(type)) { // TODO: Fix this
        var video = document.createElement('video');

        video.src = GLOBAL_PATH.next(name).withRoot();
        video.control = 'true';
        video.classList.add('w-full');
        video.classList.add('h-full');

        preview.appendChild(video);
    } else if (type == 'application/pdf') {
        var embed = document.createElement('embed');

        embed.src = GLOBAL_PATH.next(name).withRoot();
        embed.type = 'application/pdf';
        embed.classList.add('w-full');
        embed.classList.add('h-full');

        preview.appendChild(embed);
    } else if (TEXT_TYPES.includes(type)) {
        $.ajax({
            url: GLOBAL_PATH.next(name).withRoot(),
            type: 'get',
            dataType: 'text',
            success: function (data) {
                var div = document.createElement('div');

                div.innerHTML = data;
                div.classList.add('m-8');
                div.classList.add('p-4');
                div.classList.add('w-full');
                div.classList.add('bg-white');

                preview.appendChild(div);
            }
        });
    }
}