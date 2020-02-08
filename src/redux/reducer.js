import { combineReducers } from 'redux'
import storageUtils from '../utils/storageUtils'
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER
} from './action-types'

// 用来管理头部标题的reducer函数
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle, action) {
  switch(action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default: 
      return state
  }
}

const initUser = storageUtils.getUser()
function user(state = initUser, action) {
  switch(action.type) {
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const { errMsg } = action 
      return {...state, errMsg}
    case RESET_USER:
      return {}
    default: 
      return state
  }
}

// 向外暴露的是合并产生的总的 reducer 函数
// 管理的总的 state 结构是
/*
  {
    headTitle: '首页',
    user: {}
  }
*/
export default combineReducers({
  headTitle,
  user
})


