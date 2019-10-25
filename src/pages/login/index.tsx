/**title: 登录 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button, Icon } from 'antd-mobile';
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
    inpPassword: '',
    textPrompt: '',
    passwordPrompt:''
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

  landingData = () => {
    const { inpText, inpPassword } = this.state
    let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
    if (!inpText ) {
      Toast.fail('手机号不能为空,请重新输入')
      return
    }
    if (!inpPassword) {
      Toast.fail('密码不能为空,请重新输入')
      return
    }

    Request({
      url: 'auth/login',
      method: 'post',
      data: qs.stringify({
        account: this.state.inpText,
        password: this.state.inpPassword
      })
    }).then(res => {
      const { code, access_token, message, checkout_status } = res
      if(access_token){
        localStorage.setItem('token', access_token)
      }
      switch(checkout_status){
        case 0:
          Toast.fail('当前服务商账号审核中', 2)
          break
        case 1:
          Toast.success('登录成功',1,()=>{
            router.push({ pathname: '/' })
          })
          break;
        case 2:
          Toast.fail('当前服务商账号审核拒绝，请重新提交资料', 2,()=>{
            router.push({ pathname: '/submitQua/BankCard' })
          })
          break;
        case 1001:
          router.push('/chooseid')
          break;
        case 1002:
          router.push('/submitQua/BankCard')
          break
        case 1003:
          Toast.fail('账号已禁用，请联系代理商',2)
          break
        default:
          router.push({ pathname: '/' })
      }
    })
  }

  //忘记密码
  forgetPassword = () => {

    router.push({ pathname: '/changePassword/retrieve_password' })
  }

  render() {
    const {  textPrompt, passwordPrompt } = this.state
    return (
      <div className={styles.pageIndex}>
        <div className={styles.pageContent}>
          {/* <Calendar></Calendar> */}
          <div className={styles.inputBox}>
            <MyInput
              placeholder="请输入手机号"
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

