import axios from 'axios'

//登陆axios请求
export const loginAxios = (data) => {
    return axios.post('/login',data)
}

//查询后台所有表字段
export const queryAllInfoAxios = () => {
    return axios.get('/analysis/allinfo')
}

//根据编号（pid）查询
export const queryByPid = (queryId) => {
    return axios.post('/analysis/pid',queryId)
}

//根据分组名称(diag_name)查询
export const queryByDiagName = (diagName) => {
    return axios.post('/analysis/diagname',diagName)
}

//根据手术名称(surg_name)查询
export const queryBySurgName = (surgName) => {
    return axios.post('/analysis/surgname',surgName)
}