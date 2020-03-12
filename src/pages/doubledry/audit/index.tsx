import React, { Component } from 'react';
import styles from './index.less';
import Request from '@/service/request';
import router from 'umi/router';

class Audit extends Component {

    state = {
        /**
         * payplatform_check_status    0,1 待审核  2 审核通过   3审核不通过
         */
        payplatform_check_status: 0,
        payplatform_check_comment: "",

        identity_finished_step: 0,
        bankcard_finished_step: 0,
        sq_finished_step: 0
    }

    componentDidMount() {
        Request({
            url: 'sqAccount'
        }).then(res => {
            if (res.code == 200 && res.data.length != 0) {
                this.setState({
                    payplatform_check_status: res.data.payplatform_check_status,
                    payplatform_check_comment: res.data.payplatform_check_comment
                })
            }
        })

        Request({
            url: 'user/info',
            method: 'get',
        }).then(res => {
            if (res.code == 200) {
                this.setState({
                    identity_finished_step: res.data.identity_finished_step,
                    bankcard_finished_step: res.data.bankcard_finished_step,
                    sq_finished_step: res.data.sq_finished_step
                })
            }
        })
    }

    handleNext = () => {
        if (this.state.identity_finished_step == 2 && this.state.bankcard_finished_step == 2) {
            if (this.state.sq_finished_step == 0) {
                router.push('/doubledry/register')
            } else if (this.state.sq_finished_step == 1) {
                router.push('/doubledry/bindcard')
            } else if (this.state.sq_finished_step == 2) { 
                router.push('/doubledry/withdraw')
            }
        }
    }

    handleResetSubmit = () => {
        if (this.state.identity_finished_step == 2 && this.state.bankcard_finished_step == 2) {
            if (this.state.sq_finished_step == 0) {
                router.push('/doubledry/register')
            } else if (this.state.sq_finished_step == 1) {
                router.push('/doubledry/bindcard')
            } else if (this.state.sq_finished_step == 2) {
                router.push('/doubledry/withdraw')
            }
        }
    }

    render() {
        return (
            // <div>Hello World</div>

            <div className={styles.audit}>
                {/* {console.log(this.state)} */}
                {
                    this.state.payplatform_check_status == 0 || this.state.payplatform_check_status == 1 || this.state.payplatform_check_status == 3 ? (
                        <div className={styles.audit_logo}>
                            <img src={require('@/assets/warn.png')} alt="" className={styles.img} />
                        </div>
                    ) : (
                            <div className={styles.audit_logo}>
                                <img src={require('@/assets/success.png')} alt="" className={styles.img} />
                            </div>
                        )
                }
                <div className={styles.audit_info}>{
                    this.state.payplatform_check_status == 0 || this.state.payplatform_check_status == 1 ? "资料提交审核,请等候" : this.state.payplatform_check_status == 3 ? "资料审核失败，请重新修改" : this.state.payplatform_check_status == 2 ? "资料审核通过" : ""
                }</div>
                {
                    this.state.payplatform_check_status == 0 || this.state.payplatform_check_status == 1 ? (
                        <div className={styles.audit_btn} onClick={() => router.push('/PersonalInformation')}>知道了</div>
                    ) : this.state.payplatform_check_status == 2 ? (
                        <div className={styles.audit_btn} onClick={this.handleNext}>下一步</div>
                    ) : this.state.payplatform_check_status == 3 ? (
                        // <div className={styles.audit_btn} onClick={() => router.push('/doubledry/register')}>重新提交</div>
                        <div className={styles.audit_btn} onClick={this.handleResetSubmit}>重新提交</div>
                    ) : ""
                }

            </div>
        )
    }
}

export default Audit;