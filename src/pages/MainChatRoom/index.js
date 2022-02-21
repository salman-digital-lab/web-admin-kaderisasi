import React from "react"
import "../../assets/scss/Member.scss"
import ChatRoomFilter from "./components/ChatRoomFilter"
import ChatRoomTable from "./components/ChatRoomTable"
import AdminChatRoomProvider from "../../context/AdminChatRoomContext"

const ChatRoom = () => (
  <AdminChatRoomProvider>
    <div className="userlist">
      <div className="container">
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
