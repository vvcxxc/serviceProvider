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
                key: '排序',
                value: ['排序', '收益', '邀请人数', '邀请时间'],
            },
            {
                key: '铺设状态',
                value: ['排序2', '收益2', '邀请人数2', '邀请时间2'],
            }
        ],
        invitationShow: false,
        closeNum: 1
    }

    searchPayload = (query: any) => {
        console.log('lll',query)
        // router.push({ pathname: '/InvitationServiceProvider/search', query: query })
    }

    handleclose = (query: any) => {
        this.setState({ invitationShow: false })
    }

    render() {
        return (
            <div className={styles.InvitationServiceProvider} onClick={() => {this.setState({ closeNum: this.state.closeNum + 1 })}} >

                <Filtrate 
                dataList={this.state.dataList} 
                onSearch={this.searchPayload} 
                closeNum={this.state.closeNum}  
                searchPath={'/InvitationServiceProvider/search'}
                />
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
                
                <div className={styles.on_list} >无记录</div>
                <div className={styles.invitation} onClick={() => { this.setState({ invitationShow: true }) }}>邀请</div>
                {
                    this.state.invitationShow ? <Invitation onClose={this.handleclose} /> : null}

            </div>
        )
    }

}
