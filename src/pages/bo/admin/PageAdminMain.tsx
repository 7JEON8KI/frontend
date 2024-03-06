import React from "react";
import BoLayout from "components/bo/commons/BoLayout";
import { Box, Card, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import MainChart from "components/bo/graph/MainChart";
import { Image } from "components/mealkeat";
import BoxChart from "components/bo/graph/BoxChart";
const PageAdminMain: React.FC = () => {
  return (
    <BoLayout>
      <Box display="flex" height={"100%"} width={"100%"} justifyContent="center" alignItems="center">
        <Grid container height={"100%"} width={"100%"} spacing={6}>
          <Grid item xs={4} height={"50%"} gridColumn={6} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Box paddingTop={2}>
                <h3>방문자수(주)</h3>
              </Box>
              <Box paddingRight={2}>
                <MainChart />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Card sx={{ maxWidth: 360 }}>
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
              <Box sx={{ p: 2 }}>
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
          </Grid>
          <Grid item xs={4} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
              <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                  <BoxChart />
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    Select type
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip color="primary" label="Soft" size="small" />
                    <Chip label="Medium" size="small" />
                    <Chip label="Hard" size="small" />
                  </Stack>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={4} height={"50%"} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={2} sx={{ width: "100%", height: "100%", textAlign: "center" }}>
              <Box paddingTop={2}>
                <h3>판매액(주간)</h3>
              </Box>
              <BoxChart />
            </Paper>
          </Grid>
          <Grid item xs={8} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={4} sx={{ width: "100%", height: "100%" }}></Paper>
          </Grid>
        </Grid>
      </Box>
    </BoLayout>
  );
};

export default PageAdminMain;
