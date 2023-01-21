import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Event = ({ displayEvents }) => {
  return (
    <Box sx={{ paddingTop: "2rem" }}>
      <Box sx={{ paddingBottom: "2rem" }}>
        <Typography variant="subtitle1">
          **Events are marked with red color in Calendar,click to open.
        </Typography>
      </Box>

      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Event</StyledTableCell>
                <StyledTableCell align="right">Summary</StyledTableCell>
                <StyledTableCell align="right">End Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayEvents.map((row, index) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.summary}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.end.date}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
    // <div className="mt-4 w-1/4 p-1 shadow-xl bg-gradient-to-r from-blue-500 via-navy-500 to-purple-500 rounded-2xl">
    //   <span className="block bg-white sm:p-2 rounded-xl" href="">
    //     <div className="sm:pr-8">
    //       <p className="mt-2 text-sm text-black">{description}</p>
    //     </div>
    //   </span>
    // </div>
  );
};

export default Event;
