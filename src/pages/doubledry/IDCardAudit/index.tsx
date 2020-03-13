import React, { Component } from 'react';
import styles from './index.less';
import Request from '@/service/request';
import router from 'umi/router';

class IDCardAudit extends Component {

    state = {
        /**
         * check_status   1 待审核  2 审核通过   3审核不通过
         */

        check_status: 0,
    }

    componentDidMount() {
        Request({
            url: 'getFacilitatorIdentity'
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
                this.setState({
                    check_status: res.data.check_status
                })
            }
        })
    }

    handleNext = () => {
        if (this.state.check_status == 2) {
            router.push('/PersonalInformation')
        }
    }

    handleResetSubmit = () => {
        if (this.state.check_status == 3) {
            router.push('/submitQua/EditIDCard');
        }
    }

    render() {
        return (

            <div className={styles.audit}>
                {
                    this.state.check_status == 0 || this.state.check_status == 1 || this.state.check_status == 3 ? (
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
                    this.state.check_status == 0 || this.state.check_status == 1 ? "资料提交审核,请等候" : this.state.check_status == 3 ? "资料审核失败，请重新修改" : this.state.check_status == 2 ? "资料审核通过" : ""
                }</div>
                {
                    this.state.check_status == 0 || this.state.check_status == 1 ? (
                        <div className={styles.audit_btn} onClick={() => router.push('/PersonalInformation')}>知道了</div>
                    ) : this.state.check_status == 2 ? (
                        <div className={styles.audit_btn} onClick={this.handleNext}>下一步</div>
                    ) : this.state.check_status == 3 ? (
                        <div className={styles.audit_btn} onClick={this.handleResetSubmit}>重新提交</div>
                    ) : ""
                }

            </div>
        )
    }
}

export default IDCardAudit;