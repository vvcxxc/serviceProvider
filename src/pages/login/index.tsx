/**title: 登陆 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button, Icon } from 'antd-mobile';
import { success, error } from "../../components/Hint";
import router from "umi/router";
import Request from '@/service/request';
import qs from 'qs';
import MyInput from "@/components/Input";
import Green_button from "@/components/Green_button"
export default class PageIndex extends Component {

  state = {
    weekTime: ['一', '二', '三', '四', '五', '六', '日'],
    day: '',
    mounthTitle: ['一个月', '三个月', '半年', '一年'],
    showMounthTitle: 0,
    inpText: '',
    inpPassword: ''
  }

  landingData = () => {
    Request({
      url: 'auth/login',
      method: 'post',
      data: qs.stringify({
        account: this.state.inpText,
        password: this.state.inpPassword
      })
    }).then(res => {
      const { code, access_token, message } = res
      if (code !== 200) {
        error('登录失败', message)
        return
      }
      localStorage.setItem('token', access_token)
      success('登录成功')
      setTimeout(() => {
        router.push({ pathname: '/' })
      }, 1100);
    })
  }

  delete = () => {
    this.setState({
      inpText: ''
    })
  }

  //账号输入
  onChangeText = (value: any) => {
    this.setState({
      inpText: value
    })
  }
  //账号删除
  onDeleteText = () => {
    this.setState({
      inpText: ''
    })
  }

  // 密码输入
  onChangePassword = (value: any) => {
    this.setState({
      inpPassword: value
    })
  }

  // 密码删除
  onDeletePassword = () => {
    this.setState({
      inpPassword: ''
    })
  }

  //忘记密码
  forgetPassword = () => {
    router.push({ pathname: '/changePassword/retrieve_password' })
  }

  render() {
    const { day, showMounthTitle } = this.state
    return (
      <div className={styles.pageIndex}>
        <div className={styles.pageContent}>
          <div className={styles.inputBox}>
            <MyInput
              placeholder="请输入账号"
              type="text"
              onDelete={this.onDeleteText}
              onChange={this.onChangeText}
              mb={56}
            />
            <MyInput
              placeholder="请输入密码"
              type="password"
              onDelete={this.onDeletePassword}
              onChange={this.onChangePassword}
              mb={26}
            />
            {/* <div className={styles.forgotten} onClick={this.forgetPassword}>忘记密码</div> */}
          </div>
          <div className={styles.operation}>
            <Green_button
              data={'登录'}
              mb={60}
              onClick={this.landingData}
            />
            <Green_button
              data={'注册'}
              onClick={()=>router.push('/register')}
            />
          </div>
        </div>
        <div id="my_success"></div>
      </div>

    )
  }
}

