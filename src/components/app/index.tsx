import { ComponentProps, ComponentType } from 'react';
import { Modal, Drawer } from 'antd';
type IModalProps = ComponentProps<typeof Modal>;
type IDrawerProps = ComponentProps<typeof Drawer>;

export interface IApp {
  localizedName: string;
  name: string;
  views: IView[];
  nameSpace: string;
}

interface IView {
  path: string;
  type: 'Dialog' | 'Drawer' | 'Func';
  component?: ComponentType<any>;
  defaults: {
    containerOptions: IView['type'] extends 'Dialog'
      ? IModalProps
      : IView['type'] extends 'Drawer'
      ? IDrawerProps
      : Record<string, any>;
    params: Record<string, any>;
  };
  func: () => Promise<any>;
}
