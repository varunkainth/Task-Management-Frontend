import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import HomePage from "./pages/Home/home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes >
         <Route path="/" element={ <HomePage />}/>
         <Route path="/login" element={ <Login />}/>
         <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
