import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  RefreshControl
} from 'react-native';
import _ from 'lodash';
import mainStyles from '../styles/components/_Main';
import ForumItems from '../components/ForumItems';
import menus from '../constants/menus';
import { invalidateForumList, fetchForumList } from '../actions/forumAction';

class ForumList extends Component {
  static navigationOptions = {
    title: menus.forumList.title
  }

  constructor(props) {
    super(props);

    this.boardId = this.props.boardId || 'all';
    this.isTopForumList = this.boardId === 'all';
  }

  componentDidMount() {
    this.props.fetchForumList({
      boardId: this.boardId
    });
  }

  refreshForumList() {
    this.props.invalidateForumList({
      boardId: this.boardId
    });
    this.props.fetchForumList({
      boardId: this.boardId
    });
  }

  render() {
    let {
      navigation,
      forumList
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <ForumItems
          navigation={navigation}
          boardId={this.boardId}
          forumList={_.get(forumList, this.boardId, {})}
          isTopForumList={this.isTopForumList}
          refreshForumList={() => this.refreshForumList()} />
      </View>
    );
  }
}

function mapStateToProps({ forumList }) {
  return {
    forumList
  };
}

export default connect(mapStateToProps, {
  invalidateForumList,
  fetchForumList
})(ForumList);
