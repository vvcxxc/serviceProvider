
import React from 'react'
import styles from './index.less'
import router from 'umi/router'

export function ListPackage(params: any) {
  const { list, price, have_more } = params
  return (
    <main className={styles.package_main}>
      <div className={styles.total_package_box}>
        <div className={styles.total_package}>
          <div>当前码单价：{price}</div>
          {/* <div className={styles.check_record} onClick={() => router.push({ pathname: 'qr_code_page/package_record' })}>
            转进转出记录
          </div> */}
        </div>
      </div>
      
      <div className={styles.list_package_box}>
        {
          list.map((value: any, index: number) => {
            return <div className={styles.list_package} key={index}>
              <div>{index + 1}</div>
              <ul>
                <li> 时间：<span>{value.created_at}</span>  </li>
                <li> 码数：<span>{value.total_layout_num}</span>  </li>
                <li> 已铺：<span>{value.layouted_num}</span> </li>
                <li> 当前阶段：<span>{value.now_stage_num}</span> </li>
                <li> 下阶段铺设：<span>{value.attached ? value.attached.next_layout_num : '-'}</span></li>
                <li> 码包来源：<span>{['购买', '转让', '旧数据处理'][value.from_type - 1]}</span> </li>
                {/* <li><span className={styles.transfer} onClick={() =>
                  router.push({ pathname: 'qr_code_page/code_make_over' })
                }>转让</span></li> */}
              </ul>
              <ul>
                <li> 贡献值：<span> {value.attached ? value.attached.now_score_num : 0}%</span> </li>
                <li> 铺码状态：<span> {['排队', '排队', '铺设完成'][value.status - 1]}</span>
                </li>
                <li> 铺店排名：<span>{value.ranking}</span> </li>
                <li> 预计铺店: <span>{value.LayoutDate ? value.LayoutDate : '-'}</span> </li>
                <li> 购包时码单价：<span>{value.qrcode_univalence}</span> </li>
              </ul>
            </div>
          })
        }
        {
          have_more ? <div className={styles.getmore} onClick={() => params.getWantMore(1)}>加载更多</div> : <div className={styles.getmore} >暂无更多数据</div>
        }
        
      </div>
    </main>
  )
}