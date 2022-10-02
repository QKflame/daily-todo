import React from 'react';
import cx from 'classnames';
import styles from '../styles/pages/login.module.scss';
export default function Login() {
  return (
    <div className={cx(styles['login-page-container'])}>
      <div className={cx(styles['login-wrapper'])}>
        <div className={cx(styles['header'])}>Baidu Weekly</div>
        <div className={cx(styles['form-wrapper'])}>
          <input
            type="text"
            name="username"
            placeholder="username"
            className={cx(styles['input-item'])}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className={cx(styles['input-item'])}
          />
          <div id="login" className={cx(styles['btn'])}>
            点击登录
          </div>
        </div>
      </div>
    </div>
  );
}

cx(styles['']);
