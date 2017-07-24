// certain features such as ES6 modules are not yet supported in Node,
// when we add a module which uses ES6 import statements, we should use
// babel to compile them.
//
// http://stackoverflow.com/a/35045012/2798001
require('babel-register')({
  ignore: /node_modules\/(?!react-native-image-progress|react-native-progress|react-native-vector-icons)/
});
