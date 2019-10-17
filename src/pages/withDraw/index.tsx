import React, { Component } from 'react';
import styles from './index.less';
import { Flex } from 'antd-mobile'
export default class WithDraw extends Component  {
    state = {

    }
    render (){
        return (
            <div className={styles.pages}>
                <Flex className={styles.withdraw_header} justify='around'>
                    <div className={styles.bank_img}>
                      <img src=""/>
                    </div>
                    <div className={styles.bank_name}>
                      中国交通银行
                    </div>
                    <div>
                      ****1234
                    </div>
                </Flex>
                <div className={styles.withdraw_main}>
                  <div className={styles.title}>提现金额</div>
                  <Flex className={styles.input_box} justify='between'>
                    <div className={styles.money_icon}>￥</div>
                    <input type="text"/>
                    <div className={styles.all}>全部</div>
                  </Flex>
                </div>
            </div>
        )
    }
}
