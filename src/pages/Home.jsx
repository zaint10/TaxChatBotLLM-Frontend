import React, { useState } from "react";
import W2FileUpload from "../components/W2FileUpload";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import apiService from "../service/apiService";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    setLoading(true);
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiService.post(
        "/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      openSnackbar(response.data.message);
      navigate(`chat/${response.data.data.w2form_id}`);
    } catch (error) {
      openSnackbar(error.message)
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
