// Singleton audio player
const audioPlayer = (() => {
    let instance = null;

    const createOrGetAudio = (url) => {
        if (!instance) {
            instance = new Audio(url);
            instance.loop = true;
            instance.volume = 1.0;
            instance.muted = true; // Start muted to allow autoplay
            instance.play().catch((err) => {
                console.log("Autoplay blocked:", err);
            });
        }
        if (instance.src !== url) {
            instance.src = url; // Update the source if it changes
            instance.load();    // Reload if the URL changes
        }
        return instance;
    };

    return {
        play: (url) => {
            const audio = createOrGetAudio(url);
            audio.muted = false; // Unmute on user interaction
            audio.play();
        },
        pause: () => {
            if (instance) {
                instance.pause();
            }
        },
    };
})();

// Button click handler
function togglePlay(button) {
    const audioUrl = button.getAttribute('data-url');
    const isPlaying = button.getAttribute('data-status') === 'true'; // Read the status

    if (isPlaying) {
        // Pause the audio
        audioPlayer.pause();
        button.setAttribute('data-status', 'false');
        button.innerHTML = '<i class="fa-solid fa-circle-play"></i>'; // Update icon to "play"
    } else {
        // Play the audio
        audioPlayer.play(audioUrl);
        button.setAttribute('data-status', 'true');
        button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // Update icon to "pause"
    }
}

// Autoplay on page load (muted initially)
window.addEventListener('load', () => {
    const button = document.getElementById('tombol-musik');
    const audioUrl = button.getAttribute('data-url');
    audioPlayer.play(audioUrl); // Start autoplay muted
    button.setAttribute('data-status', 'true');
    button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // Update icon to "pause"
});

document.addEventListener('reload', () => {
    const button = document.getElementById('tombol-musik');
    const audioUrl = button.getAttribute('data-url');
    audioPlayer.play(audioUrl); // Start autoplay muted
    button.setAttribute('data-status', 'true');
    button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // Update icon to "pause"
});
