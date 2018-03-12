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

import { Button, Toast,WhiteSpace } from 'antd-mobile'

import {Actions as NavigationActions} from 'react-native-router-flux'

import TouchID from 'react-native-touch-id'

import MyStorage from './MyStorage'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

MyStorage._getStorage();

export default class App extends Component<Props> {
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
        <WhiteSpace/>
        <Button onClick={setStorage}>设置</Button>
        <WhiteSpace/>
        <Button onClick={getStorage}>验证</Button>
        <WhiteSpace />
      </View>
    );
  }
}

function setStorage() {
  var user = new Object();
  user.from = "我来自中国";
  user.userid = "12222";
  user.token = "myToken";
  MyStorage._save3("user3",user);
}

function getStorage() {
  MyStorage._load("user3", function(data) {
    console.log("---- data ----", data);
  });
}

function showToast() {

  // if (TouchID.isSupported()) {
  //   Toast.info('this is a click');
  //   console.log('device is support');
  // } else {
  //   Toast.info('current device is not support')
  // }
  TouchID.authenticate('to demo this react-native component')
  .then(success => {
    // Success code
  })
  .catch(error => {
    // Failure code
    Toast.info(error.message)
  });
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
