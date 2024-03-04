/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

import { visuallyHidden } from "@mui/utils";
import boAdminApi from "apis/boAdminApi";
import { useEffect } from "react";
// import BoProductModal from "./BoProductModal";
interface Product {
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

function createProduct(
  productId: string,
  productName: string,
  productSubName: string,
  price: string,
  productType: string,
  stock: string,
  discountRate: string,
  amount: number,
  calorie: number,
  storage: string,
  thumbnail: string,
  productDetail: string,
  createdAt: string,
): Product {
  return {
    productId,
    productName,
    productSubName,
    price,
    productType,
    stock,
    discountRate,
    amount,
    calorie,
    storage,
    thumbnail,
    productDetail,
    createdAt,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Product;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "productId",
    numeric: false,
    disablePadding: false,
    label: "상품 번호",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: false,
    label: "상품명",
  },
  {
    id: "productSubName",
    numeric: false,
    disablePadding: false,
    label: "상품 서브 네임",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "가격",
  },
  {
    id: "productType",
    numeric: false,
    disablePadding: false,
    label: "카테고리",
  },
  {
    id: "stock",
    numeric: false,
    disablePadding: false,
    label: "재고",
  },
  {
    id: "discountRate",
    numeric: false,
    disablePadding: false,
    label: "할인율",
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Product) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function BoProductTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Product>("productId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [modalOpen, setModalOpen] = React.useState(false);

  const [productData, setProductdata] = React.useState<Product[]>([]);
  // const [productId, setProductId] = React.useState("");

  const getProductList = async () => {
    try {
      const detail = await boAdminApi.getBoProductList();
      const productList = await detail.data.map((item: any) => {
        const [m_year, m_month, m_day, m_hours, m_minutes, m_seconds] = item.createdAt;
        const created = `${m_year}-${m_month}-${m_day} ${m_hours}:${m_minutes}:${m_seconds}`;
        return createProduct(
          item.productId,
          item.productName,
          item.productSubName,
          item.price,
          item.productType,
          item.stock,
          item.discountRate,
          item.amount,
          item.calorie,
          item.storage,
          item.thumbnail,
          item.productDetail,
          created,
        );
      });
      setProductdata(productList);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  useEffect(() => {
    getProductList();
    console.log(productData);
    return () => {};
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Product) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
  //   // const selectedIndex = selected.indexOf(id);
  //   // setModalOpen(true);
  //   // setProductId(id);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productData.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(productData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, productData],
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"small"}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={productData.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={event => handleClick(event, row.productId)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.productId}
                      sx={{ cursor: "pointer", height: 33 }}
                    >
                      <TableCell component="th" align="center" id={labelId} scope="row" padding="none">
                        {row.productId}
                      </TableCell>
                      <TableCell align="center">{row.productName}</TableCell>
                      <TableCell align="center">{row.productSubName}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.productType}</TableCell>
                      <TableCell align="center">{row.stock}</TableCell>
                      <TableCell align="center">{row.discountRate}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15]}
            component="div"
            count={productData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {/* {modalOpen && (
        <BoProductModal
          data={productData.find(product => product.productId === productId) as Product}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )} */}
    </>
  );
}
