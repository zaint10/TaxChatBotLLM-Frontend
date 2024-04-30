import React, { useEffect, useState } from "react";
import AllChats from "../components/AllChats";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";

const AllChatsPage = () => {
  const authHeader = useAuthHeader();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const response = await axios.get("http://localhost:8000/w2form/", {
          headers: {
            Authorization: authHeader,
          },
        });
        setChats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats", error);
        openSnackbar(error.message);
      }
    };
    fetchAllChats();
  }, [authHeader, openSnackbar]);

  return (
    <div>
      <AllChats chats={chats} loading={loading} />
    </div>
  );
};

export default AllChatsPage;
