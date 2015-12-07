import React, {
  Component,
  View,
  Text,
  ListView
} from 'react-native';
import mainStyles from '../styles/components/_Main';
import Header from './Header';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import ForumItem from './ForumItem';
import { invalidateForumList, fetchForumListIfNeeded } from '../actions/forumAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ForumList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchForumListIfNeeded());
  }

  _refreshForum() {
    this.props.dispatch(invalidateForumList());
    this.props.dispatch(fetchForumListIfNeeded());
  }

  render() {
    const { dispatch, list } = this.props;
    const { forumList } = list;
    const source = ds.cloneWithRows(forumList.list);

    return (
      <View style={mainStyles.container}>
        <Header title='版块' />
        <ControlledRefreshableListView
          dataSource={source}
          renderRow={(forum) => <ForumItem key={forum.board_category_id} forum={forum} router={this.props.router} />}
          onRefresh={this._refreshForum.bind(this)}
          isRefreshing={forumList.isFetching}
        />
      </View>
    );
  }
}
