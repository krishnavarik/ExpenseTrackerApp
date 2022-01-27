import { Link } from "react-router-dom";
import React from "react";

function Comp() {
  return (
    <div>
      <h2>Welcome to ExpenseTracker</h2>
      <p>
        your profile is not complete,{" "}
        <Link to="/completenow">Complete Now</Link>
      </p>
    </div>
  );
}

export default Comp;
