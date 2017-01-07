![app_icon](https://cloud.githubusercontent.com/assets/7512625/18613513/348f7322-7daf-11e6-902d-94776bb55670.jpg)

[![React Native](https://img.shields.io/badge/react--native-v0.34.x-05A5D1.svg)](https://facebook.github.io/react-native)
[![GitHub issues](https://img.shields.io/github/issues/just4fun/uestc-bbs-react-native.svg)](https://github.com/just4fun/uestc-bbs-react-native/issues)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg)](http://opensource.org/licenses/MIT)

An iOS client for http://bbs.uestc.edu.cn/ written in [React Native](https://facebook.github.io/react-native/) with [Redux](http://redux.js.org/). APIs are provided by [UESTC-BBS](https://github.com/UESTC-BBS/API-Docs/wiki/Mobcent-API).

## Status

Now it's ready on App Store.

https://itunes.apple.com/cn/app/qing-shui-he-pan-stuhome/id1190564355

![](https://cloud.githubusercontent.com/assets/7512625/12371330/88981098-bc6a-11e5-8511-6e02c5233006.gif)

## Screenshot

![](https://cloud.githubusercontent.com/assets/7512625/21566137/dc08dc48-ceda-11e6-86f7-6e63ad8a8270.gif)

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

## Existing functionalities

- [x] Authentication
  - [x] Sign up (Webview)
  - [x] Sign in
  - [x] Sign out
- [x] Forum
  - [x] View forums
  - [x] View sub forums
- [ ] Topic
  - [x] View latest topics
  - [ ] View hot topics
  - [x] View topics in each forum
  - [x] View topic detail and comments
  - [x] Publish topic
  - [x] Reply topic
  - [x] Reply comment
  - [ ] Upload images
  - [ ] Report objectionable content
- [ ] Vote
  - [ ] Create vote
  - [x] Join in vote
  - [x] View vote results
- [x] Search
- [ ] Notifications
  - [x] View list mentioned(@) me
  - [x] View list replied me
  - [ ] View private messages
  - [ ] Notification alert
- [ ] Individual
  - [x] View latest published topics
  - [x] View latest replied topics
  - [ ] View favorite topics
  - [ ] Update password
  - [ ] Upload avatar

## Todo list

- ~~Update UI per new design~~ ([30cec4](https://github.com/just4fun/uestc-bbs-react-native/commit/30cec4f0aaf5db976666334106e8d466de05cb88))
- ~~Submit to App Store~~ ([link](https://itunes.apple.com/cn/app/qing-shui-he-pan-stuhome/id1190564355))
- Fixture data (aka `mock data`)
- Unit Testing (refer this [article](http://www.schibsted.pl/2015/10/testing-react-native-components-with-jest/))

## Known issues

- ~~User avatar is not displayed sometimes: [RN/issue](https://github.com/facebook/react-native/issues/5616)~~ (Fixed by this [PR](https://github.com/facebook/react-native/pull/7262) for React Native, and the patch is released in `0.26.0`)
- Switching between pages is not very smooth sometimes

## License

[The MIT License](http://opensource.org/licenses/MIT)
