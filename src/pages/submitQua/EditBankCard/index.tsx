import React, { Component } from 'react';
import { ImagePicker, Icon, ActionSheet, InputItem, List, Button, Toast } from 'antd-mobile';
import styles from './index.less';
import upload from '@/service/oss';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Request from '@/service/request';
import router from 'umi/router';
import camera from '@/assets/upload_icon/camera.jpg';

class BankCard extends Component {

    state = {
        // 银行卡正面
        frontFiles: [],
        img_url_front: "",
        isHaveImgFront: false,

        // 银行卡反面
        behindFiles: [],
        img_url_behind: "",
        isHaveImgBehind: false,


        // 基本数据
        User: "",
        bankCard: "",
        bankName: "",
        subBranchBank: "",

        isShowSubBranch: false,
        subBranchBankArr: [],

        checkout_status: 0,
        checkout_comment: "",
        is_show: true
    }

    async componentDidMount() {
        // 暂时
        Axios.get('http://release.api.supplier.tdianyi.com/api/v2/up').then(res => {
            // console.log(res)
            let { data } = res.data;
            let oss_data = {
                policy: data.policy,
                OSSAccessKeyId: data.accessid,
                success_action_status: 200, //让服务端返回200,不然，默认会返回204
                signature: data.signature,
                callback: data.callback,
                host: data.host,
                key: data.dir
            };
            window.localStorage.setItem('oss_data', JSON.stringify(oss_data));
        })

        await Request({
            url: 'auth/getBankInfo',
            method: 'get'
        }).then(res => {
            const { code, message } = res;
            if (code == 200 && Object.keys(res.data).length != 0) {
                this.setState({
                    checkout_status: res.data.userBankinfo.checkout_status,
                    checkout_comment: res.data.userBankinfo.checkout_comment,

                    img_url_front: res.data.userBankinfo.bankcard_face_img,
                    isHaveImgFront: true,

                    img_url_behind: res.data.userBankinfo.bankcard_back_img,
                    isHaveImgBehind: true,

                    User: res.data.userBankinfo.owner_name,

                    bankCard: res.data.userBankinfo.bankcard_no,

                    bankName: res.data.userBankinfo.bank_name,

                    subBranchBank: res.data.userBankinfo.branch_address,
                })
            } else if (code == 403) {
                this.setState({ is_show: false })
            }
        });
    }

