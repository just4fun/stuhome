import React, {
  Component,
  View
} from 'react-native';
import SubForumItem from './SubForumItem';

class SubForumList extends Component {
  render() {
    let { forumList } = this.props;

    return (
      <View>
        {forumList.map(subForum => {
          return (
            <SubForumItem
              key={subForum.board_id}
              subForum={subForum}
              router={this.props.router} />
          );
        })}
      </View>
    );
  }
}

module.exports = SubForumList;
