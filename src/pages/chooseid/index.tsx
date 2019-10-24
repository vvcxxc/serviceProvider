import React, { Component } from 'react';
import styles from './index.less';
import { Button } from 'antd-mobile';
import Request from '@/service/request';
import router from 'umi/router';

class ChooseId extends Component {
  state = {
    type: 1
  }
    handleSelectType = (e: any) => {
        console.log(e.target.value)
      this.setState({
        type: e.target.value
      })
    }
    toNext = () =>{
      Request({
        method: 'post',
        url: 'auth/selectType',
        data:{
          type: this.state.type
        }
      }).then(res => {
        // let { code, data } = res
        console.log(res)
        if(res.code == 200){
          router.push('/submitQua/BankCard')
        }
      })
    }

    render() {
        return (
            <div className={styles.chooseid_wrap}>
                <div className={styles.chooseid_title}>我是</div>
                <div className={styles.radio_group} onChange={this.handleSelectType}>
                    <div className={styles.service_item}>
                        <input type="radio" id="prepare_service" name="service_provider" value={1} />
                        <label htmlFor="prepare_service">预备服务商</label>
                    </div>
                    <div className={styles.service_item}>
                        <input type="radio" id="sork_service" name="service_provider" value={2} />
                        <label htmlFor="sork_service">一般服务商</label>
                    </div>
                    <div className={styles.service_item}>
                        <input type="radio" id="business_service" name="service_provider" value={3} />
                        <label htmlFor="business_service">企业服务商</label>
                    </div>
                </div>

                <div className={styles.next_step_wrap}>
                    <div className={styles.next_step}>
                    <Button className={styles.next_step_btn} onClick={this.toNext}>下一步</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChooseId;
