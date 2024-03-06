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
import { green } from "@mui/material/colors";
import { Banner, createBanner } from "../type/AdminData";
import { useDispatch, useSelector } from "react-redux";
import { changeBanner } from "pages/bo/redux/banner";
import { RootState } from "pages/bo/redux";

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
  id: keyof Banner;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "banner_id",
    numeric: false,
    disablePadding: false,
    label: "배너 번호",
  },
  {
    id: "banner_title",
    numeric: false,
    disablePadding: false,
    label: "배너명",
  },
  {
    id: "banner_start_day",
    numeric: false,
    disablePadding: false,
    label: "시작일",
  },
  {
    id: "banner_end_day",
    numeric: false,
    disablePadding: false,
    label: "종료일",
  },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "생성일",
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Banner) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof Banner) => (event: React.MouseEvent<unknown>) => {
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

export default function BoBannerTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Banner>("created_at");
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  const dispatch = useDispatch();
  const [bannerdata, setBannerdata] = React.useState<Banner[]>([]);

  const onChangeBanner = (diff: Banner) => {
    dispatch(changeBanner(diff));
  };
  const getBannerList = async () => {
    const detail = await boAdminApi.getBannerList();
    const bannerList = await detail.data.map((item: any) => {
      const [s_year, s_month, s_day, s_hours, s_minutes] = item.bannerStartDay;
      const startDay = `${s_year}-${s_month}-${s_day} ${s_hours}:${s_minutes}`;
      const [e_year, e_month, e_day, e_hours, e_minutes] = item.bannerEndDay;
      const endDay = `${e_year}-${e_month}-${e_day} ${e_hours}:${e_minutes}`;
      const [c_year, c_month, c_day, c_hours, c_minutes] = item.createAt;
      const createAt = `${c_year}-${c_month}-${c_day} ${c_hours}:${c_minutes}`;

      return createBanner(item.bannerId, item.bannerTitle, item.bannerImageUrl, startDay, endDay, createAt);
    });
    setBannerdata(bannerList);
  };

  useEffect(() => {
    getBannerList();
    return () => {};
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Banner) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    // const selectedIndex = selected.indexOf(id);
    const temp = bannerdata.find(banner => banner.banner_id === id) as Banner;
    onChangeBanner(temp);
    console.log(id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bannerdata.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(bannerdata, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, bannerdata],
  );

  return (
    <>
      <Box display={"flex"}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle" size={"small"}>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={bannerdata.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.banner_id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.banner_id}
                      sx={{ cursor: "pointer", height: 33 }}
                    >
                      <TableCell component="th" align="center" id={labelId} scope="row" padding="none">
                        {row.banner_id}
                      </TableCell>
                      <TableCell align="center">{row.banner_title}</TableCell>
                      <TableCell align="center">{row.banner_start_day}</TableCell>
                      <TableCell align="center">{row.banner_end_day}</TableCell>
                      <TableCell align="center">{row.created_at}</TableCell>
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
            rowsPerPageOptions={[10]}
            component="div"
            count={bannerdata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      </Box>
    </>
  );
}
