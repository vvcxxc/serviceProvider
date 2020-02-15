/**title: 注册账号 */
import React, { Component } from 'react';
import { Button, InputItem, List, Flex, Toast } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import Request from '@/service/request';
import qs from 'qs';
import router from 'umi/router';

import Cookies from 'js-cookie';

let timer = null;

export default connect(({ register }: any) => register)(
    class Register extends Component<any> {

        state = {
            username: "",
            phone: "",
            code: "",
            password: "",
            inviter_phone: "",

            is_ok: true,
            wait: "",

            passWordType: 0

        }

        componentDidMount = () => {
            let hasPhone = this.props.location.query.phone;
            if (hasPhone) {
                this.setState({
                    inviter_phone: hasPhone
                })
                this.props.dispatch({
                    type: 'register/registered',
                    payload: {
                        inviter_phone: hasPhone
                    }
                })
            }
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
        handleChangeInviterPhone = (e: any) => {
            this.setState({
                inviter_phone: e
            })
            this.props.dispatch({
                type: 'register/registered',
                payload: {
                    inviter_phone: e
                }
            })
        }

        /**
         * 获取验证码
         */
        getCode = () => {
            const { phone } = this.props;
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
                        _this.props.dispatch({
                            type: 'register/registered',
                            payload: {
                                is_ok: true
                            }
                        })
                        clearInterval(timer)
                    } else {
                        wait--;
                        _this.setState({ is_ok: false, wait });
                        _this.props.dispatch({
                            type: 'register/registered',
                            payload: {
                                is_ok: false,
                                wait
                            }
                        })
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
                        Toast.info(res.message, 1);
                    } else {
                        _this.setState({ is_ok: true });
                        _this.props.dispatch({
                            type: 'register/registered',
                            payload: {
                                is_ok: true
                            }
                        })
                        clearInterval(timer);
                        Toast.fail(res.message);
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
            const { username, phone, code, password, inviter_phone } = this.props;
            if (!(/^([a-zA-Z\u4e00-\u9fa5]){1,8}$/.test(username))) {
                Toast.fail('请输入中文，字母名称且不超过8个字符', 1);
                return;
            }
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                Toast.fail('请输入11位有效手机号', 1);
                return;
            }
            if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(password))) {
                Toast.fail('请输入数字，字母组合不低于6位密码', 1);
                return;
            }

            if (username && phone && code && password) {
                let data;
                if (inviter_phone) {
                    data = qs.stringify({
                        name: username,
                        account: phone,
                        password,
                        verify_code: code,
                        from_phone: inviter_phone
                    })
                } else {
                    data = qs.stringify({
                        name: username,
                        account: phone,
                        password,
                        verify_code: code
                    })
                }
                Request({
                    url: 'register',
                    method: 'post',
                    data
                }).then(res => {
                    let { code, message } = res;
                    if (code == 200) {
                        Toast.success('注册成功', 2, () => {
                            localStorage.setItem('token', res.access_token);

                            Cookies.set("bussiness_type", "", { expires: 1 });

                            Cookies.set("ImgUrlFront", "", { expires: 1 });
                            Cookies.set("ImgUrlBehind", "", { expires: 1 });
                            Cookies.set("User", "", { expires: 1 });
                            Cookies.set("bankCard", "", { expires: 1 });
                            Cookies.set("bankName", "", { expires: 1 });
                            Cookies.set("subBranchBank", "", { expires: 1 });

                            Cookies.set("ImgUrlFrontID", "", { expires: 1 });
                            Cookies.set("ImgUrlBehindID", "", { expires: 1 });
                            Cookies.set("ImgUrlFrontBehindID", "", { expires: 1 });
                            Cookies.set("UserName", "", { expires: 1 });
                            Cookies.set("IDCardNumber", "", { expires: 1 });
                            Cookies.set("IDCardValidity", "", { expires: 1 });

                            router.push('/chooseid')
                        })
                    } else {
                        Toast.fail(message)
                    }
                })
            } else {
                Toast.fail('请将信息填写完整', 2)
            }
        }

        // 销毁定时器
        componentWillUnmount() {
            clearInterval(timer)
        }
        changPassWordType = () => {
            this.setState({ passWordType: !this.state.passWordType })
        }

        render() {
            return (
                <div className={styles.register_screen}>
                    <div className={styles.register_wrap}>

                        <div className={styles.register_wrap_content}>
                            <div className={styles.inputContent}>
                                <div className={styles.contLeft}>
                                    <div className={styles.inputInfo2}>名称</div>
                                    <div className={styles.inputTextArea}>
                                        <InputItem
                                            clear
                                            placeholder="请输入中文名称"
                                            className={styles.register_username}
                                            value={this.props.username}
                                            onChange={this.handleChangeUsername.bind(this)}
                                        ></InputItem>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.inputContent}>
                                <div className={styles.contLeft}>
                                    <div className={styles.inputInfo}>
                                        <div className={styles.inputInfotText}>+86</div>
                                    </div>
                                    <div className={styles.inputTextArea}>
                                        <InputItem
                                            clear
                                            placeholder="请输入手机号"
                                            className={styles.register_phone}
                                            value={this.props.phone}
                                            onChange={this.handleChangePhone.bind(this)}
                                            maxLength={11}
                                        ></InputItem>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.inputContent}>
                                <div className={styles.contLeft}>
                                    <div className={styles.inputInfo2}>验证码</div>
                                    <div className={styles.inputTextArea}>
                                        <div className={styles.register_code_wrap}>
                                            <InputItem
                                                clear
                                                placeholder="请输入验证码"
                                                className={styles.register_code}
                                                value={this.props.code}
                                                onChange={this.handleChangeCode.bind(this)}
                                            >
                                            </InputItem>

                                        </div>
                                    </div>

                                </div>
                                {
                                    this.props.is_ok ? (
                                        <div className={styles.register_send_code} onClick={this.getCode.bind(this)}>发送验证码</div>
                                    ) : (
                                            <div className={styles.register_send_code} >{this.props.wait}s后重新获取</div>
                                        )
                                }
                            </div>
                            <div className={styles.inputContent}>
                                <div className={styles.contLeft}>
                                    <div className={styles.inputInfo2}>密码</div>
                                    <div className={styles.inputTextArea}>
                                        <InputItem
                                            type={this.state.passWordType ? "text" : "password"}
                                            clear
                                            placeholder="请输入密码"
                                            className={styles.register_password}
                                            value={this.props.password}
                                            onChange={this.handleChangePassword.bind(this)}
                                        ></InputItem>
                                    </div>
                                </div>
                                <div className={styles.inputIcon} onClick={this.changPassWordType.bind(this)}>
                                    {
                                        this.state.passWordType ? <img className={styles.inputImg} src="http://oss.tdianyi.com/front/QkRwbQpiWbDxkQx6jQmma6M4SXGie8rY.png" />
                                            : <img className={styles.inputImg} src="http://oss.tdianyi.com/front/c6FyYiYzhynzfbDZmMtZeHSNcN76jnR6.png" />
                                    }
                                </div>
                            </div>

                            <div className={styles.inputContent} style={{ marginBottom: 0 }}>
                                <div className={styles.contLeft}>
                                    <div className={styles.inputInfo2}>邀请码</div>
                                    <div className={styles.inputTextArea}>
                                        <InputItem
                                            clear
                                            placeholder="邀请人手机号（非必填）"
                                            className={styles.register_inviter_phone}
                                            value={this.props.inviter_phone}
                                            onChange={this.handleChangeInviterPhone.bind(this)}
                                        ></InputItem>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <Button className={styles.register_btn} onClick={this.handleRegister.bind(this)}>注册</Button>
                    </div>
                </div>
            )
        }
    })
