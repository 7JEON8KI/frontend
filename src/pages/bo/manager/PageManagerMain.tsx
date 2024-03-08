import { Box, Card, Divider, Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import BoManagerLayout from "components/bo/commons/BoManagerLayout";
import MainChart from "components/bo/graph/RevenueChart";
import React from "react";
import TopProduct from "components/bo/manager/TopProduct";
import BoOrderTable from "components/bo/manager/BoOrderTable";
import SaleAmountChart from "components/bo/graph/SaleAmountChart";
const PageManagerMain: React.FC = () => {
  return (
    <BoManagerLayout>
      <Box display="flex" flexWrap="wrap" height={"100%"} width={"100%"} justifyContent="center" alignItems="center">
        <Grid container height={"100%"} width={"100%"} spacing={6} maxHeight={"90vh"}>
          <Grid item xs={4} height={"50%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Box paddingTop={2}>
                <h3>판매량(일별)</h3>
              </Box>
              <SaleAmountChart />
            </Paper>
          </Grid>
          <Grid item xs={4} height={"50%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center", overflow: "auto" }}>
              <Box paddingTop={2}>
                <h3>인기 판매 상품</h3>
              </Box>
              <TopProduct />
            </Paper>
          </Grid>
          <Grid item xs={4} height={"50%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%", overflow: "auto" }}>
              <Box paddingTop={2} textAlign={"center"}>
                <h3>재고 부족 상품</h3>
              </Box>
              <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                      1.상품명 : [프레시지] 오늘 시켜먹는 마라탕
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      4,500원
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    상세 정보 참고
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    정보
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip color="primary" label="재고" size="small" />
                    <Chip label="1개" size="small" />
                  </Stack>
                </Box>
              </Card>
              <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                      2.상품명 : [프레시지] 오늘 시켜먹는 마라탕
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      4,500원
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    상세 정보 참고
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    정보
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip color="primary" label="재고" size="small" />
                    <Chip label="1개" size="small" />
                  </Stack>
                </Box>
              </Card>
              <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                      3.상품명 : [프레시지] 밤 11시에 끓여먹는 라면
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      45,500원
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    맛도 좋고 양도 많아요
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    정보
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip color="primary" label="재고" size="small" />
                    <Chip label="1개" size="small" />
                  </Stack>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={4} height={"50%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Box paddingTop={2}>
                <h3>판매금액(일별)</h3>
              </Box>
              <MainChart />
            </Paper>
          </Grid>
          <Grid item xs={8} height={"50%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "512px", overflow: "auto" }}>
              <Box paddingTop={2} textAlign={"center"}>
                <h3>주문 내역</h3>
              </Box>
              <BoOrderTable />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </BoManagerLayout>
  );
};

export default PageManagerMain;
