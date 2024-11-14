import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [

    {
      group: 'Proyectos',
      separator: true,
      items: [
        {
          icon: 'assets/icons/figma-ui/user.svg',
          label: 'Proyectos',
          route: '/projects/list',
        },

      ],
    },

  ];
}
