import { Pagination as MuiPagination } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

const StyledPagination = styled(MuiPagination)({
  "& .MuiPaginationItem-root": {
    color: "black", // 기본 색상 변경
    fontSize: "18px",
    "&.Mui-selected": {
      backgroundColor: "#237c60", // 선택된 항목의 배경색
      color: "white", // 선택된 항목의 텍스트 색상
      fontWeight: "bold",
    },
    "&:hover": {
      backgroundColor: "#1c5641", // 호버 시 배경색
      color: "white", // 호버 시 텍스트 색상
    },
  },
  "& .MuiPagination-ul": {
    gap: "10px",
  },
  display: "flex",
  justifyContent: "center",
  margin: "4rem auto 0",
});

interface PaginationProps {
  total: number;
  onClickPage: (page: number) => void;
  pageAmount?: number;
}
const Pagination = ({ total, pageAmount = 12, onClickPage }: PaginationProps): JSX.Element => {
  const count = Math.ceil(total / pageAmount);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(`현재 페이지: ${page}`);
    onClickPage(page);
  };

  return <StyledPagination count={count > 0 ? count : 1} shape="rounded" size="large" onChange={handleChange} />;
};

export default Pagination;
