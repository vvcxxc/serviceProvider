/**title: 二维码转让协议 */
import React, { Component } from 'react'
import router from 'umi/router'
import styles from './index.less'
export default class ProtocolDetails  extends Component {
  state = {
    meta:false
  }
  render() {
    return (
      <main className={styles.main}>
        <div>
          <div>
            <img src={require('../../../assets/ql_code/code.png')} alt="" />
          </div>
          <div className={styles.my_title}>《二维码转让协议》</div>
          <ul>
            <li>1.<span>二维码转让后，码所属归承让人所有</span></li>
            <li>2.<span>转让中的码不影响收益</span></li>
            <li>3.<span>转让后的码只有码主收益，不影响邀请人</span></li>
            <li>与最终企业服务商收益</li>
          </ul>
        </div>
      </main>
    )
  }
}