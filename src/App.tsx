import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes >
         <Route path="/" element={ <Login />}/>
         <Route path="/login" element={ <Login />}/>
         <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
