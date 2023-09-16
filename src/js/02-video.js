import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe, {
  id: 'vimeo-player',
});

function savePlaybackTime() {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem('videoplayer-current-time', currentTime);
  });
}

function restorePlaybackTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    player.setCurrentTime(savedTime);
  }
}

player.on('timeupdate', throttle(savePlaybackTime, 1000));

player.on('ended', () => {
  player.setCurrentTime(0);
});

restorePlaybackTime();
