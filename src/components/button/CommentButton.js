import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CommentButton extends Component {
  render() {
    return (
      <Icon
        style={this.props.style}
        name='commenting-o'
        size={18}
        onPress={this.props.onPress} />
    );
  }
}
