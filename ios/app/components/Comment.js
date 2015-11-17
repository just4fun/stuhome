import React, {
  Component,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import styles from '../styles/components/_Comment';

export default class Comment extends Component {
  render() {
    let { icon, reply_name, userTitle, position, reply_content, posts_date } = this.props.comment;

    posts_date = moment(posts_date * 1).startOf('minute').fromNow();

    return (
      <View style={styles.commentItem}>
        <View style={styles.authorInfo}>
          <Image
           style={styles.avatar}
           source={{uri: icon}}
          />
          <View style={styles.author}>
            <Text style={styles.name}>{reply_name}</Text>
            <Text style={styles.level}>{userTitle}</Text>
          </View>
          <Text style={styles.floor}>#{position}</Text>
        </View>
        <View style={styles.comment}>
          {reply_content.map((content, index) => {
            switch (content.type) {
              // text
              case 0:
              default:
                return <Text key={index}
                             style={[styles.commentSection, styles.commentText]}>
                         {content.infor}
                       </Text>;
              // pic
              case 1:
                return <Image key={index}
                              style={[styles.commentSection, styles.commentImage]}
                              source={{uri: content.originalInfo}} />
            }
          })}
        </View>
        <View style={styles.other}>
          <Text style={styles.date}>{posts_date}</Text>
        </View>
      </View>
    );
  }
}
