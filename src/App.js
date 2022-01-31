import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Form from "./components/pages/Form";
import EnterEmail from "./components/pages/EnterEmail";

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
      </Routes>
    </>
  );
}

export default App;
