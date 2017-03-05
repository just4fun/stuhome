import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_ImageUploader';
import colors from '../styles/common/_colors';

export default class ImageUploader extends Component {
  launchImageLibrary() {
    ImagePicker.launchImageLibrary(null, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.props.addImage(response);
      }
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
                     source={{ uri: image.uri }}>
                <Icon style={styles.remove}
                      name='window-close'
                      size={16}
                      onPress={() => this.props.removeImage(`${image.fileName}_${index}`)} />
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
