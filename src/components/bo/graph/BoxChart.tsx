import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React from "react";

const data = [
  { type: "밀키트", revenue: 60000 },
  { type: "와인", revenue: 18000 },
];

const series = data.map(item => ({
  name: item.type,
  data: [item.revenue],
}));

const options: ApexOptions = {
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  theme: {
    mode: "light",
  },
  xaxis: {
    categories: data.map(item => item.type),
  },
};

const BarChart = () => {
  return <ReactApexChart type="bar" options={options} series={series} />;
};

export default BarChart;
