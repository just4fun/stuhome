import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 18
  }
});

export default class Header extends Component {
  openSideMenu() {
    this.context.menuActions.open();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title} onPress={this.openSideMenu.bind(this)}>{this.props.title}</Text>
      </View>
    );
  }
}

Header.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
}
