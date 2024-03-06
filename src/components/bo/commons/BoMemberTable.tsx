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
import BoMemberModal from "./BoMemberModal";
import { green } from "@mui/material/colors";
interface Member {
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

function createMember(
  member_id: string,
  name: string,
  nickname: string,
  email: string,
  phone: string,
  gender: string,
  birth: string,
  address: string,
  zipcode: string,
): Member {
  return {
    member_id,
    name,
    nickname,
    email,
    phone,
    gender,
    birth,
    address,
    zipcode,
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
  id: keyof Member;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "member_id",
    numeric: false,
    disablePadding: false,
    label: "회원 아이디",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "이름",
  },
  {
    id: "nickname",
    numeric: false,
    disablePadding: false,
    label: "닉네임",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "이메일",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "전화번호",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "성별",
  },
  {
    id: "birth",
    numeric: false,
    disablePadding: false,
    label: "생일",
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
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Member) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof Member) => (event: React.MouseEvent<unknown>) => {
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
                <Box sx={visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function BoMemberTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Member>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [memberdata, setMemberdata] = React.useState<Member[]>([]);
  const [memberId, setMemberId] = React.useState("");
  const getMemberList = async () => {
    const detail = await boAdminApi.getBoMemberList();
    const memberList = await detail.data.map((member: any) => {
      const gender = member.memberGender === 1 ? "남자" : "여자";
      return createMember(
        member.memberId,
        member.memberName,
        member.memberNickname,
        member.memberEmail,
        member.memberPhone,
        gender,
        member.memberBirth,
        member.infoAddr,
        member.infoZipcode,
      );
    });
    setMemberdata(memberList);
  };

  useEffect(() => {
    getMemberList();
    console.log(memberdata);
    return () => {};
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Member) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    // const selectedIndex = selected.indexOf(id);
    setModalOpen(true);
    setMemberId(id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - memberdata.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(memberdata, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, memberdata],
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
                rowCount={memberdata.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.member_id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.member_id}
                      sx={{ cursor: "pointer", height: 33 }}
                    >
                      <TableCell component="th" align="center" id={labelId} scope="row" padding="none">
                        {row.member_id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.nickname}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{row.birth}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.zipcode}</TableCell>
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
            count={memberdata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {modalOpen && (
        <BoMemberModal
          data={memberdata.find(member => member.member_id === memberId) as Member}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
