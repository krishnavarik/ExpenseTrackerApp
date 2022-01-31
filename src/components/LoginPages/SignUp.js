import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import "./SignUp.css";
import { AuthContext } from "../Store/auth-context";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPassHandler = (event) => {
    setConfirmPass(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWqVKCGShSv9zDZlrCPG3LHh56dLtapnk";

    if (password === confirmPass) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            alert("you Signed Up in Successfully");
            return res.json();
          } else {
            return res.json().then((data) => {
              //show an error modal
              let errorMessage = "Authentication failed";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          // console.log(data);
          // console.log(data.idToken);
          authCtx.login(data.idToken);
          navigate("/login");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("password didn't match");
    }

    setEmail("");
    setPassword("");
    setConfirmPass("");
  };
  // console.log(token);

  return (
    <div className="container">
      <div className="form1">
        <form onSubmit={submitHandler} className="form">
          <h1>SignUp</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="sign"
              type="email"
              required
              value={email}
              onChange={emailHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="sign"
              type="password"
              value={password}
              onChange={passwordHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              className="sign"
              type="password"
              value={confirmPass}
              onChange={confirmPassHandler}
              required
            />
          </div>
          <button className="btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
