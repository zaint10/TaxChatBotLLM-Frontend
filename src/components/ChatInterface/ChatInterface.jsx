import React, { useEffect, useRef } from "react";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import {
  Send as SendIcon,
  AccountCircle as UserIcon,
  Info as SystemIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";
import ShowSSN from "./ShowSSN";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

const MessageContainer = styled(Paper)`
  && {
    padding: 30px;
    margin-top: 20px;
    overflow-y: auto;
    max-height: 600px;
    width: 100%;
    position: relative;
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SystemMessage = styled(Grid)`
  && {
    margin-bottom: 10px;
    text-align: left;
    align-items: left;
  }
`;

const UserMessage = styled(Grid)`
  && {
    margin-bottom: 10px;
    text-align: right;
  }
`;

const ChatForm = styled.form`
  width: 100%;
`;

const ChatTextField = styled(TextField)`
  && {
    margin-top: 20px;
    width: 100%;

    .MuiInputAdornment-positionEnd {
      margin-left: auto;
    }
  }
`;

const SendIconButton = styled(IconButton)`
  && {
    margin-top: 8px;
  }
`;

const ChatInterface = ({
  message,
  setMessage,
  messages,
  onSubmit,
  loadingFormDetails,
  loading,
  handleVerfiyOTP,
  isOtpVerified,
  employeeSSN,
  handleFetchEmployeeSSN,
}) => {
  const messageContainerRef = useRef(null);

  const handleSendMessage = (event) => {
    event.preventDefault();
    onSubmit(event, message);
  };

  useEffect(() => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <StyledContainer>
      <Typography variant="h4" align="center" gutterBottom>
        Chat Interface
      </Typography>

      <MessageContainer ref={messageContainerRef}>
        {loadingFormDetails ? (
          <SpinnerContainer>
            <CircularProgress />
          </SpinnerContainer>
        ) : (
          messages.map((msg, index) => (
            <React.Fragment key={index}>
              {msg.type === "system" ? (
                <SystemMessage container item xs={12} alignItems="start">
                  <Avatar>
                    <SystemIcon />
                  </Avatar>
                  <Grid item xs={11}>
                    <Box ml={1}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </Box>
                  </Grid>
                </SystemMessage>
              ) : (
                <UserMessage container item xs={12} alignItems="end">
                  <Grid item xs={11}>
                    <Box mr={1}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </Box>
                  </Grid>
                  <Avatar>
                    <UserIcon />
                  </Avatar>
                </UserMessage>
              )}
            </React.Fragment>
          ))
        )}
      </MessageContainer>

      <ChatForm onSubmit={handleSendMessage}>
        <ChatTextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <SendIconButton
                color="primary"
                type="submit"
                disabled={loading || message.trim() === ""}
              >
                {loading ? <CircularProgress size={24} /> : <SendIcon />}
              </SendIconButton>
            ),
          }}
        />
      </ChatForm>
      <ShowSSN
        onHandleVerfiyOTP={handleVerfiyOTP}
        isOtpVerified={isOtpVerified}
        employeeSSN={employeeSSN}
        onFetchEmployeeSSN={handleFetchEmployeeSSN}
      />
    </StyledContainer>
  );
};

export default ChatInterface;
