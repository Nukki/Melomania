import React, { Component } from 'react';
import AudioVisualiser from './AudioVisualiser';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0), isPlaying: false };
    this.tick = this.tick.bind(this);
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'none';
    this.audio.type = 'audio/x-m4a';
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  toggleMicrophone = () => {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      this.audio.pause();
    } else {
      this.setState({ isPlaying: true });
      this.playMusic();
      this.audioContext = this.audioContext || new (window.AudioContext ||
          window.webkitAudioContext)();

      // this.audioContext = this.audioContext || new (window.AudioContext ||
      //   window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.source = this.source || this.audioContext.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      console.log(this.source);
      this.rafId = requestAnimationFrame(this.tick);
      this.analyser.connect(this.audioContext.destination);
    }
  }

  playMusic = () => {
    this.audio.setAttribute('src', this.props.music);
    this.audio.load();
    this.audio.play();
  }

  render() {
    return (
      <div className="controls">
        <button onClick={this.toggleMicrophone} >
          {this.state.isPlaying ? 'Stop' : 'Play'}
        </button>
        <AudioVisualiser audioData={this.state.audioData} />
      </div>
    );
  }
}

export default AudioAnalyser;
