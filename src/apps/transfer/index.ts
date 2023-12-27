import { IApp } from '@src/app.types';


const transfer: IApp = {
  name: 'transfer',
  localizedName: '摘要',
  views: [
    {
      path: '/',
      type: 'Func',
      defaults: {
        containerOptions: {
          width: 400
        }
      },
      func:()=> console;
    }
  ]
};

export default transfer;
