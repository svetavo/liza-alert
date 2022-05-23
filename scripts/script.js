const sliderTime = document.querySelector('.video__range_time');
const sliderSound = document.querySelector('.video__range_sound');

const slide = function(slider) {
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

