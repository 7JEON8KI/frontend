import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SingleImageUpload from "./SingleImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "pages/bo/redux";
import boAdminApi from "apis/boAdminApi";
import { grey } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import BoBannerTable from "./BoBannerTable";
const BoBannerAdd: React.FC = () => {
  const [title, setTitle] = React.useState("배너 이름");
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  const imageUrl = useSelector((state: RootState) => state.changer.url);
  const insertBanner = () => {
    boAdminApi.insertBanner({
      bannerTitle: title,
      bannerImageUrl: imageUrl,
      bannerStartDay: startDate,
      bannerEndDay: endDate,
    });
  };
  const handleClick = () => {
    console.log("startDay", startDate);
    console.log("endDay", endDate);
    insertBanner();
    alert("등록되었습니다.");
  };
  return (
    <Grid container>
      <Grid item xs={6}>
        <BoBannerTable />
      </Grid>
      <Grid item xs={6}>
        <Grid container direction={"column"}>
          <Grid item>
            <Box marginRight={2}>
              <TextField
                id="title"
                label="배너"
                value={title}
                sx={{ margin: 2 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={{ margin: 2 }}
                  value={startDate}
                  label="시작일"
                  onChange={newValue => {
                    setStartDate(newValue);
                  }}
                />
                <DatePicker
                  sx={{ margin: 2 }}
                  value={endDate}
                  label="종료일"
                  onChange={newValue => {
                    setEndDate(newValue);
                  }}
                />
              </LocalizationProvider>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ width: "600px", height: "400px", margin: 2, overflowY: "scroll", overflowX: "hidden" }}>
                  <Box m={2}>
                    <h4>배너 이미지 입력</h4>
                  </Box>
                  <SingleImageUpload />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  boxSizing: "border-box",
                  alignItems: "end",
                  justifyContent: "flex-end",
                  paddingTop: 2,
                  paddingRight: 2,
                  paddingBottom: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleClick}
                  sx={{ backgroundColor: grey[800], marginRight: 2 }}
                  endIcon={<SendIcon />}
                >
                  등록
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BoBannerAdd;
