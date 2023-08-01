import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "https://afba-121-178-98-20.ngrok-free.app",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
