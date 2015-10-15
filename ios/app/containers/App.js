import { connect } from 'react-redux/native';
import Main from '../components/Main';

function mapStateToProps(state) {
  const { 
    isFetching,
    topics
  } = state;

  return {
    isFetching,
    topics
  };
}

export default connect(mapStateToProps)(Main);
