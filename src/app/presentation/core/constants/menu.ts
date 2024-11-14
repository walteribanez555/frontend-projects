import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [

    {
      group: 'Proyectos',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/document.svg',
          label: 'Proyectos',
          route: '/project/list',
        },

      ],
    },

  ];
}
