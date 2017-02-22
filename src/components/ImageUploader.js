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
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
  }

  launchImageLibrary() {
    ImagePicker.launchImageLibrary(null, (response) => {
      console.log('Response = ', response);

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
        this.setState({
          images: this.state.images.concat(response)
        })

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source
        // });
      }
    });
  }

  removeImage(imageName) {
    this.setState({
      images: this.state.images.filter(image => image.fileName !== imageName)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.images.map(image => {
          return (
            <TouchableHighlight style={styles.block}
                                key={image.fileName}
                                underlayColor={colors.underlay}>
              <Image style={styles.image}
                     source={{ uri: image.uri }}>
                <Icon style={styles.remove}
                      name='window-close'
                      size={16}
                      onPress={() => this.removeImage(image.fileName)} />
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
