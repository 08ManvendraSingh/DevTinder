import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Error from "./components/Error";
import NotFoundPage from "./components/NotFoundPage";
import Requests from "./components/Requests";
import Notification from "./components/Notification";
import Message from "./components/Message";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((store) => store.user);

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Landing />} />
             {/* Redirect logged-in users trying to access Login/Signup */}
             {!user ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Navigate to="/profile" />} />
                <Route path="/signup" element={<Navigate to="/profile" />} />
              </>
            )}
            <Route element={<Home />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/connection" element={<Connections />}></Route>
              <Route path="/request" element={<Requests />}></Route>
              <Route path="/notification" element={<Notification />}></Route>
              <Route path="/message" element={<Message />}></Route>
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
