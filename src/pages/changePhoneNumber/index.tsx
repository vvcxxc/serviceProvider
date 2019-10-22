/**title: 修改手机号 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button,Flex } from 'antd-mobile';
import { success, error, sigh } from "../../components/Hint";
import ArticleInput from "../../components/ArticleInput";
export default class changePhoneNumber extends Component { 

  render() {
    return (
      <div className={styles.phoneNumber}>
        <div className={styles.passwordBox}>
          <div className={styles.title}>
            <ArticleInput />
          </div> 
          <div className={styles.rows}><input type="text" placeholder="请输入已绑定手机号" /></div>
          <div className={styles.verificationCode}>
            <input type="text" placeholder="请输入验证码" />
            <div>发送验证码</div>
          </div>
          <div className={styles.footButton}>
            <div className={styles.passwordButton}>下一步</div>
         </div>
        </div>
      </div>
    )
  }
}