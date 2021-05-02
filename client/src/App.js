import { useState } from 'react'
import './App.scss';
import ProfileSection from "./components/ProfileSection/ProfileSection";
import SearchBar from "./components/SearchBar/SearchBar";
import ChatCardListing from "./components/ChatCardListing/ChatCardListing";
import ChatSection from "./components/ChatSection/ChatSection";
import Login from "./components/Login/Login";
import { Fragment } from 'react';

import { postRequest } from "./utils/apiRequest";
import { BASE_URL, LOGIN } from "./utils/apiEndpoints";
import { Cookies, useCookies } from "react-cookie";



function App() {
  const [Cookies, setCookies, removeCookies] = useCookies(["whatsappclone"])
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    return Cookies.user
  });

  const handleLogin = async (userData) => {
    const formData = new FormData();
    //if file exist
    if (userData.profileImg) {
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
  }

  const handleLogout = () => {
    removeCookies("user");
    setUser(null)
  }
  return (
    <Fragment>
      {!(user && user.sessionId) ?
        <Login handleLogin={handleLogin} /> :
        <div className="App">
          <div className="user-left-side">
            <ProfileSection handleLogout={handleLogout} />
            <SearchBar />
            <ChatCardListing />
          </div>
          <div className="chat-right-side">
            <ChatSection />
          </div>
        </div>
      }
    </Fragment>
  );
}

export default App;
