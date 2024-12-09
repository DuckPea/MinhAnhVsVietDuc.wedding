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
           if (!audioPlayed) { // Chỉ phát nhạc lần đầu tiên khi cuộn 
               const audioUrl = 'music/Just-Say-Hello.mp3';
               audioPlayer.play(audioUrl);
               audioPlayed = true; // Đánh dấu rằng âm thanh đã được phát 
               document.getElementById('toggle-music').setAttribute('data-status', 'true');
               document.getElementById('toggle-music').innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
           }
       });
function handleInteraction() {
           const button = document.getElementById('toggle-music');
           if (!audioPlayed) { // Chỉ phát nhạc lần đầu tiên hoặc nếu đang tạm dừng 
               const audioUrl = 'music/Just-Say-Hello.mp3';
               audioPlayer.play(audioUrl);
               button.setAttribute('data-status', 'true');
               button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>'; // Update icon to "pause" 
               audioPlayed = true; // Đánh dấu rằng âm thanh đã được phát 
           }
       }
       window.addEventListener('touchstart', handleInteraction);
