import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import React from "react";
import { grey } from "@mui/material/colors";
import { styled } from "styled-components";
import boAdminApi from "apis/boAdminApi";

interface Data {
  member_id: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  gender: string;
  birth: string;
  address: string;
  zipcode: string;
}

type Props = {
  data: Data;
  onClose: () => void;
};

export const ModalBlackOut = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.65);
`;

const BoMemberModal = ({ data, onClose }: Props) => {
  const [name, setName] = React.useState(data.name);
  const [nickname, setNickname] = React.useState(data.nickname);
  const [email, setEmail] = React.useState(data.email);
  const [phone, setPhone] = React.useState(data.phone);
  const [gender, setGender] = React.useState(data.gender);
  const [birth, setBirth] = React.useState(data.birth);
  const [address, setAddress] = React.useState(data.address);
  const [zipcode, setZipcode] = React.useState(data.zipcode);

  const modifiyMember = () => {
    boAdminApi.modifyMember({
      memberId: data.member_id,
      memberName: name,
      memberNickname: nickname,
      memberEmail: email,
      memberPhone: phone,
      infoAddr: address,
      infoZipcode: zipcode,
    });
  };

  const handleClick = () => {
    modifiyMember();
    onClose();
  };

  return (
    <ModalBlackOut>
      <Paper
        elevation={3}
        sx={{
          width: "512px",
          height: "512px",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", paddingTop: 2 }}>
          사용자 정보
        </Typography>
        <Divider sx={{ margin: 3 }} />
        <Grid container>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="name"
              label="이름"
              value={name}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="nickname"
              label="닉네임"
              value={nickname}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNickname(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="email"
              label="이메일"
              value={email}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="phone"
              label="전화번호"
              value={phone}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(event.target.value);
              }}
            />
          </Grid>

          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="gender"
              label="성별"
              value={gender}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setGender(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="birth"
              label="생일"
              value={birth}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBirth(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="address"
              label="주소"
              value={address}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAddress(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="zipcode"
              label="우편번호"
              value={zipcode}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setZipcode(event.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            height: "20%",
            boxSizing: "border-box",
            alignItems: "end",
            justifyContent: "flex-end",
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
            수정
          </Button>
          <Button variant="contained" onClick={onClose} sx={{ backgroundColor: grey[500] }} endIcon={<SendIcon />}>
            취소
          </Button>
        </Box>
      </Paper>
    </ModalBlackOut>
  );
};

export default BoMemberModal;
