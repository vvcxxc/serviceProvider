import React, { Component } from 'react';
import { Icon, Grid } from 'antd-mobile';
import styles from './index.less';

interface Props {
    onEndReached: Function,
    isShowLoading: Boolean,
    renderView: any,
}

export default class ScrollView extends Component<Props> {

    handleScroll = () => {
        let ele = document.getElementById('scrollViewWrap');
        let scrollTop = ele.scrollTop;
        let clientTop = ele.clientHeight;
        let scrollHeight = ele.scrollHeight;
        if (scrollTop + clientTop == scrollHeight) {
            this.props.onEndReached()
        }
    }

    render() {
        const { isShowLoading } = this.props;
        return (
            <div className={styles.scrollView_wrap} onScroll={this.handleScroll.bind(this)} id="scrollViewWrap">
                {this.props.renderView}
                {
                    isShowLoading ? (
                        <Grid data={[{
                            icon: (<Icon type="loading" />),
                            text: 'loading...',
                        }]} columnNum={1} hasLine={false} itemStyle={{ height: '150px' }} />
                    ) : <div className={styles.no_data}>暂无更多数据</div>
                }
            </div>
        )
    }
}