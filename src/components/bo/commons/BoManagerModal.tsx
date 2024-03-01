import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import React from "react";
import { grey } from "@mui/material/colors";
import { styled } from "styled-components";
import boAdminApi from "apis/boAdminApi";

interface Data {
  storeId: string;
  storeName: string;
  storeTel: string;
  memberId: string;
  memberEmail: string;
  address: string;
  zipcode: string;
  createdAt: string;
  approvedAt: string;
}

type Props = {
  open: boolean;
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

const BoManagerModal = ({ open, data, onClose }: Props) => {
  const [storeId, setStoreId] = React.useState(data.storeId);
  const [storeName, setStoreName] = React.useState(data.storeName);
  const [storeTel, setStoreTel] = React.useState(data.storeTel);
  const [memberId, setMemberId] = React.useState(data.memberId);
  const [memberEmail, setMemberEmail] = React.useState(data.memberEmail);
  const [address, setAddress] = React.useState(data.address);
  const [zipcode, setZipcode] = React.useState(data.zipcode);
  const [createdAt, setCreatedAt] = React.useState(data.createdAt);
  const [approvedAt, setApprovedAt] = React.useState(data.approvedAt);

  const handleClick = () => {
    onClose();
  };

  return (
    open && (
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
                id="storeName"
                label="판매자명"
                value={storeName}
                sx={{ margin: 1 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setStoreName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TextField
                id="storeTel"
                label="전화번호"
                value={storeTel}
                sx={{ margin: 1 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setStoreTel(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TextField
                id="email"
                label="이메일"
                value={memberEmail}
                sx={{ margin: 1 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setMemberEmail(event.target.value);
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
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TextField
                id="createdAt"
                label="회원 생성일"
                value={createdAt}
                sx={{ margin: 1 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCreatedAt(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TextField
                id="approvedAt"
                label="판매 승인일"
                value={approvedAt}
                sx={{ margin: 1 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setApprovedAt(event.target.value);
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
    )
  );
};

export default BoManagerModal;
