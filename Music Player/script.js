const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const cover = document.getElementById('cover-img');
const playerContainer = document.querySelector('.container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistContainer = document.getElementById('playlist');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

// Song Data
const songs = [
    {
        title: 'SoundHelix Song 1',
        artist: 'Artist One',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300'
    },
    {
        title: 'SoundHelix Song 2',
        artist: 'Artist Two',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300'
    },
    {
        title: 'SoundHelix Song 3',
        artist: 'Artist Three',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
    },
    {
        title: 'SoundHelix Song 4',
        artist: 'Artist Four',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        cover: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300'
    },
    {
        title: 'SoundHelix Song 5',
        artist: 'Artist Five',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        cover: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300'
    },
    {
        title: 'SoundHelix Song 6',
        artist: 'Artist Six',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300'
    }
];

// Keep track of songs
let songIndex = 0;
let isPlaying = false;
let lastVolume = 1;

// Build and Render Playlist dynamically
function initPlaylist() {
    playlistContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = `${song.title} - ${song.artist}`;
        li.setAttribute('data-index', index);
        
        // Highlight active track item
        if (index === songIndex) {
            li.classList.add('active');
        }

        // Allow clicking the playlist item to jump to track
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });

        playlistContainer.appendChild(li);
    });
}

// Load Song Details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.url;
    cover.src = song.cover;
    initPlaylist();
}

// Play song
function playSong() {
    isPlaying = true;
    playBtn.innerText = '⏸';
    playerContainer.classList.add('play');
    audio.play();
}

// Pause song
function pauseSong() {
    isPlaying = false;
    playBtn.innerText = '▶';
    playerContainer.classList.remove('play');
    audio.pause();
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change Song Functions
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
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

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Function to format timestamp values (seconds -> mm:ss)
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update Progress Bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    // Calculate percentage completed
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Add matching numerical text formats
    currentTimeEl.innerText = formatTime(currentTime);
    if (duration) {
        durationEl.innerText = formatTime(duration);
    }
}

audio.addEventListener('timeupdate', updateProgress);

let isDragging = false;

// Calculates the new time based on mouse position and updates the UI
function scrub(e) {
    const width = progressContainer.clientWidth;
    
    // Get mouse position relative to the progress container
    const rect = progressContainer.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    
    // Boundary checks (prevent dragging outside the bar boundaries)
    if (clickX < 0) clickX = 0;
    if (clickX > width) clickX = width;
    
    const duration = audio.duration;
    if (duration) {
        // Calculate the target time
        const newTime = (clickX / width) * duration;
        audio.currentTime = newTime;
        
        // Update bar width instantly while dragging
        const progressPercent = (clickX / width) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.innerText = formatTime(newTime);
    }
}

// Mouse down on the progress bar starts the dragging state
progressContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    scrub(e); // Trigger immediately on initial click
});

// Mouse move anywhere on the screen updates the scrubbing position
window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        scrub(e);
    }
});

// Mouse release anywhere on the screen stops the dragging state
window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
    }
});

// Volume Change Logic
function handleVolumeChange(e) {
    const volumeVal = e.target.value;
    audio.volume = volumeVal;

    updateSliderBackground(volumeVal);

    // Update the icon based on volume level
    if (parseFloat(volumeVal) === 0) {
        volumeIcon.innerText = '🔇';
    } else if (volumeVal < 0.33) {
        volumeIcon.innerText = '🔈';
    } else if (volumeVal < 0.66) {
        volumeIcon.innerText = '🔉';
    } else {
        volumeIcon.innerText = '🔊';
    }
}

// Listen for both dragging and releasing
volumeSlider.addEventListener('input', handleVolumeChange);

// Click icon to toggle Mute/Unmute
volumeIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        // Mute it
        lastVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.innerText = '🔇';
    } else {
        // Unmute and restore previous volume level
        audio.volume = lastVolume;
        volumeSlider.value = lastVolume;
        if (lastVolume === 0) {
            volumeIcon.innerText = '🔇';
        } else if (lastVolume < 0.33) {
            volumeIcon.innerText = '🔈';
        } else if (lastVolume < 0.66) {
            volumeIcon.innerText = '🔉';
        } else {
            volumeIcon.innerText = '🔊';
        }
    }
});

function updateSliderBackground(value) {
    // Converts the 0-1 volume scale into a 0-100 percentage
    const percentage = value * 100;
    volumeSlider.style.background = `linear-gradient(to right, #22a8e6 0%, #22a8e6 ${percentage}%, rgba(255, 255, 255, 0.3) ${percentage}%, rgba(255, 255, 255, 0.3) 100%)`;
}

updateSliderBackground(volumeSlider.value);

// Auto-play next song when current one ends
audio.addEventListener('ended', nextSong);

loadSong(songs[songIndex]);