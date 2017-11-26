import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from '../styles/components/_AlertCount';

export default class AlertCount extends Component {
  render() {
    return (
      <View style={styles.alertBackground}>
        <Text style={styles.alert}>{this.props.count}</Text>
      </View>
    );
  }
}
