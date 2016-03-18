import React, {
  Component,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class PopButton extends Component {
  render() {
    return (
      <Icon
        style={this.props.style}
        name='angle-left'
        size={18}
        onPress={() => this.props.router.pop()} />
    );
  }
}

module.exports = PopButton;
