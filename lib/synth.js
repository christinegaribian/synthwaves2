const NOTES = require('./notes');

class Synth{
  constructor(keyboard){
    this.playNote = this.playNote.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.keyDown = false;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);

  }

  handleKeyDown(e){
    if (!this.keyDown){
      this.playNote(e.keyCode);
      this.keyDown = true;
    }
  }

  handleKeyUp(e){
    this.oscillator.stop(0);
    this.keyDown = false;
  }

  playNote(code){
    const freq = this.mapKeycodeToFrequency(code);
    console.log(code);
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.frequency.value = freq;
    this.gain = this.audioContext.createGain();

    this.gain.connect(this.audioContext.destination);
    this.oscillator.connect(this.gain);
    this.oscillator.start(0);
  }

  mapKeycodeToFrequency(code){
    return NOTES[code];
  }
}

module.exports = Synth;