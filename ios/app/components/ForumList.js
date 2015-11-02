import React, {
  Component,
  View,
  Text,
  ListView
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import ForumItem from './ForumItem';
import { invalidateForum, fetchForumIfNeeded } from '../actions/forumAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ForumList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchForumIfNeeded());
  }

  _refreshForum() {
    this.props.dispatch(invalidateForum());
    this.props.dispatch(fetchForumIfNeeded());
  }

  render() {
    const { dispatch, entities } = this.props;
    const { forum } = entities;
    const source = ds.cloneWithRows(forum.list);

    return (
      <ControlledRefreshableListView
        dataSource={source}
        renderRow={(forum) => <ForumItem key={forum.board_category_id} forum={forum} />}
        onRefresh={this._refreshForum.bind(this)}
        isRefreshing={forum.isFetching}
      />
    );
  }
}
