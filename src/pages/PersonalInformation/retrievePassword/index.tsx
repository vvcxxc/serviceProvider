/**title: 找回密码 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { success, error, sigh } from "@/components/Hint";
import MyInput from "@/components/Input";
import Green_button from "@/components/Green_button"
import VerifyInput from "@/components/VerifyInput"
import Request from '@/service/request';
let timer = null;
export default class Retrieve_password extends Component {
  state = {
    phoneNumber: '',        // 手机号码
    newPassword: '',        //新密码
    confirmPassword:'',       //确认密码
    is_ok: true,
    code: ''
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
    const {code, phoneNumber, newPassword, confirmPassword} = this.state
    if(newPassword != confirmPassword){
      Toast.fail('两次输入密码不一致',1)
      return
    }
  }

  handleSendCode = () => {
    const { phoneNumber } = this.state;
    if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
      Toast.fail('请输入11位有效手机号', 1);
      return;
    }
    let wait = 60;
    if (phoneNumber) {
      let _this = this;
      function resend() {
        if (wait == 0) {
          _this.setState({ is_ok: true });
          clearInterval(timer)
        } else {
          wait--;
          _this.setState({ is_ok: false, wait });
          clearInterval();
        }
      }
      resend();
      timer = setInterval(() => {
        resend()
      }, 1000);
      Request({
        url: 'verifyCode',
        method: 'post',
        data: qs.stringify({
          phone
        })
      }).then(res => {
        if (res.code == 200) {

        } else {
          _this.setState({ is_ok: true });
          clearInterval(timer);
          Toast.fail(res.message);
        }
      })
    } else {
      Toast.fail('请输入手机号', 1)
    }
  }
  handleChangeCode = (e: any) => {
    this.setState({
      code: e.target.value
    })
  }

  render() {
    const {is_ok, code} = this.state
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
          />
          <div><input type="text" placeholder="请输入手机号"/></div> */}
          <div className={styles.verificationCode}>
            <input type="text" placeholder="请输入验证码" onChange={this.handleChangeCode} value={code} />
            {/* <div>发送验证码</div> */}
            {
              is_ok ? (
                <div onClick={this.handleSendCode}>发送验证码</div>
              ) : (
                  <div style={{ background: '#f1f1f1', color: '#ccc' }}>{wait}秒</div>
                )
            }
          </div>

          <MyInput
            placeholder="请输入新密码"
            type="password"
            onDelete={this.onDeleteNewPassword}
            onChange={this.onChangeNewPassword}
            mb={56}
          />
          <MyInput
            placeholder="请确认新密码"
            type="password"
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
