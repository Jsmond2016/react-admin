import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import logo from '../../assets/images/logo.png'
import menuList from "../../config/menuConfig"
// 因为 menuConfig 是 export default，即默认导出的，可以任意取名字，否则不行
import './index.less'
import memoryUtils from "../../utils/memoryUtils";


const { SubMenu } = Menu


class LeftNav extends Component {

  /*
  判断当前登陆用户对item是否有权限
   */
  hasAuth = (item) => {
    const {key, isPublic} = item

    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if(username==='admin' || isPublic || menus.indexOf(key)!==-1) {
      return true
    } else if(item.children){ // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
    }

    return false
  }

  getMenuList = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if(!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon}></Icon>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          const path = this.props.location.pathname
          // 判断 children item 中， item 路径是否等于当前路径
          const cItemIndex = item.children.findIndex(childrenItem => path.indexOf(childrenItem.key) === 0)
          if(cItemIndex !== -1) {
            this.openKey = item.key
          }
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon}></Icon>
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuList(item.children)}
            </SubMenu>
          ))
        }
      }
      return pre
    }, [])
  }

  // 第一次 render 之前执行一次，为第一次 render 渲染准备数据
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuList(menuList)
  }

  render() {
    let path = this.props.location.pathname
    path = path.indexOf('/product') === 0 ? '/product' : path
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to='/'>
          <header className="left-nav-header">
            <img src={logo} alt="logo"/>
            <h1>我的后台</h1>
          </header>
        </Link>
        <Menu theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]} mode="inline">
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}

export  default withRouter(LeftNav)