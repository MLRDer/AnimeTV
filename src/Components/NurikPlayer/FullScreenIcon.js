import React, { Component } from 'react';
import {
  FullscreenEnterIcon,
  FullscreenExitIcon
} from './icons';

class FullScreenIcon extends Component {
    constructor(props) {
        super(props);
    }

  render() {
        return (
         this.props.landscape ?  <FullscreenExitIcon /> : <FullscreenEnterIcon />
        );
    }
}

export default FullScreenIcon;
