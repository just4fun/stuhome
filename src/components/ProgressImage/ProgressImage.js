import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import SafariView from '~/services/SafariView';

import colors from '~/common/styles/colors.style';
import styles from './ProgressImage.style';

export default class ProgressImage extends Component {
  // constructor(props) {
  //   super(props);

  //   // Only `height` is used for responsive image.
  //   this.state = {
  //     height: 0,
  //     layoutWidth: 0,
  //     originalWidth: 0,
  //     originalHeight: 0,
  //   };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoadError: false
    };
  }

  //   // We calculate `height` both in `getImageSize` and `handleLayout`,
  //   // since the sequence between the callback of `Image.getSize` and
  //   // `handleLayout` is not guaranteed, the lack of any of them may
  //   // lead `height: 0`.

  //   // Update: even we have already used `react-native-img-cache`, user will
  //   // still can not see the cache image since `Image.getSize` still needs
  //   // time to get completed. To be tradeoff, we will give images a static
  //   // height instead of responsive height and width.

  //   this.getImageSize();
  // }

  // getImageSize() {
  //   let { thumbUri } = this.props;

  //   Image.getSize(thumbUri, (originalWidth, originalHeight) => {
  //     // `layoutWidth` may not be calculated in this time
  //     let height = originalHeight * (this.state.layoutWidth / originalWidth);

  //     this.setState({
  //       height,
  //       originalWidth,
  //       originalHeight,
  //     });
  //   });
  // }

  // handleLayout(event) {
  //   let { width } = event.nativeEvent.layout;
  //   // `originalHeight` and `originalWidth` may not be calculated in this time
  //   let height = this.state.originalHeight * ( width / this.state.originalWidth);

  //   this.setState({
  //     height,
  //     layoutWidth: width
  //   });
  // }

  render() {
    let { style, thumbUri, originalUri } = this.props;
    let { isLoading, isLoadError } = this.state;

    return (
      <TouchableHighlight
        underlayColor={colors.underlay}
        onPress={() => SafariView.show(originalUri)}>
        <View style={[styles.image, style]}>
          {isLoadError &&
            <View>
              <Image
                defaultSource={require('~/images/image_fail.png')}
                resizeMode={'contain'}
                style={[styles.image, style]} />
              <Text style={styles.text}>图片加载失败或图片已失效</Text>
            </View>
            ||
            <View>
              <Image
                source={{ uri: thumbUri }}
                defaultSource={require('~/images/image_default.png')}
                onLoadStart={() => this.setState({ isLoading: true })}
                onLoadEnd={() => this.setState({ isLoading: false })}
                onError={() => this.setState({ isLoadError: true })}
                resizeMode={'contain'}
                // onLayout={event => this.handleLayout(event)}
                style={[styles.image, style]} />
              {isLoading && <ActivityIndicator style={styles.indicator} />}
            </View>
          }
        </View>
      </TouchableHighlight>
    );
  }
}
