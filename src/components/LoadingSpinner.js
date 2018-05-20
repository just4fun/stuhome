import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import styles from '../styles/components/_LoadingSpinner';
import TIPS from '../constants/funnyTips';

export default class LoadingSpinner extends Component {
  render() {
    let { text } = this.props;
    return (
      <View style={[mainStyles.container, styles.container]}>
        <View style={indicatorStyles.fullScreenIndicator}>
          <ActivityIndicator />
          <Text style={styles.text}>
            {text || TIPS[Math.floor(Math.random() * TIPS.length)]}
          </Text>
        </View>
      </View>
    );
  }
}
