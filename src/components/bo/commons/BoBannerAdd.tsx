import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import SingleImageUpload from "./SingleImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "pages/bo/redux";
import boAdminApi from "apis/boAdminApi";
import { grey } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import BoBannerTable from "./BoBannerTable";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const BoBannerAdd: React.FC = () => {
  const banner = useSelector((state: RootState) => state.banner.banner);
  const [title, setTitle] = React.useState(banner.banner_title);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
  const imageUrl = useSelector((state: RootState) => state.changer.url);
  const bannerData = useSelector((state: RootState) => state.banner.banner);
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

  const handleDeleteClick = () => {
    if (Object.keys(bannerData).length > 0) {
      boAdminApi.deleteBanner(bannerData.banner_id);
      alert("삭제되었습니다.");
    } else {
      alert("삭제할 배너가 없습니다.");
    }
  };

  useEffect(() => {
    console.log("star", startDate);
    if (Object.keys(bannerData).length > 0) {
      setTitle(bannerData.banner_title);
      const startDayString = bannerData.banner_start_day;
      const endDayString = bannerData.banner_end_day;
      console.log("click", startDayString, endDayString);
      const startString = dayjs(startDayString.replace(" ", "T"));
      const endString = dayjs(endDayString.replace(" ", "T"));

      console.log(startString);
      setStartDate(startString);
      setEndDate(endString);
    }
  }, [bannerData]);
  return (
    <Grid container>
      <Grid item xs={6}>
        <BoBannerTable />
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={8} sx={{ marginLeft: 3 }}>
          <Grid container direction={"column"}>
            <Grid item>
              <Box margin={2}>
                <TextField
                  id="title"
                  placeholder="배너 제목 입력"
                  value={title}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(event.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Box marginLeft={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker value={startDate} onChange={setStartDate} />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker value={endDate} onChange={setEndDate} />
                </LocalizationProvider>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "90%", height: "500px", margin: 2, overflowX: "hidden" }}>
                  <Box m={2}>
                    <h4>배너 이미지 입력</h4>
                  </Box>
                  <SingleImageUpload />
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  boxSizing: "border-box",
                  alignItems: "end",
                  justifyContent: "flex-end",
                  marginBottom: 2,
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
                <Button
                  variant="contained"
                  onClick={handleDeleteClick}
                  sx={{ backgroundColor: grey[600], marginRight: 2 }}
                  endIcon={<SendIcon />}
                >
                  삭제
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BoBannerAdd;
