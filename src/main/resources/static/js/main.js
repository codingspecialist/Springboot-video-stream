var videoPlayer = document.getElementById('videoPlayer');

videoPlayer.addEventListener('click', function () {
    if (videoPlayer.paused == false) {
        videoPlayer.pause();
        videoPlayer.firstChild.nodeValue = 'Play';
    } else {
        videoPlayer.play();
        videoPlayer.firstChild.nodeValue = 'Pause';
    }
});


// Call the webservices to load the playlist

var loadPlayList = function () {
    fetch('js/videos.json').then(function (response) {

        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    }).then(function (playListData) {
        var msg = document.getElementById('message');
        msg.textContent = ''

        for (var i = 0; i < playListData.length; i++) {
            var listItem = document.createElement('div');
            listItem.setAttribute('class', 'playlistItem');
            listItem.textContent = playListData[i].name;
            listItem.setAttribute('videoUrl', playListData[i].videoUrl);
            listItem.setAttribute('mime_type', playListData[i].mime_type);
            listItem.setAttribute('onClick', 'myfunc(this,true)');
            document.getElementById('playlist').appendChild(listItem);
            if (i == 0) {
                var videoPlayer = document.querySelector('video');
                videoPlayer.src = playListData[i].videoUrl;
                videoPlayer.type = playListData[i].mime_type;
                videoPlayer.setAttribute('filename', playListData[i].name)
                videoPlayer.poster = "";
                listItem.className += ' selected';
                videoPlayer.load();

            }

        }

    }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        var msg = document.getElementById('message');
        msg.textContent = 'Something went wrong'
    });

};

loadPlayList();

function myfunc(selectedVideo, autoPlay) {
    var active = document.querySelector(".selected");
    active.classList.remove("selected");
    var videoPlayer = document.querySelector('video');
    if (!videoPlayer.paused && !videoPlayer.ended) { videoPlayer.pause(); }
    videoPlayer.src = selectedVideo.getAttribute('videoUrl');
    selectedVideo.className += ' selected';

    videoPlayer.type = selectedVideo.getAttribute('mime_type');
    document.getElementById('selectedFile').textContent = selectedVideo.textContent;

    if (autoPlay && !videoPlayer.play()) {
        videoPlayer.play();
    }

}