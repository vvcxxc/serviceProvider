import React, { Component } from 'react';
import styles from './index.less';
import { Button, Toast } from 'antd-mobile';
import Request from '@/service/request';
import router from 'umi/router';
import Cookies from 'js-cookie';
import qs from 'qs';

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
    this.setState({
      bussiness_type: e.target.value
    })
    Cookies.set("bussiness_type", e.target.value, { expires: 1 })
  }
  toNext = () => {
    // Request({
    //   method: 'post',
    //   url: 'auth/selectType',
    //   data: {
    //     type: this.state.bussiness_type
    //   }
    // }).then(res => {
    //   if (res.code == 200) {
    //     Toast.success(res.message, 1, () => {
    //       router.push('/submitQua/BankCard');
    //     });
    //   } else {
    //     Toast.fail(res.message, 1);
    //   }
    // })
    let username = Cookies.get('registerUsername');
    let phone = Cookies.get('registerPhone');
    let password = Cookies.get('registerPassword');
    let code = Cookies.get('registerCode');
    let inviter_phone = Cookies.get('registerInviterPhone');
    let data;
    if (inviter_phone) {
      data = qs.stringify({
        name: username,
        account: phone,
        password,
        verify_code: code,
        from_phone: inviter_phone,
        type: this.state.bussiness_type
      })
    } else {
      data = qs.stringify({
        name: username,
        account: phone,
        password,
        verify_code: code,
        type: this.state.bussiness_type
      })
    }
    Request({
      url: 'register',
      method: 'post',
      data
    }).then(res => {
      let { code, message } = res;
      if (code == 200) {
        Toast.success('注册成功', 2, () => {
          localStorage.setItem('token', res.access_token);

          Cookies.set("bussiness_type", "", { expires: 1 });

          Cookies.set("ImgUrlFront", "", { expires: 1 });
          Cookies.set("ImgUrlBehind", "", { expires: 1 });
          Cookies.set("User", "", { expires: 1 });
          Cookies.set("bankCard", "", { expires: 1 });
          Cookies.set("bankName", "", { expires: 1 });
          Cookies.set("subBranchBank", "", { expires: 1 });

          Cookies.set("ImgUrlFrontID", "", { expires: 1 });
          Cookies.set("ImgUrlBehindID", "", { expires: 1 });
          Cookies.set("ImgUrlFrontBehindID", "", { expires: 1 });
          Cookies.set("UserName", "", { expires: 1 });
          Cookies.set("IDCardNumber", "", { expires: 1 });
          Cookies.set("IDCardValidity", "", { expires: 1 });

          Cookies.set('registerUsername', "", { expires: 1 });
          Cookies.set('registerPhone', "", { expires: 1 });
          Cookies.set('registerCode', "", { expires: 1 });
          Cookies.set('registerPassword', "", { expires: 1 });
          Cookies.set('registerInviterPhone', "", { expires: 1 });

          router.push('/login');
          // Toast.success(res.message, 1, () => {
          //   router.push('/login');
          // });
        })
      } else {
        Toast.fail(res.message, 1);
        // _this.setState({ is_ok: true });
        // _this.props.dispatch({
        //   type: 'register/registered',
        //   payload: {
        //     is_ok: true
        //   }
        // })
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
          <Button className={styles.next_step_btn} onClick={this.toNext}>注册</Button>
        </div>
      </div>
    )
  }
}

export default ChooseId;
