import React from 'react'
import ChatHeader from "../ChatHeader/ChatHeader";
import Chat from "../Chat/Chat";
import ChatForm from "../ChatForm/ChatForm";

const ChatSection = () => {
    return (
        <div>
            <ChatHeader />
            <Chat />
            <ChatForm />
        </div>
    )
}

export default ChatSection
