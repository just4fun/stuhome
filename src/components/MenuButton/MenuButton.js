import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertCount from '~/components/AlertCount/AlertCount';

import styles from './MenuButton.style';

export default class MenuButton extends Component {
  handleOnPress() {
    const {
      isLogin,
      navigation
    } = this.props;

    if (isLogin) {
      navigation.openDrawer();
    } else {
      navigation.push('LoginModal');
    }
  }

  render() {
    const { alertCount } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.handleOnPress()}>
        <View style={styles.view}>
          <Icon
            style={styles.menu}
            name='reorder'
            size={18} />
          {!!alertCount && <AlertCount doNotShowCount={true} />}
        </View>
      </TouchableOpacity>
    );
  }
}
