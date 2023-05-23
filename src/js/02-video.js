import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerIframe = document.getElementById('vimeo-player');
const storageKey = 'videoplayer-current-time';

let vimeoPlayer;

// Ініціалізація плеєра після завантаження сторінки
window.addEventListener('DOMContentLoaded', () => {
  vimeoPlayer = new Player(playerIframe);

  // Відтворення відео збереженого часу після завантаження
  const storedTime = localStorage.getItem(storageKey);
  if (storedTime) {
    vimeoPlayer.setCurrentTime(parseFloat(storedTime));
  }

  // Відстеження події оновлення часу відтворення
  vimeoPlayer.on('timeupdate', throttle(() => {
    const currentTime = vimeoPlayer.currentTime();
    localStorage.setItem(storageKey, currentTime.toFixed(2));
  }, 1000));
})