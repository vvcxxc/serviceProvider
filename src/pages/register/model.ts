import { Model } from 'dva';

interface Register {
     /**账号 */
     username:string,
     /**手机号 */
     phone:string,
     /**密码 */
     password:string,
     /**验证码 */
     code:string,
     /**邀请人 */
     inviter_phone:string|number,
     /**限制发验证码的次数，每分钟可发一次 */
     is_ok:true,
     wait: '',
     is_show: true

}


const model: Model = {
    namespace: 'register',
    state: {
        /**账号 */
        username: '',
        /**手机号 */
        phone: '',
        /**密码 */
        password: '',
        /**验证码 */
        code: '',
        /**邀请人 */
        inviter_phone: '',
        /**限制发验证码的次数，每分钟可发一次 */
        is_ok: true,
        wait: '',
        is_show: true
    },
    reducers: {
        registered(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }

    }
}
export default model;
