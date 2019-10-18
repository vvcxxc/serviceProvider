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
                <div className={styles.share_box_content} onClick={(e) => { e.stopPropagation() }} >
                    <div className={styles.share_box_title}>邀请服务商</div>
                    <div className={styles.share_box_imgBox}>
                        <img  className={styles.share_box_imgBox_img} src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571379516234&di=474ccfe10db359bdab1ef32e21792921&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F17e9533c4c7dec81443998aba5aa848e99200b29.jpg' />
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
