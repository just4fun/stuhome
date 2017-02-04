import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
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
      sortType: 'all'
    });
  }

  _refreshTopicList(page, isEndReached) {
    this.props.invalidateTopicList();
    this.props.fetchTopicList({
      boardId: this.boardId,
      isEndReached,
      sortType: 'all',
      page
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
          title='最新'
          updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <TopicList
          router={router}
          typeId={this.boardId}
          topicList={topicList}
          refreshTopicList={(page, isEndReached) => this._refreshTopicList(page, isEndReached)} />
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
