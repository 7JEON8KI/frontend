import { Box, Button, Paper, Tab, Tabs } from "@mui/material";
import BoManagerLayout from "components/bo/commons/BoManagerLayout";
import BoOrderTable from "components/bo/manager/BoOrderTable";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { grey } from "@mui/material/colors";
import axios from "axios";
const PageManagerOrder: React.FC = () => {
  function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  const downloadExcel = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/manager/orders/exceldown`, {
        responseType: "blob", // 데이터 형식을 Blob으로 설정
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      // Blob 데이터를 URL로 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // 가짜 링크를 만들어서 클릭하는 방식으로 다운로드
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", getToday() + "판매.xls"); // 다운로드될 파일 이름 지정
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading excel file:", error);
    }
  };
  return (
    <BoManagerLayout>
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Paper elevation={8} sx={{ p: 2, m: 2, height: "95%" }}>
            <Box sx={{ width: "100%", bgcolor: "background.paper", paddingBottom: 2 }}>
              <Tabs value={0} centered>
                <Tab label="판매 내역" />
              </Tabs>
            </Box>
            <BoOrderTable />
            <Box
              sx={{
                display: "flex",
                boxSizing: "border-box",
                alignItems: "end",
                justifyContent: "flex",
                paddingRight: 2,
                paddingBottom: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={downloadExcel}
                sx={{ backgroundColor: grey[800], marginRight: 2 }}
                endIcon={<SendIcon />}
              >
                Excel 다운
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </BoManagerLayout>
  );
};

export default PageManagerOrder;
