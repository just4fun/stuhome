import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  RefreshControl
} from 'react-native';
import mainStyles from '../styles/components/_Main';
import Header from '../components/Header';
import ForumItem from '../components/ForumItem';
import { invalidateForumList, fetchForumListIfNeeded } from '../actions/forumAction';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ForumList extends Component {
  constructor(props) {
    super(props);

    this.boardId = this.props.boardId || 'all';
    this.isTopForumList = this.boardId === 'all';
  }

  componentDidMount() {
    this.props.fetchForumListIfNeeded(this.boardId);
  }

  _refreshForumList() {
    this.props.invalidateForumList();
    this.props.fetchForumListIfNeeded(this.boardId);
  }

  render() {
    let { forumList } = this.props;

    if (!forumList.list[this.boardId]) {
      forumList.list[this.boardId] = {
        forumList: []
      };
    }

    let source = ds.cloneWithRows(forumList.list[this.boardId].forumList);

    return (
      <View style={mainStyles.container}>
        {this.isTopForumList &&
          <Header title='版块' updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        }
        <ListView
          dataSource={source}
          enableEmptySections={true}
          renderRow={forum => {
            return (
              <ForumItem
                key={forum.board_category_id}
                isTopForumList={this.isTopForumList}
                forum={forum}
                router={this.props.router} />
            );
          }}
          refreshControl={
            <RefreshControl
              title='正在加载...'
              onRefresh={() => this._refreshForumList()}
              refreshing={this.isTopForumList ? forumList.isFetching : forumList.isSubFetching} />
          } />
      </View>
    );
  }
}

function mapStateToProps(state) {
  let { forumList } = state;

  return {
    forumList
  };
}

export default connect(mapStateToProps, {
  invalidateForumList,
  fetchForumListIfNeeded
})(ForumList);
