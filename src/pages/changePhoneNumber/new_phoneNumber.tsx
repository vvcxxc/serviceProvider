/**title: 修改手机号 */
import React, { Component } from 'react';
import styles from './index.less'
import { Toast, WhiteSpace, WingBlank, Button, Flex } from 'antd-mobile';
import { success, error, sigh } from "../../components/Hint";
import ArticleInput from "../../components/ArticleInput";

import Request from '@/service/request';
import qs from 'qs';
import router from 'umi/router';
import Cookies from 'js-cookie';

let timer = null;

export default class changePhoneNumber extends Component {

  state = {
    // 手机号
    phone: "",
    // 验证码
    code: "",
    is_ok: true,
    wait: ""
  }


  handleChangePhone = (e: any) => {
    this.setState({
      phone: e.target.value
    })
  }

  handleChangeCode = (e: any) => {
    this.setState({
      code: e.target.value
    })
  }

  handleSendCode = () => {
    const { phone } = this.state;
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      Toast.fail('请输入11位有效手机号', 1);
      return;
    }
    let wait = 60;
    if (phone) {
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

  confirm = () => {
    const { phone, code } = this.state;
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      Toast.fail('请输入11位有效手机号', 1);
      return;
    }
    if (!code) {
      Toast.fail('请输入验证码', 1);
      return;
    }
    Request({
      url: "updateMobile",
      method: "POST",
      data: {
        oldPhone: Cookies.get("oldPhone"),
        newPhone: phone,
        verify_code: code
      }
    }).then(res => {
      if (res.code == 200) {
        Cookies.remove("oldPhone");
        Toast.success(res.message, 1, ()=>{
          router.push('/PersonalInformation')
        });
      }
    })
  }
  componentWillMount (){
    clearInterval(timer);
  }
  render() {
    const { phone, code, is_ok, wait } = this.state;
    return (
      <div className={styles.phoneNumber}>
        <div className={styles.passwordBox}>
          <div className={styles.title}>
            <ArticleInput showTwo={true} />
          </div>
          <div className={styles.rows}><input type="text" placeholder="请输入新手机号" onChange={this.handleChangePhone} value={phone} /></div>
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
          <div className={styles.footButton}>
            <div className={styles.passwordButton} onClick={this.confirm}>确定修改</div>
          </div>
        </div>
        <div id="success"></div>
      </div>
    )
  }

}
