import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const { height, width } = canvas;
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    context.clearRect(0, 0, width, height);
    const colors = ['#d23be7', '#4355db', '#34bbe6', '#49da9a', '#a3e048', '#f7d038', '#eb7532', '#e6261f'];
    console.log(centerX);
    console.log(centerY);
    if (audioData) {
      if (audioData[0]) {
        const radius = audioData[1] / 1;
        console.log(`audiodata ${audioData.length}`);
        const grd = context.createRadialGradient(centerX, centerY, 1, centerX, centerY, radius);
        grd.addColorStop(0, '#a3e048');
        grd.addColorStop(0.25, '#49da9a');
        grd.addColorStop(0.5, '#34bbe6');
        grd.addColorStop(0.75, '#4355db');
        grd.addColorStop(1, '#d23be7');

        // Fill with gradient
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = grd;
        context.fillRect(0, 0, width, height);
      }
    }
  }

  render() {
    return <canvas width="300" height="300" ref={this.canvas} />;
  }
}

export default AudioVisualiser;
