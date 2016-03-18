import React, {
  Component,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ReplyButton extends Component {
  render() {
    return (
      <Icon
        style={this.props.style}
        name='reply'
        size={18}
        onPress={this.props.onPress} />
    );
  }
}

module.exports = ReplyButton;
