import React, {
  Component,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class CommentButton extends Component {
  render() {
    return (
      <Icon
        style={this.props.style}
        name='commenting-o'
        size={18}
        onPress={this.props.onPress} />
    );
  }
}

module.exports = CommentButton;
