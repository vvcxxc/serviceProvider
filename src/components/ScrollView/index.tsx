import React, { Component } from 'react';
import { Icon, Grid } from 'antd-mobile';
import styles from './index.less';

interface Props {
    // 触底函数
    onEndReached: Function,
    // 是否显示Loading
    isShowLoading: Boolean,
    // 视图渲染
    renderView: any,
}

export default class ScrollView extends Component<Props> {

    state = {
        is_show: false
    }

    handleScroll = () => {
        let ele = document.getElementById('scrollViewWrap');
        let scrollTop = ele.scrollTop;
        let clientTop = ele.clientHeight;
        let scrollHeight = ele.scrollHeight;
        if (scrollTop + clientTop == scrollHeight) {
            this.setState({
                is_show: true
            })
            this.props.onEndReached ? this.props.onEndReached() : console.log('触底')
        }
    }

    render() {
        const { isShowLoading } = this.props;
        const { is_show } = this.state;
        return (
            <div className={styles.scrollView_wrap} onScroll={this.handleScroll.bind(this)} id="scrollViewWrap">
                {this.props.renderView}
                {
                    is_show ? (
                        isShowLoading ? (
                            <Grid data={[{
                                icon: (<Icon type="loading" />),
                                text: 'loading...',
                            }]} columnNum={1} hasLine={false} itemStyle={{ height: '150px' }} />
                        ) : <div className={styles.no_data}>暂无更多数据</div>
                    ) : ""
                }
            </div>
        )
    }
}
