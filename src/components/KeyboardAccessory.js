import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmojiPicker from './EmojiPicker';
import styles from '../styles/components/_KeyboardAccessory';

export default class KeyboardAccessory extends Component {
  render() {
    let { style, selectedPanel } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.selection}>
          {selectedPanel === 'emoji' &&
            <Icon
              style={styles.item}
              name='keyboard-o'
              size={30}
              onPress={() => this.props.handlePanelSelect('keyboard')} />
            ||
            <Icon
              style={styles.item}
              name='smile-o'
              size={30}
              onPress={() => this.props.handlePanelSelect('emoji')} />
          }
          <Icon
            style={styles.item}
            name='angle-down'
            size={30}
            onPress={() => this.props.hideKeyboard()} />
        </View>
        {selectedPanel === 'emoji' &&
          <EmojiPicker
            selectedPanel={selectedPanel} />
        }
      </View>
    );
  }
}
