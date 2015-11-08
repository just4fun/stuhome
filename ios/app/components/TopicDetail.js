import React, {
  Component,
  View,
  Text,
  Image,
  AlertIOS,
  ScrollView
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_TopicDetail';
import { fetchTopic, resetTopic } from '../actions/topicAction';

export default class TopicDetail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.passProps.topic_id));
  }

  componentWillUnmount() {
    this.props.dispatch(resetTopic());
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch, entity } = nextProps;
    const { topicItem } = entity;

    if (topicItem.errCode) {
      AlertIOS.alert('提示', topicItem.errCode);
      nextProps.router.pop();
      return false;
    }

    return true;
  }

  render() {
    const { topicItem } = this.props.entity;

    if (topicItem.isFetching || !topicItem.topic.topic_id) { return <View></View>; }

    const topic = topicItem.topic;
    const create_date = moment(topic.create_date * 1).startOf('minute').fromNow();

    console.log(topic);

    return (
      <ScrollView style={styles.container}>
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
        </View>
        <View style={styles.content}>
          {topic.content.map((content, index) => <Text key={index} style={styles.contentText}>{content.infor}</Text>)}
        </View>
      </ScrollView>
    );
  }
}
