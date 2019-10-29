import React, { Component } from 'react';

import ScrollView from '@/components/ScrollView';

import styles from './index.less';

export default class WithDrawRecord extends Component {
    
    state = {
        isShowLoading: true
    }

    handleEndReached = () => {
        alert('acas');
    }
 
    render() { 
        const { isShowLoading } = this.state;
        return (
            <ScrollView
                renderView={(
                    <div className={styles.withdrawrecord_wrap}>
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
                    </div>
                )}



                onEndReached={this.handleEndReached}
                isShowLoading={isShowLoading}
            />
        )
    }
}