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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello UESTC</Text>
      </View>
    );
  }
}
