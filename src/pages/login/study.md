## 高阶函数

### 一类特别的函数

  - 接受函数类型的参数
  - 返回值时函数

### 常见的高阶函数

  - 定时器 setTimeout() / setInterval() 
  - Promise(() => {}) / then(resolve => {}, reject => {}) 
  - 数组遍历相关的方法 forEach() / filter() / map() / reduce() / find() / findIndex()
  - fn.bind() 
  - getFieldDecorator()

  ### 高阶函数的特点： 更加动态，更加扩展性

## 高阶组件

  理解： 

  - 本质就是一个函数
  - 包装一个组件（被包装组件），返回一个新组件（包装组件），包装组件会向被包装组件传入特定属性
  - 作用： 扩展组件的功能
  - 高阶组件也是一个高阶函数，接收一个组件函数，返回是一个新的组件函数

  面试：如果问到高阶组件，要联系高阶函数回答

## Form.validate

自定义  validator(rule, value, callback)，几个特点

- callback 必须返回
- callback() 验证成功
- callback(message) 验证失败，提示报错 message 信息

```jsx

validatePassword = (rule, value, callback) => {
    if (!value) {
      // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
      callback(' 必须输入密码')
    } else if (length < 4) {
      callback(' 密码必须大于 4  位')
    } else if (length > 12) {
      callback(' 密码必须小于 12  位')
    } else if (!pwdReg.test(value)) {
      callback(' 密码必须是英文、数组或下划线组成')
    } else {
      callback() // 必须调用 callback
    }
}

// ...
getFieldDecorator('userName', {
  rules: [
    {
      validator: this.validatePassword
    }
  ],
})(
  <Input />>
)

```

## PostMan 的使用

主要学会使用几个点：

- 注册登录 postman
- 测试不同类型的接口
  - 链接
  - 请求类型 POST,GET,PUT,OPTIONS 等
  - 输入测试数据 key, value
  - 数据发送 POST 请求放在 body 中，也就是 xxx-form-urlencoded 位置, GET 在 params 中，在 url 中带过去
  - 学会看响应数据，成功，失败，返回数据类型等。
- 保存在指定模块（文件夹）中，自定义命名