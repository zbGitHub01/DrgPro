import axios from './myAxios'
import {BASE_URL} from '../config'

//登陆axios请求
export const loginAxios = (data) => {
    return axios.post(`${BASE_URL}/login`,data)
}

//查询后台所有表字段
export const queryAllInfoAxios = () => {
    return axios.get(`${BASE_URL}/analysis/allinfo`)
}

//各种查询
export const queryByVarParam = (seletValue,inputValue) => {
    //组装对象
    let obj = {}
    obj[seletValue] = inputValue 
    return axios.post(`${BASE_URL}/analysis/varqueries`,obj)
}


//修改
export const updateByParam = (value) => {
    return axios.post(`${BASE_URL}/analysis/update`,value)
}
