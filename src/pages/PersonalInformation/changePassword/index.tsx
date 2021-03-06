/**title: 修改密码 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { success, error, sigh } from "@/components/Hint";
import MyInput from "@/components/Input";
import Request from '@/service/request';
import qs from 'qs';
export default class ChangePassword extends Component { 

  state = {
    oldPassword: '',          //旧密码
    newPassword: '',          //新密码
    affirmPassword:'',        //确认密码
    password: "",
    newPrompt: '',
    affirmPrompt:''
  }
  
  //输入旧密码
  inputOldPassword = (value:any) => {
    this.setState({ oldPassword:value})
  }
  //删除旧密码 
  deleteOldPassword = () => {
    this.setState({ oldPassword:''})
  }

  //输入新密码
  inputNewPassword = (value: any) => {
    this.setState({ newPassword: value }, () => {
      this.state.newPassword.length>=6? this.setState({ newPrompt: '' }):null
    })
  }
  //删除新密码
  deleteNewPassword = () => {
    this.setState({ newPassword: '' })
  }

  //输入确认的密码
  inputAffirmPassword = (value: any) => {
    this.setState({ affirmPassword: value }, () => {
      this.state.affirmPrompt.length >= 6 ? this.setState({ affirmPrompt: '' }) : null
    })
  }
  //删除确认的密码
  deleteAffirmPassword = () => {
    this.setState({ affirmPassword: '' })
  }

  confirm = () => {
    const { oldPassword, newPassword, affirmPassword, newPrompt, affirmPrompt } = this.state
    if (newPassword.length < 6) {
      this.setState({ newPrompt: '密码不能少于6位数' })
      return
    }
    if (affirmPassword.length < 6) {
      this.setState({ affirmPrompt: '密码不能少于6位数' })
      return
    }
    if (newPassword !== affirmPassword) {
      sigh('两次输入的密码不一致')
      return
    }
    Request({
      url: 'auth/editPassword',
      method: 'post',
      data: qs.stringify({
        password: newPassword,
        oldPassword: oldPassword
      })
    }).then(res => {
      const { code, message } = res
      if (code !== 200) {
        error('登录失败', message)
        return
      }
      success('修改成功','请重新登录')
    })
  }

  render() {
    const { oldPassword, newPassword, affirmPassword, newPrompt, affirmPrompt } = this.state
    return (
      <div className={styles.changePassword}>
        <div className={styles.changeBox}>
          <MyInput
            type="password"
            placeholder="请输入原密码"
            onDelete={this.deleteOldPassword}
            onChange={this.inputOldPassword}
          />
          <MyInput
            type="password"
            placeholder="请输入不少于6位数的密码"
            onDelete={this.deleteNewPassword}
            onChange={this.inputNewPassword}
            prompt={newPrompt}
        />
          <MyInput
            type="password"
            placeholder="请再次输入新密码"
            onDelete={this.deleteAffirmPassword}
            onChange={this.inputAffirmPassword}
            prompt={affirmPrompt}
          />
          <div className={styles.forget}>忘记密码</div>
          <div className={styles.confirm} onClick={this.confirm}><div>确认修改</div></div>
        </div>
        <div id="my_success"></div>
      </div>
    )
  }
}