function setPreview(name, type) {
    var preview = document.getElementById('preview');
    preview.innerHTML = "";

    if (type.startsWith('image/')) {
        var img = document.createElement('img');

        img.src = GLOBAL_PATH.next(name).withRoot();
        img.classList.add('object-contain');
        img.classList.add('m-auto');

        preview.appendChild(img);
    } else if (type.startsWith('video/')) {
        var source = document.createElement('source');
        source.src = GLOBAL_PATH.next(name).withRoot();
        source.type = type;

        var video = document.createElement('video');
        video.classList.add('bg-black');
        video.classList.add('w-full');
        video.classList.add('h-full');
        video.controls = 'controls';
        video.autoplay = 'true';
        video.appendChild(source);


        preview.appendChild(video);
    } else if (type.startsWith('audio/')) {
        var source = document.createElement('source');
        source.src = GLOBAL_PATH.next(name).withRoot();
        source.type = type;

        var audio = document.createElement('audio');
        audio.classList.add('m-auto');
        audio.controls = 'controls';
        audio.autoplay = 'true';
        audio.appendChild(source);

        preview.appendChild(audio);
    } else if (type.startsWith('text/')) {
        $.ajax({
            url: GLOBAL_PATH.next(name).withRoot(),
            type: 'get',
            dataType: 'text',
            success: function (data) {
                var div = document.createElement('div');

                div.innerHTML = data;
                div.classList.add('p-4');
                div.classList.add('w-full');

                preview.appendChild(div);
            }
        });
    } else if (type == 'application/pdf') {
        var embed = document.createElement('embed');

        embed.src = GLOBAL_PATH.next(name).withRoot();
        embed.type = 'application/pdf';
        embed.classList.add('w-full');
        embed.classList.add('h-full');

        preview.appendChild(embed);
    }
}