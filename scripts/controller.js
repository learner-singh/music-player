import { ajax } from "./ajax.js";

window.addEventListener('load', bindEvents);

function bindEvents() {
    document.getElementById('search-btn')
        .addEventListener('click', searchIt);
}

function searchIt() {
    const singerName = document.getElementById('search-box').value;
    ajax(singerName, printSongs);
}

function printSongs(json) {
    document.getElementById('songs').innerHTML=""
    console.log("Print Songs JSON Recieved", json);
    const obj = JSON.parse(json);
    console.log("Object recieved..", obj);
    const songs = obj['results'];
    songs.forEach(song => {
        songCard(song);
    });
}

function songCard(song) {
    //     <div class="card" style="width: 18rem;">
    //   <img src="..." class="card-img-top" alt="...">
    //   <div class="card-body">
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //   </div>
    // </div>
    const cardDiv = document.createElement('div');
    cardDiv.className = "card col-md-4 mt-3";
    cardDiv.style.width = '18rem';
    const image = document.createElement('img');
    image.src = song['artworkUrl100'];
    cardDiv.appendChild(image);
    document.getElementById('songs').appendChild(cardDiv);
    //Audio Player
    const cardBody = createAudioTag(song['previewUrl'])
    cardDiv.appendChild(cardBody);

}

function createAudioTag(url) {
    const divBody = document.createElement('div');
    divBody.className = "card-body";
    const audio = document.createElement('audio');
    audio.controls = false;
    audio.src = url;
    audio.className = 'w-100';
    divBody.appendChild(audio);
    const playBtn = panel();
    divBody.appendChild(playBtn);

    return divBody; 
}

function panel() {
    const button = document.createElement('button');
    button.className = 'btn btn-success fa-solid fa-play';
    button.addEventListener('click', playPauseSong);
    return button;
}

let isPlaying = false;
let prevSong = null;
function playPauseSong() {
    console.log('what is this..', this, this.previousSibling);
    const audio = this.previousSibling;
    let className = '';
    // If Previous Song is Playing
    if(prevSong != audio) {   
        if(prevSong && prevSong.currentTime>0) {
            prevSong.pause();
            prevSong.currentTime = 0;
            isPlaying = false;
            prevSong.nextSibling.className = 'btn btn-success fa-solid fa-play';
        }
    }
    // For Current Song
    if (isPlaying) {
        audio.pause();
        className = 'btn btn-success fa-solid fa-play';
    }
    else {
        audio.play();
        className = 'btn btn-success fa-solid fa-pause';
        prevSong = audio;
        audio.addEventListener('ended', () => { // For Changing pause button into play when song is finished.
            console.log("ended called")
            audio.nextSibling.className = 'btn btn-success fa-solid fa-play';
        })
    }
    audio.nextSibling.className = className;
    isPlaying = !isPlaying;
}