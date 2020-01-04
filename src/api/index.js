/*
包含 n 个接口请求函数的模块
每个函数返回 promise

要求： 能根据接口文档定义接口函数

*/
import jsonp from 'jsonp'
import {message} from "antd"
import ajax from './ajax'

// const BASE = 'http://localhost:3000'
const BASE = ''



// 登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// 获取一级/ 二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + 'manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryName, parentId}) => ajax(BASE + 'manage/category/update', {categoryName, parentId},  'POST')

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
/*
通过 jsonp 请求获取天气信息
*/
export function reqWeather(city) {
  const url =
    `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4
9MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (error, response) => {
      if (!error && response.status === 'success') {
        const {dayPictureUrl, weather} = response.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        message.error(' 获取天气信息失败')
      }
    })
  })
}

