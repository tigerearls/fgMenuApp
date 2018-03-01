/**
 * 菜单配置
 *
 * @XU
 */
export interface MenuItem {
  title: string;
  component: any;
  active: boolean;
  icon?: string;
}

export const MENUS:Array<MenuItem> = [
  { title: '首页', component: 'HomePage', active: true, icon: 'home' },
  { title: '登录', component: 'LoginOnePage', active: false, icon: 'archive' },
  { title: '列表', component: 'ListPage', active: false, icon: 'body' },
  { title: '远程列表', component: 'ListBackendPage', active: false, icon: 'body' },
];
