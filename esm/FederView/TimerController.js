import * as d3 from 'd3';

export default class TimerController {
  constructor({ duration, speed = 1, callback }) {
    this.callback = callback;
    this.speed = speed;
    this.duration = duration;

    this.tAlready = 0;
    this.t = 0;
    this.timer = null;
    this.isPlaying = false;
  }
  get currentT() {
    return this.t
  }
  start() {
    const speed = this.speed;
    this.isPlaying = true;
    this.timer = d3.timer((elapsed) => {
      const t = elapsed * speed + this.tAlready;
      const p = t / this.duration;
      this.t = t;
      this.callback({
        t,
        p,
      });
      if (p >= 1) {
        this.stop();
      }
    });
  }
  restart() {
    this.timer.stop();
    this.tAlready = 0;
    this.start();
  }
  stop() {
    this.timer.stop();
    this.tAlready = this.t;
    this.isPlaying = false;
  }
  playPause() {
    if (this.isPlaying) this.stop();
    else this.start();
  }
  continue() {
    this.start();
  }
  setSpeed(speed) {
    this.stop();
    this.speed = speed;
    this.continue();
  }
  setTimeT(t) {
    this.stop();
    const p = t / this.duration;
    this.tAlready = t;
    this.callback({
      t,
      p,
    });
    // this.continue();
  }
  setTimeP(p) {
    this.stop();
    const t = this.duration * p;
    this.tAlready = t;
    this.callback({
      t,
      p,
    });
    // this.continue();
  }
}
