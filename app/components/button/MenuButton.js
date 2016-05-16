import React, {
  Component,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class MenuButton extends Component {
  render() {
    return (
      <Icon
        style={this.props.style}
        name='reorder'
        size={18}
        onPress={() => this.context.menuActions.open()} />
    );
  }
}

MenuButton.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

module.exports = MenuButton;
