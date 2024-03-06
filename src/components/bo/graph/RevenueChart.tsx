import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React, { useEffect } from "react";
import boAdminApi from "apis/boAdminApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "pages/bo/redux";
import { changeStatistics } from "pages/bo/redux/statistics";

interface QuantityData {
  dayOfWeek: string;
  totalQuantity: number;
  totalSales: number;
}

const RevenueChart: React.FC = () => {
  const datas = useSelector((state: RootState) => state.statistics.data);
  const dispatch = useDispatch();

  const onChangeStatistics = (diff: QuantityData[]) => {
    dispatch(changeStatistics(diff));
  };

  const getSales = async () => {
    const res = await boAdminApi.getSalesList();
    onChangeStatistics(res.data);
  };

  useEffect(() => {
    getSales();
  }, []);

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
      name: "판매금액",
      data: datas.map(item => item.totalSales),
    },
  ];
  return <ReactApexChart options={options} series={series} />;
};

export default RevenueChart;
