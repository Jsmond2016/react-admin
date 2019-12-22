/*
  能发送 ajax 请求的函数模块
  包装 axios
  axios.get()/post() 返回的就是 promise 对象
  函数的返回值是 promise 对象
  优化1：
    - 统一处理请求异常
    - 在外层包裹一个 promise 对象
    - 请求出错时，不 reject(err) 而是显示错误提示
  优化2：
    - 异步得到的不是 response ，而是 response.data, resolve(response.data)
*/
import axios from 'axios'
import { message } from 'antd'
export default function ajax(url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    // 执行异步 ajax 请求
    if (method === 'GET') {
      promise = axios.get(url, { params: data }) // params 配置指定的是 query 参数
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      // 如果成功了 , 调用 resolve(response.data)
      resolve(response.data)
    }).catch(error => { // 对所有 ajax 请求出错做统一处理 , 外层就不用再处理错误了
      // 如果失败了 , 提示请求后台出错
      message.error(' 请求错误: ' + error.message)
    })
  })
}