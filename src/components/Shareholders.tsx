import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { DonutChart } from "./DonutChart";
import { fetchInfo } from "../api/api";
import styles from "./Shareholders.module.scss";

interface IShareholder {
  holder: string;
  share_percent: number;
}

export const Shareholders: React.FC = () => {
  const [data, setData] = useState<IShareholder[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchInfo();
      const rowData = response.SBER;
      const map = new Map<string, number>();
      rowData.forEach((item: { holder: string; share_percent: string }) => {
        const percent = parseFloat(item.share_percent);
        map.set(item.holder, (map.get(item.holder) || 0) + percent);
      });

      let result: IShareholder[] = Array.from(map.entries()).map(
        ([holder, share_percent]) => ({
          holder,
          share_percent,
        }),
      );

      const total = result.reduce((acc, cur) => acc + cur.share_percent, 0);
      result = result.map((item) => ({
        ...item,
        share_percent: (item.share_percent / total) * 100,
      }));

      setData(result);
    };

    getData();
  }, []);

  const columns = [
    {
      title: "Держатель акций",
      dataIndex: "holder",
    },
    {
      title: "% Доли",
      dataIndex: "share_percent",

      render: (val: number) => `${val.toFixed(2)} %`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey="holder"
          size="middle"
          className={styles.customTable}
        />
        <p className={styles.date}>
          Дата последнего обновления структуры: 15.04.2024
        </p>
      </div>
      <div className={styles.chart}>
        <DonutChart data={data} />
      </div>
    </div>
  );
};
