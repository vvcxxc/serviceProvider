import React, { Component } from 'react';
import { ImagePicker, Icon, ActionSheet, InputItem, List, Button, Toast } from 'antd-mobile';
import styles from './index.less';
import router from 'umi/router';
import Axios from 'axios';
import upload from '@/service/oss';
import Cookies from 'js-cookie';
import camera from '@/assets/upload_icon/camera.jpg';
import Request from '@/service/request';
import qs from 'qs';

class IDCard extends Component {

    state = {
        // 身份证正面
        frontFiles: [],
        img_url_front_id: "",
        isHaveImgFrontID: false,

        // 身份证反面
        behindFiles: [],
        img_url_behind_id: "",
        isHaveImgBehindID: false,


        // 身份证正反面
        frontBehindFiles: [],
        img_url_front_behind_id: "",
        isHaveImgFrontBehindID: false,

        isShowModal: false,

        // 基本数据
        UserName: "",
        IDCardNumber: "",
        IDCardValidity: "",
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

        /**
         * 正面身份证
         */
        Cookies.get("ImgUrlFrontID") && JSON.parse(Cookies.get("ImgUrlFrontID")) == "" ? (
            this.setState({
                img_url_front_id: "",
                isHaveImgFrontID: false
            })
        ) : Cookies.get("ImgUrlFrontID") ? (
            this.setState({
                img_url_front_id: JSON.parse(Cookies.get("ImgUrlFrontID")),
                isHaveImgFrontID: true
            })
        ) : "";


        /**
         * 反面身份证
         */
        Cookies.get("ImgUrlBehindID") && JSON.parse(Cookies.get("ImgUrlBehindID")) == "" ? (
            this.setState({
                img_url_behind_id: "",
                isHaveImgBehindID: false
            })
        ) : Cookies.get("ImgUrlBehindID") ? (
            this.setState({
                img_url_behind_id: JSON.parse(Cookies.get("ImgUrlBehindID")),
                isHaveImgBehindID: true
            })
        ) : "";


        /**
         * 正反面身份证
         */
        Cookies.get("ImgUrlFrontBehindID") && JSON.parse(Cookies.get("ImgUrlFrontBehindID")) == "" ? (
            this.setState({
                img_url_front_behind_id: "",
                isHaveImgFrontBehindID: false
            })
        ) : Cookies.get("ImgUrlFrontBehindID") ? (
            this.setState({
                img_url_front_behind_id: JSON.parse(Cookies.get("ImgUrlFrontBehindID")),
                isHaveImgFrontBehindID: true
            })
        ) : "";


        /**
         * 姓名
         */
        Cookies.get("UserName") || Cookies.get("UserName") == "" ? (
            this.setState({
                UserName: Cookies.get("UserName")
            })
        ) : "";


        /**
         * 身份证
         */
        Cookies.get("IDCardNumber") || Cookies.get("IDCardNumber") == "" ? (
            this.setState({
                IDCardNumber: Cookies.get("IDCardNumber")
            })
        ) : "";


        /**
         * 身份证有效期
         */
        Cookies.get("IDCardValidity") || Cookies.get("IDCardValidity") == "" ? (
            this.setState({
                IDCardValidity: JSON.parse(Cookies.get("IDCardValidity"))
            })
        ) : "";


    }

