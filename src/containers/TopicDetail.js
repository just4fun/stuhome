import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  AlertIOS,
  ScrollView,
  ActivityIndicator,
  ListView
} from 'react-native';
import _ from 'lodash';
import Avatar from '../components/Avatar';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import mainStyles from '../styles/components/_Main';
import indicatorStyles from '../styles/common/_Indicator';
import modalStyles from '../styles/common/_Modal';
import styles from '../styles/containers/_TopicDetail';
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

function getTopicId(topic) {
  if (!topic) { return null; }

  // for `hot(今日热门)` tab in Home page, each topic has
  // not `topic_id` field, but they have `source_id` and
  // `source_type` instead.
  if (topic.source_id) { return topic.source_id; }

  return topic.topic_id;
}

class TopicDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    let { title } = navigation.state.params;
    return {
      title,
      drawerLockMode: 'locked-closed'
    };
  }

  constructor(props) {
    super(props);

    let { params } = props.navigation.state;
    this.topicId = getTopicId(params);
    this.boardId = params.board_id;
    this.boardName = params.board_name;

    this.state = {
      isReplyModalOpen: false,
      currentContent: null
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ title: this.boardName });
    this.fetchTopic();
  }

  componentWillUnmount() {
    this.props.resetTopic({ topicId: this.topicId });
  }

  componentWillReceiveProps(nextProps) {
    let { topicItem, topicFavor } = nextProps;

    if (topicItem.errCode) {
      AlertIOS.alert('提示', topicItem.errCode);
      nextProps.navigation.goBack();
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

  endReached() {
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

  renderHeader(topic, uid, vote) {
    let { navigation, topicFavor } = this.props;
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
            <Avatar
              style={styles.avatar}
              url={topic.icon}
              userId={topic.user_id}
              userName={topic.user_nick_name}
              navigation={navigation} />
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
                topicFavor.isFavoring &&
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
            <Content
              content={topic.content}
              currentTopicId={this.topicId}
              navigation={navigation} />
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
            <RewardList
              reward={topic.reward}
              navigation={navigation} />}
        </View>
        <View style={styles.commentHeader}>
          <Text style={styles.commentHeaderText}>
            {commentHeaderText}
          </Text>
        </View>
      </View>
    );
  }

  renderFooter() {
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
    // If we reply a topic, there is no need to pass `boardId`.
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
    let { topicItem, reply, vote, user, navigation } = this.props;
    let { isReplyModalOpen, currentContent } = this.state;

    if (topicItem.isFetching) {
      return (
        <View style={mainStyles.container}>
          <View style={indicatorStyles.fullScreenIndicator}>
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    if (!_.get(topicItem, ['topic', 'topic_id'])) {
      return (
        <View style={mainStyles.container}>
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

        {
          // <Header title={this.boardName}>
          //   <PopButton router={this.props.router} />
          //   {uid &&
          //     <ReplyButton style={modalStyles.button}
          //                  onPress={() => this.toggleReplyModal(true)} />
          //     ||
          //     <Text></Text>
          //   }
          // </Header>
        }
        <ListView
          dataSource={commentSource}
          removeClippedSubviews={false}
          enableEmptySections={true}
          renderRow={comment =>
            <Comment
              key={comment.reply_posts_id}
              comment={comment}
              currentUserId={uid}
              currentTopicId={this.topicId}
              navigation={navigation}
              openReplyModal={() => this.toggleReplyModal(true, comment)} />
          }
          onEndReached={() => this.endReached()}
          onEndReachedThreshold={0}
          renderHeader={() => this.renderHeader(topic, uid, vote)}
          renderFooter={() => this.renderFooter()} />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let { topicItem, reply, vote, user, topicFavor } = state;

  return {
    topicItem: _.get(topicItem, getTopicId(ownProps.navigation.state.params), {}),
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
