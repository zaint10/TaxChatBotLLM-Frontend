// ChatsTableSkeleton.js
import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Skeleton,
} from "@mui/material";

const ChatsTableSkeleton = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton animation="wave" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChatsTableSkeleton;
