import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  AlertIOS,
  ActionSheetIOS,
  TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePreview from './ImagePreview';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_ImageUploader';
import colors from '../styles/common/_colors';
import MESSAGES from '../constants/messages'

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewUri: null
    };
  }

  handleTakePhoto() {
    ImagePicker.openCamera({
      compressImageQuality: 0.5,
      loadingLabelText: '处理中...'
    }).then(image => {
      this.props.addImages([image]);
    }).catch(e => {
      if (e.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
        AlertIOS.alert('提示', MESSAGES[e.code]);
      } else if (e.code === 'E_PICKER_NO_CAMERA_PERMISSION') {
        this.goToAppSettings(MESSAGES[e.code]);
      }
    });
  }

  handleSelectPhoto() {
    ImagePicker.openPicker({
      compressImageQuality: 0.5,
      maxFiles: 10,
      mediaType: 'photo',
      loadingLabelText: '处理中...',
      multiple: true
    }).then(images => {
      this.props.addImages(images);
    }).catch(e => {
      if (e.code === 'E_PERMISSION_MISSING') {
        this.goToAppSettings(MESSAGES[e.code]);
      }
    });
  }

  goToAppSettings(message) {
    AlertIOS.alert(
      '提示',
      message,
      [
        { text: '取消', style: 'cancel' },
        { text: '前往', onPress: () => Linking.openURL('app-settings:') },
      ],
    );
  }

  showImageUploadDialog() {
    if (this.props.disabled) { return; }

    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        '拍照',
        '从手机相册选择',
        '取消'
      ],
      cancelButtonIndex: 2
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          this.handleTakePhoto();
          break;
        case 1:
          this.handleSelectPhoto();
          break;
        case 2:
          // To avoid the keyboard bug on iOS 11.2.
          this.props.cancelUpload();
          break;
      }
    });
  }

  previewImage(uri) {
    if (this.props.disabled) { return; }

    this.setState({
      previewUri: uri
    });
  }

  render() {
    let { previewUri } = this.state;
    let { disabled } = this.props;

    return (
      <View style={styles.container}>
        {previewUri &&
          <ImagePreview
            source={{ uri: previewUri }}
            visible={!!previewUri}
            close={() => this.previewImage(null)} />
        }
        {this.props.images.map((image, index) => {
          return (
            <TouchableHighlight
              style={styles.block}
              key={index}
              underlayColor={colors.underlay}
              onPress={() => this.previewImage(image.path)}>
              <View>
                <Image
                  style={styles.image}
                  source={{ uri: image.path }} />
                {!disabled &&
                  <Icon style={styles.remove}
                    name='window-close'
                    size={16}
                    onPress={() => this.props.removeImage(index)} />
                }
              </View>
            </TouchableHighlight>
          );
        })}
        {!disabled &&
          <TouchableHighlight
            style={styles.block}
            underlayColor={colors.underlay}
            onPress={() => this.showImageUploadDialog()}>
            <Icon
              style={styles.uploader}
              name='cloud-upload'
              size={25} />
          </TouchableHighlight>
        }
      </View>
    );
  }
}
