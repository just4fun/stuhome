import { connect } from 'react-redux/native';
import Main from '../components/Main';

function mapStateToProps(state) {
  const { 
    topic,
    forum
  } = state;

  return {
    entities: {
      topic,
      forum
    }
  };
}

export default connect(mapStateToProps)(Main);
