import React from "react";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled(Button)`
  && {
    margin-top: 4px;
    margin-bottom: 2px;
    width: 200px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const LoadingIndicator = styled(CircularProgress)`
  && {
    margin-top: 2px;
  }
`;

const W2FileUpload = ({ onUpload, loading }) => {
  const handleUpload = async (event) => {
    onUpload(event);
  };

  return (
    <StyledContainer>
      <Typography variant="h4" align="center" gutterBottom>
        Upload your W2 Form and we will analyze it
      </Typography>
      <UploadInput
        type="file"
        accept=".pdf"
        id="file-upload"
        onChange={handleUpload}
      />
      <label htmlFor="file-upload">
        <UploadButton variant="contained" color="primary" component="span" disabled={loading}>
          Upload File
        </UploadButton>
      </label>
      {loading && <LoadingIndicator />}
    </StyledContainer>
  );
};

export default W2FileUpload;
