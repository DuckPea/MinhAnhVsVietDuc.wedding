
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

function togglePlay(button) {
    const audioUrl = button.getAttribute('data-url');
    const status = button.getAttribute('data-status') === 'true';
    const tooltip = document.getElementById('music-tooltip');

    // Tạo đối tượng âm thanh nếu cần
    let audioPlayer = window.audioPlayer || new Audio(audioUrl);
    window.audioPlayer = audioPlayer;

    if (status) {
        // Nếu đang phát, tạm dừng
        audioPlayer.pause();
        button.setAttribute('data-status', 'false');
        button.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    } else {
        // Nếu đang tạm dừng, phát nhạc
        audioPlayer.play().then(() => {
            button.setAttribute('data-status', 'true');
            button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
            // Ẩn tooltip sau khi phát nhạc
            tooltip.classList.add('hidden');
        }).catch((error) => {
            console.error('Lỗi phát nhạc:', error);
        });
    }
}

