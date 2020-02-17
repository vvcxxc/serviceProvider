import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';
import QRCode from 'qrcode';
import wx from 'weixin-js-sdk';
import Request from '@/service/request';

let url = location.origin;

interface Props {
    onClose: any
}
declare const URL;

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

    handleShare = () => {
      // wx.updateAppMessageShareData({
      //   title: '邀请注册',
      //   desc: '您的好友正在邀请你来注册服务商',
      //   link: URL + 'register' + '?phone=' + this.state.phone,
      //   imgUrl: ''
      // })
    }


    render() {
        return (
            <div className={styles.share_box} onClick={this.handleclose.bind(this)} onMouseMove={(e) => { e.preventDefault(); e.stopPropagation() }}>
                <div className={styles.share_box_content} onClick={(e) => { e.stopPropagation() }} >
                    <div className={styles.code_main}>
                      <div className={styles.title}>邀请注册服务商</div>
                      <div className={styles.imgBox}>
                        <img src={this.state.url} />
                      </div>
                      <div className={styles.tips1}>截图或长按图片保存二维码</div>
                      <div className={styles.tips2}>分享邀请二维码，邀请扫码注册</div>
                    </div>
                <div className={styles.close}  onClick={this.handleclose.bind(this)}><img src={require('@/assets/close.png')}/></div>
                </div>
            </div>


        )
    }

}
