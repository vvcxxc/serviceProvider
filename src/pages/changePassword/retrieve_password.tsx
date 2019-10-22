/**title: 找回密码 */
import React, { Component } from 'react';
import styles from './retrieve_password.less'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { success, error, sigh } from "../../components/Hint";
export default class Retrieve_password extends Component { 

  onclickData = () => {
    // success('修改成功',1)
    error('修改失败',1)
  }
  render() {
    return (
      <div className={styles.retrieve_password}>
        <div className={styles.passwordBox}>
          <div><input type="text" placeholder="请输入手机号"/></div>
          <div className={styles.verificationCode }>
            <input type="text" placeholder="请输入验证码" />
            <div>发送验证码</div>
          </div>
          <div><input type="password" placeholder="请输入新密码"/></div>
          <div><input type="password" placeholder="请确认新密码" /></div>
          <div className={styles.passwordButton} onClick={this.onclickData}>确定</div>
        </div>
        <div id="success"></div>
      </div>
    )
  }
}