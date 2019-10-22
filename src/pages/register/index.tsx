import React, { Component } from 'react';
import { Button, InputItem, List, Flex } from 'antd-mobile';
import styles from './index.less';

class Register extends Component {
    render() {
        return (
            <div className={styles.register_screen}>
                <div className={styles.register_wrap}>
                    <InputItem
                        clear
                        placeholder="请输入手机号"
                        className={styles.register_phone}
                    ></InputItem>
                    <div className={styles.register_code_wrap}>
                        <InputItem
                            clear
                            placeholder="请输入验证码"
                            className={styles.register_code}
                        >
                        </InputItem>
                        <Button className={styles.register_send_code}>发送验证码</Button>
                    </div>

                    <InputItem
                        type="password"
                        clear
                        placeholder="请输入密码"
                        className={styles.register_password}
                    ></InputItem>

                    <Button className={styles.register_btn}>注册</Button>
                </div>
            </div>
        )
    }
}

export default Register;
