import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from "react-router-dom";
import ChatHeader from "../ChatHeader/ChatHeader";
import Chat from "../Chat/Chat";
import ChatForm from "../ChatForm/ChatForm";
import './ChatSection.scss';
import AuthContext from "../../context/AuthContext";
import SocketContext from "../../context/SocketContext";
import chatsReducer from "../../reducers/chatsReducer";
//API
import { BASE_URL, CHATS, USER, CHECK_IS_OFFLINE } from "../../utils/apiEndpoints";
import { postRequest, getRequest } from "../../utils/apiRequest";


const initialState = []

const ChatSection = ({ updateRecentMsg, recentMsg, recentOfflineFriend, recentOnlineFriend, }) => {

    const user = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const [error, setError] = useState(null);
    const [IsChatLoading, setIsChatLoading] = useState(false);
    const [friendInfo, setFriendInfo] = useState({});
    const [chats, chatsDispatch] = useReducer(chatsReducer, initialState)

    const params = useParams()
    const userId = params.id

    const CheckIfUserOffline = async () => {
        if (userId !== undefined) {
            const response = await getRequest(`${BASE_URL}${CHECK_IS_OFFLINE}/${userId}`)
            if (response.error) {
                setError(response.error)
                return false
            }
            return response
        }
    }
    const getData = async () => {
        await getFriendInfo();
        await getChats()

    }
    useEffect(async () => {
        const unsubscribe = getData(); //subscribe
        return () => {
            chatsDispatch({ type: "RESET_CHATS", payload: [] })
        };
    }, [userId]);
    useEffect(() => {
        if (IsChatLoading && recentMsg && userId === recentMsg.senderId) {
            chatsDispatch({ type: "CHATS", payload: [recentMsg] });
        }

    }, [recentMsg, recentMsg.time]);
    useEffect(() => {
        if (userId === recentOnlineFriend.sessionId) {
            setFriendInfo({ ...friendInfo, isOnline: true });
        }
    }, [recentOnlineFriend]);
    useEffect(() => {
        if (userId === recentOfflineFriend.sessionId) {
            setFriendInfo({
                ...friendInfo,
                isOnline: false,
                updatedAt: recentOfflineFriend.time,
            });
        }
    }, [recentOfflineFriend]);
    const getFriendInfo = async () => {
        if (userId !== undefined) {
            const response = await getRequest(`${BASE_URL}${USER}/${userId}`)
            if (response.error) {
                setError(response.error)
                return false
            }
            const userOfflineResponse = await CheckIfUserOffline(response)

            let userAvailability = {
                isOnline: false,
            }
            if (!userOfflineResponse) {
                userAvailability.isOnline = true
                userAvailability["updatedAt"] = userOfflineResponse.time
            }
            setFriendInfo({ ...response, ...userAvailability })

        }
    }
    const getChats = async () => {
        const response = await postRequest(`${BASE_URL}${CHATS}`, {
            senderId: user.sessionId,
            recieverId: userId
        })
        if (response.error) {
            setError(response.error)
            return false
        }
        chatsDispatch({ type: "CHATS", payload: response })
        setIsChatLoading(true)
        return response
    }
    const sendMsg = async (value, type, theme) => {
        socket.emit(
            "send-msg",
            {
                senderId: user.sessionId,
                receiverId: userId,
                msg: value,
                type,
                theme,
            },
            (cbData) => {

                updateRecentMsg(cbData);
                chatsDispatch({ type: "CHATS", payload: [cbData] });
            }
        );
        let data = await getChats()
        console.log(data)
    };
    socket.on('receive-msg', (data) => {
        console.log("new message", data)
        chatsDispatch({ type: "CHATS", payload: [data] });
    })

    const sendTyping = (value) => {
        socket.emit(
            "user-typing",
            {
                senderId: user.sessionId,
                receiverId: userId,
                msg: value,
            },
            (cbData) => {
                // console.log("typing")
            }
        );
    };
    return (
        <div className='chat-side'>
            <ChatHeader friendInfo={friendInfo} />
            <Chat sessionId={userId} friendName=
                {friendInfo && friendInfo.name}
                chats={chats} />
            <ChatForm className='chat-form-end' sendMsg={sendMsg} sendTyping={sendTyping} />
        </div>
    )
}

export default ChatSection
