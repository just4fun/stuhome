import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertCount from '../AlertCount';
import styles from '../../styles/components/button/_MenuButton';

export default class MenuButton extends Component {
  handleOnPress() {
    let {
      isLogin,
      navigation
    } = this.props;

    if (isLogin) {
      navigation.navigate('DrawerToggle');
    } else {
      navigation.navigate('LoginModal');
    }
  }

  render() {
    let { alertCount } = this.props;

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
