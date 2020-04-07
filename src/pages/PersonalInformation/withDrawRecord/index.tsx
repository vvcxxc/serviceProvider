import React, { Component } from 'react';

import ScrollView from '@/components/ScrollView';

import styles from './index.less';

import Request from '@/service/request';

export default class WithDrawRecord extends Component {

    state = {
        isShowLoading: true,
        dataList: [],
        withdrawMoney: 0,

        // 分页
        page: 1,
        // 阻止再发请求
        isNoData: false
    }

    getData = () => {
        const { page, dataList } = this.state;
        Request({
            url: 'withdrawals',
            method: "GET",
            params: {
                page: page
            }
        }).then(res => {
            if (res.code == 200 && res.data.list.data.length != 0) {
                this.setState({
                    dataList: dataList.concat(res.data.list.data),
                    withdrawMoney: res.data.fetchMoneyTotal
                })
            } else {
                this.setState({
                    isShowLoading: false,
                    isNoData: true
                })
            }
        })
    }

    componentDidMount = () => {
        this.getData()
    }

    handleEndReached = async () => {
        const { isNoData } = this.state;
        if (!isNoData) {
            await this.setState({
                page: this.state.page + 1
            })
            this.getData()
        }
    }

    render() {
        const { isShowLoading, dataList, withdrawMoney } = this.state;
        return (
            <ScrollView
                renderView={(
                    <div className={styles.withdrawrecord_wrap}>
                        <div className={styles.already_withdraw}>已提现金额：￥{withdrawMoney}</div>
                        {
                            dataList.map((item, index) => (
                                <div className={styles.withDraw_list} key={index}>
                                    <div className={styles.withdraw_money}>
                                        <span className={styles.title}>余额提现</span>
                                        <span className={styles.fetch_money}>{item.fetch_money}</span>
                                    </div>
                                    <div className={styles.withdraw_desc}>
                                        <span className={styles.date}>{item.created_at}</span>
                                        {
                                            item.check_status == 0 ? (
                                                <span style={{'color': '#4CD22C'}}>审核中</span>
                                            ) : item.check_status == 1 ? (
                                                <span style={{'color': '#547BE7'}}>通过</span>
                                            ) : <span style={{'color': '#F81B1B'}}>拒绝</span>
                                        }
                                    </div>
                                    {
                                        item.check_status == 2 ? (
                                            <div className={styles.withdraw_reject_reason}>
                                                <span>拒绝原因：{item.check_comment}</span>
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
