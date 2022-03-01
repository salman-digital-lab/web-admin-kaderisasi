import React from "react"
import "../../assets/scss/Member.scss"
import ChatRoomFilter from "./components/ChatRoomFilter"
import ChatRoomTable from "./components/ChatRoomTable"
import AdminChatRoomProvider from "../../context/AdminChatRoomContext"

const ChatRoom = () => (
  <AdminChatRoomProvider>
    <div className="userlist">
      <div className="container">
        <h1
          style={{ color: "#25223C", fontWeight: "bold", marginBottom: "30px" }}
        >
          Ruang Curhat
        </h1>
        <div className="flex-item">
          <ChatRoomFilter />
        </div>
        <div className="flex-item">
          <ChatRoomTable />
        </div>
      </div>
    </div>
  </AdminChatRoomProvider>
)

export default ChatRoom
