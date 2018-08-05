import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './AlertCount.style';

export default class AlertCount extends Component {
  render() {
    let { count, doNotShowCount } = this.props;

    return (
      <View style={[styles.alertCommonBackground,
                    doNotShowCount ? styles.alertBackground : styles.alertBackgroundWithCount]}>
        {!doNotShowCount && <Text style={styles.alertCount}>{count}</Text>}
      </View>
    );
  }
}
