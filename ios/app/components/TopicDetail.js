import React, {
  Component,
  View,
  Text,
  Image,
  AlertIOS,
  ScrollView,
  ActivityIndicatorIOS
} from 'react-native';
import moment from 'moment';
import Comment from './Comment';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_TopicDetail';
import indicatorStyles from '../styles/common/_Indicator';
import { fetchTopic, resetTopic } from '../actions/topicAction';

export default class TopicDetail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.passProps.topic_id));
  }

  componentWillUnmount() {
    this.props.dispatch(resetTopic());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, entity } = nextProps;
    const { topicItem } = entity;

    if (topicItem.errCode) {
      AlertIOS.alert('提示', topicItem.errCode);
      nextProps.router.pop();
    }
  }

  render() {
    const { topicItem } = this.props.entity;

    if (topicItem.isFetching || !topicItem.topic || !topicItem.topic.topic_id) {
      return (
        <View style={indicatorStyles.indicator}>
          <ActivityIndicatorIOS />
        </View>
      );
    }

    const topic = topicItem.topic;
    const create_date = moment(topic.create_date * 1).startOf('minute').fromNow();
    const commentHeaderText =
      topicItem.list.length ? (topicItem.list.length + '条评论') : '还没有评论，快来抢沙发！';

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
            {topic.content.map((content, index) => <Text key={index} style={styles.contentText}>{content.infor}</Text>)}
          </View>
        </View>
        <View style={styles.commentHeader}>
          <Text style={styles.commentHeaderText}>
            {commentHeaderText}
          </Text>
        </View>
        <View style={styles.commentList}>
          {topicItem.list.length > 0 &&
            topicItem.list.map(comment => <Comment key={comment.reply_posts_id} comment={comment} />)
          }
        </View>
      </ScrollView>
    );
  }
}
