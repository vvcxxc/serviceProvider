/**title: 搜索 */
import React, { Component } from 'react';
import Filtrate from '../../components/Filtrate/index';
import Invitation from '../../components/Invitation/index';

import styles from './search.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

export default class Search extends Component {
    state = {
        invitationShow: false
    }



    handleclose = (query: any) => {
        this.setState({ invitationShow: false })
    }

    render() {
        return (
            <div className={styles.InvitationServiceProvider_serch} >

                <div className={styles.ServiceProvider} >
                    <div className={styles.ServiceProvider_searchBox}>
                        <div className={styles.ServiceProvider_searchBox_icon}>
                            <Icon type="search" />
                        </div>
                        <input type="text" className={styles.ServiceProvider_input} placeholder='输入服务商名称或手机号' />


                    </div>
                    <div className={styles.ServiceProvider_searchBox_cancle}>取消</div>
                </div>
                <div className={styles.InvitationServiceProvider_content}>


                    <div className={styles.InvitationServiceProvider_item}>
                        <div className={styles.InvitationServiceProvider_item_left}>
                            <div className={styles.InvitationServiceProvider_item_name}>服务商A</div>
                            <div className={styles.InvitationServiceProvider_item_date}>2019-7-1 12:00:00</div>
                        </div>
                        <div className={styles.InvitationServiceProvider_item_right}>带来收益：88</div>
                    </div>

                </div>

                <div className={styles.on_list} >无记录</div>

                <div className={styles.invitation} onClick={() => { this.setState({ invitationShow: true }) }}>邀请</div>
                {
                    this.state.invitationShow ? <Invitation onClose={this.handleclose} /> : null}

            </div>
        )
    }

}
