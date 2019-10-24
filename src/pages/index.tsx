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
        listPage: 1,
        data: {
            layout: 0,
            list: {
                current_page: 1,
                data: [
                ],
                last_page: 0,
                path: "",
                per_page: 0,
                total: 0,
            },
            money_total: 0
        },
        resDataList:[]
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        Request({
            url: 'qrCodeList',
            method: 'GET',
            params: {
                page: this.state.listPage
            }
        }).then(res => {
            let tempList=this.state.resDataList.concat(res.data.list.data)
            this.setState({ data: tempList, resDataList:tempList,listPage: Number(this.state.listPage) + 1 })
            console.log(res)
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

                <div className={styles.QRcode_total}>
                    <div className={styles.totalPeople}>共{this.state.data.list.total}个码，{this.state.data.layout}个已铺设</div>
                    <div className={styles.totalMoney}>带来总收益￥{this.state.data.money_total}</div>
                </div>
                <div className={styles.QRcode_content}>
                    {
                        this.state.resDataList && this.state.resDataList.length > 0 ? this.state.resDataList.map((item: any, index: any) => {
                            return (
                                <div className={styles.QRcode_item} key={index}>
                                    <div className={styles.QRcode_item_left}>
                                        <div className={styles.QRcode_item_name}>{item.qrcode_sn}</div>
                                        <div className={styles.QRcode_item_date}>{item.shop_name}</div>
                                    </div>
                                    <div className={styles.QRcode_item_right}>
                                        <div className={styles.QRcode_item_toDay}>今日收益{item.today_count}</div>
                                        <div className={styles.QRcode_item_toMonth}>本月收益{item.month_count}</div>
                                        <div className={styles.QRcode_item_total}>总收益{item.total_income_money}</div>

                                    </div>
                                </div>
                            )
                        }) : null
                    }
                    <div className={styles.loadingMore_button_box} onClick={this.requestList}>
                        {
                            this.state.listPage>this.state.data.list.last_page?' 点击加载更多':'暂无更多数据'
                        }
                       
                    </div>

                </div>
                {
                    this.state.data.list.data && this.state.data.list.data.length == 0 ? <div className={styles.on_list} >无记录</div> : null
                }

                {/* <div className={styles.invitation} onClick={() => { this.setState({ invitationShow: true }) }}>邀请</div> */}
                {
                    this.state.invitationShow ? <Invitation onClose={this.handleclose} /> : null}

            </div>
        )
    }

}
