import React, { Component } from 'react';
import styles from './index.less';
import router from 'umi/router';
import { Icon } from 'antd-mobile';
import { Flex, WingBlank, Steps, Toast, Button } from 'antd-mobile';


interface Props {
    dataList: any,
    onSearch: any,
    closeNum:any
}

// 使用须知
// 传入标题———二级标题dataList,没做超出屏幕左右滑动处理，传个三四个筛选条件就好，不要太过分
//onSearch:按搜索按钮触发，返回选中条件文本
//closeNum触发关闭选中状态，写啥都可以能有变化就行，值变化触发componentWillReceiveProps生命周期
export default class Filtrate extends Component<Props>{
    state = {
        dataList: [
            // {
            //     index: 0,
            //     key: '排序',
            //     title: '排序',
            //     value: ['排序', '收益', '邀请人数', '邀请时间'],
            //     select: false
            // },
            // {
            //     index: 1,
            //     key: '铺设状态',
            //     title: '铺设状态',
            //     value: ['排序', '收益', '邀请人数', '邀请时间'],
            //     select: false
            // }
        ]
    }

    componentWillReceiveProps(){
        let tempList = this.state.dataList;
        for (let i = 0; i < tempList.length; i++) {
            tempList[i].select = false;
        }
    }

    componentDidMount() {
        let FiltrateList = this.props.dataList;
        this.setState({ dataList: FiltrateList })
    }


    submit = (e: any) => {
        let tempList = this.state.dataList;
        let returntList = [];
        for (let i = 0; i < tempList.length; i++) {
            returntList.push(tempList[i].title);
        }
        console.log(returntList);
        this.props.onSearch && this.props.onSearch(returntList);
        e.stopPropagation();
    }

    selectKey = (index: any, e: any) => {
        let tempList = this.state.dataList;
        let tempstyle = tempList[index].select;
        for (let i = 0; i < tempList.length; i++) {
            tempList[i].select = false;
            // tempList[i].title = tempList[i].key;
        }
        if (e.target.nodeName == 'LI') {
            console.log(e.target.innerText)
            tempList[index].title = e.target.innerText;
        } else {
            tempList[index].select = !tempstyle;
        }
        this.setState({ dataList: tempList })
        e.stopPropagation();
    }


    render() {
        return (
            <div className={styles.filtrate}>
                {
                    this.state.dataList && this.state.dataList.length > 0 ? this.state.dataList.map((item: any, index: any) => {
                        return (
                            <div key={index} className={styles.filtrate_key} onClick={this.selectKey.bind(this, item.index)} >{item.title}
                                {item.select ? <Icon className={styles.filtrate_icon} type="up" /> : <Icon className={styles.filtrate_icon} type="down" />}
                                <div className={styles.filtrate_value_box} style={{ display: item.select ? 'block' : 'none' }}>
                                    <ul className={styles.filtrate_value_ul} onClick={this.selectKey.bind(this, item.index)} >
                                        {
                                            item.value.map((_li: any, _index: any) => {
                                                return (
                                                    <li key={_index} className={styles.filtrate_value_li}>{_li}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                                <div className={styles.filtrate_search_btn} onClick={this.submit.bind(this)}> 搜索</div>
                            </div>
                        )
                    }) : null
                }



            </div>
        )
    }

}
