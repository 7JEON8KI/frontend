import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "pages/bo/redux";

const SaleAmountChart: React.FC = () => {
  const datas = useSelector((state: RootState) => state.statistics.data);

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
      categories: datas.map(item => item.dayOfWeek),
    },
  };

  const series = [
    {
      name: "판매량",
      data: datas.map(item => item.totalQuantity),
    },
  ];
  return <ReactApexChart options={options} series={series} />;
};

export default SaleAmountChart;
