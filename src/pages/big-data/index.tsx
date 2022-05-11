import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
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
    length: 100,
  },
  (_, key) => ({
    key,
  })
);

const VirtualTable = () => {
  const scrollInfo = React.useRef({
    height: 500 /* 容器高度 */,
    bufferCount: 8 /* 缓冲区个数 */,
    itemHeight: 60 /* 每一个item高度 */,
    renderCount: 10 /* 渲染区个数 */,
  });
  const [position, setPosition] = React.useState([0, 0]);

  useEffect(() => {
    const { itemHeight, bufferCount, height } = scrollInfo.current;
    const renderCount = Math.ceil(height / itemHeight) + bufferCount;
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight };
    const el = document.querySelector(".ant-table-tbody");
    const holdEle = document.getElementById("tableHold");
    // console.log(holdEle);
    // if (el && !holdEle) {
    //     // const div = document.createElement("div");
    //     el.setAttribute("style", `height:${itemHeight * data.length}px`);
    //     // div.setAttribute("id", `tableHold`);
    //     // console.log(itemHeight * data.length);
    //     // el.appendChild(div);
    // }
    setPosition([0, renderCount]);
  }, []);

  //   useEffect(() => {
  //     // 滚动条滚动时触发
  //     window.addEventListener("scroll", scrollChange, true);

  //     return () => {
  //       window.removeEventListener("scroll", scrollChange, false);
  //     };
  //   }, []);

  //   const scrollChange = useCallback((event: any) => {
  //     const scrollTop = event?.target?.scrollTop;

  //     const { itemHeight, renderCount } = scrollInfo.current;
  //     const start = Math.floor(scrollTop / itemHeight);
  //     const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
  //     // console.log(position);
  //     // console.log("===scroll");
  //     if (end !== position[1] || start !== position[0]) {
  //       /* 如果render内容发生改变，那么截取  */
  //       setPosition([start, end]);
  //     }
  //     console.log([start, end]);
  //   }, []);

  const renderList = useMemo(() => {
    const [start, end] = position;
    // console.log(data);
    // console.log(data.slice(start, end));
    return data.slice(start, end);
  }, [position, data]);

  useLayoutEffect(() => {
    const el = document.querySelector(".ant-table-row");
    const observer = new IntersectionObserver(
        function (entries) {
          console.log(entries);
          entries.forEach((item) => {
            if (item.isIntersecting) {
              console.log("进入可视区域");
            } else {
            }
          });
        },
        {
          root: document.querySelector(".ant-table-tbody"),
          rootMargin: "0px",
          threshold: 0.1,
        }
      );

  }, []);
  return (
    <Table
      dataSource={data}
      className="virtual-table"
      columns={columns}
      pagination={false}
      scroll={{
        y: 500,
      }}
    />
  );
};
export default VirtualTable;
