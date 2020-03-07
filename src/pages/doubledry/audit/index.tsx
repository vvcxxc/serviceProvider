import React, { Component } from 'react';
import styles from './index.less';

class Audit extends Component {
    render() {
        return (
            // <div>Hello World</div>
            <div className={styles.audit}>
                <div className={styles.audit_logo}>
                    <img src={require('@/assets/warn.png')} alt="" className={styles.img} />
                </div>
                <div className={styles.audit_info}>资料提交审核,请等候</div>
                <div className={styles.audit_btn}>知道了</div>
            </div>
        )
    }
}

export default Audit;