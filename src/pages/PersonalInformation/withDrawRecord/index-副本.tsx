import React, { Component } from 'react';
import { Icon, Grid } from 'antd-mobile';
import styles from './index.less';

export default class WithDrawRecord extends Component {

    state = {
        isShowLoading : false
    }

    handleScroll = () => {
        let ele = document.getElementById('withDrawRecordWrap');
        let scrollTop = ele.scrollTop;
        let clientTop = ele.clientHeight;
        let scrollHeight = ele.scrollHeight;
        if (scrollTop + clientTop == scrollHeight) {
            this.setState({
                isShowLoading: true
            })
        }
    }

    render() {
        const {isShowLoading} = this.state;
        return (
            <div className={styles.withdrawrecord_wrap} onScroll={this.handleScroll.bind(this)} id="withDrawRecordWrap">
                <div className={styles.already_withdraw}>已提现金额：￥300.00</div>
                <div className={styles.withDraw_list}>
                    <div className={styles.withdraw_money}>
                        <span>余额提现</span>
                        <span>100.00</span>
                    </div>
                    <div className={styles.withdraw_desc}>
                        <span>2019-10-24 09:45:48</span>
                        <span>审核中</span>
                    </div>
                </div>
                <div className={styles.withDraw_list}>
                    <div className={styles.withdraw_money}>
                        <span>余额提现</span>
                        <span>100.00</span>
                    </div>
                    <div className={styles.withdraw_desc}>
                        <span>2019-10-24 09:45:48</span>
                        <span>审核中</span>
                    </div>
                </div>
                <div className={styles.withDraw_list}>
                    <div className={styles.withdraw_money}>
                        <span>余额提现</span>
                        <span>100.00</span>
                    </div>
                    <div className={styles.withdraw_desc}>
                        <span>2019-10-24 09:45:48</span>
                        <span>审核中</span>
                    </div>
                </div>
                <div className={styles.withDraw_list}>
                    <div className={styles.withdraw_money}>
                        <span>余额提现</span>
                        <span>100.00</span>
                    </div>
                    <div className={styles.withdraw_desc}>
                        <span>2019-10-24 09:45:48</span>
                        <span>审核中</span>
                    </div>
                </div>
                <div className={styles.withDraw_list}>
                    <div className={styles.withdraw_money}>
                        <span>余额提现</span>
                        <span>100.00</span>
                    </div>
                    <div className={styles.withdraw_desc}>
                        <span>2019-10-24 09:45:48</span>
                        <span>审核中</span>
                    </div>
                </div>
                <div className={styles.withDraw_list}>
                    <div className={styles.withdraw_money}>
                        <span>余额提现</span>
                        <span>100.00</span>
                    </div>
                    <div className={styles.withdraw_desc}>
                        <span>2019-10-24 09:45:48</span>
                        <span>审核中</span>
                    </div>
                </div>
                <div className={styles.withDraw_list}>
                    <div className={styles.withdraw_money}>
                        <span>余额提现</span>
                        <span>100.00</span>
                    </div>
                    <div className={styles.withdraw_desc}>
                        <span>2019-10-24 09:45:48</span>
                        <span>拒绝</span>
                    </div>
                    <div className={styles.withdraw_reject_reason}>
                        <span>拒绝原因：银行无法转入</span>
                    </div>
                </div>

                {
                    isShowLoading? (
                        <Grid data={[{
                            icon: (<Icon type="loading" />),
                            text: 'loading...',
                        }]} columnNum={1} hasLine={false} itemStyle={{ height: '150px' }} />
                    ) : <div className={styles.no_data}>暂无更多数据</div>
                }

            </div>
        )
    }
}