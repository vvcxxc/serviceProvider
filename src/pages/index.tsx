/**title: 我的码 */
import React, { Component } from 'react';
import Filtrate from '../components/Filtrate/index';
import Invitation from '../components/Invitation/index';
import Request from '@/service/request';
import styles from './index.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

export default class QRcode extends Component {
    state = {
        dataList: [
            {
                index: 0,
                key: '排序',
                title: '排序',
                value: ['收益', '邀请人数', '邀请时间'],
                select: false
            },
            {
                index: 1,
                key: '铺设状态',
                title: '铺设状态',
                value: ['全部', '已铺设', '未铺设'],
                select: false
            }
        ],
        invitationShow: false,
        closeNum: 1,
        data: []
    }


    componentDidMount() {
        Request({
            url: 'qrCodeList',
            method: 'GET',
        }).then(res => {
            console.log(res)
            this.setState({ data: res.data })
        })
    }

    searchPayload = (query: any) => {
        console.log('lll', query)

        // router.push({ pathname: '/QRcode/search', query: query })
    }

    handleclose = (query: any) => {
        this.setState({ invitationShow: false })
    }

    render() {
        return (
            <div className={styles.QRcode} onClick={() => { this.setState({ closeNum: this.state.closeNum + 1 }) }}>

                {/* <Filtrate dataList={this.state.dataList} onSearch={this.searchPayload} closeNum={this.state.closeNum} /> */}


                {
                    this.state.dataList?<div className={styles.QRcode_total}>
                        <div className={styles.totalPeople}>共30个码，10个已铺设</div>
                        <div className={styles.totalMoney}>带来总收益￥23333</div>
                    </div>:null
                }

                <div className={styles.QRcode_content}>

                    {
                        this.state.data && this.state.data.length > 0 ? this.state.data.map((item: any, index: number) => {
                            return (
                                <div className={styles.QRcode_item}>
                                    <div className={styles.QRcode_item_left}>
                                        <div className={styles.QRcode_item_name}>{item.qrcode_sn}</div>
                                        <div className={styles.QRcode_item_date}>{item.shop_name}</div>
                                    </div>
                                    <div className={styles.QRcode_item_right}>
                                        <div className={styles.QRcode_item_toDay}>今日收益100</div>
                                        <div className={styles.QRcode_item_toMonth}>本月收益2333</div>
                                        <div className={styles.QRcode_item_total}>总收益2555</div>

                                    </div>
                                </div>
                            )
                        }) : null
                    }
                </div>
                {
                    this.state.data.length == 0 ? <div className={styles.on_list} >无记录</div> : null
                }

                {/* <div className={styles.invitation} onClick={() => { this.setState({ invitationShow: true }) }}>邀请</div> */}
                {
                    this.state.invitationShow ? <Invitation onClose={this.handleclose} /> : null}

            </div>
        )
    }

}
