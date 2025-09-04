import { useState, type FC } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styles from "./DonutChart.module.scss";

interface IShareholder {
  holder: string;
  share_percent: number;
}

interface IDonutChartProps {
  data: IShareholder[];
}

const COLORS = ["#4E9F3D", "#FF6B6B", "#FFD93D", "#a4c66eff", "#222222", "#550055", "blue"];

export const DonutChart: FC<IDonutChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useState(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const isMobile = windowWidth < 1400;
  
  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={isMobile ? 450 : 350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="share_percent"
            nameKey="holder"
            outerRadius={isMobile ? 100 : 120}
            innerRadius={isMobile ? 60 : 80}
            labelLine={false}
            label={false}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                fillOpacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.3
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout={isMobile ? "horizontal" : "vertical"}
            align={isMobile ? "center" : "right"}
            verticalAlign={isMobile ? "bottom" : "middle"}
            iconType="circle"
            formatter={(value) => (
              <span
                style={{
                  color: "black",
                  fontFamily: "Manrope",
                  letterSpacing: isMobile ? "1px" : "2px",
                  paddingLeft: "5px",
                  fontSize: isMobile ? "12px" : "14px",
                }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};