/*
 * @Author: wangkun
 * @Date: 2021-11-29 13:24:02
 * @LastEditTime: 2021-11-29 14:34:36
 * @LastEditors: wangkun
 * @Description: 
 */
import registerDirectives from './src/directives'

const install = function (Vue) {
    registerDirectives(Vue)
}

export default  {
    version: '1.0.2',
    install
}
