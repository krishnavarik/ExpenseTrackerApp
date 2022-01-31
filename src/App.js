import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./components/LoginPages/SignUp";
import Login from "./components/LoginPages/Login";
import Form from "./components/LoginPages/Form";
import EnterEmail from "./components/LoginPages/EnterEmail";
import Comp from "./components/Header/Comp";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/complete" element={<Comp />}></Route>
        <Route path="/completenow" element={<Form />}></Route>
        <Route path="/enterEmail" element={<EnterEmail />}></Route>
      </Routes>
    </>
  );
}

export default App;
