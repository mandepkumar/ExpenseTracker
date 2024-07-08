import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarGraph = ({ data }) => {
  return (
    <div className="BarGraph">
      <ResponsiveContainer width={400} height={200}>
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="value" shape={<CustomizedBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomizedBar = ({ fill, x, y, width, height }) => {
  const radius = height / 2;

  return (
    <path
      d={`M${x} ${y} L${x + width - radius} ${y} A ${radius} ${radius} 0 1 1 ${
        x + width - radius
      } ${y + height} L${x} ${y + height} Z`}
      fill="#8784D2"
    />
  );
};
export default BarGraph;
