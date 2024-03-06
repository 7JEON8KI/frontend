import { Box, Card, Divider, Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import BoManagerLayout from "components/bo/commons/BoManagerLayout";
import MainChart from "components/bo/graph/RevenueChart";
import React from "react";
import { Image } from "components/mealkeat";
const PageManagerMain: React.FC = () => {
  return (
    <BoManagerLayout>
      <Box display="flex" height={"100%"} width={"100%"} justifyContent="center" alignItems="center">
        <Grid container height={"100%"} width={"100%"} spacing={6}>
          <Grid item xs={4} height={"50%"} gridColumn={6} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}></Paper>
          </Grid>
          <Grid item xs={4} height={"50%"} gridColumn={6} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <Card variant="outlined" sx={{ width: "100%" }}>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h6" component="div">
                      최고 인기 상품
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      12,000원
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    상품명 : [프레시지] 오늘 시켜먹는 마라탕
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2, alignItems: "center", justifyContent: "center" }}>
                  <Typography gutterBottom variant="body2">
                    상품 이미지
                  </Typography>
                  <Divider />
                  <Paper elevation={3} sx={{ width: "160px", height: "160px", paddingTop: "2" }}>
                    <Image
                      alt={"test"}
                      src={
                        "https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/thumbnail/2_ae3e149d-d8ff-11ee-834f-ac198ebc401d.jpg"
                      }
                      width={160}
                      height={160}
                    />
                  </Paper>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={4} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
              <Card variant="outlined">
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="h6" component="div" textAlign="center">
                    판매 상품 인기순
                  </Typography>
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
                    <Chip color="primary" label="판매량" size="small" />
                    <Chip label="재고" size="small" />
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
                    <Chip color="primary" label="판매량" size="small" />
                    <Chip label="재고" size="small" />
                  </Stack>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={4} height={"50%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Box paddingTop={2}>
                <h3>판매액(천)</h3>
              </Box>
              <MainChart />
            </Paper>
          </Grid>
          <Grid item xs={8} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%" }}></Paper>
          </Grid>
        </Grid>
      </Box>
    </BoManagerLayout>
  );
};

export default PageManagerMain;
