import React from "react";
import ChatsTable from "./ChatsTable";
import ChatsTableSkeleton from "./ChatsTableSkeleton";

const AllChats = ({ chats, loading }) => {
  return (
    <div>
      <h1>All Chats</h1>
      {loading ? <ChatsTableSkeleton /> : <ChatsTable chats={chats} />}
    </div>
  );
};

export default AllChats;
