import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    paddingTop: 30
  },
  left: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 15
  },
  title: {
    flex: 2,
    fontSize: 18,
    textAlign: 'center'
  },
  right: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 15
  }
});

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
