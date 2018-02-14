export interface MenuItem {
  title: string;
  component: any;
  active: boolean;
  icon: string;
}

export const MENUS:Array<MenuItem> = [
  { title: '首页', component: 'HomePage', active: true, icon: 'home' },
  { title: '登录', component: 'LoginListPage', active: false, icon: 'archive' },
  { title: '列表', component: 'ListPage', active: false, icon: 'body' },
];