import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import AboutItem from '../components/AboutItem';
import mainStyles from '../styles/components/_Main';
import styles from '../styles/containers/_About';
import colors from '../styles/common/_colors';
import { AUTHOR_URL, SOURCE_URL, VERSION, COPY_RIGHT, AUTHOR_ID, APP_STORE } from '../config';
import { getAlertCount } from '../selectors/alert';

class About extends Component {
  render() {
    let {
      router,
      alertCount
    } = this.props;

    return (
      <View style={[mainStyles.container, styles.container]}>
        <Header
          title='设置'
          alertCount={alertCount}
          updateMenuState={isOpen => this.props.updateMenuState(isOpen)} />
        
      </View>
    );
  }
}

function mapStateToProps({ alert }) {
  return {
    alertCount: getAlertCount(alert)
  };
}

export default connect(mapStateToProps)(About);
