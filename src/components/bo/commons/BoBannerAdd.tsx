import { Box, Grid, TextField } from "@mui/material";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SingleImageUpload from "./SingleImageUpload";

const BoBannerAdd: React.FC = () => {
  const [title, setTitle] = React.useState("배너 이름");
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  return (
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
            <Box sx={{ width: "700px", height: "400px", margin: 2, overflowY: "scroll", overflowX: "hidden" }}>
              <Box m={2}>
                <h4>배너 이미지 입력</h4>
              </Box>
              <SingleImageUpload />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BoBannerAdd;
