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

export default class bindPhoneNumber extends Component {

    state = {
        // 手机号
        phone: "",
        // 验证码
        code: "",
        is_ok: true,
        wait: ""
    }

    // 销毁定时器
    componentWillUnmount() {
        clearInterval(timer)
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
                console.log('13213')
                if (res.code == 200) {
                    Toast.success('验证码已发送');
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

    handleNext = () => {
        const { phone, code } = this.state;
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            Toast.fail('请输入11位有效手机号', 1);
            return;
        }
        if (!code) {
            Toast.fail('请输入验证码', 1);
            return;
        }
        // Request({
        //   url: 'checkMobile',
        //   method: "POST",
        //   data: qs.stringify({
        //     phone,
        //     verify_code: code
        //   })
        // }).then(res => {
        //   if (res.code == 200) {
        //     router.push({
        //       pathname: 'changePhoneNumber/new_phoneNumber'
        //     })
        //     Cookies.set("oldPhone", phone, { expires: 1 })
        //   }
        // })
    }



    componentWillMount() {
        clearInterval(timer);
    }
    render() {
        const { phone, code, is_ok, wait } = this.state;
        return (
            <div className={styles.phoneNumber}>
                <div className={styles.passwordBox}>
                    <div className={styles.bankCardBox} >银行卡号：6220 2120 4567 1234</div>
                    <div className={styles.content}>
                        <div className={styles.items1}>
                            <div className={styles.keyWords}>手机号码 </div>
                            <input className={styles.input1} type="text" placeholder="请输入已绑定手机号" onChange={this.handleChangePhone} value={phone} />
                        </div>
                        <div className={styles.items2}>
                            <div className={styles.keyWords}>验证码 </div>
                            <input className={styles.input2} type="text" placeholder="请输入验证码" onChange={this.handleChangeCode} value={code} />
                            {
                                is_ok ? (
                                    <div className={styles.sendButton} onClick={this.handleSendCode}>发送验证码</div>
                                ) : (
                                        <div className={styles.sendButton}> {wait}s后重新获取</div>
                                    )
                            }
                        </div>
                    </div>
                    <div className={styles.footButton} onClick={this.handleNext}>提交</div>
                </div>
                <div id="success"></div>
            </div>
        )
    }
}
