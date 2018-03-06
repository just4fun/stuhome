import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import ImagePicker from '../services/ImagePicker';
import ImagePreview from './ImagePreview';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_ImageUploader';
import colors from '../styles/common/_colors';
import { MAX_UPLOAD_IMAGES_COUNT } from '../config';

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewUri: null
    };
  }

  handleUploaderPress() {
    if (this.props.disabled) { return; }


    let takePhotoOptions = {
      compressImageQuality: 0.5,
      loadingLabelText: '处理中...'
    };
    let selectPhotoOptions = {
      compressImageQuality: 0.5,
      maxFiles: MAX_UPLOAD_IMAGES_COUNT - this.props.images.length,
      mediaType: 'photo',
      loadingLabelText: '处理中...',
      multiple: true
    };
    ImagePicker.showUploadDialog({
      takePhotoOptions,
      selectPhotoOptions,
      uploadAction: (images) => {
        // `images` will not be array when take photo.
        if (!images.length) {
          images = [images];
        }
        this.props.addImages(images);
      },
      // To avoid the keyboard bug on iOS 11.2.
      cancelAction: () => this.props.cancelUpload()
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
    let { disabled, images } = this.props;

    return (
      <View style={styles.container}>
        {previewUri &&
          <ImagePreview
            source={{ uri: previewUri }}
            visible={!!previewUri}
            close={() => this.previewImage(null)} />
        }
        {images.map((image, index) => {
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
        {!disabled && (MAX_UPLOAD_IMAGES_COUNT !== images.length) &&
          <TouchableHighlight
            style={styles.block}
            underlayColor={colors.underlay}
            onPress={() => this.handleUploaderPress()}>
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
