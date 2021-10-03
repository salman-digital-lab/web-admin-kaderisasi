import React from "react"
import "../../assets/scss/Member.scss"
// import ChatRoomFilter from "./components/ChatRoomFilter"
import ChatRoomTable from "./components/ChatRoomTable"
import AdminChatRoomProvider from "../../context/AdminChatRoomContext"

const ChatRoom = () => (
  <AdminChatRoomProvider>
    <div className="userlist">
      <div className="flex-container">
        {/* <div className="flex-left"> */}
        <ChatRoomTable />
        {/* </div> */}
        {/* <div className="flex-right">
          <ChatRoomFilter />
        </div> */}
      </div>
    </div>
  </AdminChatRoomProvider>
)

export default ChatRoom
