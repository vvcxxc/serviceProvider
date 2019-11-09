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
        invitationData: {
            book:
            {
                current_page: 1,
                data: [],
                from: 1,
                last_page: 1,
                per_page: 10,
                prev_page_url: null,
                to: 2,
                total: 2
            },
            incomeTotal: 0
        },
        invitationList: [],
        status: 0,
    }
    componentDidMount() {
        Request({
            url: 'user/info'
        }).then(res => {
            if (res.code == 200) {
                this.setState({
                    status: res.data.status
                })
            }
        })
    }

    handleclose = () => {
        this.setState({ invitationShow: false })
    }
    handleWrite = (e: any) => {
        console.log(e)
        this.setState({ searchKey: e.target.value, listPage: 1, invitationData: {}, invitationList: [] }, () => {
            this.handleSearch();
        })
    }
    handleSearch = () => {
        let _type;
        let search = this.state.searchKey;
        if (search == '') {
            return;
        } else if (/^1[3456789]\d{9}$/.test(search)) {
            _type = 'phone';
        } else {
            _type = 'name';
        }
        Toast.loading('');
        Request({
            url: 'facilitatorIncome',
            method: 'GET',
            params: {
                search: search,
                searchType: _type,
                page:1
            }
        }).then(res => {
            Toast.hide();
            // let tempList = this.state.invitationList.concat(res.data.book.data);
            let tempList = res.data.book.data
            this.setState({ invitationData: res.data, invitationList: tempList, listPage: 2 })
        })
    }
    handleCancle = (e: any) => {
        this.setState({ searchKey: '', listPage: 1, invitationData: {}, invitationList: [] }, () => {
            router.goBack();
        })
    }


    handleAdd = () => {
        let _type;
        let search = this.state.searchKey;
        if (search === '') {
            this.setState({ searchKey: '', listPage: 1, invitationData: {}, invitationList: [] })
            return;
        } else if (/^1[3456789]\d{9}$/.test(search)) {
            _type = 'phone';
        } else {
            _type = 'name';
        }
        Toast.loading('');
        Request({
            url: 'facilitatorIncome',
            method: 'GET',
            params: {
                search: search,
                searchType: _type,
                page: this.state.listPage
            }
        }).then(res => {
            Toast.hide();
            let tempList = this.state.invitationList.concat(res.data.book.data);
            // let tempList = res.data.book.data
            this.setState({ invitationData: res.data, invitationList: tempList, listPage: Number(this.state.listPage) + 1 })
        })
    }

    render() {
        return (
            <div className={styles.InvitationServiceProvider_serch} >

                <div className={styles.ServiceProvider} >
                    <div className={styles.ServiceProvider_searchBox}>
                        <div className={styles.ServiceProvider_searchBox_icon}>
                            <Icon type="search" />
                        </div>
                        <input type="text"
                            className={styles.ServiceProvider_input}
                            placeholder='输入服务商名称或手机号'
                            value={this.state.searchKey}
                            onChange={this.handleWrite.bind(this)}
                        />
                    </div>
                    <div className={styles.ServiceProvider_searchBox_cancle} onClick={this.handleCancle.bind(this)}>取消</div>
                </div>


                {
                    this.state.invitationList.length && this.state.invitationList.length > 0 ? <div className={styles.InvitationServiceProvider_content}>
                        {
                            this.state.invitationList.map((item: any, index: any) => {
                                return (
                                    <div className={styles.InvitationServiceProvider_item} key={index} >
                                        <div className={styles.InvitationServiceProvider_item_left}>
                                            <div className={styles.InvitationServiceProvider_item_name}>{item.name}</div>
                                            <div className={styles.InvitationServiceProvider_item_date}>{item.created_at}</div>
                                        </div>
                                        <div className={styles.InvitationServiceProvider_item_right}>带来收益：{item.invite_total_money}</div>
                                    </div>
                                )
                            })
                        }
                        <div className={styles.loadingMore_button_box} onClick={this.handleAdd}>
                            {
                                this.state.listPage - 1 <= this.state.invitationData.book.last_page ? ' 点击加载更多' : '暂无更多数据'
                            }
                        </div>
                    </div> : null
                }

                {
                    this.state.invitationList.length == 0 ? <div className={styles.on_list} >无记录</div> : null
                }
                {
                    this.state.status == 1 ? (
                        <div className={styles.invitation} onClick={() => { this.setState({ invitationShow: true }) }}>邀请</div>
                    ) : ""
                }                {
                    this.state.invitationShow ? <Invitation onClose={this.handleclose} /> : null}

            </div>
        )
    }

}
