import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import React from "react";
import { grey } from "@mui/material/colors";
import { styled } from "styled-components";
import { SalesOrder, Product } from "components/bo/type/ManagerData";

type Props = {
  salesOrder: SalesOrder;
  products: Product;
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

const BoOrderModal = ({ salesOrder, products, onClose }: Props) => {
  return (
    <ModalBlackOut>
      <Paper
        elevation={3}
        sx={{
          width: "800px",
          height: "600px",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", paddingTop: 2 }}>
          구매 내역 정보
        </Typography>
        <Divider sx={{ margin: 3 }} />
        <Grid container>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="name" label="상품 이름" value={products.productName} sx={{ margin: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="price" label="제품 가격" value={products.price} sx={{ margin: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="allPrice"
              label="총 판매금액"
              value={
                salesOrder.orderProductCount *
                ((salesOrder.orderProductPrice * (100 - Number(products.discountRate))) / 100)
              }
              sx={{ margin: 1 }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="orderAmount" label="주문량" value={salesOrder.orderProductCount} sx={{ margin: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="stock" label="재고" value={products.stock} sx={{ margin: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="orderRequired" label="요청사항" value={salesOrder.orderRequired} sx={{ margin: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="address" label="주소" value={salesOrder.address} sx={{ margin: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="zipCode" label="우편번호" value={salesOrder.zipCode} sx={{ margin: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="receiverName" label="수령인" value={salesOrder.receiverName} sx={{ margin: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="phoneNumber" label="전화번호" value={salesOrder.phoneNumber} sx={{ margin: 1 }} />
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
            onClick={onClose}
            sx={{ backgroundColor: grey[500], marginLeft: 4 }}
            endIcon={<SendIcon />}
          >
            닫기
          </Button>
        </Box>
      </Paper>
    </ModalBlackOut>
  );
};

export default BoOrderModal;
