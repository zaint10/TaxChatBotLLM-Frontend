// ChatsTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ChatsTable = ({ chats }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chats.map((chat) => (
            <TableRow key={chat.id}>
              <TableCell>{chat.file_name}</TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  to={`/chat/${chat.id}`}
                  variant="outlined"
                  color="primary"
                >
                  Go to Chat
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChatsTable;
