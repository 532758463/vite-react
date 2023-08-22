import React, { ComponentProps } from 'react';
import { Modal } from 'antd';

type IModalProps = ComponentProps<typeof Modal>;

interface IDialogContainerProps {
  container: IModalProps;
}

export const DialogContainer = ({ container }: IDialogContainerProps) => {
  return <Modal {...container}></Modal>;
};
