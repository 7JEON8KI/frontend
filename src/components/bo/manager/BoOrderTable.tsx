import React from "react";
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
import { useEffect } from "react";
import boManagerApi from "apis/boManagerApi";
// import BoProductModal from "./BoProductModal";
import { SalesOrder, createSalesOrder, Product, createProduct } from "components/bo/type/ManagerData";
import BoOrderModal from "./BoOrderModal";
import { green } from "@mui/material/colors";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  id: keyof SalesOrder;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "orderProductId",
    numeric: false,
    disablePadding: false,
    label: "주문번호",
  },
  {
    id: "productId",
    numeric: false,
    disablePadding: false,
    label: "상품번호",
  },
  {
    id: "orderProductCount",
    numeric: false,
    disablePadding: false,
    label: "주문량",
  },
  {
    id: "orderProductPrice",
    numeric: false,
    disablePadding: false,
    label: "가격",
  },
  {
    id: "orderProductDiscount",
    numeric: true,
    disablePadding: false,
    label: "할인률",
  },
  {
    id: "orderDate",
    numeric: false,
    disablePadding: false,
    label: "주문일",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "주소",
  },
  {
    id: "zipCode",
    numeric: false,
    disablePadding: false,
    label: "우편번호",
  },
  {
    id: "receiverName",
    numeric: false,
    disablePadding: false,
    label: "수령인",
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: false,
    label: "전화번호",
  },
  {
    id: "orderStatus",
    numeric: false,
    disablePadding: false,
    label: "주문상태",
  },
  {
    id: "orderRequired",
    numeric: false,
    disablePadding: false,
    label: "주문요구사항",
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof SalesOrder) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof SalesOrder) => (event: React.MouseEvent<unknown>) => {
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
            sx={{ fontWeight: "bold", backgroundColor: green[200] }}
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
export default function BoOrderTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof SalesOrder>("productId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [productId, setProductId] = React.useState("");
  const [orderData, setOrderdata] = React.useState<SalesOrder[]>([]);
  const [productData, setProductData] = React.useState<Product>({} as Product);

  const getProductList = async () => {
    try {
      const detail = await boManagerApi.getOrderList();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const orderList = await detail.data.map((item: any) => {
        const [m_year, m_month, m_day, m_hours, m_minutes, m_seconds] = item.orderDate;
        const orderDate = `${m_year}-${m_month}-${m_day} ${m_hours}:${m_minutes}:${m_seconds}`;
        return createSalesOrder(
          item.orderProductId,
          item.productId,
          item.orderProductCount,
          item.orderProductPrice,
          item.orderProductDiscount,
          orderDate,
          item.address,
          item.zipCode,
          item.receiverName,
          item.phoneNumber,
          item.orderStatus,
          item.orderNumber,
          item.orderRequired,
          item.paymentMethod,
        );
      });
      setOrderdata(orderList);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  useEffect(() => {
    getProductList();
    return () => {};
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof SalesOrder) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const getProductDetail = async (id: string) => {
    const item = await (await boManagerApi.getProductDetail(id)).data;

    const product = createProduct(
      item.productId,
      item.productName,
      item.productSubName,
      item.price,
      item.productType,
      item.stock,
      item.discountRate,
      item.amunt,
      item.calorie,
      item.storage,
      item.thumbnailImageUrl,
      item.productDetail,
      " ",
    );
    setProductData(product);
  };

  const handleClick = async (event: React.MouseEvent<unknown>, id: string) => {
    setProductId(id);
    await getProductDetail(id);
    setModalOpen(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderData.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(orderData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, orderData],
  );
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table sx={{ minWidth: 750, minHeight: 550 }} aria-labelledby="tableTitle" size={"small"}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={orderData.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.productId)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.orderProductId}
                      sx={{ cursor: "pointer", height: 33 }}
                    >
                      <TableCell component="th" align="center" id={labelId} scope="row" padding="none">
                        {row.orderProductId}
                      </TableCell>
                      <TableCell align="center">{row.productId}</TableCell>
                      <TableCell align="center">{row.orderProductCount}</TableCell>
                      <TableCell align="center">{row.orderProductPrice}</TableCell>
                      <TableCell align="center">{row.orderProductDiscount}</TableCell>
                      <TableCell align="center">{row.orderDate}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.zipCode}</TableCell>
                      <TableCell align="center">{row.receiverName}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{row.orderStatus}</TableCell>
                      <TableCell align="center">{row.orderRequired}</TableCell>
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
            count={orderData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {modalOpen && (
        <BoOrderModal
          salesOrder={orderData.find(order => order.productId === productId) as SalesOrder}
          products={productData}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
