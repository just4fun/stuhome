import { connect } from 'react-redux';
import Main from '../components/Main';

function mapStateToProps(state) {
  let {
    global,
    topicList,
    forumList,
    user,
    topicItem,
    comment
  } = state;

  return {
    global,
    list: {
      topicList,
      forumList
    },
    entity: {
      user,
      topicItem,
      comment
    }
  };
}

module.exports = connect(mapStateToProps)(Main);
