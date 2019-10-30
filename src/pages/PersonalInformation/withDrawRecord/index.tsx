import React, { Component } from 'react';

import ScrollView from '@/components/ScrollView';

import styles from './index.less';

import Request from '@/service/request';

export default class WithDrawRecord extends Component {

    state = {
        isShowLoading: true,
        dataList: [
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
            {
                check_status: 1,
                created_at: "2019-11-01 00:16:16",
                fetch_money: 1
            },
        ]
    }

    componentDidMount = () => {
        // Request({
        //     url: 'fetchMoneyLog'
        // }).then(res => {
        //     this.setState({
        //         dataList: res.data.list
        //     })
        // })
    }

    handleEndReached = () => {
        setTimeout(() => {
            this.setState({
                isShowLoading : false
            })
        },1000)
    }

    render() {
        const { isShowLoading, dataList } = this.state;
        return (
            <ScrollView
                renderView={(
                    <div className={styles.withdrawrecord_wrap}>
                        <div className={styles.already_withdraw}>已提现金额：￥300.00</div>
                        {
                            dataList.map((item, index) => (
                                <div className={styles.withDraw_list} key={index}>
                                    <div className={styles.withdraw_money}>
                                        <span>余额提现</span>
                                        <span>{item.fetch_money}</span>
                                    </div>
                                    <div className={styles.withdraw_desc}>
                                        <span>{item.created_at}</span>
                                        {
                                            item.check_status == 0 ? (
                                                <span>审核中</span>
                                            ) : item.check_status == 1 ? (
                                                <span>通过</span>
                                            ) : <span>拒绝</span>
                                        }
                                    </div>
                                    {
                                        item.check_status == 2 ? (
                                            <div className={styles.withdraw_reject_reason}>
                                                <span>拒绝原因：银行无法转入</span>
                                            </div>
                                        ) : ""
                                    }
                                </div>
                            ))
                        }
                    </div>
                )}



                onEndReached={this.handleEndReached}
                isShowLoading={isShowLoading}
            />
        )
    }
}