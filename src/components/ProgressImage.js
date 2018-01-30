import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Linking
} from 'react-native';
import { CustomCachedImage } from "react-native-img-cache";
import ImageWithProgress from 'react-native-image-progress';
import Pie from 'react-native-progress/Pie';
import colors from '../styles/common/_colors';
import styles from '../styles/components/_ProgressImage';

export default class ProgressImage extends Component {
  constructor(props) {
    super(props);

    // Only `height` is used for responsive image.
    this.state = {
      height: 0,
      layoutWidth: 0,
      originalWidth: 0,
      originalHeight: 0,
    };

    // We calculate `height` both in `getImageSize` and `handleLayout`,
    // since the sequence between the callback of `Image.getSize` and
    // `handleLayout` is not guaranteed, the lack of any of them may
    // lead `height: 0`.

    // Update: even we have already used `react-native-img-cache`, user will
    // still can not see the cache image since `Image.getSize` still needs
    // time to get completed. To be tradeoff, we will give images a static
    // height instead of responsive height and width.

    // this.getImageSize();
  }

  getImageSize() {
    let { thumbUri } = this.props;

    Image.getSize(thumbUri, (originalWidth, originalHeight) => {
      // `layoutWidth` may not be calculated in this time
      let height = originalHeight * (this.state.layoutWidth / originalWidth);

      this.setState({
        height,
        originalWidth,
        originalHeight,
      });
    });
  }

  handleLayout(event) {
    let { width } = event.nativeEvent.layout;
    // `originalHeight` and `originalWidth` may not be calculated in this time
    let height = this.state.originalHeight * ( width / this.state.originalWidth);

    this.setState({
      height,
      layoutWidth: width
    });
  }

  render() {
    let { style, thumbUri, originalUri } = this.props;

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={() => Linking.openURL(originalUri)}>
        <View style={style}>
          <CustomCachedImage
            component={ImageWithProgress}
            source={{ uri: thumbUri }}
            indicator={Pie}
            indicatorProps={{
              color: colors.imageProgress,
              borderColor: colors.imageProgress,
              unfilledColor: colors.white,
            }}
            resizeMode={'contain'}
            // onLayout={event => this.handleLayout(event)}
            style={styles.image} />
        </View>
      </TouchableHighlight>
    );
  }
}
