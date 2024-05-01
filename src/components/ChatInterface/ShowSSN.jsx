import React, { useState } from "react";
import { Button, TextField, Switch, Container } from "@mui/material";
import styled from "@emotion/styled";
import { useAuthUserWrapper } from "../../context/UserContext";
import { useSnackbar } from "../../context/SnackbarContext";

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
  const { authUser } = useAuthUserWrapper();
  const { openSnackbar } = useSnackbar();

  const handleToggleSwitch = () => {
    setShowSSN((prevShowSSN) => !prevShowSSN);
    setTimeout(() => {
      if (!authUser.is_2fa_enabled) {
        setShowSSN(false);
        openSnackbar("Please Enable 2FA Authentication from the top.");
      }
    }, [500]);
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
      {authUser && authUser.is_2fa_enabled && showSSN && !isOtpVerified && (
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
