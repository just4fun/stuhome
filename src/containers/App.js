import { connect } from 'react-redux';
import Main from '../components/Main';

function mapStateToProps(state) {
  let {
    topicList,
    forumList,
    user,
    topicItem,
    comment,
    vote
  } = state;

  return {
    list: {
      topicList,
      forumList
    },
    entity: {
      user,
      topicItem,
      comment,
      vote
    }
  };
}

module.exports = connect(mapStateToProps)(Main);
