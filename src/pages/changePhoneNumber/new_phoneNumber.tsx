/**title: 修改手机号 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button, Flex } from 'antd-mobile';
import { success, error, sigh } from "../../components/Hint";
import ArticleInput from "../../components/ArticleInput";
export default class changePhoneNumber extends Component { 

  confirm = () => {
    success('修改成功','请重新登陆')
  }
  render() {
    return (
      <div className={styles.phoneNumber}>
        <div className={styles.passwordBox}>
          <div className={styles.title}>
            <ArticleInput showTwo={true}/>
          </div>
          <div className={styles.rows}><input type="text" placeholder="请输入新手机号" /></div>
          <div className={styles.verificationCode}>
            <input type="text" placeholder="请输入验证码" />
            <div>发送验证码</div>
          </div>
          <div className={styles.footButton}>
            <div className={styles.passwordButton} onClick={this.confirm}>确定修改</div>
          </div>
        </div>
        <div id="success"></div>
      </div>
    )
  }

}