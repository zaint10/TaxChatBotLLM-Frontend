import React, { useState } from "react";
import { Button, TextField, Switch, Container } from "@mui/material";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const ShowSSN = ({ onHandleVerfiyOTP, isOtpVerified, onFetchEmployeeSSN }) => {
  const [otp, setOtp] = useState("");
  const [showSSN, setShowSSN] = useState(false);
  const [employeeSSN, setEmployeeSSN] = useState(false);

  const handleToggleSwitch = () => {
    setShowSSN((prevShowSSN) => !prevShowSSN);
  };

  const handleVerifyOtp = async () => {
    const response = await onHandleVerfiyOTP(otp);
    if (response) {
      const response = await onFetchEmployeeSSN(otp);
      if (response) {
        setEmployeeSSN(response.data.decrypted_ssn);
      }
    }
  };

  return (
    <div>
      <Switch checked={showSSN} onChange={handleToggleSwitch} />
      <label>Show Employee SSN</label>
      {showSSN && !isOtpVerified && (
        <StyledContainer>
          <h1>Please enter OTP from your authenticator app</h1>
          <TextField
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleVerifyOtp}>
            Verify OTP
          </Button>
        </StyledContainer>
      )}
      {isOtpVerified && employeeSSN && (
        <div>
          <TextField
            label="Employee SSN"
            value={employeeSSN}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ShowSSN;
