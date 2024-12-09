let audioPlayed = false; // Biến để kiểm tra xem âm thanh đã được phát chưa
const audioPlayer = (() => {
    let instance = null;
    const createOrGetAudio = (url) => {
        if (!instance) {
            instance = new Audio(url);
            instance.loop = true;
            instance.volume = 1.0;
        }
        return instance;
    };
    return {
        play: (url) => {
            const audio = createOrGetAudio(url);
            audio.play().catch((err) => {
                console.log("Play failed:", err);
            });
        },
        pause: () => {
            if (instance) {
                instance.pause();
            }
        },
    };
})();

function togglePlay(button) {
    const isPlaying = button.getAttribute('data-status') === 'true';
    if (isPlaying) { // Pause the audio
        audioPlayer.pause();
        button.setAttribute('data-status', 'false');
        button.innerHTML = '<i class="fa-solid fa-circle-play"></i>'; // Update icon to "play"
    } else { // Play the audio const
        audioUrl = 'music/Just-Say-Hello.mp3';
        audioPlayer.play(audioUrl);
        button.setAttribute('data-status', 'true');
        button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // Update icon to "pause"
    }
}

window.addEventListener('scroll', () => {
    const button = document.getElementById('tombol-musik');
    if (!audioPlayed) { // Chỉ phát nhạc lần đầu tiên khi cuộn
        const audioUrl = 'music/Just-Say-Hello.mp3';
        audioPlayer.play(audioUrl);
        audioPlayed = true; // Đánh dấu rằng âm thanh đã được phát
        button.setAttribute('data-status', 'true');
        button.innerHTML = '<i class=\"fa-solid fa-circle-pause\"></i>'; // Update icon to
    }
});

function handleInteraction() {
    const button = document.getElementById('tombol-musik');
    if (!button) {
        console.error("Button element not found!");
        return; // Stop execution if the button doesn't exist
    }
    if (!audioPlayed) { // Chỉ phát nhạc lần đầu tiên hoặc nếu đang tạm dừng
        const audioUrl = 'music/Just-Say-Hello.mp3';
        audioPlayer.play(audioUrl);
        button.setAttribute('data-status', 'true');
        button.innerHTML = '<i class=\"fa-solid fa-circle-pause\"></i>'; // Update icon to
        audioPlayed = true; // Đánh dấu rằng âm thanh đã được phát
    }
}

window.addEventListener('touchstart', handleInteraction);
window.addEventListener('error', (event) => {
    if (event.message.includes('Loading chunk')) {
        console.error('Chunk load error:', event.message);
    }
});

$(document).ready(function() {
    // Kích hoạt lightbox
    $('.image-lightbox').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true // Bật chế độ gallery (nhiều ảnh)
        },
        mainClass: 'mfp-fade', // Hiệu ứng chuyển động
        removalDelay: 300, // Độ trễ khi đóng lightbox
        zoom: {
            enabled: true, // Zoom ảnh
            duration: 300 // Thời gian zoom
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('tombol-musik');
    const audioUrl = 'music/Just-Say-Hello.mp3';
    const audioPlayer = new Audio(audioUrl);
    let isPlaying = false;

    // Phát nhạc ngay khi trang tải xong
    audioPlayer.play().then(() => {
        isPlaying = true; // Đánh dấu trạng thái nhạc đang phát
        button.setAttribute('data-status', 'true');
        button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // Update icon
    }).catch((error) => {
        console.error('Autoplay bị chặn:', error);
    });

    // Toggle nhạc khi nhấn nút
    button.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            button.setAttribute('data-status', 'false');
            button.innerHTML = '<i class="fa-solid fa-circle-play"></i>'; // Update icon
        } else {
            audioPlayer.play();
            isPlaying = true;
            button.setAttribute('data-status', 'true');
            button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // Update icon
        }
    });
});



