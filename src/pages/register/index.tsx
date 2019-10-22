import React, { Component } from 'react';
import { Button, InputItem, List, Flex, Toast } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import Request from '@/service/request';
import axios from 'axios';
import qs from 'qs';


export default connect(({ register }: any) => register)(
    class Register extends Component<any> {

        state = {
            username: "",
            phone: "",
            code: "",
            password: "",
            inviter: "",

            is_ok: true,
            wait: ""
        }

        /**
         * 用户名
         */
        handleChangeUsername = (e: any) => {
            this.setState({
                username: e
            })
            this.props.dispatch({
                type: 'register/registered',
                payload: {
                    username: e
                }
            })
        }

        /**
         * 手机号
         */
        handleChangePhone = (e: any) => {
            this.setState({
                phone: e
            })
            this.props.dispatch({
                type: 'register/registered',
                payload: {
                    phone: e
                }
            })
        }

        /**
         * 验证码
         */
        handleChangeCode = (e: any) => {
            this.setState({
                code: e
            })
            this.props.dispatch({
                type: 'register/registered',
                payload: {
                    code: e
                }
            })
        }

        /**
         * 密码
         */
        handleChangePassword = (e: any) => {
            this.setState({
                password: e
            })
            this.props.dispatch({
                type: 'register/registered',
                payload: {
                    password: e
                }
            })
        }

        /**
         * 邀请人
         */
        handleChangeInviter = (e: any) => {
            this.setState({
                inviter: e
            })
            this.props.dispatch({
                type: 'register/registered',
                payload: {
                    inviter: e
                }
            })
        }

        /**
         * 获取验证码
         */
        getCode = () => {
            const { phone } = this.props;
            let wait = 60;
            if (phone) {
                Request({
                    url: 'verifyCode',
                    method: 'post',
                    data: qs.stringify({
                        phone
                    })
                }).then(res => {
                    if (res.code == 200) {
                        let timer = setInterval(() => {
                            if (wait == 0) {
                                this.setState({ is_ok: true });
                                this.props.dispatch({
                                    type: 'register/registered',
                                    payload: {
                                        is_ok: true
                                    }
                                })
                                clearInterval(timer)
                            } else {
                                wait--;
                                this.setState({ is_ok: false, wait });
                                this.props.dispatch({
                                    type: 'register/registered',
                                    payload: {
                                        is_ok: false,
                                        wait
                                    }
                                })
                                clearInterval();
                            }
                        }, 1000);
                    } else {
                        Toast.fail(res.message)
                    }
                })
            } else {
                Toast.fail('请输入手机号', 1)
            }
        }


        /**
         * 注册
         */

        handleRegister = () => {

        }

        render() {
            return (
                <div className={styles.register_screen}>
                    <div className={styles.register_wrap}>
                        <InputItem
                            clear
                            placeholder="输入中文账号名称"
                            className={styles.register_username}
                            value={this.props.username}
                            onChange={this.handleChangeUsername.bind(this)}
                        ></InputItem>
                        <InputItem
                            clear
                            placeholder="请输入手机号"
                            className={styles.register_phone}
                            value={this.props.phone}
                            onChange={this.handleChangePhone.bind(this)}
                        ></InputItem>
                        <div className={styles.register_code_wrap}>
                            <InputItem
                                clear
                                placeholder="请输入验证码"
                                className={styles.register_code}
                                value={this.props.code}
                                onChange={this.handleChangeCode.bind(this)}
                            >
                            </InputItem>
                            {
                                this.props.is_ok ? (
                                    <Button className={styles.register_send_code} onClick={this.getCode.bind(this)}>发送验证码</Button>
                                ) : (
                                        <Button className={styles.register_send_code} disabled >{this.props.wait}秒</Button>
                                    )
                            }
                        </div>

                        <InputItem
                            type="password"
                            clear
                            placeholder="请输入密码"
                            className={styles.register_password}
                            value={this.props.password}
                            onChange={this.handleChangePassword.bind(this)}
                        ></InputItem>
                        <InputItem
                            clear
                            placeholder="邀请人（非必填）"
                            className={styles.register_inviter}
                            value={this.props.inviter}
                            onChange={this.handleChangeInviter.bind(this)}
                        ></InputItem>

                        <Button className={styles.register_btn} onClick={this.handleRegister.bind(this)}>注册</Button>
                    </div>
                </div>
            )
        }
    })
