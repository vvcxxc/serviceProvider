/**title: 个人信息 */
import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import { Toast, Icon } from 'antd-mobile';
import Request from '@/service/request';
export default class PersonalInformation extends Component {
    state = {
        data: {
            is_bank_card: 0,
            phone: '***********',
            usable_money: 0
        }
    }


    componentDidMount() {
        Toast.loading('');
        Request({
            url: 'user/info',
            method: 'get',
        }).then(res => {
            if (res.code == 200) {
                Toast.hide();
                this.setState({ data: res.data })
            } else {
                Toast.fail('请求错误', 1)
            }
        }).catch((err) => {
            Toast.fail('请求失败', 1)
        })
    }

    //修改密码
    onChangePassword = () => {
        router.push({ pathname: '/PersonalInformation/changePassword' })
    }

    logOut = (e) => {
        Toast.loading('');
        Request({
            url: 'auth/logout',
            method: 'post',
        }).then(res => {
            if (res.code == 401) {
                Toast.hide();
                Toast.success('退出登录成功', 1);
                localStorage.removeItem('token');
                setTimeout(() => {
                    router.push({ pathname: '/login' })
                }, 1100);
            }
        })
    }
    gotoWithDraw = () => {
        router.push('/PersonalInformation/withDraw')
    }

    render() {
        return (
            <div className={styles.PersonalInformation} >
                <div className={styles.balanceBox} >
                    {/* <div className={styles.BalanceAuditStatus} >认证审核中</div> */}

                    <div className={styles.balanceBox_moneyBox} >
                        <div className={styles.balanceBox_moneyBox_font} >余额</div>
                        <div className={styles.balanceBox_moneyBox_num} >{this.state.data.usable_money}</div>
                        <div className={styles.balanceBox_moneyBox_btn} onClick={this.gotoWithDraw}>提现</div>
                    </div>
                </div>


                <div className={styles.Personal_information_content} >
                    {/* <div className={styles.information_box} onClick={this.onChangePassword} >
                        <div className={styles.information_box_title} >修改密码</div>
                        <div className={styles.information_msg_box} >
                            <Icon className={styles.information_icon} type="right" size={'md'} />
                        </div>
                    </div> */}
                    <div className={styles.information_box} onClick={() => router.push('/changePhoneNumber')}>
                        <div className={styles.information_box_title} >绑定手机</div>
                        <div className={styles.information_msg_box} >
                            <div className={styles.information_msg} >{this.state.data.phone}</div>
                            <Icon className={styles.information_icon} type="right" size={'md'} />
                        </div>
                    </div>
                    {/* <div className={styles.information_box} >
                        <div className={styles.information_box_title} >身份证信息</div>
                        <div className={styles.information_msg_box} >
                            <div className={styles.information_msg} >已验证</div>
                            <Icon className={styles.information_icon} type="right" size={'md'} />
                        </div>
                    </div> */}
                    <div className={styles.information_box_highter}></div>
                    <div className={styles.information_box} onClick={() => router.push('/PersonalInformation/mybank')}>
                        <div className={styles.information_box_title}
                            style={{ color: this.state.data.is_bank_card == 0 ? '#e61616' : ' #000' }}
                        >我的银行卡</div>
                        <div className={styles.information_msg_box} >
                            <div className={styles.information_msg}
                                style={{ color: this.state.data.is_bank_card == 0 ? '#2189f6' : ' #888888' }}
                            >{this.state.data.is_bank_card == 0 ? '未绑定' : '已绑定'}</div>
                            <Icon className={styles.information_icon} type="right" size={'md'} />
                        </div>
                    </div>
                </div>


                <div className={styles.logout_button_box} >
                    <div className={styles.logout_button} onClick={this.logOut.bind(this)}>退出登录</div>
                </div>

            </div>
        )
    }

}
