/**title: 个人信息 */
import React, { Component } from 'react';

import styles from './index.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

export default class PersonalInformation extends Component {
    state = {

    }


    render() {
        return (
            <div className={styles.PersonalInformation} >
                <div className={styles.balanceBox} >
                    <div className={styles.BalanceAuditStatus} >认证审核中</div>

                    <div className={styles.balanceBox_moneyBox} >
                        <div className={styles.balanceBox_moneyBox_font} >余额</div>
                        <div className={styles.balanceBox_moneyBox_num} >1,000,000</div>
                        <div className={styles.balanceBox_moneyBox_btn} >提现</div>
                    </div>
                </div>


                <div className={styles.Personal_information_content} >
                    <div className={styles.information_box} >
                        <div className={styles.information_box_title} >修改密码</div>
                        <div className={styles.information_msg_box} >
                            <Icon className={styles.information_icon} type="right" size={'lg'} />
                        </div>
                    </div>
                    <div className={styles.information_box} >
                        <div className={styles.information_box_title} >绑定手机</div>
                        <div className={styles.information_msg_box} >
                            <div className={styles.information_msg} >020-13412345678</div>
                            <Icon className={styles.information_icon} type="right" size={'lg'} />
                        </div>
                    </div>
                    <div className={styles.information_box} >
                        <div className={styles.information_box_title} >修改密码</div>
                        <div className={styles.information_msg_box} >
                            <div className={styles.information_msg} >已验证</div>
                            <Icon className={styles.information_icon} type="right" size={'lg'} />
                        </div>
                    </div>
                    <div className={styles.information_box_highter}></div>
                    <div className={styles.information_box} >
                        <div className={styles.information_box_title} >我的银行卡</div>
                        <div className={styles.information_msg_box} >
                            <div className={styles.information_msg} >已绑定</div>
                            <Icon className={styles.information_icon} type="right" size={'lg'} />
                        </div>
                    </div>
                </div>


                <div className={styles.logout_button_box} >
                    <div className={styles.logout_button} >退出登录</div>
                </div>

            </div>
        )
    }

}
