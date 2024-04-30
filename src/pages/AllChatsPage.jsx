import React, { useEffect, useState } from "react";
import AllChats from "../components/AllChats";
import { useSnackbar } from "../context/SnackbarContext";
import apiService from "../service/apiService";

const AllChatsPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchAllChats = async () => {
      console.log("Fetching all")
      try {
        const response = await apiService.get("/w2form/");
        setChats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats", error);
        openSnackbar(error.message);
      }
    };
    fetchAllChats();
  }, [openSnackbar]);

  return (
    <div>
      <AllChats chats={chats} loading={loading} />
    </div>
  );
};

export default AllChatsPage;
