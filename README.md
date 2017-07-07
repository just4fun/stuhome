![app_icon](https://cloud.githubusercontent.com/assets/7512625/18613513/348f7322-7daf-11e6-902d-94776bb55670.jpg)

[![React Native](https://img.shields.io/badge/react--native-v0.42.2-05A5D1.svg)](https://facebook.github.io/react-native)
[![GitHub issues](https://img.shields.io/github/issues/just4fun/uestc-bbs-react-native.svg)](https://github.com/just4fun/uestc-bbs-react-native/issues)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg)](http://opensource.org/licenses/MIT)

An iOS client for http://bbs.uestc.edu.cn/ written in [React Native](https://facebook.github.io/react-native/) with [Redux](http://redux.js.org/). APIs are provided by [UESTC-BBS](https://github.com/UESTC-BBS/API-Docs/wiki/Mobcent-API).

## Status

[<img width="250" alt="download_on_the_app_store" src="https://user-images.githubusercontent.com/7512625/27969868-353f554c-637f-11e7-869d-3963933461ca.png">](https://itunes.apple.com/cn/app/qing-shui-he-pan-stuhome/id1190564355)

![](https://cloud.githubusercontent.com/assets/7512625/12371330/88981098-bc6a-11e5-8511-6e02c5233006.gif)

## Screenshot

![](https://cloud.githubusercontent.com/assets/7512625/21566137/dc08dc48-ceda-11e6-86f7-6e63ad8a8270.gif)

## Existing functionalities

- [x] Authentication
  - [x] Sign up (Webview)
  - [x] Sign in
  - [x] Sign out
- [x] Forum
  - [x] View forums
  - [x] View sub forums
  - [x] View topics in each forum
- [ ] Topic
  - [x] View latest topics
  - [x] View hot topics
  - [x] View topic detail and comments
  - [x] Publish topic
  - [ ] Edit published topic
  - [x] Reply topic
  - [x] Reply comment
  - [x] Favor topic
  - [x] Upload images
  - [ ] Report objectionable content
- [ ] Vote
  - [ ] Create vote
  - [x] Join in vote
  - [x] View vote results
- [x] Search
- [ ] Notifications
  - [x] View list mentioned(@) me
  - [x] View list replied me
  - [x] View private messages
  - [ ] Notification alert
- [ ] Individual
  - [x] View my recent topics
  - [x] View my favorite topics
  - [ ] Update password
  - [ ] Upload avatar

## Try it out

#### Run in simulator

```bash
git clone git@github.com:just4fun/uestc-bbs-react-native.git
cd uestc-bbs-react-native
npm install
```
Then use Xcode to open this project and simply click **Run**.

#### Run on your iOS device

http://facebook.github.io/react-native/docs/running-on-device.html#running-your-app-on-ios-devices

## Run ESlint

```bash
npm run eslint
```

## Todo list

- ~~Update UI per new design~~ ([30cec4](https://github.com/just4fun/uestc-bbs-react-native/commit/30cec4f0aaf5db976666334106e8d466de05cb88))
- ~~Submit to App Store~~ ([link](https://itunes.apple.com/cn/app/qing-shui-he-pan-stuhome/id1190564355))
- ~~Replace [redux-thunk](https://github.com/gaearon/redux-thunk) with [redux-saga](https://github.com/redux-saga/redux-saga)~~ ([#7](https://github.com/just4fun/uestc-bbs-react-native/pull/7))
- Fixture data (aka `mock data`)
- ~~Unit Testing Infrastructure~~ ([#8](https://github.com/just4fun/uestc-bbs-react-native/pull/8))
- Push notification

## Known issues

- ~~User avatar is not displayed sometimes: [RN/issue](https://github.com/facebook/react-native/issues/5616)~~ (Fixed by this [PR](https://github.com/facebook/react-native/pull/7262) for React Native, and the patch is released in `0.26.0`)
- ~~Switching between pages is not very smooth sometimes~~

## License

[The MIT License](http://opensource.org/licenses/MIT)
