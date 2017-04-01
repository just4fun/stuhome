import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePreview from './ImagePreview';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_ImageUploader';
import colors from '../styles/common/_colors';

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewUri: null
    };
  }

  launchImageLibrary() {
    if (this.props.disabled) { return; }

    ImagePicker.openPicker({
      compressImageQuality: 0.5,
      maxFiles: 10,
      mediaType: 'photo',
      loadingLabelText: '处理中...',
      multiple: true
    }).then(images => {
      this.props.addImages(images);
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
          <ImagePreview source={{ uri: previewUri }}
                        visible={!!previewUri}
                        close={() => this.previewImage(null)} />
        }
        {this.props.images.map((image, index) => {
          return (
            <TouchableHighlight style={styles.block}
                                key={index}
                                underlayColor={colors.underlay}
                                onPress={() => this.previewImage(image.path)}>
              <Image style={styles.image}
                     source={{ uri: image.path }}>
                {!disabled &&
                  <Icon style={styles.remove}
                    name='window-close'
                    size={16}
                    onPress={() => this.props.removeImage(index)} />
                }
              </Image>
            </TouchableHighlight>
          );
        })}
        {!disabled &&
          <TouchableHighlight style={styles.block}
                              underlayColor={colors.underlay}
                              onPress={() => this.launchImageLibrary()}>
            <Icon style={styles.uploader}
                  name='cloud-upload'
                  size={25} />
          </TouchableHighlight>
        }
      </View>
    );
  }
}
