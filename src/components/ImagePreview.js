import React, { Component } from 'react';
import {
  View,
  Modal,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import styles from '../styles/components/_ImagePreview';

export default class ImagePreview extends Component {
  render() {
    let {
      source,
      visible,
      close,
      imageStyle,
      indicator
    } = this.props;

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        onRequestClose={close}
        visible={visible}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={close}>
            <Image
              indicator={indicator || ProgressBar}
              indicatorProps={this.props.indicatorProps}
              resizeMode={'contain'}
              source={source}
              style={[styles.image, imageStyle]} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}
