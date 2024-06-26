import React, { useEffect, useState } from "react";
import QRCode from "../components/QRCode";
import apiService from "../service/apiService";
import { useSnackbar } from "../context/SnackbarContext";
import { useAuthUserWrapper } from "../context/UserContext";


const QRCodePage = () => {
  const [loading, setLoading] = useState(true);
  const [qrCodeValue, setqrCodeValue] = useState("");
  const { openSnackbar } = useSnackbar();
  const [isVierified, setIsVerified] = useState(false);
  const { authUser, updateAuthUser } = useAuthUserWrapper();

  const handleQRCodeVerification = async (otp) => {
    try {
      setLoading(true);
      await apiService.post("/verify-qr-code-otp/", {
        otp,
      });
      updateAuthUser();
      setIsVerified(true);
      return true;
    } catch (error) {
      openSnackbar(error.message);
    }
    setLoading(false);
    return false;
  };

  useEffect(() => {
    try {
      const getQRCode = async () => {
        setLoading(true);
        const response = await apiService.get("/get-qr-code/");
        setqrCodeValue(response.data.qr_code_value);
        setLoading(false);
      };

      getQRCode();
    } catch (error) {
      openSnackbar(error.message);
    }
    setLoading(false);
  }, [openSnackbar]);
  return (
    <div>
      {isVierified || authUser.is_2fa_enabled ? (
        <h1>2FA for your account is enabled.</h1>
      ) : (
        <div>
          <h1>Please Scan your QR code using Authenticator Application</h1>
          <QRCode
            loading={loading}
            qrCodeValue={qrCodeValue}
            onSubmit={handleQRCodeVerification}
          ></QRCode>
        </div>
      )}
    </div>
  );
};

export default QRCodePage;
