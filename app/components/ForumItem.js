import React, {
  Component,
  View,
  Text
} from 'react-native';
import styles from '../styles/components/_ForumItem';
import SubForumList from './SubForumList';

class ForumItem extends Component {
  render() {
    let {
      board_category_name,
      board_list
    } = this.props.forum;

    return (
      <View style={styles.container}>
        <View style={styles.forumHeader}>
          <Text style={styles.forumTitle}>{board_category_name}</Text>
        </View>
        <SubForumList
          forumList={board_list}
          router={this.props.router} />
      </View>
    );
  }
}

module.exports = ForumItem;
