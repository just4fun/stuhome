import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PopButton extends Component {
  render() {
    let { action, style, router } = this.props;

    return (
      <Icon
        style={style}
        name='angle-left'
        size={18}
        onPress={() => action ? action() : router.pop()} />
    );
  }
}
