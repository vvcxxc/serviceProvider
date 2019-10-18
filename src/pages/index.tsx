/**title: 登陆 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { success,error} from "../components/Hint";
export default class PageIndex extends Component {

  landingData = () => {
    // success('登录成功',1)
    error('登录失败',1)
  }

  render() {
    return (
      <div className={styles.pageIndex}>
        
        <div className={styles.inputBox}>
          <div className={styles.inputBox_text}> <input type="text" placeholder="请输入账号" /> </div>
          <div className={styles.inputBox_password}> <input type="password" placeholder="请输入密码" /> </div>
          <div className={styles.forgotten}>忘记密码</div>
         </div>
        <br/>
        <div className={styles.operation}>
          <div className={styles.landing} onClick={this.landingData}>登录</div>
          <div className={styles.registered}>注册</div>
        </div>
        
        <div id="success"></div>
      </div>
    )
  }
}

