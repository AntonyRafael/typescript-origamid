import Timeout from "./Timeout.js";
export default class Slide {
    container;
    slides;
    controls;
    time;
    index;
    slide;
    timeout;
    paused;
    pausedTimeout;
    thumbItems;
    thumb;
    constructor(container, slides, controls, time = 5000) {
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.paused = false;
        this.thumbItems = null;
        this.thumb = null;
        this.timeout = null;
        this.pausedTimeout = null;
        this.index = parseInt(localStorage.getItem("activeSlide") || "0");
        this.slide = this.slides[this.index];
        console.log(this.container);
        console.log(this.slides);
        console.log(this.controls);
        console.log(this.time);
        this.init();
    }
    hide(el) {
        if (el instanceof HTMLVideoElement) {
            el.pause();
            el.currentTime = 0;
        }
        el.classList.remove("active");
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        localStorage.setItem("activeSlide", this.index.toString());
        if (this.thumbItems) {
            this.thumb = this.thumbItems[this.index];
            this.thumbItems.forEach((item) => item.classList.remove("active"));
            this.thumb.classList.add("active");
        }
        this.slides.forEach((slide) => this.hide(slide));
        this.slides[index].classList.add("active");
        if (this.slide instanceof HTMLVideoElement) {
            this.autoVideo(this.slide);
        }
        else {
            this.auto(this.time);
        }
    }
    autoVideo(video) {
        video.muted = true;
        video.play();
        let firstPlay = true;
        video.addEventListener("playing", () => {
            if (firstPlay)
                this.auto(video.duration * 1000);
            firstPlay = false;
        });
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
        if (this.thumb)
            this.thumb.style.animationDuration = `${time}ms`;
    }
    prev() {
        if (this.paused)
            return;
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev);
    }
    next() {
        if (this.paused)
            return;
        const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }
    pause() {
        document.body.classList.add("paused");
        this.pausedTimeout = new Timeout(() => {
            this.paused = true;
            this.timeout?.pause();
            this.thumb?.classList.add("paused");
            if (this.slide instanceof HTMLVideoElement) {
                this.slide.pause();
            }
        }, 300);
    }
    continue() {
        document.body.classList.remove("paused");
        this.pausedTimeout?.clear();
        if (this.paused) {
            this.paused = false;
            this.timeout?.continue();
            this.thumb?.classList.remove("paused");
            if (this.slide instanceof HTMLVideoElement) {
                this.slide.play();
            }
        }
    }
    addControls() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        prevButton.innerHTML = "Slide anterior";
        nextButton.innerHTML = "Próximo slide";
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        this.controls.addEventListener("pointerdown", () => this.pause());
        document.addEventListener("pointerup", () => this.continue());
        document.addEventListener("touchend", () => this.continue());
        prevButton.addEventListener("pointerup", () => this.prev());
        nextButton.addEventListener("pointerup", () => this.next());
    }
    addThumbItems() {
        const thumbContainer = document.createElement('div');
        thumbContainer.id = 'slide-thumb';
        for (let i = 0; i < this.slides.length; i++) {
            thumbContainer.innerHTML += `<span><span class="thumb-item"></span></span>`;
        }
        this.controls.appendChild(thumbContainer);
        this.thumbItems = Array.from(document.querySelectorAll(".thumb-item"));
    }
    init() {
        this.addControls();
        this.addThumbItems();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map