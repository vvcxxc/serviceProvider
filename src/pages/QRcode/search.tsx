/**title: 搜索 */
import React, { Component } from 'react';
import Filtrate from '../../components/Filtrate/index';
import Invitation from '../../components/Invitation/index';

import styles from './search.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

export default class Search extends Component {
    state = {
        invitationShow: false
    }



    handleclose = (query: any) => {
        this.setState({ invitationShow: false })
    }

    render() {
        return (
            <div className={styles.QRcode_search} >

                <div className={styles.ServiceProvider} >
                    <div className={styles.ServiceProvider_searchBox}>
                        <div className={styles.ServiceProvider_searchBox_icon}>
                            <Icon type="search" />
                        </div>
                        <input type="text" className={styles.ServiceProvider_input} placeholder='输入服务商名称或手机号' />


                    </div>
                    <div className={styles.ServiceProvider_searchBox_cancle}>取消</div>
                </div>
                <div className={styles.QRcode_content}>


                <div className={styles.QRcode_item}>
                        <div className={styles.QRcode_item_left}>
                            <div className={styles.QRcode_item_name}>二维码序列号</div>
                            <div className={styles.QRcode_item_date}>点的名字</div>
                        </div>
                        <div className={styles.QRcode_item_right}>

                            <div className={styles.QRcode_item_toDay}>今日收益100</div>
                            <div className={styles.QRcode_item_toMonth}>本月收益2333</div>
                            <div className={styles.QRcode_item_total}>总收益2555</div>

                        </div>
                    </div>

                </div>

                <div className={styles.on_list} >无记录</div>

                <div className={styles.invitation} onClick={() => { this.setState({ invitationShow: true }) }}>邀请</div>
                {
                    this.state.invitationShow ? <Invitation onClose={this.handleclose} /> : null}

            </div>
        )
    }

}
