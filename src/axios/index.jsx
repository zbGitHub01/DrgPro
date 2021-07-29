import axios from 'axios'

//登陆axios请求
export const loginAxios = (data) => {
    return axios.post('/login',data)
}

//查询后台所有表字段
export const queryAllInfoAxios = () => {
    return axios.get('/analysis/allinfo')
}

//各种查询
export const queryByVarParam = (seletValue,inputValue) => {
    //组装对象
    let obj = {}
    obj[seletValue] = inputValue 
    return axios.post('/analysis/varqueries',obj)
}


//修改
export const updateByParam = (value) => {
    return axios.post('/analysis/update',value)
}
