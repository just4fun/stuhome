import React, { Component } from 'react';
import {
  View,
  Keyboard,
  LayoutAnimation
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styles from '../styles/components/_KeyboardAccessory';

export default class KeyboardAccessory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardAccessoryToBottom: 0
    };
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow(e) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      // https://github.com/facebook/react-native/issues/18003
      //
      // See more details in `showKeyboard()` method.

      // selectedPanel: 'keyboard',
      keyboardAccessoryToBottom: isIphoneX() ? (e.endCoordinates.height - 34) : e.endCoordinates.height
    });
  }

  keyboardWillHide(e) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      keyboardAccessoryToBottom: 0
    });
  }

  render() {
    let { keyboardAccessoryToBottom } = this.state;

    return (
      <View style={[styles.container, { bottom: keyboardAccessoryToBottom }]}>
        {this.props.children}
      </View>
    );
  }
}
