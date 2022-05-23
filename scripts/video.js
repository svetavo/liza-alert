const fullScreenBtn = document.querySelector('.video__button_fullscreen');
const playButton = document.getElementById('play');
const video = document.querySelector('video');
const playbackIcons = document.querySelectorAll('.video__icon use');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.video__icon-volume use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById('volume');


// fullscreen

function toggleFullscreen() {
    let elem = document.querySelector('video');

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
        });
    } else {
        document.exitFullscreen();
    }
}

fullScreenBtn.addEventListener('click', toggleFullscreen);

// play.pause

function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }

playButton.addEventListener('click', togglePlay);


function updatePlayButton() {
    playbackIcons.forEach(icon => icon.classList.toggle('video__icon_hidden'));
  }

playButton.addEventListener('click', updatePlayButton);


// таймер видео

function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};

function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  const time = formatTime(videoDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

video.addEventListener('loadedmetadata', initializeVideo);

function updateTimeElapsed() {
  const time = formatTime(Math.round(video.currentTime));
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
  timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

video.addEventListener('timeupdate', updateTimeElapsed);

// громкость

function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
}

volume.addEventListener('input', updateVolume);

function updateVolumeIcon() {
  volumeIcons.forEach(icon => {
    icon.classList.add('video__icon-volume_hidden');
  });

  volumeButton.setAttribute('data-title', 'Mute (m)')

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove('video__icon-volume_hidden');
    volumeButton.setAttribute('data-title', 'Unmute (m)')
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeLow.classList.remove('video__icon-volume_hidden');
  } else {
    volumeHigh.classList.remove('video__icon-volume_hidden');
  }
}

video.addEventListener('volumechange', updateVolumeIcon);

function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}

volumeButton.addEventListener('click', toggleMute);