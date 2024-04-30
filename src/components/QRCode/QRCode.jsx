import React, { useState } from "react";
import QRCodeReact from "qrcode.react"; // Make sure to install the qrcode.react library
import styled from "@emotion/styled";
import { useSnackbar } from "../../context/SnackbarContext";

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const QRCodeWrapper = styled.div`
  margin-bottom: 20px;
`;

const OTPForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OTPInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const QRCode = ({ qrCodeValue, onSubmit }) => {
  const [otp, setOtp] = useState("");
  const { openSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await onSubmit(otp);
    if(isSuccess){
      openSnackbar("2FA is enabled. You can now close this window");
    }
  };

  return (
    <QRCodeContainer>
      <QRCodeWrapper>
        <QRCodeReact value={qrCodeValue} />
      </QRCodeWrapper>
      <OTPForm onSubmit={handleSubmit}>
        <OTPInput
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </OTPForm>
    </QRCodeContainer>
  );
};

export default QRCode;
