import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SingleImageUpload from "../commons/SingleImageUpload";
import ImageUpload from "../commons/ImageUpload";
import SendIcon from "@mui/icons-material/Send";
import boManagerApi from "apis/boManagerApi";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { RootState } from "pages/bo/redux";
const ProductForm: React.FC = () => {
  const [storage, setStorage] = useState("상온");
  const [category, setCategory] = useState("밀키트");
  const [productName, setProductName] = useState("");
  const [productSubName, setProductSubName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [amount, setAmount] = useState("");
  const [calorie, setCalorie] = useState("");
  const imageUrl = useSelector((state: RootState) => state.changer.url);
  const imageList = useSelector((state: RootState) => state.imagelist.url);

  const [foodId, setFoodId] = useState("");
  const handleStorage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStorage(event.target.value);
  };

  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const insertProduct = () => {
    boManagerApi.insertProduct({
      productName: productName,
      productSubName: productSubName,
      price: price,
      stock: stock,
      productType: category,
      discountRate: discountRate,
      productDetail: imageList.join(","),
      amount: amount,
      calorie: calorie,
      storage: storage,
      thumbnailImageUrl: imageUrl,
    });
  };
  const handleClick = () => {
    insertProduct();
    alert("등록되었습니다.");
  };

  return (
    <Grid container height={"90%"} width={"100%"}>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper elevation={4} sx={{ width: "95%", height: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", margin: 5 }}>
            <FormControl>
              <Typography variant="h6" gutterBottom>
                상품 정보
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="productName"
                  label="상품명"
                  fullWidth
                  value={productName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setProductName(event.target.value);
                  }}
                  type="text"
                  color="primary"
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="productSubName"
                  label="상품 부제"
                  type="text"
                  fullWidth
                  color="primary"
                  value={productSubName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setProductSubName(event.target.value);
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="price"
                  label="가격"
                  type="text"
                  color="primary"
                  value={price}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPrice(event.target.value);
                  }}
                />
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                카테고리
              </Typography>
              <RadioGroup
                aria-label="카테고리"
                name="category"
                value={category}
                onChange={handleCategory}
                sx={{ flexDirection: "row", marginBottom: 2 }}
              >
                <FormControlLabel value="밀키트" control={<Radio />} label="밀키트" />
                <FormControlLabel value="와인" control={<Radio />} label="와인" />
              </RadioGroup>

              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="stock"
                  label="재고"
                  type="number"
                  color="primary"
                  value={stock}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setStock(event.target.value);
                  }}
                />
                <TextField
                  id="discountRate"
                  label="할인율"
                  type="number"
                  color="primary"
                  sx={{ marginLeft: 2 }}
                  value={discountRate}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDiscountRate(event.target.value);
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="amount"
                  label="용량"
                  type="text"
                  color="primary"
                  value={amount}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAmount(event.target.value);
                  }}
                />
                <TextField
                  id="calorie"
                  label="칼로리"
                  type="text"
                  color="primary"
                  value={calorie}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCalorie(event.target.value);
                  }}
                  sx={{ marginLeft: 2 }}
                />
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                품목보고번호 입력 시 식품안전나라에서 재료를 조회해 저장합니다
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="foodId"
                  label="품목보고번호"
                  fullWidth
                  type="text"
                  color="primary"
                  value={foodId}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFoodId(event.target.value);
                  }}
                />
              </Box>

              <Typography variant="subtitle1" gutterBottom>
                보관방법
              </Typography>
              <RadioGroup
                aria-label="보관"
                name="storage"
                value={storage}
                onChange={handleStorage}
                sx={{ flexDirection: "row", marginBottom: 2 }}
              >
                <FormControlLabel value="냉장" control={<Radio />} label="냉장" />
                <FormControlLabel value="냉동" control={<Radio />} label="냉동" />
                <FormControlLabel value="상온" control={<Radio />} label="상온" />
              </RadioGroup>
            </FormControl>
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
                sx={{ backgroundColor: grey[800], marginRight: 10 }}
                endIcon={<SendIcon />}
              >
                등록
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
      >
        <Paper elevation={4} sx={{ width: "95%", height: 900, overflow: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", margin: 5 }}>
            <Typography variant="h6" gutterBottom>
              썸네일 이미지
            </Typography>
            <SingleImageUpload />
            <Box sx={{ marginTop: 2 }} />
            <Typography variant="h6" gutterBottom>
              상세 이미지 업로드
            </Typography>
            <ImageUpload />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
