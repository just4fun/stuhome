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
    let leftTopButton = null;

    if (this.props.needPopButton) {
      leftTopButton = <Icon
                        style={styles.left}
                        name='angle-left'
                        size={18}
                        onPress={() => this.props.router.pop()} />
    } else {
      leftTopButton = <Icon
                        style={styles.left}
                        name='reorder'
                        size={18}
                        onPress={this.openSideMenu.bind(this)} />;
    }

    return (
      <View style={styles.container}>
        {leftTopButton}
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.right}></Text>
      </View>
    );
  }
}

Header.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
}
