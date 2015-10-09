import { connect } from 'react-redux/native';
import Main from '../components/Main';

function mapStateToProps(state) {
  const { 
    isFetching
  } = state;

  return {
    isFetching
  };
}

export default connect(mapStateToProps)(Main);
