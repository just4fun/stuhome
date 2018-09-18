import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from './MenuProfile.style';

export default MenuProfile = (props) => {
  const {
    session: {
      data: {
        uid,
        token,
        avatar,
        userName
      }
    },
    navigation
  } = props;

  return (
    <View style={styles.menuHeader}>
      <View>
        {token &&
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('Information', { userId: uid })}>
            <Image
              key={avatar}
              style={styles.avatar}
              source={{ uri: avatar }} />
           </TouchableOpacity>
          ||
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('LoginModal')}>
            <Image
              key='noavatar'
              style={styles.avatar}
              source={require('~/images/noavatar.jpg')} />
           </TouchableOpacity>
        }
        <Text style={styles.name}>{token ? userName : '请先登录'}</Text>
      </View>
    </View>
  );
}
