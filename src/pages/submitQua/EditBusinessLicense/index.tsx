import React, { Component } from 'react';
import { ImagePicker, Icon, ActionSheet, InputItem, List, Button, Toast } from 'antd-mobile';
import styles from './index.less';
import upload from '@/service/oss';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Request from '@/service/request';
import router from 'umi/router';
import camera from '@/assets/upload_icon/camera.jpg';

// 修改页面刷新并不需要做缓存只需要在去有效期页面才需缓存
window.onload = function () {
    Cookies.remove("EditImgUrlSale");
    Cookies.remove("EditRegisterNum");  
    Cookies.remove("EditSaleName");
    Cookies.remove("EditOwnName");
    Cookies.remove("EditSaleValidity");
    return;
}


/**
 * 页面数据不可能会只有一半是有数据的，假如有数据的话那就拿数据的，没有的话可以做缓存刷新完了还是有数据的
 */

class BusinessLicense extends Component {

    state = {
        businessLicenseFiles: [],
        img_url: "",
        isHaveImg: false,

        registerNum: "",
        saleName: "",
        ownName: "",
        SaleValidity: "",


        is_edit: true
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
            url: "/user/getFacilitatorProve"
        }).then(res => {
            if (res.code == 200 && res.data != null) {
                this.setState({
                    img_url: res.data.prove_img,
                    isHaveImg: true,

                    registerNum: res.data.prove_no,
                    saleName: res.data.prove_name,
                    ownName: res.data.legal_person_name,
                    SaleValidity: res.data.prove_valid_time

                })

                // if(Cookies.get("EditSaleValidity") || Cookies.get("EditSaleValidity") == "") {
                //     console.log('1')
                //     Cookies.remove("EditSaleValidity");
                // }


                if (typeof (Cookies.get("EditSaleValidity")) == "undefined") {
                    console.log('2')
                    Cookies.set("EditSaleValidity", JSON.stringify(res.data.prove_valid_time), { expires: 1 });
                }
            } else if (res.code == 200 && res.data == null) {
                this.setState({
                    is_edit: false
                })
            }
        })


        /**
         * 营业照
         */
        Cookies.get("EditImgUrlSale") && JSON.parse(Cookies.get("EditImgUrlSale")) == "" ? (
            this.setState({
                img_url: "",
                isHaveImg: false
            })
        ) : Cookies.get("EditImgUrlSale") ? (
            this.setState({
                img_url: JSON.parse(Cookies.get("EditImgUrlSale")),
                isHaveImg: true
            })
        ) : ""


        /**
         * 注册号
         */
        Cookies.get("EditRegisterNum") || Cookies.get("EditRegisterNum") == "" ? (
            this.setState({
                registerNum: Cookies.get("EditRegisterNum")
            })
        ) : "";

        /**
         * 执照
         */
        Cookies.get("EditSaleName") || Cookies.get("EditSaleName") == "" ? (
            this.setState({
                saleName: Cookies.get("EditSaleName")
            })
        ) : "";

        /**
        * 法人姓名
        */
        Cookies.get("EditOwnName") || Cookies.get("EditOwnName") == "" ? (
            this.setState({
                ownName: Cookies.get("EditOwnName")
            })
        ) : "";


        /**
         * 营业执照有效期
         */
        Cookies.get("EditSaleValidity") || Cookies.get("EditSaleValidity") == "" ? (
            this.setState({
                SaleValidity: JSON.parse(Cookies.get("EditSaleValidity"))
            })
        ) : "";

    }

    /**
     * 上传营业执照
     */
    handleBusinessLicenseChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("EditImgUrlSale", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    img_url: res.data.path,
                    isHaveImg: true
                })
            })
        }
    }

    /**
     * 删除营业执照
     */
    handleCloseBusinessLicense = () => {
        this.setState({
            img_url: "",
            isHaveImg: false
        })
        Cookies.set("EditImgUrlSale", JSON.stringify(""), { expires: 1 });
    }

    /**
     * 注册号
     */
    handleRegisterNameChange = (e: any) => {
        this.setState({
            registerNum: e
        })
        Cookies.set("EditRegisterNum", e, { expires: 1 });
    }

    /**
     * 执照
     */
    handleSaleNameChange = (e: any) => {
        this.setState({
            saleName: e
        })
        Cookies.set("EditSaleName", e, { expires: 1 });
    }

    /**
     * 法人姓名
     */
    handleOwnNameChange = (e: any) => {
        this.setState({
            ownName: e
        })
        Cookies.set("EditOwnName", e, { expires: 1 });
    }

    /**
     * 有效期
     */
    chooseDate = () => {
        router.push('/submitQua/EditChooseDate?type=2')
    }

    /**
     * 下一步
     */
    handleNext = () => {
        const { img_url, registerNum, saleName, ownName, SaleValidity, is_edit } = this.state;
        if (!img_url) {
            Toast.fail("请上传营业执照", 1);
            return;
        }
        if (!registerNum) {
            Toast.fail("请先输入注册号", 1);
            return;
        }
        if (!saleName) {
            Toast.fail("请先输入执照名称", 1);
            return;
        }
        if (!ownName) {
            Toast.fail("请先输入法人姓名", 1);
            return;
        }
        if (!SaleValidity) {
            Toast.fail("请先选择有效期", 1);
            return;
        }
        if (is_edit) {
            Request({
                url: "auth/setProveInfo",
                method: "POST",
                data: {
                    prove_img: img_url,
                    prove_no: registerNum,
                    prove_name: saleName,
                    legal_person_name: ownName,
                    prove_valid_time: SaleValidity,
                    is_edit: 1
                }
            }).then(res => {
                if (res.code == 200) {
                    Toast.success(res.message, 2);
                } else {
                    Toast.fail(res.message, 2);
                }
            })
        } else {
            Request({
                url: "auth/setProveInfo",
                method: "POST",
                data: {
                    prove_img: img_url,
                    prove_no: registerNum,
                    prove_name: saleName,
                    legal_person_name: ownName,
                    prove_valid_time: SaleValidity
                }
            }).then(res => {
                if (res.code == 200) {
                    Toast.success(res.message, 2);
                } else {
                    Toast.fail(res.message, 2);
                }
            })
        }

    }


    render() {
        const { businessLicenseFiles, isHaveImg, img_url, registerNum, saleName, ownName, SaleValidity } = this.state;
        return (
            <div className={styles.businesslicense_wrap}>
                <div className={styles.businesslicense_title}>
                    <span>请上传您的营业执照</span>
                </div>

                <div className={styles.businesslicense_imagepicker}>
                    {/* 营业执照 */}
                    {
                        isHaveImg ?
                            <div className={styles.preview_wrap}>
                                <img src={"http://oss.tdianyi.com/" + img_url} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseBusinessLicense} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    onChange={this.handleBusinessLicenseChange}
                                    selectable={businessLicenseFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src={camera} alt="" />
                                <div className={styles.image_desc}>上传文字清晰照片，露出边框和国徽</div>
                            </div>
                    }
                </div>


                {/* 数据项 */}
                <List>
                    <InputItem placeholder='请输入注册号' onChange={this.handleRegisterNameChange.bind(this)} value={registerNum} clear>注册号</InputItem>
                    <InputItem placeholder='请输入执照名称' onChange={this.handleSaleNameChange.bind(this)} value={saleName} clear>执照名称</InputItem>
                    <InputItem placeholder='请输入法人姓名' onChange={this.handleOwnNameChange.bind(this)} value={ownName} clear>法人姓名</InputItem>
                    <InputItem placeholder='有效期' onClick={this.chooseDate.bind(this)} value={SaleValidity} clear>有效期</InputItem>
                </List>

                <div className={styles.businesslicense_operation}>
                    <div className={styles.next_step_wrap}>
                        <div className={styles.next_step} onClick={this.handleNext.bind(this)}>
                            <Button className={styles.next_step_btn}>下一步</Button>
                        </div>
                    </div>

                    {/* <div className={styles.later_fill}>稍后填写</div> */}
                </div>

            </div>
        )
    }
}

export default BusinessLicense;