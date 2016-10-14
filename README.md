![app_icon](https://cloud.githubusercontent.com/assets/7512625/18613513/348f7322-7daf-11e6-902d-94776bb55670.jpg)

[![React Native](https://img.shields.io/badge/react--native-v0.34.x-05A5D1.svg)](https://facebook.github.io/react-native)
[![GitHub issues](https://img.shields.io/github/issues/just4fun/uestc-bbs-react-native.svg)](https://github.com/just4fun/uestc-bbs-react-native/issues)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg)](http://opensource.org/licenses/MIT)

An iOS client for http://bbs.uestc.edu.cn/ written in [React Native](https://facebook.github.io/react-native/) with [Redux](http://redux.js.org/). APIs are provided by [UESTC-BBS](https://github.com/UESTC-BBS/API-Docs/wiki/Mobcent-API).

![](https://cloud.githubusercontent.com/assets/7512625/12371330/88981098-bc6a-11e5-8511-6e02c5233006.gif)

## Screenshot

![](https://cloud.githubusercontent.com/assets/7512625/18613430/5a6e4700-7dad-11e6-9f17-2a94d1b38768.gif)

## Try it out

#### Run in simulator

```bash
git clone git@github.com:just4fun/uestc-bbs-react-native.git
cd uestc-bbs-react-native
npm install
```
Then use Xcode to open this project and simply click **Run**.

#### Run on your iOS device

- Execute same commands as [Run in simulator](https://github.com/just4fun/uestc-bbs-react-native#run-in-simulator) except last step with Xcode, then follow this [official guide](http://facebook.github.io/react-native/docs/running-on-device-ios.html)
  - **Tip**: JavaScript thread performance suffers greatly when running in dev mode (refer [here](https://facebook.github.io/react-native/docs/performance.html)), so it's best to change `Build Configuration` from `Debug` to `Release` when using offline bundle (refer [here](https://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle)).

## Run ESlint

```bash
npm run eslint
```

## Status

Now it's still being built, and it maybe buggy honestly.

## Existing functionalities

- [x] ~~Login/Logout~~
- [x] ~~Read latest topics~~
- [x] ~~Read forums~~
- [x] ~~Read sub forums~~
- [x] ~~Read topics in each forum~~
- [x] ~~Read topic detail and comments~~
- [x] ~~Reply a topic~~
- [x] ~~Reply a comment~~
- [x] ~~Publish a topic~~
- [x] ~~Search in whole site~~
- [ ] Read private messages
- [ ] Reply private messages
- [ ] Personal settings

## Todo list

- [x] ~~Update UI per new design~~ ([30cec4](https://github.com/just4fun/uestc-bbs-react-native/commit/30cec4f0aaf5db976666334106e8d466de05cb88))
- [ ] Submit to App Store
- [ ] Fixture data (aka `mock data`)
- [ ] Unit Testing (refer this [article](http://www.schibsted.pl/2015/10/testing-react-native-components-with-jest/))

## Known issues

- ~~User avatar is not displayed sometimes: [RN/issue](https://github.com/facebook/react-native/issues/5616)~~ (Fixed by this [PR](https://github.com/facebook/react-native/pull/7262) for React Native, and the patch is released in `0.26.0`)
- Switching between pages is not very smooth sometimes

## License

[The MIT License](http://opensource.org/licenses/MIT)
