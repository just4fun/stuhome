import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import _ from 'lodash';
import { CachedImage } from "react-native-img-cache";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import { PopButton } from '../components/button';
import colors from '../styles/common/_colors';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_Individual';
import { invalidateUserTopicList, fetchUserTopicList } from '../actions/user/topicListAction';
import { getAlertCount } from '../selectors/alert';
import { AVATAR_ROOT } from '../config';

class Individual extends Component {
  static navigationOptions = {
    title: '个人',
    drawerLockMode: 'locked-closed',
    headerStyle: {
      backgroundColor: colors.lightBlue,
      borderBottomWidth: 0
    }
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
      // user could only see their own favorite topics since it's privacy
      this.TABS = [
        { label: '最近发表', type: 'topic' },
        { label: '最近回复', type: 'reply' },
        { label: '我的收藏', type: 'favorite' }
      ]
    } else {
      let {
        userId,
        userName,
        userAvatar
      } = passProps;
      this.userId = userId;
      this.userName = userName;
      // if user comes from @somebody link, we could not get his/her avatar directly
      this.userAvatar = userAvatar || `${AVATAR_ROOT}&uid=${userId}`;

      this.TABS = [
        { label: 'TA的发表', type: 'topic' },
        { label: 'TA的回复', type: 'reply' },
      ]
    }
  }

  componentDidMount() {
    this.props.fetchUserTopicList({
      userId: this.userId,
      isEndReached: false,
      type: 'topic'
    });
  }

  _refreshUserTopicList({ page, isEndReached, type }) {
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
      userTopicList,
      alertCount
    } = this.props;

    return (
      <View style={mainStyles.container}>
        {
          // !this.props.navigation.state.params &&
          //   <Header
          //     style={styles.nav}
          //     alertCount={alertCount}
          //     updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
          //   ||
          //   <Header
          //     style={styles.nav}>
          //     <PopButton router={router} />
          //     {!this.isLoginUser &&
          //       <Icon
          //         name='envelope'
          //         size={18}
          //         onPress={() => router.toPmList({ userId: this.userId })} />
          //       ||
          //       <Text></Text>
          //     }
          //   </Header>
        }
        <View style={styles.header}>
          <CachedImage
            style={styles.avatar}
            source={{ uri: this.userAvatar }} />
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
                refreshTopicList={({ page, isEndReached }) => this._refreshUserTopicList({ page, isEndReached, type: tab.type })} />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps({ user, userTopicList, alert }) {
  return {
    user,
    userTopicList,
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  invalidateUserTopicList,
  fetchUserTopicList
})(Individual);
