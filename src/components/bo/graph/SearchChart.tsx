import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React from "react";

interface SearchData {
  month: string;
  amount: number;
}
const datas: SearchData[] = [
  { month: "2023-03", amount: 127400 },
  { month: "2023-04", amount: 112900 },
  { month: "2023-05", amount: 113700 },
  { month: "2023-06", amount: 101400 },
  { month: "2023-07", amount: 104200 },
  { month: "2023-08", amount: 114100 },
  { month: "2023-09", amount: 83500 },
  { month: "2023-10", amount: 83800 },
  { month: "2023-11", amount: 80600 },
  { month: "2023-12", amount: 95200 },
  { month: "2024-01", amount: 68300 },
  { month: "2024-02", amount: 69900 },
];

const SearchChart: React.FC = () => {
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
      categories: datas.map(item => item.month),
    },
  };

  const series = [
    {
      name: "검색량",
      data: datas.map(item => item.amount),
    },
  ];
  return <ReactApexChart height={"400px"} options={options} series={series} />;
};

export default SearchChart;
