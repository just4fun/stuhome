import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertCount from '../AlertCount';
import styles from '../../styles/components/button/_MenuButton';

export default class MenuButton extends Component {
  render() {
    let {
      navigation,
      navigation: {
        state: {
          params = {}
        }
      }
    } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('DrawerToggle')}>
        <View style={styles.view}>
          <Icon
            style={styles.menu}
            name='reorder'
            size={18} />
          {!!params.alertCount && <AlertCount doNotShowCount={true} />}
        </View>
      </TouchableOpacity>
    );
  }
}
