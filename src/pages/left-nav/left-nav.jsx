import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'

import logo from '../../assets/images/logo.png'
import menuList from "../../config/menuConfig"
// 因为 menuConfig 是 export default，即默认导出的，可以任意取名字，否则不行
import './index.less'

const { SubMenu } = Menu


class LeftNav extends Component {

  getMenuList = (menuList) => {
    return menuList.reduce((pre, item) => {
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
        const cItemIndex = item.children.findIndex(childrenItem => childrenItem.key === path)
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
      return pre
    }, [])
  }

  // 第一次 render 之前执行一次，为第一次 render 渲染准备数据
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuList(menuList)
  }

  render() {
    const path = this.props.location.pathname
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