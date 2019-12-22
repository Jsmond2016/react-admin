import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

// 刷新页面的时候，从 localStorage 中获取 user，放入内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(<App />, document.getElementById('root'));
