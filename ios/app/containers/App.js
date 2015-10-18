import { connect } from 'react-redux/native';
import Main from '../components/Main';

function mapStateToProps(state) {
  const { 
    isFetching,
    topic
  } = state;

  return {
    isFetching,
    topic
  };
}

export default connect(mapStateToProps)(Main);
