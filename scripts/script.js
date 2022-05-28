const sliderTime = document.querySelector('.video__range_type_time');
const sliderSound = document.querySelector('.video__range_type_sound');
const fullScreenBtn = document.querySelector('.video__button_type_fullscreen');
const playButton = document.getElementById('play');
const video = document.querySelector('video');
const playbackIcons = document.querySelectorAll('.video__icon svg');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const nextBtn = document.querySelector('[name="next-btn"]');


nextBtn.addEventListener("click", () => {
  document.location.href = "./test.html";
});

const slide = function (slider) {
  const min = slider.min;
  const max = slider.max;
  const value = slider.value;

  slider.style.background = `linear-gradient(to right, #FF6600 0%, #FF6600 ${(value - min) / (max - min) * 100}%, #9397A3 ${(value - min) / (max - min) * 100}%, #9397A3 100%)`;

  slider.oninput = function () {
    this.style.background = `linear-gradient(to right, #FF6600 0%, #FF6600 ${(this.value - this.min) / (this.max - this.min) * 100}%, #9397A3 ${(this.value - this.min) / (this.max - this.min) * 100}%, #9397A3 100%)`;
  };
};
slide(sliderTime);
slide(sliderSound);

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


// function updateProgress(params) {
//   sliderTime.value = (video.currentTime / video.duration) * 100;
//   let minutes = Math.floor(video.currentTime / 60);
//   let seconds = Math.floor(video.currentTime % 60)
//   slide(sliderTime);





// }


// function setProgress(params) {
//   video.currentTime = (sliderTime.value * video.duration) / 100;
  

// }
// sliderTime.addEventListener('change', setProgress)




// video.addEventListener('timeupdate', updateTimeElapsed);


// const slide = function(slider) {
//     const min = slider.min;
//     const max = slider.max;
//     const value = slider.value;
//     slider.style.background = `linear-gradient(to right, #FF6600 0%, #FF6600 ${(value - min) / (max - min) * 100}%, #9397A3 ${(value - min) / (max - min) * 100}%, #9397A3 100%)`;
//     slider.oninput = function () {
//     this.style.background = `linear-gradient(to right, #FF6600 0%, #FF6600 ${(this.value - this.min) / (this.max - this.min) * 100}%, #9397A3 ${(this.value - this.min) / (this.max - this.min) * 100}%, #9397A3 100%)`;
// };
// };

// slide(sliderSound);

// громкость
const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.video__icon-volume svg');
const volumeMute = document.getElementById('volume-mute');
const volumeLow = document.getElementById('volume-low');
const volumeHigh = document.getElementById('volume-high');
const volume = document.getElementById('volume');

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

