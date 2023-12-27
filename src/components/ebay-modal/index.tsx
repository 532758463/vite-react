import { Modal, Button, Drawer, Space } from 'antd';
import NiceModal, { useModal } from '@src/lib';
import { useEffect } from 'react';
// const modals = ['my-antd-modal', 'my-antd-modal2', 'modal3'];
export const init = () => {
  const MyAntdModal = NiceModal.create(
    ({ name, children }: { name: string; children?: JSX.Element }) => {
      const modal = useModal();
      return (
        <Modal
          title="Hello Antd"
          visible={modal.visible}
          onOk={modal.hide}
          onCancel={modal.hide}
          afterClose={modal.remove}
        >
          Greetings: {name}!{children}
        </Modal>
      );
    }
  );
  const MyCustomModal = NiceModal.create(
    ({ name, children }: { name: string; children?: any }) => {
      const modal = useModal();
      console.log(modal);
      useEffect(() => {
        if (modal.visible) {
          alert('11221312123');
          setTimeout(() => {
            modal.hide();
          });
        }
      }, [modal]);
      return children;
    }
  );
  NiceModal.register('my-antd-modal', MyAntdModal);
  NiceModal.register('my-antd-modal2', MyAntdModal);
  NiceModal.register('modal3', MyCustomModal);
};

const MyAntdDrawer = NiceModal.create(({ name }: { name: string }) => {
  const modal = useModal();
  return (
    <Drawer
      title="Hello Antd"
      visible={modal.visible}
      onClose={modal.hide}
      afterVisibleChange={(visible) => {
        if (!visible) modal.remove();
      }}
    >
      Greetings: {name}!
    </Drawer>
  );
});

export default function AntdSample() {
  useEffect(() => {
    Object.assign(window, { NiceModal });
    return () => {
      delete (window as any)?.NiceModal;
    };
  }, [NiceModal]);
  return (
    <Space>
      <Button
        type="primary"
        onClick={() =>
          NiceModal.show('my-antd-modal', {
            name: 'Nate',
            children: (
              <Button
                onClick={() =>
                  NiceModal.show('my-antd-modal2', { name: '123' })
                }
              >
                m
              </Button>
            )
          })
        }
      >
        Show Modal
      </Button>
      <Button
        type="primary"
        onClick={() => NiceModal.show(MyAntdDrawer, { name: 'Bood' })}
      >
        Show Drawer
      </Button>
    </Space>
  );
}
