import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from '../styles/components/planMenuRightClick.module.scss';

interface IStyle {
  position: any;
  left: number;
  top: number;
}

const PlanMenuRightClick = () => {
  const [show, setShow] = useState<boolean>(false);
  const [menuId, setMenuId] = useState('');

  const [style, setStyle] = useState<IStyle>({
    position: 'fixed',
    left: 300,
    top: 20,
  });

  const showRef = useRef<any>();

  const rightClickRef = useRef<any>();

  const isInMenuItem = (pathNodes: HTMLElement[]) => {
    for (let i = 0; i < pathNodes.length; i++) {
      const node = pathNodes[i];
      if (node?.dataset?.type === 'menu-item') {
        setMenuId(node?.dataset?.menuId || '');
        return true;
      }

    }
    return false;
  };

  const handleContextMenu = (event: any) => {
    if (isInMenuItem(event.path)) {
      event.preventDefault();

      setShow(true);

      const { clientX, clientY } = event;

      setStyle({
        ...style,
        left: clientX + 10,
        top: clientY + 10,
      });
    }
  };

  const handleClick = (event: any) => {
    if (!showRef.current) {
      return;
    }

    if (event.target.parentNode !== rightClickRef.current) {
      setShow(false);
    }
  };

  const setShowFalse = () => {
    if (!showRef.current) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('scroll', setShowFalse, true);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('scroll', setShowFalse, true);
    };
  }, []);

  useEffect(() => {
    showRef.current = show;
  }, [show]);

  const renderContentMenu = () => (
    <div
      ref={rightClickRef as any}
      className={cx(styles['right-menu-content-container'])}
      style={style}
    >
      <div className={cx(styles['menu-item'])}>新增清单</div>
      <div className={cx(styles['menu-item'])}>删除清单</div>
    </div>
  );

  return show ? renderContentMenu() : null;
};

export default React.memo(PlanMenuRightClick);
