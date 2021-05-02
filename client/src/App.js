import { useReducer, useState, useEffect } from 'react'
import './App.scss';
import ProfileSection from "./components/ProfileSection/ProfileSection";
import SearchBar from "./components/SearchBar/SearchBar";
import ChatCardListing from "./components/ChatCardListing/ChatCardListing";
import ChatSection from "./components/ChatSection/ChatSection";
import Login from "./components/Login/Login";
import { Fragment } from 'react';
import io from "socket.io-client";
//API
import { getRequest, postRequest } from "./utils/apiRequest";
import { BASE_URL, LOGIN, USER_LIST } from "./utils/apiEndpoints";
import { Cookies, useCookies } from "react-cookie";
//Context
import AuthContext from "../src/context/AuthContext";
import SocketContext from "../src/context/SocketContext";
//Reducers
import friendListRedicer from "./reducers/friendListRedicer";
// Creating Socket
const socket = io.connect("http://localhost:2000/", {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
})
const initialState = {}

function App() {
  const [Cookies, setCookies, removeCookies] = useCookies(["whatsappclone"])
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    return Cookies.user
  });
  const [recentMsg, setrecentMsg] = useState({});
  const [recentOnlineFriend, setrecentOnlineFriend] = useState({});
  const [recentOfflineFriend, setrecentOfflineFriend] = useState({});
  const [friendList, friendslistsDispatch] = useReducer(friendListRedicer, initialState)

  const joinUser = (user) => {
    let initData = {
      createdAt: user.createdAt,
      name: user.name,
      profileImg: user.profileImg,
      sessionId: user.sessionId,
      updatedAt: user.updatedAt,
      _id: user._id
    }
    //join user
    socket.emit('join-user', initData, (cbData) => {
      console.log("New Notifification:", cbData)
    })

  }
  const onlineOfflineUser = () => {
    socket.on('new-online-user', (data) => {
      friendslistsDispatch({ type: "NEW_FRIEND", payload: data })
      setrecentOnlineFriend(data)
    })

    socket.on('new-offline-user', (data) => {
      setrecentOfflineFriend(data)
    })
  }

  const getFriendsList = async (user) => {
    const response = await getRequest(`${BASE_URL}${USER_LIST}/${user.sessionId}`)
    console.log(response)
    if (response.error) {
      console.log(response.error)
      setError(response.error)
      return false
    }
    friendslistsDispatch({ type: "FRIENDS", payload: response })
    onlineOfflineUser()
  }


  const handleLogin = async (userData, error) => {
    const formData = new FormData();
    //if file exist

    if (userData.profileImg === null) {
      setError("Please Upload an Image")
      alert("Please Upload an Image")
    }
    if (userData.profileImg !== null) {
      formData.append("profileImg", userData.profileImg, userData.profileImg.name)
    }
    formData.append("payload", JSON.stringify({ name: userData.name }))
    // console.log("FORM DAATA", formData)
    const response = await postRequest(`${BASE_URL}${LOGIN}`, formData)
    if (response.error) {
      setError(response.error)
      return false
    }
    console.log(response)
    setCookies("user", response)
    setUser(response)
    joinUser(response)
    getFriendsList(response)
  }

  const handleLogout = () => {
    removeCookies("user");
    setUser(null)
  }

  const updateRecentMsg = (data) => {
    friendslistsDispatch({ type: "RECENT_MSG", payload: data })
  }
  socket.on('recieve-msg', (data) => {
    console.log(data)
    updateRecentMsg(data)
    setrecentMsg(data)
  })

  socket.on('user-typing', (data) => {
    console.log(data)
    updateRecentMsg(data)
  })

  useEffect(() => {
    if (user && user.sessionId) {
      joinUser(user)
      getFriendsList(user)
    }
  }, []);
  return (
    <Fragment>
      {!(user && user.sessionId) ?
        <Login handleLogin={handleLogin} error={error} /> :
        (<AuthContext.Provider value={user}>
          <SocketContext.Provider value={socket}>
            <div className="App">
              <div className="user-left-side">
                <ProfileSection handleLogout={handleLogout} />
                <SearchBar />
                <ChatCardListing friendList={friendList} />
              </div>
              <div className="chat-right-side">
                <ChatSection />
              </div>
            </div>
          </SocketContext.Provider>
        </AuthContext.Provider>)
      }
    </Fragment>
  );
}

export default App;
