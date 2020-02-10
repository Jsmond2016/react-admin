/*
后台管理主路由组件
*/
import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd';
import { connect } from 'react-redux'

import Home from '../home/home'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Header from '../../components/header/header'
import Product from '../product/product'
import LeftNav from '../../components/left-nav/left-nav'
import Category from '../category/category'
import NotFound from '../not-found/not-found'


const {Footer, Sider, Content} = Layout;

// 后台管理的路由组件

class Admin extends Component {
  render() {
    const user = this.props.user
    if (!user._id) {
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{backgroundColor: 'white', margin: '20px'}}>
            <Switch>
              {/* 若访问 '/' ，则跳转到 '/home' 路径 */}
              <Route exact from='/' to='home'/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route component={NotFound} /> {/* 当上面都不匹配的时候，则返回这个页面 */}
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器，
            可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default connect(
  state => ({user: state.user}),
  {}
)(Admin)