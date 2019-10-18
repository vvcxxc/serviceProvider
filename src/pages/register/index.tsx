import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import styles from './index.less';

class Register extends Component {
    render() {
        return (
            <div className={styles.register_screen}>
                <div className={styles.register_wrap}>
                    <input type="text" className={styles.register_phone} placeholder="请输入手机号"/>
                    <div className={styles.register_code_wrap}>
                        <input type="text" className={styles.register_code} placeholder="请输入验证码"/>
                        <Button className={styles.register_send_code}>发送验证码</Button>
                    </div>                 
                    <input type="password" className={styles.register_password} placeholder="请输入密码"/>

                    <Button className={styles.register_btn}>注册</Button>
                </div>
            </div>
        )
    }
}

export default Register;
