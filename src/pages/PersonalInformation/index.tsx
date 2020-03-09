/**title: 个人信息 */
import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import { Toast, Icon, NavBar, Flex } from 'antd-mobile';
import Request from '@/service/request';
import Cookies from 'js-cookie';
export default class PersonalInformation extends Component {
    state = {
        data: {
            is_bank_card: 0,
            phone: '***********',
            name: '',
            usable_money: 0,
            type: 0,

            // 双乾认证
            bankcard_finished_step: 0,
            identity_finished_step: 0,
            sq_status: false,
            sq_finished_step: 0,
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

    logOut = (e: any) => {
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
        const { data } = this.state;
        if (data.sq_status) {
            router.push('/PersonalInformation/withDraw')
        } else {
            if (data.identity_finished_step == 2 && data.bankcard_finished_step == 2) {
                if (data.sq_finished_step == 0) {
                    router.push('/doubledry/register')
                } else if (data.sq_finished_step == 1) {
                    router.push('/doubledry/bindcard')
                } else if (data.sq_finished_step == 2) {
                    router.push('/doubledry/withdraw')
                } else {
                    router.push('/PersonalInformation/withDraw')
                }
            } else if (data.identity_finished_step == 0) {
                // router.push('/submitQua/IDCard')
                router.push('/submitQua/EditIDCard')
            } else if (data.identity_finished_step == 1) {
                router.push('/submitQua/EditIDCard')
            }
            else if (data.bankcard_finished_step == 0) {
                // router.push('/submitQua/BankCard')
                router.push('/submitQua/EditBankCard')
            } else if (data.bankcard_finished_step == 1) {
                router.push('/submitQua/EditBankCard')
            } else if ((data.identity_finished_step == 3 && data.bankcard_finished_step == 3) || (data.identity_finished_step == 3 && data.bankcard_finished_step == 2)) {
                router.push('/doubledry/audit');
            }


        }
    }


    handleGoIDCard = () => {
        Cookies.remove('ImgUrlFrontID');
        Cookies.remove('ImgUrlBehindID');
        Cookies.remove('ImgUrlFrontBehindID');
        Cookies.remove('UserName');
        Cookies.remove('IDCardNumber');
        Cookies.remove('IDCardValidity');
        router.push('/submitQua/EditIDCard');
    }

    render() {
        const { data } = this.state;
        return (
            <div className={styles.PersonalInformation} >
                <div className={styles.main}>
                    {/* <NavBar
                        icon={<Icon type="left" size='lg' />}
                        onLeftClick={() => router.goBack()}
                    >个人信息</NavBar> */}
                    <div className={styles.userBox}>
                        <Flex className={styles.userInfo}>
                            <img src='http://oss.tdianyi.com/front/ek7cPQsFbEt7DXT7E7B6Xaf62a46SCXw.png' className={styles.avatar} />
                            <div className={styles.name}>{this.state.data.name}</div>
                        </Flex>
                    </div>
                    <Flex className={styles.userMoney} justify='between' align='start'>
                        <div>
                            <div className={styles.title}>余额</div>
                            <div className={styles.money}>{this.state.data.usable_money}</div>
                        </div>
                        <div className={styles.withDraw} onClick={this.gotoWithDraw}>提现</div>
                    </Flex>

                </div>
                <div className={styles.main2}>
                    <Flex className={styles.item} justify='between' align='center' onClick={this.onChangePassword}>
                        <Flex>
                            <img src={require('../../assets/password.png')} className={styles.icon1} />
                            修改密码
                        </Flex>
                        <Flex>
                            <img src={require('../../assets/right.png')} className={styles.goto} />
                        </Flex>
                    </Flex>
                    <Flex className={styles.item} justify='between' align='center' onClick={() => router.push('/changePhoneNumber')}>
                        <Flex>
                            <img src={require('../../assets/phone.png')} className={styles.icon2} />
                            绑定手机
                        </Flex>
                        <Flex>
                            <div style={{ color: '#999' }}>{this.state.data.phone}</div>
                            <img src={require('../../assets/right.png')} className={styles.goto} />
                        </Flex>
                    </Flex>
                    <Flex className={styles.item} justify='between' align='center' onClick={this.handleGoIDCard.bind(this)}>
                        <Flex>
                            <img src={require('../../assets/my.png')} className={styles.icon3} />
                            个人信息
                        </Flex>
                        <Flex>
                            {/* <div style={{ color: '#999999' }}>已认证</div> */}
                            <div style={{ color: data.identity_finished_step == 2 ? '#999999' : '#FF2525' }}>{data.identity_finished_step == 0 ? '未添加' : data.identity_finished_step == 1 ? '未通过' : data.identity_finished_step == 2 ? '已通过' : data.identity_finished_step == 3 ? '审核中' : ''}</div>
                            <img src={require('../../assets/right.png')} className={styles.goto} />
                        </Flex>
                    </Flex>
                </div>

                <div className={styles.main2} style={{ marginTop: 20 }}>
                    <Flex className={styles.item} justify='between' align='center' onClick={() => router.push('/PersonalInformation/mybank')}>
                        <Flex>
                            <img src={require('../../assets/bank.png')} className={styles.icon4} />
                            我的银行卡
                        </Flex>
                        <Flex>
                            {/* <div style={{ color: this.state.data.is_bank_card == 0 ? '#FF2525' : '#999999' }}>{this.state.data.is_bank_card == 0 ? '未认证' : '已认证'}</div> */}
                            <div style={{ color: data.bankcard_finished_step == 2 ? '#999999' : '#FF2525' }}>{data.bankcard_finished_step == 0 ? '未添加' : data.bankcard_finished_step == 1 ? '未通过' : data.bankcard_finished_step == 2 ? '已通过' : data.bankcard_finished_step == 3 ? '审核中' : ''}</div>
                            <img src={require('../../assets/right.png')} className={styles.goto} />
                        </Flex>
                    </Flex>
                </div>

                <div className={styles.logout} onClick={this.logOut.bind(this)}>
                    退出登录
                </div>
            </div>
        )
    }

}
