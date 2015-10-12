import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Dimensions from 'Dimensions';
import SideMenu from 'react-native-side-menu';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20
  },
  item: {
    fontSize: 18,
    paddingTop: 10
  }
});

export default class Menu extends Component {
  _navigateTo(route) {
    this.context.menuActions.close();
    this.props.navigateTo(route);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.item} onPress={() => this._navigateTo({id: 'home', title: '最新'})}>最新</Text>
        <Text style={styles.item} onPress={() => this._navigateTo({id: 'forumList', title: '版块'})}>版块</Text>
      </View>
    );
  }
}

Menu.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
}
