[![React Native](https://img.shields.io/badge/react--native-v0.21.x-05A5D1.svg)](https://facebook.github.io/react-native)
[![GitHub issues](https://img.shields.io/github/issues/just4fun/uestc-bbs-react-native.svg)](https://github.com/just4fun/uestc-bbs-react-native/issues)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg)](http://opensource.org/licenses/MIT)

An iOS client for http://bbs.uestc.edu.cn/ written in [React Native](https://facebook.github.io/react-native/) with [Redux](http://redux.js.org/). APIs are provided by [UESTC-BBS](https://github.com/UESTC-BBS/API-Docs/wiki/Mobcent-API).

###~~[Live Demo](https://rnplay.org/apps/VEFTKg)~~

![](https://cloud.githubusercontent.com/assets/7512625/12371330/88981098-bc6a-11e5-8511-6e02c5233006.gif)

## Screenshot

![](https://cloud.githubusercontent.com/assets/7512625/13497473/54ac771a-e190-11e5-9a63-944ed8f836a1.gif)

## Try it out

#### Run in simulator

```bash
git clone git@github.com:just4fun/uestc-bbs-react-native.git
cd uestc-bbs-react-native
npm install
```
Then use Xcode to open this project and simply click **Run**.

#### ~~Run in browser~~

~~Open [Live Demo](https://github.com/just4fun/uestc-bbs-react-native#live-demo) which hosted this project on the web and run it through [Appetize.io](http://www.appetize.io/) via [RNPlay](https://rnplay.org/).~~

#### Run on your iOS device

- Execute same commands as [Run in simulator](https://github.com/just4fun/uestc-bbs-react-native#run-in-simulator) except last step with Xcode, then follow this [official guide](http://facebook.github.io/react-native/docs/running-on-device-ios.html)
  - **Tip**: JavaScript thread performance suffers greatly when running in dev mode (refer [here](https://facebook.github.io/react-native/docs/performance.html)), so it's best to change `Build Configuration` from `Debug` to `Release` when using offline bundle (refer [here](https://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle)).

- ~~Download [React Native Playground](https://itunes.apple.com/us/app/react-native-playground/id1002032944) from App Store~~

  - ~~Then scan QR code below~~

  ![stuhome_qrcode](https://cloud.githubusercontent.com/assets/7512625/12009164/0082d9f8-aca8-11e5-9b04-a88bf9ff4ae3.png)

  - ~~Or search `stuhome` directly~~

## Run ESlint

```bash
npm run eslint
```

## Status

Now it's still being built, and it maybe buggy honestly.

## Existing functionalities

- [x] Login/Logout
- [x] Read latest topics
- [x] Read forums
- [x] Read sub forums
- [x] Read topics in each forum
- [x] Read topic detail and comments
- [x] Reply a topic
- [x] Reply a comment
- [x] Publish a topic
- [ ] Search in whole site
- [ ] Read private messages
- [ ] Reply private messages
- [ ] Personal settings

## Todo list

- [ ] Fixture data (aka `mock data`)
- [ ] Unit Testing (refer this [article](http://www.schibsted.pl/2015/10/testing-react-native-components-with-jest/))

## Known issues

- ~~User avatar is not displayed sometimes: [issue](https://github.com/facebook/react-native/issues/5616)~~ (Fixed by this [PR](https://github.com/facebook/react-native/pull/7262) for React Native)
- Switching between pages is not very smooth: [performance](https://facebook.github.io/react-native/docs/performance.html)

## License

[The MIT License](http://opensource.org/licenses/MIT)
