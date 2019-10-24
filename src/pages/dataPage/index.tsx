/**title: 数据 */
import React, {Component} from 'react'
import styles from './index.less'
import { Flex, WingBlank } from 'antd-mobile'
export default class DataPage extends Component {
  state = {

  }
  render (){
    return (
      <div className={styles.dataPage}>
        <Flex className={styles.no_data} justify='around' align='center'>
          暂无图表数据统计
        </Flex>
      </div>
    )
  }
}
