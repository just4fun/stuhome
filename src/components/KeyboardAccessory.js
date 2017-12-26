import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from '../styles/components/_KeyboardAccessory';

export default class KeyboardAccessory extends Component {
  render() {
    let { style } = this.props;

    return (
      <View style={[styles.container, style]}>

      </View>
    );
  }
}
