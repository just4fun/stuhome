import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertCount from '../AlertCount';
import styles from '../../styles/components/button/_MenuButton';

export default class MenuButton extends Component {
  render() {
    let alertCount = this.props.alertCount;

    return (
      <View style={styles.container}>
        <Icon
          style={styles.menu}
          name='reorder'
          size={18}
          onPress={() => this.props.updateMenuState(true)} />
        {!!alertCount && <AlertCount style={styles.alert} doNotShowCount={true} />}
      </View>
    );
  }
}
