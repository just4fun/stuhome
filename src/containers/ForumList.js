import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  RefreshControl
} from 'react-native';
import _ from 'lodash';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import ForumItems from '../components/ForumItems';
import { invalidateForumList, fetchForumList } from '../actions/forumAction';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ForumList extends Component {
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

  _refreshForumList() {
    this.props.invalidateForumList({
      boardId: this.boardId
    });
    this.props.fetchForumList({
      boardId: this.boardId
    });
  }

  render() {
    let {
      router,
      forumList
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <Header title='版块' updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        <ForumItems
          router={router}
          boardId={this.boardId}
          forumList={_.get(forumList, this.boardId, {})}
          isTopForumList={this.isTopForumList}
          refreshForumList={() => this._refreshForumList()} />
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
