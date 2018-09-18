import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Avatar from '~/components/Avatar/Avatar';
import SafariView from '~/services/SafariView';

import styles from './RewardList.style';

export default RewardList = (props) => {
  const {
    reward: {
      score,
      userNumber,
      userList,
      showAllUrl
    },
    currentUserId,
    navigation
  } = props;

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
        {userList.map((user, index) => (
          <Avatar
            key={index}
            style={styles.rewardUser}
            url={user.userIcon}
            userId={user.uid}
            currentUserId={currentUserId}
            userName={user.userName}
            navigation={navigation} />
        ))}
        <Icon
          style={[styles.rewardUser, styles.more]}
          name='ellipsis-h'
          size={14}
          onPress={() => SafariView.show(showAllUrl)} />
      </View>
    </View>
  );
}
