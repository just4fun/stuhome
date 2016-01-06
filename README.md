# uestc-bbs-react-native

An iOS client for http://bbs.uestc.edu.cn/ written in [React Native](https://facebook.github.io/react-native/) with [Redux](http://redux.js.org/). APIs are provided by [UESTC-BBS](https://github.com/UESTC-BBS/API-Docs/wiki/Mobcent-API).

###~~[Live Demo](https://rnplay.org/apps/VEFTKg)~~

## Screenshot

![](http://g.recordit.co/Z3RyLrdFTq.gif)

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

- ~~Download [React Native Playground](https://itunes.apple.com/us/app/react-native-playground/id1002032944) from App Store~~

  - ~~Then scan QR code below~~

  ![stuhome_qrcode](https://cloud.githubusercontent.com/assets/7512625/12009164/0082d9f8-aca8-11e5-9b04-a88bf9ff4ae3.png)

  - ~~Or search `stuhome` directly~~

## Status

Now it's still being built, and it maybe buggy honestly.

## Existing functionalities

- [x] Login/Logout
- [x] Read latest topics
- [x] Read forums
- [ ] Read sub forums
- [x] Read topics in each forum
- [x] Read topic detail and comments
- [x] Reply a topic
- [ ] Reply a comment
- [ ] Publish a topic
- [ ] Search in whole site
- [ ] Read private messages
- [ ] Reply private messages
- [ ] Personal settings

## Known issues

- User avatar is not displayed sometimes
- Switching between pages is not very smooth

## License
[The MIT License](http://opensource.org/licenses/MIT)
