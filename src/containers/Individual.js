import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopicList from '../components/TopicList';
import colors from '../styles/common/_colors';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import headerRightButtonStyles from '../styles/components/button/_HeaderRightButton';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_Individual';
import { invalidateUserTopicList, fetchUserTopicList } from '../actions/user/topicListAction';
import { AVATAR_ROOT } from '../config';

class Individual extends Component {
  static navigationOptions = ({ navigation }) => {
    let { userId, isLoginUser } = _.get(navigation, ['state', 'params'], {});
    return {
      headerStyle: {
        backgroundColor: colors.lightBlue,
        borderBottomWidth: 0
      },
      headerRight: (
        isLoginUser === false &&
          <Icon
            style={headerRightButtonStyles.button}
            name='envelope'
            size={18}
            onPress={() => navigation.navigate('PrivateMessage', { userId })} />
      )
    };
  }

  constructor(props) {
    super(props);
    this.initTabsAndUserInformation();
  }

  initTabsAndUserInformation() {
    this.TABS = [];

    let {
      user,
      navigation: {
        state: {
          params: passProps
        }
      }
    } = this.props;
    this.isLoginUser = !passProps || (+passProps.userId === user.authrization.uid);

    if (this.isLoginUser) {
      let {
        user: {
          authrization: {
            uid,
            userName,
            avatar
          }
        },
      } = this.props;
      this.userId = uid;
      this.userName = userName;
      this.userAvatar = avatar;
      // User could only see their own favorite topics since it's privacy.
      this.TABS = [
        { label: '最近发表', type: 'topic' },
        { label: '最近回复', type: 'reply' },
        { label: '我的收藏', type: 'favorite' }
      ];
    } else {
      let {
        userId,
        userName,
        userAvatar
      } = passProps;
      this.userId = userId;
      this.userName = userName;
      // If user comes from @somebody link, we could not get his/her avatar directly.
      this.userAvatar = userAvatar || `${AVATAR_ROOT}&uid=${userId}`;

      this.TABS = [
        { label: 'TA的发表', type: 'topic' },
        { label: 'TA的回复', type: 'reply' },
      ];
    }
  }

  componentDidMount() {
    this.props.fetchUserTopicList({
      userId: this.userId,
      isEndReached: false,
      type: 'topic'
    });
    // Display private message button or not.
    this.props.navigation.setParams({
      userId: this.userId,
      isLoginUser: this.isLoginUser
    });
  }

  refreshUserTopicList({ page, isEndReached, type }) {
    this.props.invalidateUserTopicList({
      userId: this.userId,
      type
    });
    this.props.fetchUserTopicList({
      userId: this.userId,
      isEndReached,
      type,
      page
    });
  }

  changeTab(e) {
    this.props.fetchUserTopicList({
      userId: this.userId,
      isEndReached: false,
      type: this.TABS[e.i].type
    });
  }

  render() {
    let {
      navigation,
      userTopicList
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Information', { userId: this.userId });
            }}>
            <Image
              style={styles.avatar}
              source={{ uri: this.userAvatar }} />
          </TouchableOpacity>
          <Text style={styles.userName}>{this.userName}</Text>
        </View>
        <ScrollableTabView
          tabBarActiveTextColor={colors.blue}
          tabBarInactiveTextColor={colors.lightBlue}
          tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
          tabBarTextStyle={scrollableTabViewStyles.tabBarText}
          onChangeTab={e => this.changeTab(e)}>
          {this.TABS.map((tab, index) => {
            return (
              <TopicList
                key={index}
                currentUserId={this.userId}
                tabLabel={tab.label}
                navigation={navigation}
                type={tab.type}
                topicList={_.get(userTopicList, [this.userId, tab.type], {})}
                refreshTopicList={({ page, isEndReached }) => this.refreshUserTopicList({ page, isEndReached, type: tab.type })} />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps({ user, userTopicList }) {
  return {
    user,
    userTopicList
  };
}

export default connect(mapStateToProps, {
  invalidateUserTopicList,
  fetchUserTopicList
})(Individual);
