const sliderTime = document.querySelector(".video__range_time");
const sliderSound = document.querySelector(".video__range_sound");
const slide = function (slider) {
  const min = slider.min;
  const max = slider.max;
  const value = slider.value;

  slider.style.background = `linear-gradient(to right, #FF6600 0%, #FF6600 ${
    ((value - min) / (max - min)) * 100
  }%, #9397A3 ${((value - min) / (max - min)) * 100}%, #9397A3 100%)`;

  slider.oninput = function () {
    this.style.background = `linear-gradient(to right, #FF6600 0%, #FF6600 ${
      ((this.value - this.min) / (this.max - this.min)) * 100
    }%, #9397A3 ${
      ((this.value - this.min) / (this.max - this.min)) * 100
    }%, #9397A3 100%)`;
  };
};
slide(sliderTime);
slide(sliderSound);

// fullscreen
function toggleFullscreen() {
    let elem = document.querySelector("video");
  
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

fullScreenBtn.addEventListener('click', toggleFullscreen);

/// play/pause

function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }
  playBtn.addEventListener('click', togglePlay);



function updatePlayButton() {
playbackIcons.forEach(icon => icon.classList.toggle('video__icon_hidden'));
}

playBtn.addEventListener('click', updatePlayButton);

const nextBtn = document.querySelector('[name="next-btn"]');

function setStartNavigation() {
  nextBtn.addEventListener("click", () => {
    document.location.href = "./test.html";
  });
}

setStartNavigation();
