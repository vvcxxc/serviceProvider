/**title: 铺店规则 */
import React, { Component } from 'react'
import styles from './index.less'
export default class Rules extends Component {

  render() {
    return (
      <div className={styles.store_rules}>
        <div className={styles.my_padding}></div>
        <main >
          {/* <div className={styles.img_box}>
            <img src={require('../../../assets/ql_code/plaint.png')} alt="" />
          </div> */}
          <ul>
            <li>铺店规则</li>
            <li>贡献值到达100%，第二天开始铺店</li>
            <li>一天最多铺一次店</li>
            <li>按先来后到</li>
            <li> 铺店后码包下一阶段贡献值清0，附加贡献值转至贡献值</li>
          </ul>
          <ul>
            <li> 码包贡献值增长来源</li>
            <li> 每日自动增长</li>
            <li>  附加贡献值增加（所有码包增加）</li>
          </ul>
          <ul>
            <li> 附加贡献值来源</li>
            <li> 服务商买码数  50  ：1</li>
            <li> 邀请营运中心 40</li>
            <li> 邀请创客  5</li>

          </ul>
          <ul>
            <li> 码包铺设比例</li>
            <li> 阶段一：15%</li>
            <li> 阶段二：15%</li>
            <li> 阶段三：15%</li>
            <li>阶段四：15%</li>
            <li>阶段五：20%</li>
            <li>阶段六：20%</li>
          </ul>

          {/* <ul>
            <li>铺店规则</li>
            <li>贡献值到达100%，第二天开始铺店</li>
            <li>一天最多铺一次店</li>
            <li>按先来后到</li>
            <li>铺店后贡献值清0，附加贡献值转至贡献值</li>
          </ul>
          
          <ul className={styles.foot_end}>
            <li>贡献值增长方式</li>
            <li>每日自动增长</li>
            <li>固定增长点（所有码包增加）</li>
            <li>受邀人买码数  50  ：1</li>
            <li>邀请会长 + 40</li>
            <li>邀请创客 + 40</li>
          </ul> */}
        </main>
      </div>
    )
  }
}