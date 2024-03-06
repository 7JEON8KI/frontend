import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React from "react";

const data = [
  { day: "월", revenue: 12000 },
  { day: "화", revenue: 18000 },
  { day: "수", revenue: 20000 },
  { day: "목", revenue: 15000 },
  { day: "금", revenue: 25000 },
  { day: "토", revenue: 30000 },
  { day: "일", revenue: 35000 },
];
const options: ApexOptions = {
  theme: {
    mode: "light",
  },
  chart: {
    type: "bar",
    height: 350,
    dropShadow: {
      enabled: true,
      top: 5,
      left: 5,
      blur: 5,
      opacity: 0.2,
    },
  },
  xaxis: {
    categories: data.map(item => item.day),
  },
};

const series = [
  {
    name: "판매액",
    data: data.map(item => item.revenue),
  },
];

const MainChart = () => {
  return <ReactApexChart options={options} series={series} />;
};

export default MainChart;
