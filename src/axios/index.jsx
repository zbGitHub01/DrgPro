import axios from 'axios'

//登陆axios请求
export const loginAxios = (url,data) =>{
    return axios.post(url,data)
}