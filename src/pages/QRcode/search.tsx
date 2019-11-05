/**title: 搜索 */
import React, { Component } from 'react';
import Filtrate from '../../components/Filtrate/index';
import Invitation from '../../components/Invitation/index';
import Request from '@/service/request'
import styles from './search.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';

export default class Search extends Component {
    state = {
        invitationShow: false,
        searchKey: '',
        listPage: 1,
        data: {
            layout: 0,
            list: {
                current_page: 1,
                data: [
                ],
                last_page: 99,
                path: "",
                per_page: 0,
                total: 0,
            },
            money_total: 0
        },
        resDataList: []
    }



    handleclose = () => {
        this.setState({ invitationShow: false })
    }
    KeySubmit = (e: any) => {
        e.persist();
        if (e.keyCode == 13) {
            this.handleSearch();
        }
        e.preventDefault();
    }
    handleWrite = (e: any) => {
        console.log(e)
        this.setState({ searchKey: e.target.value, listPage: 1, data: {}, resDataList: [] }, () => {
            this.handleSearch();
        })
    }
    handleSearch = () => {
        let search = this.state.searchKey;
        if (search === '') {
            this.setState({ searchKey: '', listPage: 1, data: {}, resDataList: [] })
            return;
        }
        Toast.loading('');
        Request({
            url: 'qrCodeList',
            method: 'GET',
            params: {
                name: search,
                page: this.state.listPage
            }
        }).then(res => {
            Toast.hide();
            let tempList = this.state.resDataList.concat(res.data.list.data);
            this.setState({ data: res.data, resDataList: tempList, listPage: Number(this.state.listPage) + 1 })
        })
    }
    handleCancle = (e: any) => {
        this.setState({ searchKey: '', listPage: 1, data: {}, resDataList: [] })
    }

    render() {
        return (
            <div className={styles.QRcode_search} >

                <div className={styles.ServiceProvider} >
                    <div className={styles.ServiceProvider_searchBox}>
                        <div className={styles.ServiceProvider_searchBox_icon}>
                            <Icon type="search" />
                        </div>
                        <input type="text"
                         className={styles.ServiceProvider_input}
                          placeholder='输入店铺名称' 
                          value={this.state.searchKey}
                          onChange={this.handleWrite.bind(this)}
                          onKeyUp={this.KeySubmit.bind(this)} />


                    </div>
                    <div className={styles.ServiceProvider_searchBox_cancle}>取消</div>
                </div>
                {
                    this.state.resDataList && this.state.resDataList.length > 0 ? <div className={styles.QRcode_content}>
                        {
                            this.state.resDataList.map((item: any, index: any) => {
                                return (
                                    <div className={styles.QRcode_item} key={index}>
                                        <div className={styles.QRcode_item_left}>
                                            <div className={styles.QRcode_item_name}>二维码序列号：{item.qrcode_sn}</div>
                                            {
                                                item.shop_name && item.shop_name != "" && item.shop_name != "0" ? <div className={styles.QRcode_item_date}>店铺：{item.shop_name}</div> : null
                                            }
                                        </div>
                                        <div className={styles.QRcode_item_right}>
                                            {
                                                item.shop_name && item.shop_name != "" && item.shop_name != "0" ? <div className={styles.QRcode_item_toDay}>今日收益{item.today_count}</div> : null
                                            }

                                            {
                                                item.shop_name && item.shop_name != "" && item.shop_name != "0" ? <div className={styles.QRcode_item_toMonth}>本月收益{item.month_count}</div> : null
                                            }
                                            {
                                                item.shop_name && item.shop_name != "" && item.shop_name != "0" ? <div className={styles.QRcode_item_total}>总收益{item.total_income_money}</div> : null
                                            }

                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className={styles.loadingMore_button_box} onClick={this.handleSearch}>
                            {
                                this.state.listPage - 1 <= this.state.data.list.last_page ? ' 点击加载更多' : '暂无更多数据'
                            }
                        </div>
                    </div> : null
                }

                {
                    this.state.resDataList && this.state.resDataList.length == 0 ? <div className={styles.on_list} >无记录</div> : null
                }
             
            </div>
        )
    }

}