    /**
     * 上传银行卡正面
     */
    handleBankCardFrontChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                // Cookies.set("ImgUrlFront", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    img_url_front: res.data.path,
                    isHaveImgFront: true
                })
            })
        }
    }

    /**
     * 删除正面照按钮
     */
    handleCloseBankCardFront = () => {
        this.setState({
            img_url_front: "",
            isHaveImgFront: false
        })
        // Cookies.set("ImgUrlFront", JSON.stringify(""), { expires: 1 });
    }


    /**
     * 上传银行卡反面
     */
    handleBankCardBehindChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                // Cookies.set("ImgUrlBehind", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    img_url_behind: res.data.path,
                    isHaveImgBehind: true
                })
            })
        }
    }

    /**
     * 删除反面照按钮
     */
    handleCloseBankCardBehind = () => {
        this.setState({
            img_url_behind: "",
            isHaveImgBehind: false
        })
        // Cookies.set("ImgUrlBehind", JSON.stringify(""), { expires: 1 });
    }


    /**
     * IOS失去焦点后回到顶部
     */
    hanldeBlurScrollTop = () => {
        window.scrollTo(0, 0)
    }


    /**
     * 设置用户人
     */
    handleUserChange = (e: any) => {
        this.setState({
            User: e
        })
        // Cookies.set("User", e, { expires: 1 });
    }

    /**
     * 设置卡号
     */
    handleBankCardChange = (e: any) => {
        this.setState({
            bankCard: e
        })
        // Cookies.set("bankCard", e, { expires: 1 });
    }

    /**
     * 设置银行
     */
    handleBankNameChange = (e: any) => {
        this.setState({
            bankName: e
        })
        // Cookies.set("bankName", e, { expires: 1 });
    }

    /**
     * 设置支行
     */
    handleSubBranchBankChange = (e: any) => {
        // Cookies.set("subBranchBank", e, { expires: 1 });
        this.setState({
            subBranchBank: e,
        })
        // Axios.get("http://test.api.supplier.tdianyi.com/v3/bankAddress").then(res => {
        //     if (res.data.date.length != 0) {
        //         this.setState({
        //             isShowSubBranch: true,
        //             subBranchBankArr: res.data.date
        //         })
        //     }
        // })
    }

    /**
     * 支行
     */
    hanldeSubBranchBlur = () => {
        window.scrollTo(0, 0);
        // this.setState({
        //     isShowSubBranch: false
        // })
    }

    /**
     * 下一步
     */

    handleNextStep = () => {
        const { bankCard, User, subBranchBank, img_url_behind, img_url_front, bankName } = this.state;
        if (!img_url_front || !img_url_behind) {
            Toast.fail('请上传银行卡正反面信息', 1);
            return;
        }

        if (!(/^([\u4e00-\u9fa5]){2,}$/.test(User))) {
            Toast.fail('请输入开户人姓名', 1);
            return;
        }

        if (!(/^\d{16}|\d{19}$/.test(bankCard))) {
            Toast.fail('请输入16-19位的银行卡号', 1);
            return;
        }

        if (!(/^([0-9a-zA-Z\u4e00-\u9fa5]){1,}$/.test(bankName))) {
            Toast.fail('请输入正确开户银行名称', 1);
            return;
        }

        if (!(/^([0-9a-zA-Z\u4e00-\u9fa5]){1,}$/.test(subBranchBank))) {
            Toast.fail('请输入正确开户支行名称', 1);
            return;
        }

        Request({
            method: 'post',
            url: 'auth/setBankInfo',
            params: {
                bank_name: bankName,
                bankcard_no: bankCard,
                branch_address: subBranchBank,
                owner_name: User,
                bankcard_face_img: img_url_front,
                bankcard_back_img: img_url_behind,
                is_edit: 1
            }
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
                Toast.success(res.message, 2, () => {
                    router.push('/login')
                });
            } else {
                Toast.fail(res.message, 1);
            }
        })

    }

    render() {
        const { frontFiles, isHaveImgFront, img_url_front, isHaveImgBehind, img_url_behind, behindFiles, User, bankCard, bankName, subBranchBank, isShowSubBranch, subBranchBankArr, checkout_status, checkout_comment } = this.state;
        return (
            <div className={styles.bankcard_wrap}>
                <div className={styles.bankcard_title}>
                    <span>请绑定持卡人本人的银行卡</span>
                </div>

                <div className={styles.bankcard_imagepicker}>
                    {/* 银行卡正面 */}
                    {
                        isHaveImgFront ?
                            <div className={styles.preview_wrap}>
                                <img src={"http://oss.tdianyi.com/" + img_url_front} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBankCardFront} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    onChange={this.handleBankCardFrontChange}
                                    selectable={frontFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src={camera} alt="" />
                                <div className={styles.image_desc}>拍摄银行卡正面</div>
                            </div>
                    }
                    {
                        isHaveImgBehind ?
                            <div className={styles.preview_wrap}>
                                <img src={"http://oss.tdianyi.com/" + img_url_behind} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBankCardBehind} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    onChange={this.handleBankCardBehindChange}
                                    selectable={behindFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src={camera} alt="" />
                                <div className={styles.image_desc}>拍摄银行卡反面</div>
                            </div>
                    }

                </div>

                {/* 数据项 */}
                <List>
                    <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleUserChange.bind(this)} value={User} placeholder='请输入开户人' clear>开户人</InputItem>
                    <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleBankCardChange.bind(this)} value={bankCard} placeholder='请输入银行卡号' clear>银行卡号</InputItem>
                    <InputItem onBlur={this.hanldeBlurScrollTop.bind(this)} onChange={this.handleBankNameChange.bind(this)} value={bankName} placeholder='请输入开户银行' clear>开户银行</InputItem>
                    <div className={styles.subbranch_bank}>
                        <InputItem onBlur={this.hanldeSubBranchBlur.bind(this)} onChange={this.handleSubBranchBankChange.bind(this)} value={subBranchBank} placeholder='请输入支行地址' clear>支行地址</InputItem>
                        {
                            isShowSubBranch ? (
                                <div className={styles.search_wrap}>
                                    <List className={styles.search_result}>
                                        {
                                            subBranchBankArr.map(item => (
                                                <List.Item key={item.ids}>{item.name}</List.Item>
                                            ))
                                        }
                                    </List>
                                </div>
                            ) : ""
                        }
                    </div>
                </List>

                {
                    this.state.is_show ? (checkout_status == 2 ? (
                        <div className={styles.reject_reason}>
                            <p>拒绝原因：{checkout_comment}</p>
                        </div>
                    ) : '') : null
                }


                <div className={styles.next_step_wrap}>
                    <div className={styles.next_step}>
                        <Button className={styles.next_step_btn} onClick={this.handleNextStep.bind(this)}>提交</Button>
                    </div>
                </div>

                {/* <div className={styles.later_fill}>稍后填写</div> */}
            </div>
        )
    }
}

export default BankCard;
