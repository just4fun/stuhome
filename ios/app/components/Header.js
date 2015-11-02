import React, {
  Component,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/components/_Header';

export default class Header extends Component {
  openSideMenu() {
    this.context.menuActions.open();
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.left} name='reorder' size={18} onPress={this.openSideMenu.bind(this)} />
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.right}></Text>
      </View>
    );
  }
}

Header.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
}
