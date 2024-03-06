import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import boAdminApi from "apis/boAdminApi";
import React, { useEffect } from "react";
import { styled } from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { Image } from "components/mealkeat";

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

interface Data {
  productId: string;
  productName: string;
  productSubName: string;
  price: string;
  productType: string;
  stock: string;
  discountRate: string;
  amount: number;
  calorie: number;
  storage: string;
  thumbnail: string;
  productDetail: string;
  createdAt: string;
}

type Props = {
  data: Data;
  onClose: () => void;
};
const BoProductModal = ({ data, onClose }: Props) => {
  const [productName, setProductName] = React.useState(data.productName);
  const [productSubName, setProductSubName] = React.useState(data.productSubName);
  const [price, setPrice] = React.useState(data.price);
  const [stock, setStock] = React.useState(data.stock);
  const [discountRate, setDiscountRate] = React.useState(data.discountRate);
  const [ingredientList, setIngredientList] = React.useState([]);

  const getProductThemeAndIngredient = async () => {
    try {
      const detail = await boAdminApi.getThemeAndIngredient(data.productId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ingList = detail.data.ingredientList.map((item: any) => {
        return item.ingredientName;
      });
      setIngredientList(ingList);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const handleClick = () => {
    getProductThemeAndIngredient();
  };

  useEffect(() => {});

  return (
    <ModalBlackOut>
      <Paper
        elevation={3}
        sx={{
          width: "800px",
          height: "700px",
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", paddingTop: 2 }}>
          상품 정보
        </Typography>
        <Divider sx={{ margin: 3 }} />
        <Grid container>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="name"
              label="상품명"
              value={productName}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setProductName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="subname"
              label="상품 부가명"
              value={productSubName}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setProductSubName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="price"
              label="가격"
              value={price}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="stock"
              label="재고"
              value={stock}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setStock(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField
              id="discountRate"
              label="할인률"
              value={discountRate}
              sx={{ margin: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDiscountRate(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={3} sx={{ width: "200px", height: "200px" }}>
              <Image alt={"test"} src={data.thumbnail} width={200} height={200} />
            </Paper>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TextField id="ingredient" label="재료" value={ingredientList.join(", ")} sx={{ margin: 1 }} />
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
            상품 디테일 가져오기
          </Button>
          <Button variant="contained" onClick={onClose} sx={{ backgroundColor: grey[500] }} endIcon={<SendIcon />}>
            취소
          </Button>
        </Box>
      </Paper>
    </ModalBlackOut>
  );
};

export default BoProductModal;
