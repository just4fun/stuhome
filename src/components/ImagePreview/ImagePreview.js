import React from 'react';
import {
  View,
  Modal,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import styles from './ImagePreview.style';

export default ImagePreview = (props) => {
  const {
    source,
    visible,
    close,
    imageStyle,
    indicator
  } = props;

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      onRequestClose={close}
      visible={visible}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={close}>
          <Image
            style={[styles.image, imageStyle]}
            source={source}
            resizeMode={'contain'} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}
