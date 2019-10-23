/**title: 修改密码 */
import React, { Component } from 'react';
import styles from './change_password.less'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { success, error, sigh } from "../../components/Hint";
interface UserType  {
  password?:number
  
}
interface StateType   {
  user: UserType,
  password:any
}
export default class ChangePassword extends Component { 

  state: StateType = {
    password:"",
    user: {
      // password
    }
  }
  confirm = (event:any) => {
    console.log(event.target, '3343');
    success('修改成功','请重新登录')
    // console.log(this.state.password,'233232');
    // sigh('两次输入的密码不一致')
    // const { user } = this.state
    // console.log(user.password,'3334');
    // console.log(document.getElementById("password").value);
    
  }
  render() {
    const { user } = this.state
    // let password = document.getElementById("password").value
    return (
      <div className={styles.changePassword}>
        <div className={styles.changeBox}>
          <div className={styles.inputBox}><input type="password" placeholder="请输入原密码" /></div>
          <div className={styles.inputBox}>
            <input type="password" id="password" placeholder="请输入不少于6位数的密码" onChange={this.confirm} value={this.state.password} />
            <div>密码不能少于6位数</div>
          </div>
          <div className={styles.inputBox}><input type="password" placeholder="请再次输入新密码" /></div>
          <div className={styles.forget}>忘记密码</div>
          <div className={styles.confirm} onClick={this.confirm}><div>确认修改</div></div>
        </div>
        <div id="success"></div>
      </div>
    )
  }
}