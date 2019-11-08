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
            url: 'fetchMoneyLog',
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
