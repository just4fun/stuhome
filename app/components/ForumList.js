import React, {
  Component,
  View,
  Text,
  ListView
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview/lib/ControlledRefreshableListView';
import mainStyles from '../styles/components/_Main';
import Header from './Header';
import ForumItem from './ForumItem';
import { invalidateForumList, fetchForumListIfNeeded } from '../actions/forumAction';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ForumList extends Component {
  constructor(props) {
    super(props);
    this.boardId = this.props.boardId || 'all';
    this.isTopForumList = this.boardId === 'all';
  }

  componentDidMount() {
    this.props.dispatch(fetchForumListIfNeeded(this.boardId));
  }

  _refreshForumList() {
    this.props.dispatch(invalidateForumList());
    this.props.dispatch(fetchForumListIfNeeded(this.boardId));
  }

  render() {
    let { forumList } = this.props.list;

    if (!forumList.list[this.boardId]) {
      forumList.list[this.boardId] = {
        forumList: []
      };
    }

    let source = ds.cloneWithRows(forumList.list[this.boardId].forumList);

    return (
      <View style={mainStyles.container}>
        {this.isTopForumList &&
          <Header title='版块' />
        }
        <ControlledRefreshableListView
          dataSource={source}
          renderRow={forum => {
            return (
              <ForumItem
                key={forum.board_category_id}
                isTopForumList={this.isTopForumList}
                forum={forum}
                router={this.props.router} />
            );
          }}
          onRefresh={() => this._refreshForumList()}
          isRefreshing={this.isTopForumList ? forumList.isFetching : forumList.isSubFetching} />
      </View>
    );
  }
}

module.exports = ForumList;
