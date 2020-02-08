// 包含多个 action-creator 函数的模块
// 同步 action 对象：{type: 'xxx', data: number}
// 异步 action: 函数 dispatch => {}

import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER
} from './action-types'
import { reqLogin } from '../api'
import storageUtils from "../utils/storageUtils";


// 设置头部标题的同步 action
export const setHeadTitle = (title) => ({type: SET_HEAD_TITLE, data: title})

// 获取用户信息-成功
export const receiveUser = user => ({type: RECEIVE_USER, user})

// 获取用户信息-失败
export const showErrMsg = errMsg => ({type: SHOW_ERROR_MSG, errMsg})

export const logout = () => {
  // 先清除 local 的user
  storageUtils.removeUser()
  // 返回 action
  return {type: RESET_USER}
}

// 登录的异步action
export const login = (userName, password) => {
  return async dispatch => {
    // 1.执行异步 ajax 操作
    const result = await reqLogin(userName, password)
    // 2.1 如果成功，分发成功的同步action  {status: 0, data: user}, {status: 1, msg: 'xxx' }
    if (result.status === 0) {
      const user = result.data
      // 因为初始化的时候或刷新页面或读取 localStorage 的user，这里要写入 user
      // 保存local中
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))
    }  else {
    // 2.2 如果失败，分发失败的同步action
      const message = result.msg
      dispatch(showErrMsg(message))
    }
    
  }
}