export default class SoundHandler {
  constructor(file, repeat) {
    this.file = file;
    this.repeat = repeat;
    this.audio = new Audio(file);
    this.audio.addEventListener(
      "ended",
      function() {
        this.currentTime = 0;
        this.play();
      },
      false
    );
  }
  play() {
    this.audio.play();
  }
}
