import React, { Component } from 'react';
import Image from 'react-native-image-progress';
import Pie from 'react-native-progress/Pie';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_ProgressImage';

class ProgressImage extends Component {
  render() {
    let { style, uri } = this.props;

    return (
      <Image
        source={{ uri }}
        indicator={Pie}
        indicatorProps={{
          color: colors.imageProgress,
          borderColor: colors.imageProgress,
          unfilledColor: colors.white,
        }}
        style={[styles.image, style]} />
    );
  }
}

module.exports = ProgressImage;
