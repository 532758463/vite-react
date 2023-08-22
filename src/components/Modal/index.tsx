import React, { useState, useCallback, useImperativeHandle } from 'react';
import { Modal } from 'antd';

type IModalProps = React.ComponentProps<typeof Modal>;

export const container: React.RefObject<{
  show: () => void;
  hidden: () => void;
  setModalProps: (props: IModalProps) => void;
}> = React.createRef();
interface IDialogContainerProps extends IModalProps {
  s?: string;
}

export const DialogContainer = (props: IDialogContainerProps) => {
  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState(props);

  const show = useCallback(() => {
    setOpen(true);
    console.log(111);
  }, []);

  const hidden = useCallback(() => {
    setOpen(false);
  }, []);

  useImperativeHandle(container, () => ({ show, hidden, setModalProps }), [
    hidden,
    show,
    setModalProps
  ]);

  return <Modal {...modalProps} onCancel={hidden} visible={open} />;
};

const MyModal = () => <DialogContainer s="Custom Title" />;
export default MyModal;
