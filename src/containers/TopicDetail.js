import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  AlertIOS,
  ScrollView,
  ActivityIndicator,
  ListView
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import modalStyles from '../styles/common/_Modal';
import styles from '../styles/containers/_TopicDetail';
import Header from '../components/Header';
import ReplyModal from '../components/modal/ReplyModal';
import Comment from '../components/Comment';
import Content from '../components/Content';
import VoteList from '../components/VoteList';
import RewardList from '../components/RewardList';
import MessageBar from '../services/MessageBar';
import { PopButton, ReplyButton, CommentButton } from '../components/button';
import { submit } from '../actions/topic/publishAction';
import { resetReply } from '../actions/topic/replyAction';
import {
  fetchTopic,
  resetTopic
} from '../actions/topic/topicAction';
import {
  publishVote,
  resetVote
} from '../actions/topic/voteAction';
import {
  favorTopic,
  resetFavorTopic
} from '../actions/topic/favorAction';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class TopicDetail extends Component {
  constructor(props) {
    super(props);

    this.topicId = this.getTopicId(props.passProps);
    this.boardId = props.passProps.board_id;
    this.boardName = props.passProps.board_name;

    this.state = {
      isReplyModalOpen: false,
      currentContent: null
    };
  }

  getTopicId(topic) {
    // for `hot(今日热门)` tab in Home page, each topic has
    // not `topic_id` field, but they have `source_id` and
    // `source_type` instead.
    if (topic.source_id) { return topic.source_id; }

    return topic.topic_id;
  }

  componentDidMount() {
    this.fetchTopic();
  }

  componentWillUnmount() {
    this.props.resetTopic();
  }

  componentWillReceiveProps(nextProps) {
    let { topicItem, topicFavor } = nextProps;

    if (topicItem.errCode) {
      AlertIOS.alert('提示', topicItem.errCode);
      nextProps.resetTopic();
      nextProps.router.pop();
      return;
    }

    if (topicFavor.response.rs) {
      MessageBar.show({
        message: '操作成功',
        type: 'success'
      });
      nextProps.resetFavorTopic();
      this.fetchTopic();
    }
  }

  fetchTopic() {
    this.props.fetchTopic({
      topicId: this.topicId
    });
  }

  favorTopic(isFavorite) {
    this.props.favorTopic({
      action: isFavorite ? 'delfavorite' : 'favorite',
      id: this.topicId,
      idType: 'tid'
    });
  }

  _endReached() {
    let {
      hasMore,
      isFetching,
      isEndReached,
      page
    } = this.props.topicItem;

    if (!hasMore || isFetching || isEndReached) { return; }

    this.props.fetchTopic({
      topicId: this.topicId,
      isEndReached: true,
      page: page + 1
    });
  }

  _renderHeader(topic, uid, vote) {
    let create_date = moment(+topic.create_date).startOf('minute').fromNow();
    let commentHeaderText =
      topic.replies > 0 ? (topic.replies + '条评论') : '还没有评论，快来抢沙发！';

    return (
      <View>
        <View style={styles.top}>
          <Text style={styles.title}>{topic.title}</Text>
          <View style={styles.info}>
            <Icon
              style={styles.views}
              name='eye'>
              {topic.hits}
            </Icon>
            <Icon
              style={styles.comments}
              name='commenting'>
              {topic.replies}
            </Icon>
          </View>
        </View>
        <View style={styles.postContent}>
          <View style={styles.authorInfo}>
            <Image
             style={styles.avatar}
             source={{ uri: topic.icon }} />
            <View style={styles.author}>
              <View style={styles.row}>
                <Text style={styles.name}>{topic.user_nick_name}</Text>
                <Text style={styles.level}>{topic.userTitle}</Text>
              </View>
              <View style={[styles.row, styles.dateArea]}>
                <Text style={styles.date}>{create_date}</Text>
                {!!topic.mobileSign &&
                  <View style={[styles.row, styles.mobileWrapper]}>
                    <Icon style={styles.mobileIcon} name='mobile' />
                    <Text style={styles.mobileText}>{topic.mobileSign}</Text>
                  </View>
                }
              </View>
            </View>
            <View>
              <Text style={styles.floor}>楼主</Text>
              {uid && (
                this.props.topicFavor.isFavoring &&
                  <ActivityIndicator />
                  ||
                  <Icon
                    style={[styles.favor, topic.is_favor ? styles.fullFavor : styles.emptyFavor]}
                    size={22}
                    name={topic.is_favor ? 'star' : 'star-o'}
                    onPress={() => this.favorTopic(topic.is_favor)} />
              )}
            </View>
          </View>
          <View>
            <Content content={topic.content}
                     router={this.props.router} />
            {topic.poll_info &&
              <VoteList
                pollInfo={topic.poll_info}
                vote={vote}
                publishVote={voteIds => this._publishVote(voteIds)}
                resetVote={() => this._resetVote()}
                fetchTopic={() => this.fetchTopic()} />
            }
          </View>
          {topic.reward &&
            <RewardList reward={topic.reward}
                        router={this.props.router} />}
        </View>
        <View style={styles.commentHeader}>
          <Text style={styles.commentHeaderText}>
            {commentHeaderText}
          </Text>
        </View>
      </View>
    );
  }

  _renderFooter() {
    let {
      hasMore,
      isEndReached
    } = this.props.topicItem;

    if (!hasMore || !isEndReached) { return; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  _publish({ content, replyId, images }) {
    this.props.submit({
      boardId: this.boardId,
      topicId: this.topicId,
      replyId,
      typeId: null,
      title: null,
      images,
      content
    });
  }

  _publishVote(voteIds) {
    this.props.publishVote({
      topicId: this.topicId,
      voteIds
    });
  }

  _resetVote() {
    this.props.resetVote();
  }

  toggleReplyModal(visible, content) {
    this.setState({
      isReplyModalOpen: visible,
      currentContent: content
    });
  }

  render() {
    let { topicItem, reply, vote, user } = this.props;
    let { isReplyModalOpen, currentContent } = this.state;

    if (topicItem.isFetching) {
      return (
        <View style={mainStyles.container}>
          <Header title={this.boardName}>
            <PopButton router={this.props.router} />
          </Header>
          <View style={indicatorStyles.fullScreenIndicator}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    if (!_.get(topicItem, ['topic', 'topic_id'])) {
      return (
        <View style={mainStyles.container}>
          <Header title={this.boardName}>
            <PopButton router={this.props.router} />
          </Header>
        </View>
      );
    }

    let topic = topicItem.topic;
    let { uid } = user.authrization;
    let commentSource = ds.cloneWithRows(topicItem.list);

    return (
      <View style={mainStyles.container}>
        {isReplyModalOpen &&
          <ReplyModal
            {...this.props}
            visible={isReplyModalOpen}
            content={currentContent}
            reply={reply}
            isReplyInTopic={true}
            handlePublish={comment => this._publish(comment)}
            closeReplyModal={() => this.toggleReplyModal(false)}
            fetchTopic={() => this.fetchTopic()} />
        }

        <Header title={this.boardName}>
          <PopButton router={this.props.router} />
          {uid &&
            <ReplyButton style={modalStyles.button}
                         onPress={() => this.toggleReplyModal(true)} />
            ||
            <Text></Text>
          }
        </Header>
        <ListView
          dataSource={commentSource}
          enableEmptySections={true}
          renderRow={comment =>
            <Comment
              key={comment.reply_posts_id}
              comment={comment}
              currentUserId={uid}
              router={this.props.router}
              openReplyModal={() => this.toggleReplyModal(true, comment)} />
          }
          onEndReached={() => this._endReached()}
          onEndReachedThreshold={0}
          renderHeader={() => this._renderHeader(topic, uid, vote)}
          renderFooter={() => this._renderFooter()} />
      </View>
    );
  }
}

function mapStateToProps({ topicItem, reply, vote, user, topicFavor }) {
  return {
    topicItem,
    reply,
    vote,
    user,
    topicFavor
  };
}

export default connect(mapStateToProps, {
  submit,
  resetReply,
  fetchTopic,
  resetTopic,
  publishVote,
  resetVote,
  favorTopic,
  resetFavorTopic
})(TopicDetail);
