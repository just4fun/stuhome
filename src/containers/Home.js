import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topic/topicListAction';

class Home extends Component {
  constructor(props) {
    super(props);

    this.boardId = 'all';
  }

  componentDidMount() {
    this.props.fetchTopicListIfNeeded(this.boardId, false, 'all');
  }

  _refreshTopicList(page, isEndReached) {
    this.props.invalidateTopicList();
    this.props.fetchTopicListIfNeeded(this.boardId, isEndReached, 'all', page);
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
          boardId={this.boardId}
          topicList={topicList}
          refreshTopicList={(page, isEndReached) => this._refreshTopicList(page, isEndReached)} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  let { topicList } = state;

  return {
    topicList
  };
}

export default connect(mapStateToProps, {
  invalidateTopicList,
  fetchTopicListIfNeeded
})(Home);
