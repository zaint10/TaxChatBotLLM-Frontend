import React, { useState } from "react";
import ChatInterface from "../components/ChatInterface";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "../utils/helpers";
import apiService from "../service/apiService";
import { useSnackbar } from "../context/SnackbarContext";

const ChatPage = () => {
  const { openSnackbar } = useSnackbar();
  const { w2formId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFormDetails, setLoadingFormDetails] = useState(1);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  console.log(isOtpVerified);

  useEffectOnce(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await apiService.get(`/w2form/${w2formId}`);
        setLoadingFormDetails(false);
        setMessages((prevMessages) => [
          { type: "system", text: response.data.data },
        ]);
      } catch (error) {
        console.error("Error fetching form details:", error);
        setLoadingFormDetails(false);
      }
    };

    fetchFormDetails();
  });

  const handleSubmit = async (event, message) => {
    if (message.trim() !== "") {
      setLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: message },
      ]);
      setMessage("");

      try {
        const response = await apiService.post(
          `/chat/${w2formId}`,
          {
            question: message,
          }
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "system", text: response.data.response },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setLoading(false);
    }
  };

  const handleVerfiyOTP = async (otp) => {
    try {
      const response = await apiService.post(`/verify-qr-code-otp/`, {
        otp,
      });
      setIsOtpVerified(true);
      return response;
    } catch (error) {
      openSnackbar(error.message);
      setIsOtpVerified(false);
    }
  };

  const handleFetchEmployeeSSN = async (otp) => {
    try {
      const response = await apiService.get(
        `/w2form/${w2formId}/sensitive-info/`,
        {
          headers: {
            "X-OTP": otp,
          }
        }
      );
      return response;
    } catch (error) {
      setIsOtpVerified(false);
      openSnackbar(error.message);
    }
  };

  return (
    <div>
      <ChatInterface
        message={message}
        setMessage={setMessage}
        messages={messages}
        onSubmit={handleSubmit}
        loadingFormDetails={loadingFormDetails}
        loading={loading}
        isOtpVerified={isOtpVerified}
        handleVerfiyOTP={handleVerfiyOTP}
        handleFetchEmployeeSSN={handleFetchEmployeeSSN}
      />
    </div>
  );
};

export default ChatPage;
