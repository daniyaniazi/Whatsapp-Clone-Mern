import logo from './logo.svg';
import './App.scss';
import ProfileSection from "./components/ProfileSection/ProfileSection";
import SearchBar from "./components/SearchBar/SearchBar";
import ChatCardListing from "./components/ChatCardListing/ChatCardListing";
import ChatSection from "./components/ChatSection/ChatSection";

function App() {
  return (
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
  );
}

export default App;
