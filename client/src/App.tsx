import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AppMenu from './components/AppMenu';
import {observer} from 'mobx-react-lite';
import { useMst } from './models/Root';

export const App = observer(() => {
  const {plan} = useMst();
  useEffect(() => {
    plan.init();
  }, []);
  return (
    <div className="root-app-container">
      <AppMenu />
      <Outlet />
    </div>
  );
});
