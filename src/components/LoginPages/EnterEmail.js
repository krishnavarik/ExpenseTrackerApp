import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./EnterEmail.css";
const EnterEmail = () => {
  const [email, setEmail] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDWqVKCGShSv9zDZlrCPG3LHh56dLtapnk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Link has been sent to you");
          return res.json();
        } else {
          return res.json().then((data) => {
            alert("please enter valid email");
          });
        }
      })
      .then((data) => {
        console.log(data);

        setLoading(false);
        navigate("/login");
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="enterEmail">
          <div className="label">
            <label htmlFor="email">
              Enter the email with which you have Registered.
            </label>
          </div>
          <div className="input">
            <input
              type="email"
              placeholder="enter your email "
              onChange={emailHandler}
            />
          </div>
          {!loading && <button className="send">Send Link</button>}
          {loading && <p>Loading....</p>}
        </div>
      </form>
    </div>
  );
};

export default EnterEmail;
