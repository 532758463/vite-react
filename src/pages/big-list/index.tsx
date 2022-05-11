import React, {
  useEffect,
  useCallback,
} from "react";
import { Table } from "antd";
import "./index.css";

const columns = [
  {
    title: "A",
    dataIndex: "key",
    width: 150,
  },
  {
    title: "B",
    dataIndex: "key",
  },
  {
    title: "C",
    dataIndex: "key",
  },
  {
    title: "D",
    dataIndex: "key",
  },
  {
    title: "E",
    dataIndex: "key",
    width: 200,
  },
  {
    title: "F",
    dataIndex: "key",
    width: 100,
  },
];
const data = Array.from(
  {
    length: 100000,
  },
  (_, key) => ({
    key,
  })
);

const VirtualTable = () => {
  const scrollInfo = React.useRef({
    height: 500 /* 容器高度 */,
    bufferCount: 20 /* 缓冲区个数 */,
    itemHeight: 60 /* 每一个item高度 */,
    renderCount: 10 /* 渲染区个数 */,
  });
  const [position, setPosition] = React.useState([0, 0]);
  const context = React.useRef<any>(null);

  useEffect(() => {
    const { itemHeight, bufferCount, height } = scrollInfo.current;
    const renderCount = Math.ceil(height / itemHeight) + bufferCount;
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight };
    setPosition([0, renderCount]);
  }, []);

  useEffect(() => {
    // 滚动条滚动时触发
    window.addEventListener("scroll", scrollChange, true);

    return () => {
      window.removeEventListener("scroll", scrollChange, false);
    };
  }, []);

  const scrollChange = useCallback((event: any) => {
    const scrollTop = event?.target?.scrollTop;
    const { itemHeight, renderCount } = scrollInfo.current;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    let currentOffset = scrollTop - (scrollTop % itemHeight);
    if (currentOffset > itemHeight) {
      currentOffset = currentOffset - itemHeight;
    }
    context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`;

    if (end !== position[1] || start !== position[0]) {
      /* 如果render内容发生改变，那么截取  */
      setPosition([start, end]);
    }
  }, []);

  const [start, end] = position;
  const renderList = data.slice(start, end);
  return (
    <div
      className="scroll_box"
      style={{
        maxHeight: 500,
      }}
    >
      <div
        className="scroll_hold"
        style={{ height: `${data.length * scrollInfo.current.itemHeight}px` }}
      />
      <div ref={context}>
        <Table
          dataSource={renderList}
          className="virtual-table"
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};
export default VirtualTable;
