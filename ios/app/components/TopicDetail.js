import React, {
  Component,
  View,
  Text,
  Image,
  AlertIOS,
  ScrollView,
  ActivityIndicatorIOS,
  ListView
} from 'react-native';
import moment from 'moment';
import Comment from './Comment';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_TopicDetail';
import indicatorStyles from '../styles/common/_Indicator';
import { fetchTopic, resetTopic } from '../actions/topicAction';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class TopicDetail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.passProps.topic_id));
  }

  componentWillUnmount() {
    this.props.dispatch(resetTopic());
  }

  componentWillReceiveProps(nextProps) {
    const { topicItem } = nextProps.entity;

    if (topicItem.errCode) {
      AlertIOS.alert('提示', topicItem.errCode);
      nextProps.router.pop();
    }
  }

  _endReached() {
    const {
      hasMore,
      isFetching,
      isEndReached,
      page
    } = this.props.entity.topicItem;

    if (!hasMore || isFetching || isEndReached) { return; }

    this.props.dispatch(fetchTopic(this.props.passProps.topic_id, true, page + 1));
  }

  _renderFooter() {
    const {
      hasMore,
      isFetching,
      isEndReached,
      page
    } = this.props.entity.topicItem;

    if (!hasMore || !isEndReached) { return <View></View>; }

    return (
      <View style={indicatorStyles.endRechedIndicator}>
        <ActivityIndicatorIOS />
      </View>
    );
  }

  render() {
    const { topicItem } = this.props.entity;

    if (topicItem.isFetching || !topicItem.topic || !topicItem.topic.topic_id) {
      return (
        <View style={indicatorStyles.fullScreenIndicator}>
          <ActivityIndicatorIOS />
        </View>
      );
    }

    const topic = topicItem.topic;
    const create_date = moment(topic.create_date * 1).startOf('minute').fromNow();
    const commentSource = ds.cloneWithRows(topicItem.list);
    const commentHeaderText =
      topic.replies > 0 ? (topic.replies + '条评论') : '还没有评论，快来抢沙发！';

    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{topic.title}</Text>
          <View style={styles.info}>
            <Icon
              style={styles.views}
              name='eye'>
              {topic.hits}
            </Icon>
            <Icon
              style={styles.comments}
              name='comments'>
              {topic.replies}
            </Icon>
            <Text style={styles.date}>{create_date}</Text>
          </View>
        </View>
        <View style={styles.postContent}>
          <View style={styles.authorInfo}>
            <View style={styles.avatarWapper}>
              <Image
               style={styles.avatar}
               source={{uri: topic.icon}}
              />
            </View>
            <View style={styles.author}>
              <Text style={styles.name}>{topic.user_nick_name}</Text>
              <Text style={styles.level}>{topic.userTitle}</Text>
            </View>
            <Text style={styles.floor}>楼主</Text>
          </View>
          <View>
            {topic.content.map((content, index) => {
              switch (content.type) {
                // text
                case 0:
                default:
                  return <Text key={index}
                               style={[styles.contentItem, styles.contentText]}>
                           {content.infor}
                         </Text>;
                // pic
                case 1:
                  return <Image key={index}
                                style={[styles.contentItem, styles.contentImage]}
                                source={{uri: content.originalInfo}} />
              }
            })}
          </View>
        </View>
        <View style={styles.commentHeader}>
          <Text style={styles.commentHeaderText}>
            {commentHeaderText}
          </Text>
        </View>
        <ListView
          style={styles.commentList}
          dataSource={commentSource}
          renderRow={comment => <Comment key={comment.reply_posts_id} comment={comment} />}
          onEndReached={this._endReached.bind(this)}
          onEndReachedThreshold={0}
          renderFooter={this._renderFooter.bind(this)}
        />
      </ScrollView>
    );
  }
}
