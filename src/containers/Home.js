import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import { invalidateTopicList, fetchTopicListIfNeeded } from '../actions/topic/topicListAction';

class Home extends Component {
  render() {
    return (
      <View style={mainStyles.container}>
        <Header title='最新' updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <TopicList {...this.props} />
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
