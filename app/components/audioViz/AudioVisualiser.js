/* global window */
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
    if (audioData) {
      if (audioData[0]) {
        const radius = audioData[1] / 1;
        const grd = context.createRadialGradient(centerX, centerY, 1, centerX, centerY, radius);
        grd.addColorStop(0, 'darkorchid');
        grd.addColorStop(0.25, 'darkslateblue');
        grd.addColorStop(0.5, 'violet');
        grd.addColorStop(0.75, 'mediumpurple');
        grd.addColorStop(1, 'darkslateblue');

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
