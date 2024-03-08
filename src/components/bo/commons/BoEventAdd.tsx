import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import Editor from "../global/Editor";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SingleImageUpload from "./SingleImageUpload";
import SendIcon from "@mui/icons-material/Send";
import boAdminApi from "apis/boAdminApi";
import { useSelector } from "react-redux";
import { RootState } from "pages/bo/redux";
import { grey } from "@mui/material/colors";
const BoEventAdd: React.FC = () => {
  const [title, setTitle] = React.useState("제목");
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  const imageUrl = useSelector((state: RootState) => state.changer.url);
  const content = useSelector((state: RootState) => state.content.content);
  const insertEvnet = () => {
    boAdminApi.insertEvent({
      eventTitle: title,
      eventDetail: content,
      eventImageUrl: imageUrl,
      eventStartDay: startDate,
      eventEndDay: endDate,
    });
  };

  const handleClick = () => {
    console.log("startDay", startDate);
    console.log("endDay", endDate);
    insertEvnet();
    alert("등록되었습니다.");
  };
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
            sx={{ backgroundColor: grey[800], marginRight: 2, marginTop: 10 }}
            endIcon={<SendIcon />}
          >
            등록
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BoEventAdd;
