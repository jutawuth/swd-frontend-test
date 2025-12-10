export interface IMenu {
  key: string;
  title: string;
  description: string;
}

export interface IHomeDict {
  menus: IMenu[];
}
