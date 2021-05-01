import logo from './logo.svg';
import './App.scss';
import ProfileSection from "./components/ProfileSection/ProfileSection";
import SearchBar from "./components/SearchBar/SearchBar";
import ChatCardListing from "./components/ChatCardListing/ChatCardListing";
import ChatSection from "./components/ChatSection/ChatSection";
import Login from "./components/Login/Login";

import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      {true ?
        <Login /> :
        <div className="App">
          <div className="user-left-side">
            <ProfileSection />
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
