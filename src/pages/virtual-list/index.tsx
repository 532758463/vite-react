import { useEffect, useRef, useState } from 'react';
import './index.css';
import { RouterBack } from '@src/components/router-back';
import { Button } from 'antd';
import { container } from '@components/Modal';
import EbayModalDemo, { init } from '@components/ebay-modal';

function VirtualList() {
  /* 保存数据源 */
  const [dataList, setDataList] = useState<number[]>([]);
  /* 截取缓冲区 + 视图区索引 */
  const [position, setPosition] = useState([0, 0]);
  /* 获取scroll元素 */
  const scroll = useRef({
    scrollTop: 0
  });

  const box = useRef({
    offsetHeight: 0
  }); /* 获取元素用于容器高度 */
  const context = useRef<any>(null); /* 用于移动视图区域，形成滑动效果。 */
  const scrollInfo = useRef({
    height: 500 /* 容器高度 */,
    bufferCount: 8 /* 缓冲区个数 */,
    itemHeight: 60 /* 每一个item高度 */,
    renderCount: 0 /* 渲染区个数 */
  });

  useEffect(() => {
    const height = box.current.offsetHeight;
    const { itemHeight, bufferCount } = scrollInfo.current;
    const renderCount = Math.ceil(height / itemHeight) + bufferCount;
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight };
    const dataList = new Array(10000).fill(1).map((item, index) => index + 1);
    setDataList(dataList);
    setPosition([0, renderCount]);
  }, []);

  const handleScroll = () => {
    const { scrollTop } = scroll.current;
    const { itemHeight, renderCount } = scrollInfo.current;
    const currentOffset = scrollTop - (scrollTop % itemHeight);
    const start = Math.floor(scrollTop / itemHeight);
    context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`; /* 偏移，造成下滑效果 */
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    if (end !== position[1] || start !== position[0]) {
      /* 如果render内容发生改变，那么截取  */
      setPosition([start, end]);
    }
  };

  const { itemHeight, height } = scrollInfo.current;
  const [start, end] = position;
  const renderList = dataList.slice(start, end); /* 渲染区间 */
  console.log('渲染区间', position);

  useEffect(() => {
    console.log('112121');
    init();
  }, []);

  return (
    <div className="list_box" ref={box as any}>
      <RouterBack className="fixed flex items-center justify-center h-10 bg-blue-600 top-2 right-20" />
      <EbayModalDemo />
      <Button
        onClick={() => {
          console.log(container);
          container.current?.setModalProps({
            children: <div onClick={() => container.current?.show()}>弹窗</div>
          });
          container.current?.show();
        }}
      >
        点击弹窗
      </Button>
      <div
        className="scroll_box"
        style={{ height: height + 'px' }}
        onScroll={handleScroll}
        ref={scroll as any}
      >
        <div
          className="scroll_hold"
          style={{ height: `${dataList.length * itemHeight}px` }}
        />
        <div className="context" ref={context}>
          {renderList.map((item, index) => (
            <div className="list" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualList;
