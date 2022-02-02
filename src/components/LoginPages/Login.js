import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

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
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWqVKCGShSv9zDZlrCPG3LHh56dLtapnk";

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
            alert("you logged in Successfully");
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
          console.log(data.idToken);

          navigate("/complete");
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
          <h1>Login</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="login"
              type="email"
              required
              value={email}
              onChange={emailHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="login"
              type="password"
              value={password}
              onChange={passwordHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              className="login"
              type="password"
              value={confirmPass}
              onChange={confirmPassHandler}
              required
            />
          </div>
          <div className="button">
            <button className="btn1">
              <Link to="/enterEmail">Forgot Password</Link>
            </button>
            <button className="btn2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

/* <button type="button" className="login"></button> */

// const verifyEmail = () => {
//   fetch(
//     "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDWqVKCGShSv9zDZlrCPG3LHh56dLtapnk",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         requestType: "VERIFY_EMAIL",
//         idToken: token,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     .then((data) => {
//       console.log(data.email);
//       if (data.email.requestType === "VERIFY_EMAIL") {
//       }
//       setVerify(true);
//     });
// };
