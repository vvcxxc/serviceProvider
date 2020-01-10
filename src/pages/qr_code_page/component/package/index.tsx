

import React from 'react'
import styles from './index.less'

export function ListPackage(params: any) {
  const { list, price } = params
  return (
    <main>
      <div className={styles.total_package}>
        <div>当前码单价：{price}</div>
        <div className={styles.check_record}>
          {/* 转进转出记录 */}
          </div>
      </div>

      {
        list.map((value:any,index:number) => {
          return <div key={index} className={styles.list_package}>
            <div>{index+1}</div>
            <ul>
              <li> <span>时间：{value.created_at}</span>  </li>
              <li> <span>码数：{value.total_layout_num}</span>  </li>
              <li> <span>已铺：{value.layouted_num}</span> </li>
              <li> <span>当前阶段：{value.now_stage_num}</span> </li>
              <li> <span>下阶段铺设：{value.next_layout_num ? value.next_layout_num:'-'}</span></li>
              <li> <span>码包来源：{value.from_type}</span> </li>
              {/* <li><span className={styles.transfer}>转让</span></li> */}
            </ul>
            <ul>
              <li> <span>贡献值：{ value.attached ? value.attached.now_score_num:0 }%</span> </li>
              <li>
                <span>铺码状态：{['排队', '排队','铺设完成'][value.status - 1]}
              </span>
              </li>
              <li> <span>铺店排名：{value.ranking}</span> </li>
              <li> <span>预计铺店: {value.LayoutDate ? value.LayoutDate :'-'}</span> </li>
              <li> <span>购包时码单价：{value.qrcode_univalence}</span> </li>
            </ul>
          </div> 
        })
      }
    </main>
  )
}