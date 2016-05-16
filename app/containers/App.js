import { connect } from 'react-redux';
import Main from '../components/Main';

function mapStateToProps(state) {
  let {
    route,
    topicList,
    forumList,
    user,
    topicItem,
    comment
  } = state;

  return {
    app: {
      route
    },
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
