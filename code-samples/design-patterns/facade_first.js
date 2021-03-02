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
}

class Lights {
  dim(brightness) {
    console.log(`Lights are dimmed to ${brightness}`);
  }
}

const dvdPlayer = new DvdPlayer("Aquaman");
const lights = new Lights();
const amp = new Amplifier();
const projector = new Projector();

// watch movie!
dvdPlayer.on();
lights.dim(10);

projector.on();
projector.setDvdPlayer(dvdPlayer);

amp.on();
amp.setDvdPlayer(dvdPlayer);
amp.setSurroundSound();
amp.setVolume(50);
dvdPlayer.play();
