import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'

const instance = axios.create({
    timeout: 3000
});


//请求拦截
instance.interceptors.request.use(config=>{
    const {method,data} = config
    //post
    // if( method.toLowerCase() ==='post'){
    //     if(data instanceof Object){
    //         config.data = qs.stringify(data)
    //     }
    // }
    return config;
})

//响应拦截
instance.interceptors.response.use( res =>{
    return res.data
},
    error=>{
        message.error(error.message,1)
        return new Promise(()=>{})
    }
)

export default instance