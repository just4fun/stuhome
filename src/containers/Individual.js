import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import _ from 'lodash';
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

const TABS = [
  { label: '最近发表', type: 'topic' },
  { label: '最近回复', type: 'reply' },
  { label: '我的收藏', type: 'favorite' }
];

class Individual extends Component {
  constructor(props) {
    super(props);

    let {
      user: {
        authrization: {
          uid
        }
      },
    } = this.props;
    this.userId = uid;
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
      type: TABS[e.i].type
    });
  }

  render() {
    let {
      router,
      user: {
        authrization: {
          uid,
          avatar,
          userName,
          userTitle,
          creditShowList
        }
      },
      userTopicList
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header
          style={styles.nav}
          updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <ScrollableTabView
          tabBarActiveTextColor={colors.blue}
          tabBarInactiveTextColor={colors.lightBlue}
          tabBarUnderlineStyle={scrollableTabViewStyles.tabBarUnderline}
          tabBarTextStyle={scrollableTabViewStyles.tabBarText}
          onChangeTab={e => this.changeTab(e)}>
          {TABS.map((tab, index) => {
            return (
              <TopicList
                key={index}
                tabLabel={tab.label}
                router={router}
                type={tab.type}
                topicList={_.get(userTopicList, [uid, tab.type], {})}
                refreshTopicList={({ page, isEndReached }) => this._refreshUserTopicList({ page, isEndReached, type: tab.type })} />
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
