import React, { Component } from 'react';
import styles from './index.less';
import { Button, Toast } from 'antd-mobile';
import Request from '@/service/request';
import router from 'umi/router';
import Cookies from 'js-cookie';

class ChooseId extends Component {
  state = {
    bussiness_type: null
  }
  async componentDidMount() {
    await Cookies.get("bussiness_type") ? (
      this.setState({
        bussiness_type: Number(Cookies.get("bussiness_type"))
      })
    ) : this.setState({
      bussiness_type: 1
    })
  }
  handleSelectType = (e: any) => {
    console.log(e.target.value)
    this.setState({
      bussiness_type: e.target.value
    })
    Cookies.set("bussiness_type", e.target.value, { expires: 1 })
  }
  toNext = () => {
    Request({
      method: 'post',
      url: 'auth/selectType',
      data: {
        type: this.state.bussiness_type
      }
    }).then(res => {
      if (res.code == 200) {
        Toast.success(res.message, 1);
        setTimeout(() => {
          router.push('/submitQua/BankCard');
        }, 1000)
      } else {
        Toast.fail(res.message, 1);
      }
    })
  }

  render() {
    const { bussiness_type } = this.state;
    return (
      <div className={styles.chooseid_wrap}>
        <div className={styles.chooseid_title}>我是</div>
        <div className={styles.radio_group} onChange={this.handleSelectType}>
          <div className={styles.service_item}>
            {
              bussiness_type == 1 ? (
                <input type="radio" id="prepare_service" name="service_provider" value={1} defaultChecked={true} />
              ) : (
                  <input type="radio" id="prepare_service" name="service_provider" value={1} />
                )
            }
            <label htmlFor="prepare_service">预备服务商</label>
          </div>
          <div className={styles.service_item}>
            {
              bussiness_type == 2 ? (
                <input type="radio" id="sork_service" name="service_provider" value={2} defaultChecked={true} />
              ) : (
                  <input type="radio" id="sork_service" name="service_provider" value={2} />
                )
            }
            <label htmlFor="sork_service">一般服务商</label>
          </div>
          <div className={styles.service_item}>
            {
              bussiness_type == 3 ? (
                <input type="radio" id="business_service" name="service_provider" value={3} defaultChecked={true} />
              ) : (
                  <input type="radio" id="business_service" name="service_provider" value={3} />
                )
            }
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
