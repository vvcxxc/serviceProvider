/**title: 我邀请的服务商 */
import React, { Component } from 'react';
import Filtrate from '../../components/Filtrate/index';
import Invitation from '../../components/Invitation/index';

import styles from './index.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

export default class InvitationServiceProvider extends Component {
    state = {
        dataList: [
            {
                index: 0,
                key: '排序',
                title: '排序',
                value: ['排序', '收益', '邀请人数', '邀请时间'],
                select: false
            },
            {
                index: 1,
                key: '铺设状态',
                title: '铺设状态',
                value: ['排序2', '收益2', '邀请人数2', '邀请时间2'],
                select: false
            }
        ],
        invitationShow: false
    }

    searchPayload = (query: any) => {
        router.push({ pathname: '/InvitationServiceProvider/search', query: query })
    }

    handleclose = (query: any) => {
        this.setState({ invitationShow: false })
    }

    render() {
        return (
            <div className={styles.InvitationServiceProvider} >

                <Filtrate dataList={this.state.dataList} onSearch={this.searchPayload} />
                <div className={styles.InvitationServiceProvider_total}>
                    <div className={styles.totalPeople}>共100人</div>
                    <div className={styles.totalMoney}>带来收益￥23333</div>
                </div>
                <div className={styles.InvitationServiceProvider_content}>


                    <div className={styles.InvitationServiceProvider_item}>
                        <div className={styles.InvitationServiceProvider_item_left}>
                            <div className={styles.InvitationServiceProvider_item_name}>服务商A</div>
                            <div className={styles.InvitationServiceProvider_item_date}>2019-7-1 12:00:00</div>
                        </div>
                        <div className={styles.InvitationServiceProvider_item_right}>带来收益：88</div>
                    </div>

                </div>
                <div className={styles.invitation} onClick={() => { this.setState({ invitationShow: true }) }}>邀请</div>
                {
                    this.state.invitationShow ? <Invitation onClose={this.handleclose} /> : null}

            </div>
        )
    }

}
