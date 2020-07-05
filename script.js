const musicContainer = document.getElementById('music-container');

const playButton = document.getElementById('play');
const previousButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Store song titles
const songs = ['hey','summer','ukulele'];

// Keep track of song
let songIndex = 2;

// Load song details into DOM initially
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpg`;
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.add('fa-play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause(); 
}

function playSong() {
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function previousSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(event) {
    const {duration,currentTime} = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners

playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

previousButton.addEventListener('click', previousSong);

nextButton.addEventListener('click', nextSong);

audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);