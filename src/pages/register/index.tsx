import React, { Component } from 'react';
import styles from './index.less';

class Register extends Component {
    render() {
        return (
            <div className={styles.register_screen}>
                <div className={styles.register_wrap}>
                    <input type="text" className={styles.register_phone} placeholder=""/>
                </div>
            </div>
        )
    }
}

export default Register;
