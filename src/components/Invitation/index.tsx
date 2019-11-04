import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';
import QRCode from 'qrcode';

import Request from '@/service/request';

let url = location.origin;

interface Props {
    onClose: any
} 

export default class Invitation extends Component<Props>{
    state = {
        phone: "",
        url: ""
    }


    async componentDidMount() {
        await Request({
            url: 'user/info'
        }).then(res => {
            if (res.code == 200) {
                this.setState({
                    phone: res.data.phone
                }, () => {
                    QRCode.toDataURL(url + '/register?phone=' + this.state.phone)
                        .then((url: any) => {
                            this.setState({
                                url
                            })
                        })
                        .catch((err: any) => { })
                })
            }
        })

    }

    handleclose = () => {
        this.props.onClose && this.props.onClose();
    }


    render() {
        return (
            <div className={styles.share_box} onClick={this.handleclose.bind(this)} onMouseMove={(e) => { e.preventDefault(); e.stopPropagation() }}>
                <div className={styles.share_box_content} onClick={(e) => { e.stopPropagation() }} >
                    <div className={styles.share_box_title}>邀请服务商</div>
                    <div className={styles.share_box_imgBox}>
                        <img className={styles.share_box_imgBox_img} src={this.state.url} />
                    </div>
                    <div className={styles.share_box_handleBox}>
                        <div className={styles.share_box_cancle} onClick={this.handleclose.bind(this)} >取消</div>
                        <div className={styles.share_box_share}>分享 </div>
                    </div>
                </div>
            </div>


        )
    }

}
