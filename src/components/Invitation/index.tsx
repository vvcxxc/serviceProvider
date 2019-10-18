import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';


interface Props {
    onClose: any
}

export default class Invitation extends Component<Props>{
    state = {

    }


    componentDidMount() {
    }

    handleclose = () => {
        this.props.onClose && this.props.onClose();
    }


    render() {
        return (
            <div className={styles.share_box} onClick={this.handleclose.bind(this)} onMouseMove={(e) => { e.stopPropagation() }}>
                <div className={styles.share_box_content}>
                    <div className={styles.share_box_title}>邀请服务商</div>
                    <div className={styles.share_box_imgBox}>

                    </div>
                    <div className={styles.share_box_handleBox}>
                        <div className={styles.share_box_cancle}>取消</div>
                        <div className={styles.share_box_share}>分享 </div>
                    </div>
                </div>
            </div>


        )
    }

}
