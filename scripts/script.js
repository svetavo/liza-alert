const sliderTime = document.querySelector(".video__range_time");
const sliderSound = document.querySelector(".video__range_sound");
const fullScreenBtn = document.querySelector(".video__button_fullscreen");
const playButton = document.querySelector(".video__button");
const video = document.querySelector(".video");
const playbackIcons = document.querySelectorAll(".video__icon use");
const timeElapsed = document.getElementById("time-elapsed");
const duration = document.getElementById("duration");
const nextBtn = document.querySelector('[name="next-btn"]');
// fullscreen

function toggleFullscreen() {
  let elem = document.querySelector("video");

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

fullScreenBtn.addEventListener("click", toggleFullscreen);

// play.pause

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

playButton.addEventListener("click", togglePlay);

function updatePlayButton() {
  playbackIcons.forEach((icon) => icon.classList.toggle("video__icon_hidden"));
}

playButton.addEventListener("click", updatePlayButton);
nextBtn.addEventListener("click", () => {
  document.location.href = "./test.html";
});

// таймер видео

function updateProgress(params) {
  sliderTime.value = (video.currentTime / video.duration) * 100;
  let minutes = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime % 60)

}
video.addEventListener('timeupdate', updateProgress);

function setProgress(params) {
  video.currentTime = (sliderTime.value * video.duration) / 100;
}

sliderTime.addEventListener('change', setProgress)


// громкость
const volumeButton = document.getElementById("volume-button");
const volumeIcons = document.querySelectorAll(".video__icon-volume use");
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById("volume");

function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
}

volume.addEventListener("input", updateVolume);

function updateVolumeIcon() {
  volumeIcons.forEach((icon) => {
    icon.classList.add("video__icon-volume_hidden");
  });

  volumeButton.setAttribute("data-title", "Mute (m)");

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove("video__icon-volume_hidden");
    volumeButton.setAttribute("data-title", "Unmute (m)");
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeLow.classList.remove("video__icon-volume_hidden");
  } else {
    volumeHigh.classList.remove("video__icon-volume_hidden");
  }
}

video.addEventListener("volumechange", updateVolumeIcon);

function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute("data-volume", volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}

volumeButton.addEventListener("click", toggleMute);

