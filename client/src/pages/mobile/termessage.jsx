import React, { useState, useEffect } from "react";
import "./termessage.css";
import Footer from "./footer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ConversationList, Conversation, Avatar } from "@chatscope/chat-ui-kit-react";
import http from "../../axios/http";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
// import { setUser1, setUser2, setRoomNumber } from "../../redux/chatInfo";
import PersonIcon from "@mui/icons-material/Person";
import { Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

function Termessage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginId = useSelector((state) => state.mobileInfo.loginId);
  // const targetId; 겹주차 발생 차주에게 보내기!!

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    findAllRoom();
  }, []);

  const findAllRoom = () => {
    http
      .get(`/chat/rooms/${loginId}`)
      .then((response) => {
        console.log("대화방 리스트");
        console.log(response.data.response);
        setChatRooms(response.data.response);
      })
      .catch((error) => {
        console.error("Error while fetching chat rooms:", error);
      });
  };

  const createRoom = () => {
    // if (roomName === "") {
    //   alert("방 제목을 입력해 주십시오.");
    //   return;

    http
      .post("/chat/room", { userIdOne: loginId, userIdTwo: "user2" })
      .then((response) => {
        console.log(response.data.response.roomId);
        // // redux에 담음
        // dispatch(setRoomNumber(response.data.response.roomId)); // 룸 넘버
        // dispatch(setUser1(loginId)); // 로그인 한 유저

        alert(`${response.data.response.roomName} 방 개설에 성공하였습니다.`);

        findAllRoom();
      })
      .catch((error) => {
        alert("채팅방 개설에 실패하였습니다.");
        console.error("Error while creating chat room:", error);
      });
  };

  const enterRoom = (roomId) => {
    // const sender = prompt("대화명을 입력해 주세요.");
    // if (sender !== "") {
    // localStorage.setItem("wschat.sender", sender);
    // localStorage.setItem("wschat.roomId", roomId);
    navigate(`${roomId}`);
    // }
  };

  return (
    <React.Fragment>
      <Box sx={{ p: "0.8rem" }}>
        <Typography variant={"h5"} sx={{ textAlign: "start", fontWeight: "bold" }}>
          Messages
        </Typography>
      </Box>
      <Divider />
      <div
        style={{
          height: "60vh",
        }}
      >
        <List sx={{ width: "100%", p: "0" }}>
          {/* 시스템 대화방 */}
          <React.Fragment>
            <ListItem
              sx={{
                "&:active": {
                  backgroundColor: "#CACACA",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <Fab size="small" color="#">
                    <MailOutlineIcon />
                  </Fab>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="시스템" secondary="최근 댓글 넣을꺼임" />
            </ListItem>
            <Divider />
          </React.Fragment>
          {chatRooms.map((item) => (
            <React.Fragment key={item.roomId}>
              <ListItem
                sx={{
                  "&:active": {
                    backgroundColor: "#CACACA",
                  },
                }}
                onClick={() => enterRoom(item.roomId)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Fab size="small" color="#">
                      <MailOutlineIcon />
                    </Fab>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.roomName} secondary=";" />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
      {/* // <ConversationList key={item.roomId}>
          //   <Conversation
          //     name={item.roomName}
          //     lastSenderName=""
          //     info={""}
          //     onClick={() => enterRoom(item.roomId)}
          //   >
          //     <Avatar>
          //       <PersonIcon sx={{ width: "100%", height: "100px" }} />
          //     </Avatar>
          //   </Conversation>
          // </ConversationList> */}

      <Button className="btn btn-primary" type="button" onClick={createRoom}>
        채팅방 개설
      </Button>
      <Footer TermessageiconColor="#B7C4CF" />
    </React.Fragment>
  );
}

export default Termessage;
