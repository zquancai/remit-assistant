import React, { PureComponent } from 'react';
import Currency from './containers/currency';
import BestRemit from './containers/best-remit';
import './index.less';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app-wraper">
        <Currency />
        <BestRemit />
      </div>
    );
  }
}
