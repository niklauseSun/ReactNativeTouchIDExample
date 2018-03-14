/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Button, Toast,WhiteSpace,Model } from 'antd-mobile'

import TouchID from 'react-native-touch-id'
import MyStorage from './MyStorage'
import MyTouchId from './MyTouchId'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


MyStorage._getStorage();

export default class App extends Component<> {
  constructor() {
    super()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button onClick={showToast}>Learn more 点击</Button>
        <WhiteSpace />
        <Button onClick={setTouchID}>设置</Button>
        <WhiteSpace />
        <Button onClick={loginVerify}>验证登录</Button>
        <WhiteSpace />
        <Button onClick={verifyTouchID}>验证</Button>
        <WhiteSpace />
      </View>
    );
  }
}

function setTouchID() {
  MyStorage._load("TouchIDStatus", (ret) => {
    if (ret !== 'true') {
      // 未被设置
      if (TouchID.isSupported()) {
        console.log('current device is support');
        TouchID.isSupported().then(biometryType => {
          if (biometryType === 'TouchID') {
            MyTouchId._authenticate('设置TouchID', (flag,msg) => {
              console.log('flag',flag);
              if (flag) {
                MyStorage._save3("TouchIDStatus","true")
              }
            })
          }
        })
      } else {
        TouchID.info('当前设备不支持TouchID');
      }
    } else {
      Toast.info('当前设备已经设置TouchID');
    }
  });
}

function verifyTouchID() {
  MyStorage._load("TouchIDStatus", (ret) => {
    if (ret === "true") {
      MyTouchId._authenticate('验证TouchID')
    }
  });
}

function loginVerify() {
  MyStorage._load("TouchIDStatus", (ret) => {
    if (ret === "true") {
      MyTouchId._authenticate('验证TouchID', (flag,msg) => {
        console.log('flag',flag);
        if (flag) {
          // login module
        }
      })
    }
  });
}

// function authenticate(msg, callBack) {
//   TouchID.authenticate(msg).then(success => {
//     callBack(success, nil);
//   }).catch(err => {
//     callBack(false, err);
//     switch (err.name) {
//       case 'LAErrorAuthenticationFailed':
//         Toast.info('验证失败');
//         break;
//       case 'LAErrorTouchIDNotAvailable':
//         Toast.info('多次验证失败，请前往配置重新设置TouchID');
//         break;
//       default:
//
//     }
//   });
// }

function showToast() {
  if (TouchID.isSupported()) {
    Toast.info('this is a click');
    console.log('device is support');
  } else {
    Toast.info('current device is not support')
  }
}

function setTouchIDStatus(flag) {
  MyStorage._save3("TouchIDStatus",flag);
}

// 需要的方法
// 1.是否支持touchID
// 2.是否支持faceID
// 3.打开touchID （验证成功 ==> 打开touchID成功，验证失败 ==> 查看touchID设置）
// 4.打开faceID (验证成功 ==> 打开faceID成功，验证失败 ==> 查看faceID设置)
// 5.关闭touchID
// 6.关闭faceID
//
// 登录时的问题
// 用户名密码输入成功后，根据用户身份提示高级验证登录
// 1.患者（是否开启指纹识别或者faceID识别）开启（验证 ==> 通过 开启 ==> 未通过 关闭 ）
// 2.医生（是否开启指纹识别或者faceID识别）开启（验证 ==> 通过 开启 ==> 未通过 验证码二次登录）
// 3.患者端登录（有指纹或者faceID验证就直接验证（成功后把用户密码发到服务器验证））没有就可以选择验证码登录或者用户名密码登录
// 4.医生端登录（指纹和faceID登录同上）否则就验证码和密码都有的登录
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
