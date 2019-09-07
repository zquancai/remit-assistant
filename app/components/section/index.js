import React, { PureComponent } from 'react';
import cx from 'classnames';

import './index.less';

export default class section extends PureComponent {
  render() {
    const { children, title, className } = this.props;
    return (
      <section className={cx('section-wrap', className)}>
        {title && <div>{title}</div>}
        {children}
      </section>
    );
  }
}
