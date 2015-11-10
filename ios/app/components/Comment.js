import React, {
  Component,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from '../styles/components/_Comment';

export default class Comment extends Component {
  render() {
    const { comment } = this.props;

    return (
      <View style={styles.commentItem}>
        <View style={styles.authorInfo}>
          <View style={styles.avatarWapper}>
            <Image
             style={styles.avatar}
             source={{uri: comment.icon}}
            />
          </View>
          <View style={styles.author}>
            <Text style={styles.name}>{comment.reply_name}</Text>
            <Text style={styles.level}>{comment.userTitle}</Text>
          </View>
          <Text style={styles.floor}>#{comment.position}</Text>
        </View>
        <View>
          {comment.reply_content.map((content, index) =>
            <Text key={index} style={styles.commentText}>{content.infor}</Text>)}
        </View>
      </View>
    );
  }
}
