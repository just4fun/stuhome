import React, { Component } from 'react';
import {
  Image
} from 'react-native';
import ImageWithProgress from 'react-native-image-progress';
import Pie from 'react-native-progress/Pie';
import colors from '../styles/common/_colors';

export default class ProgressImage extends Component {
  constructor(props) {
    super(props);

    // only `height` is used for responsive image
    this.state = {
      height: 0,
      layoutWidth: 0,
      originalWidth: 0,
      originalHeight: 0,
    };

    // we calculate `height` both in `_getImageSize` and `_handleLayout`,
    // since the sequence between the callback of `Image.getSize` and
    // `_handleLayout` is not guaranteed, the lack of any of them may
    // lead `height: 0`.
    this._getImageSize();
  }

  _getImageSize() {
    let { uri } = this.props;

    Image.getSize(uri, (originalWidth, originalHeight) => {
      // `layoutWidth` may not be calculated in this time
      let height = originalHeight * (this.state.layoutWidth / originalWidth);

      this.setState({
        height,
        originalWidth,
        originalHeight,
      });
    });
  }

  _handleLayout(event) {
    let { width } = event.nativeEvent.layout;
    // `originalHeight` and `originalWidth` may not be calculated in this time
    let height = this.state.originalHeight * ( width / this.state.originalWidth);

    this.setState({
      height,
      layoutWidth: width
    });
  }

  render() {
    let { style, uri } = this.props;

    return (
      <ImageWithProgress
        source={{ uri }}
        indicator={Pie}
        indicatorProps={{
          color: colors.imageProgress,
          borderColor: colors.imageProgress,
          unfilledColor: colors.white,
        }}
        onLayout={event => this._handleLayout(event)}
        style={[{
          height: this.state.height,
        }, style]} />
    );
  }
}
