import React, { Component } from 'react';
import {
  View,
  Modal,
  Image,
  Linking,
  CameraRoll,
  ActionSheetIOS,
  TouchableWithoutFeedback
} from 'react-native';
import PhotoView from 'react-native-photo-view';
import MessageBar from '../services/MessageBar';
import styles from '../styles/components/_ImagePreview';

export default class ImagePreview extends Component {
  showSavePhotoDialog(url) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        '保存图片',
        '取消'
      ],
      cancelButtonIndex: 1
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.savePhoto(url);
          break;
      }
    });
  }

  savePhoto(url) {
    CameraRoll.saveToCameraRoll(url).catch(e => {
      if (e.message === 'User denied access') {
        Linking.openURL('app-settings:');
      }
    })
  }

  render() {
    let {
      url,
      visible,
      close,
      imageStyle,
      indicator
    } = this.props;

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={visible}>
        <TouchableWithoutFeedback
          style={styles.overlay}
          onPress={close}
          onLongPress={() => this.showSavePhotoDialog(url)}>
          <PhotoView
            style={[styles.image, imageStyle]}
            loadingIndicatorSource={require('../images/image_default.png')}
            source={{ uri: url }}
            onTap={close} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
