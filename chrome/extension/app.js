import React from 'react';
import { render } from 'react-dom';
import App from '../../app';
import dva from '../../app/core/dva';
import models from '../../app/models';

// 定义dva的参数
const options = {
  initialState: {},
  // 注册的models
  models,
  // 注册的事件
  onAction: [],
  // 异常处理，所有的异常都会通过这里
  onError(e) {
    console.log('Error', e);
  }
};
const app = dva(options);
const Root = app.startApp(<App />);
render(<Root />, document.getElementById('root'));
