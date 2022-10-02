import React from 'react';
import cx from 'classnames';
import { Avatar, Tooltip } from 'antd';
import { CarryOutOutlined, AppstoreOutlined } from '@ant-design/icons';
import styles from '../styles/components/appMenu.module.scss';
import { NavLink } from 'react-router-dom';

export default function AppMenu() {
  return (
    <div className={cx('app-menus-container', styles['app-menus-container'])}>
      <NavLink to="/home">
        <Tooltip placement="right" title='首页' color='blue'>
          <AppstoreOutlined className={cx(styles['menu-icon'])} />
        </Tooltip>
      </NavLink>
      <NavLink to="/plan">
        <Tooltip placement="right" title='清单' color='blue'>
          <CarryOutOutlined className={cx(styles['menu-icon'])} />
        </Tooltip>
      </NavLink>
      <Avatar className={cx(styles['user-avatar'])} size="large">
        W
      </Avatar>
    </div>
  );
}
