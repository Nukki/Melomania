/* global window */
/* global Audio */
/* global requestAnimationFrame */
/* global cancelAnimationFrame */
import React, { Component } from 'react';
import { Flex, Box } from 'rebass';
import ClearButton from '../styled/ClearButton';
import AudioVisualiser from './AudioVisualiser';
import PauseIcon from '../icons/PauseIcon';
import PlayIcon from '../icons/PlayIcon';

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
      <Flex style={{ position: 'relative' }}>
        <ClearButton
          flex={1}
          onClick={this.toggleMicrophone}
          style={{ position: 'absolute', bottom: '40%', left: '40%' }}
        >
          {this.state.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </ClearButton>
        <AudioVisualiser flex={5} audioData={this.state.audioData} />
      </Flex>
    );
  }
}

export default AudioAnalyser;
