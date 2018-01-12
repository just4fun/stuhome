import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from '../styles/components/_MenuProfile';
import colors from '../styles/common/_colors';

export default class MenuProfile extends Component {
  render() {
    let {
      authrization: {
        token,
        avatar,
        userName,
        userTitle,
        creditShowList
      },
      navigation
    } = this.props;

    return (
      <View style={styles.menuHeader}>
        <View>
          {token &&
            <TouchableHighlight
              style={styles.avatar}
              underlayColor={colors.underlay}
              onPress={() => navigation.navigate('Information')}>
              <Image
                // use timestamp here to aviod avatar cache
                key={`${avatar}&timestamp=${+ new Date()}`}
                style={styles.avatar}
                source={{ uri: avatar }} />
             </TouchableHighlight>
            ||
            <TouchableHighlight
              style={styles.avatar}
              underlayColor={colors.underlay}
              onPress={() => this.props.openLoginModal()}>
              <Image
                key='noavatar'
                style={styles.avatar}
                source={require('../images/noavatar.jpg')} />
             </TouchableHighlight>
          }
          <Text style={styles.name}>{token ? userName : '请先登录'}</Text>
        </View>
      </View>
    );
  }
}
