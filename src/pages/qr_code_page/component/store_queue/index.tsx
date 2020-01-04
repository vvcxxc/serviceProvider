

import React from 'react'
import router from 'umi/router';
import styles from './index.less'

export function ListStoreQueue(params:any) {
  let options: Array<any> = [0,1,2]
  return (
    <main>
      <div className={styles.prompt}>
        <div >
          <span>下一次铺码排名：38</span>
          <span>预计铺店日期：2019-12-12</span>
        </div>
        <div>
          <span>下一次预计铺店：100</span>
          <span className={styles.improve_button} onClick={()=>router.push({ pathname: 'qr_code_page/rules' })}>提高排名</span>
          <span className={styles.change_record} onClick={() => router.push({ pathname: 'qr_code_page/change_record' })}>贡献值变更记录</span>
        </div>
      </div>
      <ul className={styles.preview_queue}>
        <li>
          <span>顺序</span>
          <span>姓名</span>
          <span>下阶段铺店数</span>
          <span>贡献值</span>
        </li>
        
        {
          options.map((value:any,index: number) => {
            return <li key={value} className={styles.list_children} style={{ lineHeight: index?'1rem':'0.6rem'}}>
              <span>1</span>
              <span>张小毛</span>
              <span>+100</span>
              <span>100%</span>
            </li>
          })
        }
      </ul>
      <div className={styles.store_help} onClick={() => router.push({ pathname:'qr_code_page/rules'})}>帮助</div>
    </main>
  )
}