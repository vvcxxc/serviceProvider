

import React from 'react'
import styles from './index.less'

export function ListPackage(params:any) {
  let options: Array<any> = []
  return (
    <main>
      <div className={styles.total_package}>
        <div>当前码单价：300</div>
        <div className={styles.check_record}>转进转出记录</div>
      </div>

      <div className={styles.list_package}>
        <div>1</div>
        <ul>
          <li> <span>时间：2019-12-12</span>  </li>
          <li> <span>码数：1000</span>  </li>
          <li> <span>已铺：100</span> </li>
          <li> <span>当前阶段：2</span> </li>
          <li> <span>下阶段铺设：20</span>  </li>
          <li> <span>码包来源：购买</span> </li>
          <li><span className={styles.transfer}>转让</span></li>
        </ul>
        <ul>
          <li>  <span>贡献值：50%</span> </li>
          <li>  <span>铺码状态：排队</span> </li>
          <li>  <span>铺店排名：17</span> </li>
          <li>  <span>预计铺店19/12/13</span> </li>
          <li>  <span>购包时码单价：200</span> </li>
        </ul>
      </div> 
    </main>
  )
}