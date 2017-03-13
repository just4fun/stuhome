import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import scrollableTabViewStyles from '../styles/common/_ScrollableTabView';
import colors from '../styles/common/_colors';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import { invalidateTopicList, fetchTopicList } from '../actions/topic/topicListAction';

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

  _refreshTopicList(page, isEndReached, sortType) {
    this.props.invalidateTopicList();
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached,
      sortType,
      page
    });
  }

  changeTab(e) {
    if (e.i === 0) { return; }

    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached: false,
      sortType: e.i === 1 ? 'all' : 'publish'
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
          {[
             { label: '最新发表', type: 'publish' },
             { label: '最新回复', type: 'all' }
           ].map((tab, index) => {
             return (
               <TopicList
                 key={index}
                 tabLabel={tab.label}
                 router={router}
                 hasType={true}
                 typeId={this.boardId}
                 type={tab.type}
                 topicList={topicList}
                 refreshTopicList={(page, isEndReached, sortType) => this._refreshTopicList(page, isEndReached, sortType)} />
             );
           })
          }
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
