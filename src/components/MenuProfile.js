import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { CachedImage } from "react-native-img-cache";
import styles from '../styles/components/_MenuProfile';
import colors from '../styles/common/_colors';

export default class MenuProfile extends Component {
  navigateToPersonalInformation() {
    
  }

  render() {
    let { authrization, openLoginModal } = this.props;
    let {
      token,
      avatar,
      userName,
      userTitle,
      creditShowList
    } = authrization;

    return (
      <View style={styles.menuHeader}>
        <View>
          {token &&
            <TouchableHighlight
              style={styles.avatar}
              underlayColor={colors.underlay}
              onPress={() => this.navigateToPersonalInformation()}>
              <View>
                <CachedImage
                  key={avatar}
                  style={styles.avatar}
                  source={{ uri: avatar }} />
              </View>
             </TouchableHighlight>
            ||
            <TouchableHighlight
              style={styles.avatar}
              underlayColor={colors.underlay}
              onPress={() => openLoginModal()}>
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
