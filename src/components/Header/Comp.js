import { Link } from "react-router-dom";
import React from "react";
import './Comp.css'
import ExpenseItems from "../Expenses/ExpenseItems";
function Comp() {
  return (
    <div>
      <header className="head">
        <h2>Welcome to ExpenseTracker</h2>
        <p>
          your profile is not complete,
          <Link to="/completenow">Complete Now</Link>
        </p>
      </header>
      <div>
       <ExpenseItems></ExpenseItems>
      </div>
    </div>
  );
}

export default Comp;
