import React, { Component } from 'react';
import { Icon, Grid } from 'antd-mobile';
import styles from './index.less';

interface Props {
    onEndReached: Function,
    isShowLoading: Boolean,
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
        console.log(scrollHeight,clientTop,scrollTop)
        if (scrollTop + clientTop == scrollHeight) {
            this.setState({is_show: true})
            this.props.onEndReached()
        }
    }

    render() {
        const { isShowLoading, is_show } = this.props;
        return (
            <div className={styles.scrollView_wrap} onScroll={this.handleScroll.bind(this)} id="scrollViewWrap">
                {this.props.renderView}
                {
                    is_show ? isShowLoading ? (
                        <Grid data={[{
                            icon: (<Icon type="loading" />),
                            text: 'loading...',
                        }]} columnNum={1} hasLine={false} itemStyle={{ height: '150px' }} />
                    ) : <div className={styles.no_data}>暂无更多数据</div> : null
                }
            </div>
        )
    }
}
