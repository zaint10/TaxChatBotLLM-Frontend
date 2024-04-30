import React, { useState } from "react";
import W2FileUpload from "../components/W2FileUpload";
import { useSnackbar } from "../context/SnackbarContext";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    setLoading(true);
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:8000/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: authHeader,
          },
        }
      );
      openSnackbar(response.data.message);
      navigate(`chat/${response.data.data.w2form_id}`);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <W2FileUpload onUpload={handleUpload} loading={loading} />
    </div>
  );
};

export default HomePage;
