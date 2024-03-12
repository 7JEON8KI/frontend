import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React from "react";

interface SearchData {
  keyword: string;
  Search: number;
}

const datas: SearchData[] = [
  { keyword: "장사의신 밀키트", Search: 13990 },
  { keyword: "캠핑 밀키트", Search: 12570 },
  { keyword: "떡볶이 밀키트", Search: 10350 },
  { keyword: "밀키트 전문점", Search: 7870 },
  { keyword: "마라탕 밀키트", Search: 7050 },
  { keyword: "밀키트 추천", Search: 5520 },
  { keyword: "부대찌개 밀키트", Search: 5420 },
  { keyword: "밀키트 만들기", Search: 3730 },
  { keyword: "홈플러스 밀키트", Search: 3580 },
  { keyword: "낙곱새 밀키트", Search: 2670 },
  { keyword: "맛집 밀키트", Search: 2390 },
  { keyword: "감바스 밀키트", Search: 2150 },
  { keyword: "애슐리 밀키트", Search: 2010 },
  { keyword: "밀키드", Search: 2000 },
  { keyword: "파스타 밀키트", Search: 1690 },
  { keyword: "월남쌈 밀키트", Search: 1660 },
  { keyword: "닭갈비 밀키트", Search: 1630 },
  { keyword: "미역국 밀키트", Search: 1260 },
  { keyword: "요리키트", Search: 1210 },
  { keyword: "무인밀키트", Search: 1060 },
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
      categories: datas.map(item => item.keyword),
    },
  };

  const series = [
    {
      name: "검색량",
      data: datas.map(item => item.Search),
    },
  ];
  return <Chart type="bar" height={"400px"} options={options} series={series} />;
};

export default SearchChart;
