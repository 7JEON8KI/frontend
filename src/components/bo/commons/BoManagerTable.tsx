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
import BoManagerModal from "./BoManagerModal";
import { green } from "@mui/material/colors";
interface Manager {
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

function createManager(
  storeId: string,
  storeName: string,
  storeTel: string,
  memberId: string,
  memberEmail: string,
  address: string,
  zipcode: string,
  createdAt: string,
  approvedAt: string,
): Manager {
  return {
    storeId,
    storeName,
    storeTel,
    memberId,
    memberEmail,
    address,
    zipcode,
    createdAt,
    approvedAt,
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
  id: keyof Manager;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "storeId",
    numeric: false,
    disablePadding: false,
    label: "번호",
  },
  {
    id: "storeName",
    numeric: false,
    disablePadding: false,
    label: "판매자명",
  },
  {
    id: "storeTel",
    numeric: false,
    disablePadding: false,
    label: "전화번호",
  },
  {
    id: "memberEmail",
    numeric: false,
    disablePadding: false,
    label: "이메일",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "주소",
  },
  {
    id: "zipcode",
    numeric: false,
    disablePadding: false,
    label: "우편번호",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "가입일",
  },
  {
    id: "approvedAt",
    numeric: false,
    disablePadding: false,
    label: "승인일",
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Manager) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof Manager) => (event: React.MouseEvent<unknown>) => {
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
interface BoManagerTableProps {
  tab: number;
}

export default function BoManagerTable({ tab }: BoManagerTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Manager>("storeId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [managerData, setManagerdata] = React.useState<Manager[]>([]);
  const [storeId, setStoreId] = React.useState("");

  const getManagerList = async () => {
    const detail = await boAdminApi.getBoManagerList();
    const managerList = await detail.data.map((item: any) => {
      const [m_year, m_month, m_day, m_hours, m_minutes, m_seconds] = item.memberCreatedDate;
      const createdAt = `${m_year}-${m_month}-${m_day} ${m_hours}:${m_minutes}:${m_seconds}`;
      let approvedAt = "";
      if (item.storeApprovedDate) {
        const [a_year, a_month, a_day, a_hours, a_minutes, a_seconds] = item.storeApprovedDate;
        approvedAt = `${a_year}-${a_month}-${a_day} ${a_hours}:${a_minutes}:${a_seconds}`;
      }
      return createManager(
        item.storeId,
        item.storeName,
        item.storeTel,
        item.memberId,
        item.memberEmail,
        item.infoAddr,
        item.infoZipcode,
        createdAt,
        approvedAt,
      );
    });
    setManagerdata(managerList);
  };

  useEffect(() => {
    getManagerList();
    console.log(managerData);
    return () => {};
  }, []);

  useEffect(() => {
    setOrderBy("approvedAt");
    setOrder("asc");
    return () => {};
  }, [top]);
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Manager) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    // const selectedIndex = selected.indexOf(id);
    setModalOpen(true);
    setStoreId(id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - managerData.length) : 0;

  const visibleRows = React.useMemo(() => {
    return stableSort(
      managerData.filter(row => row.approvedAt !== null),
      getComparator(order, orderBy),
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [tab, order, orderBy, page, rowsPerPage, managerData]);

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
                rowCount={managerData.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.storeId)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.storeId}
                      sx={{ cursor: "pointer", height: 33 }}
                    >
                      <TableCell
                        component="th"
                        align="center"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ width: "10%" }}
                      >
                        {row.storeId}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {row.storeName}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "20%" }}>
                        {row.storeTel}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "20%" }}>
                        {row.memberEmail}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {row.address}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {row.zipcode}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {row.createdAt}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "10%" }}>
                        {row.approvedAt}
                      </TableCell>
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
            count={managerData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {modalOpen && (
        <BoManagerModal
          data={managerData.find(manager => manager.storeId === storeId) as Manager}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
