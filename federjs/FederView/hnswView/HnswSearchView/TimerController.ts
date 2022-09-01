import * as d3 from 'd3';

export default class TimerController {
  callback: Function;
  speed: number;
  duration: number;
  playCallback: Function;
  pauseCallback: Function;
  tAlready: number = 0;
  t: number = 0;
  timer: d3.Timer = null;
  isPlaying: boolean = false;
  constructor({
    duration,
    speed = 1,
    callback,
    playCallback,
    pauseCallback,
  }: {
    duration: number;
    speed?: number;
    callback: Function;
    playCallback: Function;
    pauseCallback: Function;
  }) {
    this.callback = callback;
    this.speed = speed;
    this.duration = duration;
    this.playCallback = playCallback;
    this.pauseCallback = pauseCallback;
  }
  get currentT() {
    return this.t;
  }
  start() {
    const speed = this.speed;
    this.isPlaying || this.playCallback();
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

    this.isPlaying && this.pauseCallback();
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
    this.t = t;
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
    this.t = t;
    this.callback({
      t,
      p,
    });
    // this.continue();
  }
}
