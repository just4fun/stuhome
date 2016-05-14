import React, {
  Component,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toggleSideMenu } from '../../actions/globalAction';

class MenuButton extends Component {
  render() {
    return (
      <Icon
        style={this.props.style}
        name='reorder'
        size={18}
        onPress={() => this.props.dispatch(toggleSideMenu())} />
    );
  }
}

module.exports = MenuButton;
