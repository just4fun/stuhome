import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  AlertIOS,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
  ActionSheetIOS,
  Clipboard
} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';
import Avatar from '~/components/Avatar/Avatar';
import Comment from '~/components/Comment/Comment';
import Content from '~/components/Content/Content';
import VoteList from '~/components/VoteList/VoteList';
import RewardList from '~/components/RewardList/RewardList';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner';
import MessageBar from '~/services/MessageBar';
import SafariView from '~/services/SafariView';
import api from '~/services/api';
import { TOPIC_URL_ROOT } from '~/config/app';
import { parseContentWithEmoji } from '~/utils/contentParser';
import { fetchTopic, resetTopic } from '~/modules/topic/topic/topic.ducks';

import mainStyles from '~/common/styles/Main.style';
import headerRightButtonStyles from '~/common/styles/HeaderRightButton.style';
import indicatorStyles from '~/common/styles/Indicator.style';
import modalStyles from '~/common/styles/Modal.style';
import colors from '~/common/styles/colors.style';
import styles from './TopicDetail.style';

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' })
  ]
});

function getTopicId(topic) {
  if (!topic) { return null; }

  // For `hot(今日热门)` tab in Home page, each topic has
  // not `topic_id` field, but they have `source_id` and
  // `source_type` instead.
  if (topic.source_id) { return topic.source_id; }

  return topic.topic_id;
}

class TopicDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { headerTitle, isLogin, handleShowOperationDialog } = navigation.state.params;
    return {
      title: headerTitle,
      headerRight: (
        isLogin &&
          <Icon
            style={headerRightButtonStyles.button}
            size={24}
            name='ellipsis-h'
            onPress={handleShowOperationDialog} />
      )
    };
  }

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    this.topicId = getTopicId(params);
    this.boardId = params.board_id;
    this.boardName = params.board_name;
    // `sourceWebUrl` could only be fetched in topic list,
    // in other cases, we need to get web url manually.
    this.sourceWebUrl = params.sourceWebUrl || `${TOPIC_URL_ROOT}&tid=${this.topicId}`;

    this.authorId = 0;
    this.order = 0;

    this.state = {
      isFavoring: false,
      isVoting: false
    };
  }

  componentDidMount() {
    // Set up header.
    this.props.navigation.setParams({
      // Use `headerTitle` here to avoid treating topic title
      // as screen header title.
      headerTitle: this.boardName,
      isLogin: !!this.props.session.data.token,
      handleShowOperationDialog: () => this.showOperationDialog()
    });
    this.fetchTopic();
  }

  componentWillReceiveProps(nextProps) {
    const { topicItem } = nextProps;

    // Seems like the code here won't be invoked since we
    // display login modal instead when user clicks topic in
    // home page without credentials. See comments in
    // `topic.ducks` for more information.
    if (topicItem.errCode) {
      AlertIOS.alert('提示', topicItem.errCode);
      nextProps.resetTopic({ topicId: this.topicId });
      nextProps.navigation.goBack();
    }
  }

  fetchTopic(fields) {
    this.props.fetchTopic({
      topicId: this.topicId,
      authorId: this.authorId,
      order: this.order,
      ...fields
    });
  }

  resetFilters() {
    this.authorId = 0;
    this.order = 0;
  }

  favorTopic(isFavorite) {
    this.setState({ isFavoring: true });
    api.favorTopic({
      action: isFavorite ? 'delfavorite' : 'favorite',
      id: this.topicId,
      idType: 'tid'
    }).then(response => {
      if (response.data.rs) {
        MessageBar.show({
          message: '操作成功',
          type: 'success'
        });
        this.resetFilters();
        this.fetchTopic();
      }
    }).finally(() => {
      this.setState({ isFavoring: false });
    });
  }

  endReached() {
    const {
      hasMore,
      isFetching,
      isEndReached,
      page
    } = this.props.topicItem;

    if (!hasMore || isFetching || isEndReached) { return; }

    this.fetchTopic({
      isEndReached: true,
      page: page + 1
    });
  }

  renderHeader() {
    const {
      navigation,
      vote,
      topicItem: {
        topic
      },
      session: {
        data: { uid }
      },
      settings
    } = this.props;
    const { isFavoring, isVoting } = this.state;
    const create_date = moment(+topic.create_date).startOf('minute').fromNow();
    const commentHeaderText =
      topic.replies > 0 ? (topic.replies + '条评论') : '还没有评论，快来抢沙发！';
    // Same with f227938f.
    if (topic.user_id === 0) {
      topic.user_nick_name = '匿名';
    }

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
              currentUserId={uid}
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
                isFavoring &&
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
              settings={settings}
              navigation={navigation} />
            {topic.poll_info &&
              <VoteList
                pollInfo={topic.poll_info}
                isVoting={isVoting}
                publishVote={voteIds => this.publishVote(voteIds)} />
            }
          </View>
          {topic.reward &&
            <RewardList
              reward={topic.reward}
              currentUserId={uid}
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
    const {
      hasMore,
      isEndReached
    } = this.props.topicItem;

    if (!hasMore || !isEndReached) { return <View></View>; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicator />
      </View>
    );
  }

  publishVote(voteIds) {
    this.setState({ isVoting: true });
    api.publishVote({
      topicId: this.topicId,
      voteIds
    }).then(response => {
      if (response.data.rs) {
        this.resetFilters();
        this.fetchTopic();
      }
    }).finally(() => {
      this.setState({ isVoting: false });
    });
  }

  resetVote() {
    this.props.resetVote();
  }

  getCopyContent(content) {
    if (!content || content.length === 0) { return ''; }
    // Only copy text and link.
    return content.map(item => {
      if (item.type === 0 || item.type === 4) {
        // The second parameter is used to exclude custom emoji
        // as copied content which type is also `0`.
        return parseContentWithEmoji(item.infor, false).join('');
      }
    }).join('');
  }

  showOperationDialog() {
    if (this.props.topicItem.isFetching) { return; }

    const {
      session: {
        data: { uid }
      },
      topicItem: {
        topic: {
          user_id,
          managePanel
        }
      }
    } = this.props;

    const isLoginUser = uid === user_id;
    const editable = isLoginUser
      && managePanel
      && managePanel.length > 0
      && managePanel.some(item => item.title === '编辑');

    let options = [
      '返回首页',
      this.order === 0 ? '倒序查看' : '顺序查看',
      this.authorId === 0 ? '只看楼主' : '查看全部',
      '复制内容',
      '复制链接'
    ];
    if (editable) {
      options.push('编辑帖子');
    }
    options.push('取消');

    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex: options.length - 1
    },
    (buttonIndex) => {
      const { topic } = this.props.topicItem;
      switch (buttonIndex) {
        case 0:
          this.props.navigation.dispatch(resetAction);
          break;
        case 1:
          this.order = this.order === 0 ? 1 : 0;
          this.fetchTopic();
          break;
        case 2:
          this.authorId = this.authorId === 0 ? topic.user_id : 0;
          this.fetchTopic();
          break;
        case 3:
          Clipboard.setString(this.getCopyContent(topic.content));
          MessageBar.show({
            message: '复制内容成功',
            type: 'success'
          });
          break;
        case 4:
          Clipboard.setString(this.sourceWebUrl);
          MessageBar.show({
            message: '复制链接成功',
            type: 'success'
          });
          break;
        case 5:
          if (editable) {
            const editAction = managePanel.find(item => item.title === '编辑');
            SafariView.show(editAction.action);
          }
          break;
      }
    });
  }

  render() {
    const { topicItem } = this.props;

    if (topicItem.isFetching || !_.get(topicItem, ['topic', 'topic_id'])) {
      return (
        <LoadingSpinner />
      );
    }

    const {
      topicItem: {
        topic: {
          user_nick_name,
          topic_id,
          replies
        }
      },
      navigation,
      session: {
        data: { uid }
      },
      settings
    } = this.props;

    return (
      <View style={mainStyles.container}>
        <FlatList
          data={topicItem.list}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews={false}
          enableEmptySections={true}
          renderItem={({ item: comment }) => {
            // Same with f227938f.
            if (comment.reply_id === 0) {
              comment.reply_name = '匿名';
            }
            return (
              <Comment
                key={comment.reply_posts_id}
                comment={comment}
                settings={settings}
                currentUserId={uid}
                // `topicId` and `boardId` are not involved in `comment` here,
                // which are necessary for topic reply API.
                topicId={this.topicId}
                boardId={this.boardId}
                navigation={navigation}
                getCopyContent={(content) => this.getCopyContent(content)} />
            );
          }}
          onEndReached={() => this.endReached()}
          onEndReachedThreshold={0}
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => this.renderFooter()} />
        {uid &&
          <TouchableHighlight
            style={styles.commentAreaWrapper}
            underlayColor={colors.underlay}
            onPress={() => navigation.navigate('ReplyModal', {
              comment: {
                // `reply_posts_id` is not necessary when reply topic author
                user_nick_name: user_nick_name,
                board_id: this.boardId,
                topic_id
              },
              isReplyInTopic: true
            })}>
            <View style={styles.commentArea}>
              <Text style={styles.commentAreaText}>发表评论 ({replies}条)</Text>
            </View>
          </TouchableHighlight>
        }
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { topicItem, session, settings } = state;

  return {
    topicItem: _.get(topicItem, getTopicId(ownProps.navigation.state.params), {}),
    session,
    settings
  };
}

export default connect(mapStateToProps, {
  fetchTopic,
  resetTopic
})(TopicDetail);
