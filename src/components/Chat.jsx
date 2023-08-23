import React from "react";
import styled from "styled-components";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { selectChannelId } from "../features/appSlice"
import ChatInput from "./ChatInput";

function Chat() {
  const channelId = useSelector(selectChannelId);
  
  return (
    <ChatContainer>
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>#channel-name</strong>
            </h4>
            <StarBorderIcon />
          </HeaderLeft>
          <HeaderRight>
            <p>
              <InfoOutlinedIcon /> Details
            </p>
          </HeaderRight>
        </Header>

        <ChatMessages>{/* List out the messages */}</ChatMessages>
        <ChatInput 
          // ChannelName
          channelId = {channelId}
        />
      </>
    </ChatContainer>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const ChatMessages = styled.div``;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
`;
