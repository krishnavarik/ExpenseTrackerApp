import React, { useState } from "react";
import "./Form.css";

import { useNavigate } from "react-router";

function Form() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const urlHandler = (event) => {
    setUrl(event.target.value);
  };

  const token = localStorage.getItem("idToken");
  console.log(token);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredFullName = name;
    const enteredURL = url;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDWqVKCGShSv9zDZlrCPG3LHh56dLtapnk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: enteredFullName,
          photoUrl: enteredURL,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("your profile updated successfully");
        return res.json().then((data) => {
          console.log(data);

          navigate("/");
        });
      } else {
        return res.json().then((data) => {
          let errorMsg = "sorry Profile not Updated";
          alert(errorMsg);
        });
      }
    });

    console.log(enteredFullName, enteredURL);
  };

  return (
    <div className="profile">
      <form onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="name">Full Name:</label>
          <input type="name" value={name} onChange={nameHandler} required />
        </div>

        <div className="input">
          <label htmlFor="number">Url:</label>
          <input type="text" value={url} onChange={urlHandler} required />
        </div>

        <button type="submit" className="update">
          Update
        </button>
      </form>
    </div>
  );
}

export default Form;
