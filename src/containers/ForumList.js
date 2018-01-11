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
import ForumItems from '../components/ForumItems';
import menus from '../constants/menus';
import { MenuButton } from '../components/button';
import { invalidateForumList, fetchForumList } from '../actions/forumAction';
import { getAlertCount } from '../selectors/alert';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ForumList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: menus.forumList.title,
    drawerLockMode: 'locked-closed',
    headerLeft: (
      <MenuButton
        navigation={navigation} />
    )
  })

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
      navigation,
      forumList,
      alertCount
    } = this.props;

    return (
      <View style={mainStyles.container}>
        {
          // <Header title='版块'
          //         alertCount={alertCount}
          //         updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        }
        <ForumItems
          navigation={navigation}
          boardId={this.boardId}
          forumList={_.get(forumList, this.boardId, {})}
          isTopForumList={this.isTopForumList}
          refreshForumList={() => this._refreshForumList()} />
      </View>
    );
  }
}

function mapStateToProps({ forumList, alert }) {
  return {
    forumList,
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps, {
  invalidateForumList,
  fetchForumList
})(ForumList);
