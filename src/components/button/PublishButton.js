import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/components/button/_PublishButton';

export default class PublishButton extends Component {
  render() {
    return (
      <Icon
        style={this.props.style || styles.button}
        name='pencil-square-o'
        size={18}
        onPress={this.props.onPress} />
    );
  }
}
