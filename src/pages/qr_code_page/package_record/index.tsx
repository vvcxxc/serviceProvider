/**title: 二维码转入转出记录 */
import React, { Component } from 'react'
import styles from './index.less'
import router from 'umi/router'
export default class Rules extends Component {

  render() {
    return (
      <main className={styles.package_record}>
        <ul>
          <li>2019/12/12</li>
          <li>
            <div>类型：<span>转让</span></div>
            <div>转让人：<span>李四</span></div>
            <div>单价：<span>300</span></div>
          </li>
          <li>
            <div>数量：<span>50</span></div>
            <div>承让人：<span>张三</span></div>
            <div>状态：<span>进行中</span></div>
            {/* 进行中 #4CD22C  驳回 #F81B1B  已转 #547BE7 */}
          </li>
        </ul>
        <ul>
          <li>2019/12/12</li>
          <li>
            <div>类型：<span>转让</span></div>
            <div>转让人：<span>李四</span></div>
            <div>单价：<span>300</span></div>
          </li>
          <li>
            <div>数量：<span>50</span></div>
            <div>承让人：<span>张三</span></div>
            <div>状态：<span>进行中</span></div>
            {/* 进行中 #4CD22C  驳回 #F81B1B  已转 #547BE7 */}
          </li>
        </ul>
        <ul style={{ border: 'none' }}>
          <li>2019/12/12</li>
          <li>
            <div>类型：<span>转让</span></div>
            <div>转让人：<span>李四</span></div>
            <div>单价：<span>300</span></div>
          </li>
          <li>
            <div>数量：<span>50</span></div>
            <div>承让人：<span>张三</span></div>
            <div>状态：<span>进行中</span></div>
            {/* 进行中 #4CD22C  驳回 #F81B1B  已转 #547BE7 */}
          </li>
        </ul>
        <div className={styles.getmore}>查看更多</div>
      </main>
    )
  }
}