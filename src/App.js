import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./components/Pages/SignUp";
import Login from "./components/Pages/Login";
import Form from "./components/Pages/Form";
import EnterEmail from "./components/Pages/EnterEmail";
import Password from "./components/Pages/Password";
// import Logout from "./components/Pages/Logout";

import React, { useContext } from "react";
import { AuthContext } from "./components/Store/auth-context";
import Comp from "./components/Header/Comp";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token);
  // const isLogged = authCtx.isLoggedIn;
  // console.log(isLogged);

  return (
    <>
      <Header></Header>

      <Routes>
        <Route exact path="/signup" element={<SignUp />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/complete" element={<Comp />}></Route>
        <Route path="/completenow" element={<Form />}></Route>
        <Route path="/enterEmail" element={<EnterEmail />}></Route>
        <Route path="/newPassword" element={<Password />}></Route>
      </Routes>
    </>
  );
}

export default App;
