import React, { PureComponent } from 'react';
import Currency from './containers/currency';
import BestRemit from './containers/best-remit';
import './index.less';
import { Button, Tooltip } from 'antd';

class App extends PureComponent {
  openRemitPage = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      chrome.tabs.update(tabs[0].id, { url: 'https://remit.zgr.sg/zh-hans/remit' });
      window.close();
    });
  };

  render() {
    var bg = chrome.extension.getBackgroundPage();
    if (!bg.isInChangcheng) {
      const src = chrome.runtime.getURL('img/guide.png');
      return (
        <div className="app-wraper">
          <p>
            请登录长诚汇款并进入下图所示的标签页
            <Tooltip title="在当前页面打开并登录">
              <Button type="primary" size="small" className="open-page-btn" onClick={this.openRemitPage}>
                登录
              </Button>
            </Tooltip>
          </p>
          <img src={src} className="guide-img" />
        </div>
      );
    }
    return (
      <div className="app-wraper">
        <Currency />
        <BestRemit />
      </div>
    );
  }
}

export default App;
