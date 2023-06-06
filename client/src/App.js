import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Messages from "./messages/Messages";
import NotFound from "./special pages/notFound";
import io from 'socket.io-client';

export var socket = io( process.env.REACT_APP_IO_SOCKET);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;