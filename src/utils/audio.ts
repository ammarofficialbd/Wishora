// Web Audio API ambient classical / ceremonial instrument synthesizer
class AudioController {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTone(freq: number, type: OscillatorType = 'sine', duration = 1.2, gainLevel = 0.15) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainLevel, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might fail in silent mode
    }
  }

  public playWaxSealPop() {
    try {
      this.initContext();
      this.playTone(520, 'sine', 0.2, 0.2);
      setTimeout(() => this.playTone(680, 'sine', 0.35, 0.15), 80);
      setTimeout(() => this.playTone(880, 'triangle', 0.4, 0.1), 160);
    } catch {}
  }

  public startCeremonialMusic(theme: string = 'flute') {
    this.stopMusic();
    this.isPlaying = true;
    this.initContext();

    // Raag Yaman / Bhupali traditional wedding notes
    const notes = theme === 'festive' 
      ? [293.66, 329.63, 369.99, 440.00, 493.88, 587.33, 659.25] // D major festive
      : [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33]; // C major pentatonic serene

    let index = 0;
    const loop = () => {
      if (!this.isPlaying) return;
      const note = notes[index % notes.length];
      const harmonic = note * 1.5;
      
      this.playTone(note, 'sine', 1.8, 0.08);
      this.playTone(harmonic, 'triangle', 2.2, 0.04);

      index = (index + 1) % notes.length;
      this.timer = window.setTimeout(loop, 900);
    };

    loop();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggleMusic(theme: string = 'flute'): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startCeremonialMusic(theme);
      return true;
    }
  }

  public isMusicPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioController = new AudioController();
