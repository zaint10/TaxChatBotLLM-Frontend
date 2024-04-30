import React, { useState } from "react";
import ChatInterface from "../components/ChatInterface";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffectOnce } from "../utils/helpers";

const ChatPage = () => {
  const { w2formId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(false);
  const [loadingFormDetails, setLoadingFormDetails] = useState(1);

  
  useEffectOnce(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/w2form/${w2formId}`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        setLoadingFormDetails(false);
        setMessages((prevMessages) => [
          { type: "system", text: response.data.data },
        ]);
      } catch (error) {
        console.error("Error fetching form details:", error);
        setLoadingFormDetails(false); // Set loading state to false on error
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
        const response = await axios.post(
          `http://localhost:8000/chat/${w2formId}`,
          {
            question: message,
          },
          {
            headers: {
              Authorization: authHeader,
            },
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
  return (
    <div>
      <ChatInterface
        message={message}
        setMessage={setMessage}
        messages={messages}
        onSubmit={handleSubmit}
        loadingFormDetails={loadingFormDetails}
        loading={loading}
      />
    </div>
  );
};

export default ChatPage;
