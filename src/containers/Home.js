import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import { invalidateTopicList, fetchTopicList } from '../actions/topic/topicListAction';

const TABS = [
  { label: '最新发表', type: 'publish' },
  { label: '最新回复', type: 'all' },
  { label: '今日热门', type: 'hot' }
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.boardId = 'all';
  }

  componentDidMount() {
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: 'publish'
    });
  }

  _refreshTopicList({ page, isEndReached, sortType }) {
    this.props.invalidateTopicList({
      boardId: this.boardId,
      sortType
    });
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached,
      sortType,
      page
    });
  }

  changeTab(e) {
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: TABS[e.i].type
    });
  }

  render() {
    let {
      router,
      topicList
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header
          title='首页'
          updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
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
                topicList={_.get(topicList, [this.boardId, tab.type], {})}
                refreshTopicList={({ page, isEndReached }) => this._refreshTopicList({ page, isEndReached, sortType: tab.type })} />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps({ topicList }) {
  return {
    topicList
  };
}

export default connect(mapStateToProps, {
  invalidateTopicList,
  fetchTopicList
})(Home);
