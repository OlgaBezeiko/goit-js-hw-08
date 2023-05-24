import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerIframe = document.getElementById('vimeo-player');
const storageKey = 'videoplayer-current-time';

let vimeoPlayer;

// Ініціалізація плеєра після завантаження сторінки
window.addEventListener('DOMContentLoaded', () => {
  vimeoPlayer = new Player(playerIframe);

  // Отримання збереженого часу відтворення з локального сховища
  const storedTime = localStorage.getItem(storageKey);
  
  // Перевірка наявності збереженого часу та встановлення його в плеєр
  if (storedTime !== null) {
    vimeoPlayer.setCurrentTime(parseFloat(storedTime)).catch(error => {
      console.error('Failed to set currentTime:', error);
    });
  }

  // Відстеження події оновлення часу відтворення
  vimeoPlayer.on('timeupdate', throttle(() => {
    vimeoPlayer.getCurrentTime().then(currentTime => {
      localStorage.setItem(storageKey, currentTime.toFixed(2));
    }).catch(error => {
      console.error('Failed to get currentTime:', error);
    });
  }, 1000));
});
