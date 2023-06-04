import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./client/login/Login";
import Register from "./client/register/Register";
import Messages from "./client/messages/Messages";
import NotFound from "./client/special pages/notFound";

export const serverPath = "http://localhost:5000/api/";

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