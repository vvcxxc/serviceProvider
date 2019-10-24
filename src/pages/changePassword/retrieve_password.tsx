/**title: 找回密码 */
import React, { Component } from 'react';
import styles from './retrieve_password.less'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { success, error, sigh } from "../../components/Hint";
import MyInput from "@/components/Input";
import Green_button from "@/components/Green_button"
import VerifyInput from "@/components/VerifyInput"
export default class Retrieve_password extends Component { 
  state = {
    phoneNumber: '',        // 手机号码
    verify: '',   //验证码
    newPassword: '',        //新密码
    confirmPassword:''       //确认密码
  }

 //手机号码输入框
  onChangePhone = (value:any) => {
    this.setState({
      phoneNumber:value
    })
  }

  onDeletePhone = () => {
    this.setState({
      phoneNumber:''
    })
  }

// 验证码
    onChangeVerify = (value:any) => {
    this.setState({
      verify:value
    })
  }

  onDeleteVerify = () => {
    this.setState({
      verify:''
    })
  }

  // 新密码
  onChangeNewPassword = (value: any) => {
    this.setState({
      newPassword: value
    })
  }

  onDeleteNewPassword = () => {
    this.setState({
      newPassword: ''
    })
  }

  //确认密码
  onChangeConfirmPassword = (value: any) => {
    this.setState({
      confirmPassword: value
    })
  }

  onDeleteConfirmPassword = () => {
    this.setState({
      confirmPassword: ''
    })
  }

  


  onclickData = () => {
    
    // success('修改成功',1)
    // error('修改失败',1)
  }

  landingData = () => {
    
  }

  render() {
    return (
      <div className={styles.retrieve_password}>
        <div className={styles.passwordBox}>
          <MyInput
            placeholder="请输入手机号"
            type="text"
            onDelete={this.onDeletePhone}
            onChange={this.onChangePhone}
            mb={56}
          />
          {/* <VerifyInput
          phone={}
          /> */}
          {/* <div><input type="text" placeholder="请输入手机号"/></div> */}
         
          <MyInput
            placeholder="请输入新密码"
            type="text"
            onDelete={this.onDeleteNewPassword}
            onChange={this.onChangeNewPassword}
            mb={56}
          />
          <MyInput
            placeholder="请确认新密码"
            type="text"
            onDelete={this.onDeleteConfirmPassword}
            onChange={this.onChangeConfirmPassword}
            mb={56}
          />
          <Green_button
            data={'确定'}
            mb={60}
            onClick={this.landingData}
          />
          {/* <div><input type="password" placeholder="请输入新密码"/></div>
          <div><input type="password" placeholder="请确认新密码" /></div> */}
          {/* <div className={styles.passwordButton} onClick={this.onclickData}>确定</div> */}
        </div>
        <div id="success"></div>
      </div>
    )
  }
}