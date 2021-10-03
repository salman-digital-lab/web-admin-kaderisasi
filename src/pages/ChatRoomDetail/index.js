import React from "react"
import "../../assets/scss/DetailAdmin.scss"
import DetailChatRoom from "./components/ChatRoomDetail"
import AdminChatRoomProvider from "../../context/AdminChatRoomContext"

const ChatRoomDetail = () => (
  <AdminChatRoomProvider>
    <div className="container-detail-admin">
      <DetailChatRoom />
    </div>
  </AdminChatRoomProvider>
)

export default ChatRoomDetail