    /**
     * 上传身份证正面
     */
    handleIdCardFrontChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("ImgUrlFrontID", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    img_url_front_id: res.data.path,
                    isHaveImgFrontID: true
                })
            })
        }
    }

    /**
     * 删除正面照按钮
     */
    handleCloseIdCardFront = () => {
        this.setState({
            img_url_front_id: "",
            isHaveImgFrontID: false
        })
        Cookies.set("ImgUrlFrontID", JSON.stringify(""), { expires: 1 });
    }


    /**
     * 上传身份证反面
     */
    handleIdCardBehindChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("ImgUrlBehindID", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    img_url_behind_id: res.data.path,
                    isHaveImgBehindID: true
                })
            })
        }
    }

    /**
     * 删除反面照按钮
     */
    handleCloseIdCardBehind = () => {
        this.setState({
            img_url_behind_id: "",
            isHaveImgBehindID: false
        })
        Cookies.set("ImgUrlBehindID", JSON.stringify(""), { expires: 1 });
    }


    /**
     * 展示身份证示例
     */
    showModal = () => {
        this.setState({
            isShowModal: true
        })
    }

    /**
     * 隐藏身份证示例
     */
    handleHideModal = (e: any) => {
        if (e.target == e.currentTarget) {
            this.setState({
                isShowModal: false
            })
        }
    }


    /**
     * 上传身份证正反面
     */
    handleIdCardFrontBehindChange = (file: any) => {
        if (file[0]) {
            let img = file[0].url;
            Toast.loading('正在上传中');
            upload(img).then(res => {
                Toast.hide();
                Cookies.set("ImgUrlFrontBehindID", JSON.stringify(res.data.path), { expires: 1 });
                this.setState({
                    img_url_front_behind_id: res.data.path,
                    isHaveImgFrontBehindID: true,
                    isShowModal: false
                })
            })
        }
    }

    /**
     * 删除正反面照按钮
     */
    handleCloseIdCardFrontBehind = () => {
        this.setState({
            img_url_front_behind_id: "",
            isHaveImgFrontBehindID: false
        })
        Cookies.set("ImgUrlFrontBehindID", JSON.stringify(""), { expires: 1 });
    }


    /**
     * 有效期
     */
    chooseDate = () => {
        router.push('/submitQua/chooseDate?type=1')
    }


    /**
     * 姓名
     */
    handleUserNameChange = (e: any) => {
        this.setState({
            UserName: e
        })
        Cookies.set("UserName", e, { expires: 1 });
    }

    /**
     * 身份证
     */
    handleIDCardNumberChange = (e: any) => {
        this.setState({
            IDCardNumber: e
        })
        Cookies.set("IDCardNumber", e, { expires: 1 });
    }


    /**
     * 下一步
     */
    handleNext = () => {
        const { img_url_front_id, img_url_behind_id, img_url_front_behind_id, UserName, IDCardNumber, IDCardValidity } = this.state;
        if (!img_url_front_id || !img_url_behind_id || !img_url_front_behind_id) {
            Toast.fail('请先上传身份证', 1);
            return;
        }
        if (!UserName) {
            Toast.fail('请先输入姓名', 1);
            return;
        }
        if (!IDCardNumber) {
            Toast.fail('请先输入身份证号', 1);
            return;
        }
        if (!IDCardValidity) {
            Toast.fail('请先选择有效期', 1);
            return;
        }

        Request({
            url: "auth/uploadIdentity",
            method: "POST",
            data: qs.stringify({
                name: UserName,
                identity_no: IDCardNumber,
                identity_valid_time: IDCardValidity,
                in_hand_img: img_url_front_behind_id,
                identity_face_img: img_url_front_id,
                identity_back_img: img_url_behind_id,
            })
        }).then(res => {
            if (res.code == 200) {
                Toast.success(res.message, 2);
            }
        })
    }


    render() {
        const { isHaveImgFrontID, img_url_front_id, isHaveImgBehindID, img_url_behind_id, frontFiles, behindFiles, frontBehindFiles, isHaveImgFrontBehindID, isShowModal, img_url_front_behind_id, UserName, IDCardNumber, IDCardValidity } = this.state;
        return (
            <div className={styles.idcard_wrap}>
                <div className={styles.idcard_title}>
                    <span>请拍照上传你的二代身份证</span>
                </div>

                <div className={styles.idcard_imagepicker}>
                    {/* 身份证正面照 */}
                    {
                        isHaveImgFrontID ?
                            <div className={styles.preview_wrap}>
                                <img src={"http://oss.tdianyi.com/" + img_url_front_id} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardFront} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    files={frontFiles}
                                    onChange={this.handleIdCardFrontChange}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={frontFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src={camera} alt="" />
                                <div className={styles.image_desc}>身份证正面照</div>
                            </div>
                    }
                    {/* 身份证反面照 */}
                    {
                        isHaveImgBehindID ?
                            <div className={styles.preview_wrap}>
                                <img src={"http://oss.tdianyi.com/" + img_url_behind_id} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardBehind} />
                            </div>
                            :
                            <div className={styles.image_picker}>
                                <ImagePicker
                                    files={behindFiles}
                                    onChange={this.handleIdCardBehindChange}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={behindFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_comp}
                                />
                                <img src={camera} alt="" />
                                <div className={styles.image_desc}>身份证反面照</div>
                            </div>
                    }
                    {/* 身份证正反面 */}
                    {
                        isHaveImgFrontBehindID ?
                            <div className={styles.preview_wrap}>
                                <img src={"http://oss.tdianyi.com/" + img_url_front_behind_id} alt="" className={styles.preview_img} />
                                <Icon type="cross-circle" className={styles.delete_img} onClick={this.handleCloseIdCardFrontBehind} />
                            </div>
                            :
                            (<div className={styles.image_picker} onClick={this.showModal}>
                                <img src={camera} alt="" />
                                <div className={styles.image_desc}>手持身份证照</div>
                            </div>)
                    }
                </div>


                {/* IDModal */}
                {
                    isShowModal ? (<div className={styles.modal_wrap} onClick={this.handleHideModal}>
                        <div className={styles.modal_container}>
                            <div className={styles.modal_exeample}>
                                <div className={styles.modal_title}>证件上传示例</div>
                                <div className={styles.modal_pic}></div>
                                <div className={styles.modal_desc}>四角完整，亮度均匀，照片清晰</div>
                            </div>
                            <div className={styles.modal_btn_tool}>
                                <div className={styles.modal_btn}>知道了</div>
                                <ImagePicker
                                    onChange={this.handleIdCardFrontBehindChange}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={frontBehindFiles.length < 1}
                                    length={1}
                                    className={styles.image_picker_front_behind}
                                />
                            </div>
                        </div>
                    </div>) : null
                }



                {/* 数据项 */}
                <List>
                    <InputItem placeholder='请输入姓名' onChange={this.handleUserNameChange.bind(this)} value={UserName} clear>姓名</InputItem>
                    <InputItem placeholder='请输入身份证号' onChange={this.handleIDCardNumberChange.bind(this)} value={IDCardNumber} clear>身份证号</InputItem>
                    <InputItem placeholder='有效期' editable={false} clear onClick={this.chooseDate.bind(this)} value={IDCardValidity}>有效期</InputItem>
                </List>

                <div className={styles.next_step_wrap}>
                    <div className={styles.next_step} onClick={this.handleNext.bind(this)}>
                        <Button className={styles.next_step_btn}>下一步</Button>
                    </div>
                </div>

                {/* <div className={styles.later_fill}>稍后填写</div> */}
            </div>
        )
    }
}

export default IDCard;
