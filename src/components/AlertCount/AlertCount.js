import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './AlertCount.style';

export default AlertCount = (props) => {
  const { count, doNotShowCount } = props;
  return (
    <View
      style={[
        styles.alertCommonBackground,
        doNotShowCount ? styles.alertBackground : styles.alertBackgroundWithCount
      ]}>
      {!doNotShowCount && <Text style={styles.alertCount}>{count}</Text>}
    </View>
  );
}
