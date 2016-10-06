import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  AlertIOS
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_ForumDetail';
import colors from '../styles/common/_colors';
import Header from '../components/Header';
import TopicList from '../components/TopicList';
import ForumList from './ForumList';
import PublishModal from '../components/modal/PublishModal';
import { PopButton, PublishButton } from '../components/button';
import { publish, resetPublish } from '../actions/topic/topicAction';
import { invalidateTopicList, fetchTopicListIfNeeded, resetTopicList } from '../actions/topic/topicListAction';

class ForumDetail extends Component {
  constructor(props) {
    super(props);

    let {
      board_id,
      board_name,
      board_content,
      board_child
    } = props.passProps;
    this.boardId = board_id;
    this.boardName = board_name;
    this.boardContent = !!board_content;
    this.boardChild = !!board_child;
  }

  componentWillReceiveProps(nextProps) {
    let { topicList } = nextProps;

    if (topicList.errCode) {
      AlertIOS.alert('提示', topicList.errCode);
      nextProps.resetTopicList(this.boardId);
      nextProps.router.pop();
    }
  }

  componentDidMount() {
    this.props.fetchTopicListIfNeeded(this.boardId, false, 'all');
  }

  _refreshTopicList(page, isEndReached) {
    this.props.invalidateTopicList();
    this.props.fetchTopicListIfNeeded(this.boardId, isEndReached, 'all', page);
  }

  _publish(topic) {
    let { typeId, title, content } = topic;

    this.props.publish(
      this.boardId,
      null,
      null,
      typeId,
      title,
      content
    );
  }

  render() {
    let {
      topicList,
      comment,
      user: {
        authrization: { token }
      }
    } = this.props;

    if (!topicList.list[this.boardId]) {
      topicList.list[this.boardId] = {
        typeList: [],
        topicList: []
      };
    }

    let typeList = topicList.list[this.boardId].typeList;

    return (
      <View style={mainStyles.container}>
        <PublishModal
          ref={component => this._publishModal = component}
          {...this.props}
          visible={false}
          comment={comment}
          types={typeList}
          handlePublish={topic => this._publish(topic)} />

        <Header
          title={this.boardName}
          comment={comment}>
          <PopButton router={this.props.router} />
          {token &&
            <PublishButton
              onPress={() => this._publishModal.openPublishModal()} />
            ||
            <Text></Text>
          }
        </Header>
        {this.boardContent && this.boardChild &&
          <ScrollableTabView
            tabBarBackgroundColor={colors.lightBlue}
            tabBarActiveTextColor={colors.white}
            tabBarInactiveTextColor={colors.white}
            tabBarUnderlineStyle={styles.tabBarUnderline}
            tabBarTextStyle={styles.tabBarText}>
            <TopicList
              tabLabel='最新'
              router={this.props.router}
              boardId={this.boardId}
              topicList={topicList}
              refreshTopicList={(page, isEndReached) => this._refreshTopicList(page, isEndReached)} />
            <ForumList
              tabLabel='子版块'
              boardId={this.boardId}
              {...this.props} />
          </ScrollableTabView>
        }
        {this.boardContent && !this.boardChild &&
          <TopicList
            router={this.props.router}
            boardId={this.boardId}
            topicList={topicList}
            refreshTopicList={(page, isEndReached) => this._refreshTopicList(page, isEndReached)} />
        }
        {!this.boardContent && this.boardChild &&
          <ForumList boardId={this.boardId} {...this.props} />
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  let { topicList, comment, user } = state;

  return {
    topicList,
    comment,
    user
  };
}

export default connect(mapStateToProps, {
  publish,
  resetPublish,
  invalidateTopicList,
  fetchTopicListIfNeeded,
  resetTopicList
})(ForumDetail);
