import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from '../styles/components/_AlertCount';

export default class AlertCount extends Component {
  render() {
    let { count, doNotShowCount } = this.props;

    return (
      <View style={[styles.alertCommonBackground,
                    doNotShowCount ? styles.alertBackground : styles.alertBackgroundWithCount]}>
        {!doNotShowCount && <Text style={styles.alertCount}>{this.props.count}</Text>}
      </View>
    );
  }
}
