import weddingSong from '../assets/wedding-song.mp3';

class RomanticAudioEngine {
  private audio: HTMLAudioElement;
  private isMuted = false;
  private volume = 0.5;

  constructor() {
    this.audio = new Audio(weddingSong);

    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = this.volume;
  }

  public async start(): Promise<boolean> {
    try {
      await this.audio.play();
      return true;
    } catch (error) {
      console.error('Music playback failed:', error);
      return false;
    }
  }

  public pause(): void {
    this.audio.pause();
  }

  public async toggle(): Promise<boolean> {
    if (this.audio.paused) {
      return await this.start();
    }

    this.pause();
    return false;
  }

  public getIsPlaying(): boolean {
    return !this.audio.paused;
  }

  public setVolume(value: number): void {
    this.volume = Math.max(0, Math.min(1, value));

    if (!this.isMuted) {
      this.audio.volume = this.volume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;

    this.audio.volume = this.isMuted ? 0 : this.volume;

    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const romanticAudio = new RomanticAudioEngine();