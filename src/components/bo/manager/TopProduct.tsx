import React, { useEffect, useState } from "react";
import boManagerApi from "apis/boManagerApi";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Image } from "components/mealkeat";
interface TopProduct {
  productId: number;
  sum: number;
  productName: string;
  productSubName: string;
  price: number;
  stock: number;
  thumbnailImageUrl: string;
}
const TopProduct: React.FC = () => {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([] as TopProduct[]);

  const getTopProducts = async () => {
    // Assuming boManagerApi.getTopProduct() returns an array of top products
    const res = await boManagerApi.getTopProduct();
    setTopProducts(res.data);
  };

  useEffect(() => {
    getTopProducts();
  }, []);

  return (
    <Box>
      {topProducts.map(product => (
        <>
          <Stack key={product.productId} direction="column" justifyContent="space-between">
            <Box sx={{ p: 2, display: "flex", flexDirection: "row", width: "100%" }}>
              <Image
                alt={product.productName}
                src={product.thumbnailImageUrl} // Assuming the product object has an 'image' property with the URL
                width={100}
                height={100}
              />
              <Stack direction={"column"}>
                <Typography gutterBottom variant="body1" component="div">
                  상품명 : {product.productName}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  설명 : {product.productSubName}
                </Typography>
                <Stack direction="row" justifyContent="space-between" width={"100%"}>
                  <Typography gutterBottom variant="body2" component="div">
                    판매량 : {product.sum}개
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    재고 : {product.stock}개
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default TopProduct;
