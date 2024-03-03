import { Box, Grid, TextField } from "@mui/material";
import React from "react";
import Editor from "../global/Editor";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ImageUpload from "./ImageUpload";
import SingleImageUpload from "./SingleImageUpload";

const BoEventAdd: React.FC = () => {
  const [title, setTitle] = React.useState("제목");
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());

  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid container direction={"column"}>
          <Grid item>
            <Box marginRight={2}>
              <TextField
                id="title"
                label="이벤트"
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
                  label="startDate"
                  onChange={newValue => {
                    setStartDate(newValue);
                  }}
                />
                <DatePicker
                  sx={{ margin: 2 }}
                  value={endDate}
                  label="endDate"
                  onChange={newValue => {
                    setEndDate(newValue);
                  }}
                />
              </LocalizationProvider>
              <Box sx={{ width: "95%", height: "400px", overflow: "scroll", margin: 2 }}>
                <Box m={2}>
                  <h4>이벤트 메인 이미지 입력</h4>
                </Box>
                <SingleImageUpload />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Box m={2}>
          <Editor />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BoEventAdd;
