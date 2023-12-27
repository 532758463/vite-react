import { IApp } from '@src/app.types';
import Circle from '@src/components/circle';

const summary: IApp = {
  name: 'summary',
  localizedName: '摘要',
  views: [
    {
      path: '/',
      component: Circle,
      type: 'Dialog',
      defaults: {
        containerOptions: {
          width: 400
        }
      }
    }
  ]
};

export default summary;
