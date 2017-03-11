import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_ImageUploader';
import colors from '../styles/common/_colors';

export default class ImageUploader extends Component {
  launchImageLibrary() {
    ImagePicker.openPicker({
      compressImageQuality: 0.5,
      // mediaType: 'photo',
      // loadingLabelText: '处理中...',
      multiple: true
    }).then(images => {
      this.props.addImages(images);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.images.map((image, index) => {
          return (
            <TouchableHighlight style={styles.block}
                                key={index}
                                underlayColor={colors.underlay}>
              <Image style={styles.image}
                     source={{ uri: image.path }}>
                <Icon style={styles.remove}
                      name='window-close'
                      size={16}
                      onPress={() => this.props.removeImage(index)} />
              </Image>
            </TouchableHighlight>
          );
        })}
        <TouchableHighlight style={styles.block}
                            underlayColor={colors.underlay}
                            onPress={() => this.launchImageLibrary()}>
          <Icon style={styles.uploader}
                name='cloud-upload'
                size={25} />
        </TouchableHighlight>
      </View>
    );
  }
}
