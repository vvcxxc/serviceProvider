/**title: 铺店规则 */
import React, { Component } from 'react'
import styles from './index.less'
export default class Rules extends Component { 

  render() {
    return (
      <div className={styles.store_rules}>
        <main >
          <div className={styles.title}>铺店规则</div>
          <ul>
            <li>贡献值到达100%，第二天开始铺店</li>
            <li>一天最多铺一次店</li>
            <li>按先来后到</li>
            <li>铺店后贡献值清0，附加贡献值转至贡献值</li>
          </ul>
          
          <div className={styles.title}>贡献值增长方式</div>
          <div>每日自动增长</div>
          
          <ul className={styles.foot_end}>
            <li>固定增长点（所有码包增加）</li>
            <li>固定增长点（所有码包增加）</li>
            <li>受邀人买码数  50  ：1</li>
            <li>邀请会长 + 40%</li>
            <li>邀请创客 + 40%</li>
          </ul>
        </main>
      </div>
    )
  }
}