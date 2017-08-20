import React, { Component } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ReplyButton extends Component {
  render() {
    return (
      <Text
        style={this.props.style}
        onPress={this.props.onPress}>
        回复
      </Text>
    );
  }
}
