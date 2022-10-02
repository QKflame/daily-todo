import {types, flow} from 'mobx-state-tree';
import { getPlanList } from '../requests/plan';

export interface MenuItem {
  id: string;
  label: string;
  level: number;
  opened: boolean;
  selected: boolean;
  childrenIds: string[];
  items?: Array<MenuItem>;
}

export const Plan = types
  .model({
    menusItems: types.frozen(),
    menuItemsFetching: types.optional(types.boolean, false),
    currentMenuId: types.string,
    currentPlan: types.frozen(),
    plans: types.frozen(),
    createModalVisible: false
  })
  .actions((self) => {
    // const init = () => {
    //   self.menusItems = [
    //     {
    //       label: '2022-Q3',
    //       id: '2022-Q3',
    //       level: 1,
    //       selected: false,
    //       opened: true,
    //       childrenIds: ['0716-0723', '0717-0724'],
    //       items: [
    //         {
    //           label: '0716-0723',
    //           id: '0716-0723',
    //           level: 2,
    //         },
    //         {
    //           label: '0717-0724',
    //           id: '0717-0724',
    //           level: 2,
    //         },
    //       ],
    //     },
    //   ];
    //   self.currentMenuId = '2022-Q3';
    // };

    const init = flow(function *() {
      if (self.menuItemsFetching) {
        return;
      }
      self.menuItemsFetching = true;

      const convert = (menuItems: Array<{
        id: string;
        title: string;
      }>) => {
        // 代办
        return menuItems.map(menuItems => {
          // return {
          //     label: menuItems.
          // }
        });
      };

      try {
        const ret = yield getPlanList();
        convert(ret);
        self.menusItems = ret;
      } catch {
        self.menusItems = [];
      } finally {
        self.menuItemsFetching = false;
      }

      return self.menusItems.length;
    });

    const setCurrentMenuId = (id: string) => {
      self.currentMenuId = id;
    };

    const setCreateModalVisible = (val: boolean) => {
      self.createModalVisible = val;
    };

    const setSelectedMenuItem = (menuId: string) => {
      const convert = (menuItems: Array<MenuItem>, menuId: string) => {
        for (let i = 0; i < menuItems.length; i++) {
          const menuItem = menuItems[i];
          menuItem.selected = menuItem.id === menuId;
          menuItem.opened = menuItem.opened || (menuItem?.childrenIds?.length ? menuItem.childrenIds.indexOf(menuId) > -1 : false);
          if (menuItem?.items?.length) {
            convert(menuItem.items, menuId);
          }
        }
      };
      convert(self.menusItems, menuId);
      self.menusItems = JSON.parse(JSON.stringify(self.menusItems));
    };

    const toggleMenu = (menuId: string) => {
      const convert  = (menuItems: Array<MenuItem>, menuId: string, loopUpdate = false) => {
        if (!menuItems || !menuItems.length) {
          return;
        }
        for (let i= 0; i< menuItems.length; i++) {
          const menuItem = menuItems[i];
          if (loopUpdate) {
            menuItem.opened = false;
            convert(menuItem.items || [], menuId, true);
          } else if (menuItem.id === menuId) {
            if (menuItem.opened) {
              menuItem.opened = false;
              convert(menuItem.items || [], menuId, true);
            } else {
              menuItem.opened = true;
            }
          }
        }
      };
      convert(self.menusItems, menuId);
      self.menusItems = JSON.parse(JSON.stringify(self.menusItems));
    };

    return {
      init,
      setCurrentMenuId,
      setCreateModalVisible,
      setSelectedMenuItem,
      toggleMenu
    };
  });
