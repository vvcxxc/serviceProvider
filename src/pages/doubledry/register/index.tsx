import React, { Component } from 'react';
import { Icon, InputItem, List } from 'antd-mobile';
import styles from './index.less';
import Cookies from 'js-cookie';

class Register extends Component {

    state = {
        // 基本数据
        DoubleDryUserName: "",
        DoubleDryIDCardNumber: "",
        DoubleDryIDCardValidity: "",
    }

    componentDidMount() {
        /**
         * 姓名
         */
        Cookies.get("DoubleDryUserName") || Cookies.get("DoubleDryUserName") == "" ? (
            this.setState({
                DoubleDryUserName: Cookies.get("DoubleDryUserName")
            })
        ) : "";

        /**
         * 身份证
         */
        Cookies.get("DoubleDryIDCardNumber") || Cookies.get("DoubleDryIDCardNumber") == "" ? (
            this.setState({
                DoubleDryIDCardNumber: Cookies.get("DoubleDryIDCardNumber")
            })
        ) : "";

        /**
         * 身份证有效期
         */
        Cookies.get("DoubleDryIDCardValidity") || Cookies.get("DoubleDryIDCardValidity") == "" ? (
            this.setState({
                DoubleDryIDCardValidity: JSON.parse(Cookies.get("DoubleDryIDCardValidity"))
            })
        ) : "";
    }

    /**
     * 姓名
     */
    handleDoubleDryUserNameChange = (e: any) => {
        this.setState({
            DoubleDryUserName: e
        })
        Cookies.set("DoubleDryUserName", e, { expires: 1 });
    }

    /**
     * 身份证
     */
    handleDoubleDryIDCardNumberChange = (e: any) => {
        this.setState({
            DoubleDryIDCardNumber: e
        })
        Cookies.set("DoubleDryIDCardNumber", e, { expires: 1 });
    }

    /**
     * 有效期
     */
    chooseDate = () => {
        // router.push('/submitQua/chooseDate?type=1')
    }

    render() {
        const { DoubleDryUserName, DoubleDryIDCardNumber, DoubleDryIDCardValidity } = this.state;

        return (
            <div className={styles.register}>
                <div className={styles.register_step}>
                    <div className={styles.active_step}>1</div>
                    <div className={styles.active_text}>注册开户</div>
                    <Icon type="right" color="#999999" />
                    <div className={styles.unactive_step}>2</div>
                    <div className={styles.unactive_text}>绑定激活</div>
                    <Icon type="right" color="#999999" />
                    <div className={styles.unactive_step}>3</div>
                    <div className={styles.unactive_text}>提现确认</div>
                </div>

                <div className={styles.id_card}>
                    {/* 数据项 */}
                    <div className={styles}>
                        <List>
                            <InputItem placeholder='请输入您的真实姓名' onChange={this.handleDoubleDryUserNameChange.bind(this)} value={DoubleDryUserName} clear>真实姓名</InputItem>
                            <InputItem placeholder='请输入您的身份证号' onChange={this.handleDoubleDryIDCardNumberChange.bind(this)} value={DoubleDryIDCardNumber} clear>身份证号</InputItem>
                            <InputItem placeholder='请输入身份证有效期' editable={false} clear onClick={this.chooseDate.bind(this)} value={DoubleDryIDCardValidity}>有效期</InputItem>
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;