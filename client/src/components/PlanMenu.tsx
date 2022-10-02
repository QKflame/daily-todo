import React from 'react';
import cx from 'classnames';
import styles from '../styles/components/planMenu.module.scss';
import { observer } from 'mobx-react-lite';
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import PlanMenuRightClick from './PlanMenuRightClick';
import { useMst } from '../models/Root';

export enum MenuType {
  Folder,
  Inventory,
}

export interface MenuProps {
  items: Array<MenuItemProps>;
}

export interface MenuItemProps {
  id: string;
  label: string;
  type: MenuType;
  level: number;
  opened: boolean;
  selected: boolean;
  items?: Array<MenuItemProps>;
}

const MenuItem = (props: MenuItemProps) => {
  const { label, selected, opened, items, level, id } = props;
  const { plan: store } = useMst();

  const onClickMenuItem = () => {
    store.setSelectedMenuItem(id);
  };

  const onClickFolderIcon = (e) => {
    e.preventDefault();
    console.log('执行到此处');
    store.toggleMenu(id);
  };

  return (
    <>
      <div
        className={cx(styles['menu-item-container'], {
          [styles['folder-selected']]: opened,
          [styles['menu-item-selected']]: selected,
        })}
        style={{ paddingLeft: 20 + (level - 1) * 10 + 'px' }}
        data-type="menu-item"
        onClick={onClickMenuItem}
      >
        <div className={cx(styles['menu-label'])}>{label}</div>
        {items?.length ? (
          opened ? (
            <DownOutlined onClick={onClickFolderIcon} />
          ) : (
            <RightOutlined onClick={onClickFolderIcon} />
          )
        ) : null}
      </div>
      {opened ? items?.map((item) => (
        <MenuItem {...item} key={item.id}></MenuItem>
      )) : null}
    </>
  );
};

const PlanMenu = observer((props: MenuProps) => {
  const { items } = props;
  return (
    <>
      <div className={cx(styles['plan-menu-container'])}>
        {items &&
          items.map((item) => <MenuItem {...item} key={item.id}></MenuItem>)}
      </div>
      <PlanMenuRightClick />
    </>
  );
});

export default PlanMenu;
