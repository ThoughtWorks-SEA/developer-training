class Projector {
  on() {
    console.log("Projector is on");
  }
  setDvdPlayer(dvdPlayer) {
    console.log(`Projector is now connected to DVD ${dvdPlayer.name}`);
  }
  off() {
    console.log("Projector is off");
  }
}

class Amplifier {
  on() {
    console.log("Amp is on");
  }
  setVolume(volume) {
    console.log(`Volume is now at ${volume}`);
  }
  setDvdPlayer(dvdPlayer) {
    console.log(`Amp is now connected to DVD ${dvdPlayer.name}`);
  }
  setSurroundSound() {
    console.log("Surround sound is now on");
  }
  off() {
    console.log("Amp is off");
  }
}

class DvdPlayer {
  constructor(name) {
    this.name = name;
  }
  on() {
    console.log("Dvd is on");
  }
  play() {
    console.log(`Playing ${this.name}`);
  }
  off() {
    console.log("Dvd is off");
  }
}

class Lights {
  dim(brightness) {
    console.log(`Lights are dimmed to ${brightness}`);
  }
}

class TheaterFacade {
  constructor(dvdPlayer, lights, amp, projector) {
    this.dvdPlayer = dvdPlayer;
    this.lights = lights;
    this.amp = amp;
    this.projector = projector;
  }

  watchMovie() {
    this.dvdPlayer.on();
    this.lights.dim(10);

    this.projector.on();
    this.projector.setDvdPlayer(dvdPlayer);

    this.amp.on();
    this.amp.setDvdPlayer(dvdPlayer);
    this.amp.setSurroundSound();
    this.amp.setVolume(50);
    this.dvdPlayer.play();
  }

  endMovie() {
    this.lights.dim(80);
    this.dvdPlayer.off();
    this.projector.off();
    this.amp.off();
  }
}

const dvdPlayer = new DvdPlayer("Aquaman");
const lights = new Lights();
const amp = new Amplifier();
const projector = new Projector();

const theaterFacade = new TheaterFacade(dvdPlayer, lights, amp, projector);
theaterFacade.watchMovie();
theaterFacade.endMovie();
