import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import TIPS from '~/constants/funnyTips';

import mainStyles from '~/common/styles/Main.style';
import indicatorStyles from '~/common/styles/Indicator.style';
import styles from './LoadingSpinner.style';

export default LoadingSpinner = (props) => {
  const { text } = props;
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
