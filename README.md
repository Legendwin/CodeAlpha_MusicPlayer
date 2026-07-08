# CodeAlpha_MusicPlayer

A modern, interactive music player web application built with vanilla HTML, CSS, and JavaScript. Features a sleek glassmorphism design with full playback controls, a dynamic playlist queue, and volume management.

## 🎵 Features

- **Play/Pause Controls** - Start and pause music playback with a single click
- **Next/Previous Navigation** - Easily skip between songs in your playlist
- **Progress Bar** - Visual representation of song progress with click-to-seek functionality
- **Time Display** - Current playback time and total song duration
- **Volume Control** - Adjustable volume slider with mute/unmute icon
- **Dynamic Playlist** - Queue display showing all available songs
- **Album Art** - Beautiful album cover images for each track
- **Song Details** - Display song title and artist information
- **Responsive Design** - Modern glassmorphism UI with gradient background
- **Interactive Queue** - Click any song in the playlist to jump to it

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and audio element
- **CSS3** - Gradient backgrounds, flexbox layout, animations, and glassmorphism effects
- **JavaScript** - Event handling, DOM manipulation, and audio control logic

## 📁 Project Structure

```
CodeAlpha_MusicPlayer/
├── README.md                 # Project documentation
└── Music Player/
    ├── index.html           # Main HTML file with player UI
    ├── style.css            # Styling and layout
    └── script.js            # JavaScript functionality
```

## 🚀 Getting Started

### Usage

- **Play/Pause**: Click the play button (▶) to start or pause playback
- **Navigate Songs**: Use ◀◀ and ▶▶ buttons to go to previous/next track
- **Seek**: Click anywhere on the progress bar to jump to that position
- **Adjust Volume**: Use the volume slider to control audio level
- **Select from Queue**: Click any song in the playlist queue to play it immediately

## 🎨 Features Breakdown

### Player Controls
The player includes three main control buttons:
- **Previous (◀◀)** - Jump to the previous song
- **Play (▶/⏸)** - Toggle between play and pause states
- **Next (▶▶)** - Skip to the next song

### Progress Tracking
- Interactive progress bar shows current playback position
- Hover over the progress bar to see the seekable thumb
- Click to jump to any position in the song
- Time display shows current time and total duration

### Volume Management
- Slider-based volume control (0-100%)
- Dynamic volume icon updates with volume level
- Remembers last volume level before mute

### Dynamic Playlist
- Automatically generated from the songs array
- Current playing song is highlighted with `.active` class
- Click any playlist item to immediately switch to that track

## 🎵 Sample Songs

The player comes pre-loaded with 6 sample songs from SoundHelix with various album artwork:
1. SoundHelix Song 1 - Artist One
2. SoundHelix Song 2 - Artist Two
3. SoundHelix Song 3 - Artist Three
4. SoundHelix Song 4 - Artist Four
5. SoundHelix Song 5 - Artist Five
6. SoundHelix Song 6 - Artist Six

## 📱 Browser Compatibility

Works on all modern browsers that support:
- HTML5 Audio Element
- CSS3 Flexbox and Gradients
- ES6 JavaScript

Tested on:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## 👨‍💻 Author

**Legendwin**

**Enjoy your music! 🎵**