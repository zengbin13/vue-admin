/* 
2.API-请求地址
*/

import service from '../utils/request.js'

//接口名称：登录获取验证码
export function GetSms(data) {  
    return service.request({method: 'POST',url: '/getSms/',data})
}