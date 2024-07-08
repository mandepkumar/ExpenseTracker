import React from "react";
import {
  PieChart as PieChartFromReCharts,
  Pie,
  Tooltip,
  Legend,
} from "recharts";

const PieChart = ({ data }) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) + 5;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) + 5;

    const percentage = (percent * 100).toFixed(0);
    return (
      <>
        {percentage > 0 && (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{
              fontWeight: "700",
            }}
          >
            {`${percentage}%`}
          </text>
        )}
      </>
    );
  };

  return (
    <PieChartFromReCharts width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        dataKey="value"
        stroke="none"
      ></Pie>
      <Tooltip />
      <Legend content={<CustomLegend />} />
    </PieChartFromReCharts>
  );
};

const CustomLegend = ({ payload }) => {
  return (
    <ul
      style={{
        color: "white",
        listStyleType: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {payload.map((py, index) => (
        <li
          key={`${py.name}-${py.color}-${index}`}
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "5px",
            fontSize: 12,
            lineHeight: 0,
            fontWeight: "400",
          }}
        >
          <Box color={py.color} /> {py.payload.name}i
        </li>
      ))}
    </ul>
  );
};

const Box = ({ color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        height: ".5rem",
        width: "1rem",
      }}
    ></div>
  );
};
export default PieChart;
