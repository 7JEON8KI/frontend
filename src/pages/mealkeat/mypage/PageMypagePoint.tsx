import React from "react";
import {
  Title,
  PointContainer,
  SubTitle,
  PointHistorys,
  PointHistory,
  HistoryItems,
  HistoryMain,
  HistoryItem,
  Hr,
} from "./PageMypagePoint.style";

const MyPagePoint: React.FC = () => {
  return (
    <>
      <Title>포인트</Title>
      {/* 보유포인트 */}
      <PointContainer>
        <SubTitle>보유 포인트</SubTitle>
        <SubTitle>12,000점</SubTitle>
      </PointContainer>
      <Hr />
      {/* 사용내역 list */}
      <PointHistorys>
        <PointHistory>
          <HistoryItems>2024.02.10</HistoryItems>
          <HistoryItems>
            <HistoryMain>포인트 사용</HistoryMain>
            <HistoryMain>+200점</HistoryMain>
          </HistoryItems>
          <HistoryItems>
            <HistoryItem>출석 보상</HistoryItem>
            <HistoryItem>잔액 120,000점</HistoryItem>
          </HistoryItems>
        </PointHistory>
        <PointHistory>
          <HistoryItems>2024.02.10</HistoryItems>
          <HistoryItems>
            <HistoryMain>포인트 사용</HistoryMain>
            <HistoryMain>+200점</HistoryMain>
          </HistoryItems>
          <HistoryItems>
            <HistoryItem>출석 보상</HistoryItem>
            <HistoryItem>잔액 120,000점</HistoryItem>
          </HistoryItems>
        </PointHistory>
      </PointHistorys>
    </>
  );
};

export default MyPagePoint;
