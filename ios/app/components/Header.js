import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    paddingTop: 15
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
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
