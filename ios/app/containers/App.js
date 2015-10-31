import { connect } from 'react-redux/native';
import Main from '../components/Main';

function mapStateToProps(state) {
  const {
    user,
    topic,
    forum
  } = state;

  return {
    entities: {
      user,
      topic,
      forum
    }
  };
}

export default connect(mapStateToProps)(Main);
