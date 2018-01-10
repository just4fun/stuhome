import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { CachedImage } from "react-native-img-cache";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_RewardList';

export default class RewardList extends Component {
  render() {
    let { reward, navigation } = this.props;
    let {
      score,
      userNumber,
      userList,
      showAllUrl
    } = reward;

    return (
      <View style={styles.reward}>
        <View style={styles.rewardHeader}>
          <Text style={styles.rewardHeaderText}>
            {`共 ${userNumber} 人评分${score.map(({ info, value }) => {
              if (value >= 0) {
                value = `+${value}`;
              }

              return `， ${info} ${value}`;
            })}`}
          </Text>
        </View>
        <View style={styles.rewardUserList}>
          {reward.userList.map((user, index) => {
            return (
              <CachedImage
                key={index}
                source={{ uri: user.userIcon }}
                style={styles.rewardUser} />
            );
          })}
          <Icon
            style={[styles.rewardUser, styles.more]}
            name='ellipsis-h'
            size={14}
            onPress={() => navigation.navigate('WebView', {
              url: showAllUrl,
              title: '全部评分'
            })} />
        </View>
      </View>
    );
  }
}
