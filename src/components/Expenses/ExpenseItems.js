import React, { useEffect, useState } from "react";
import "./ExpenseItems.css";
function ExpenseItems() {
  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");

  const [expense, setExpense] = useState([]);

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const AddExpenseHandler = (event) => {
    event.preventDefault();
    const Expense = {
      price: price,
      description: description,
      title: title,
      id: Math.random(),
    };

    fetch(
      "https://expensetrackerapp-a816d-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
          price: price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("your information stored in Database");
          return res.json();
        } else {
          return res.json().then((data) => {
            alert("failed to store data in database");
          });
        }
      })
      .then((data) => {
        setExpense([Expense, ...expense]);
      });
  };

  useEffect(() => {
    fetch(
      "https://expensetrackerapp-a816d-default-rtdb.firebaseio.com/expenses.json"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            alert(data.error);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const storedItems = [];

        for (const key in data) {
          storedItems.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setExpense(storedItems);
      });
  }, []);

  return (
    <div>
      <form onSubmit={AddExpenseHandler}>
        <div className="inputs">
          <label htmlFor="number">Price: </label>
          <input
            className="number"
            type="number"
            onChange={priceHandler}
            value={price}
          />
        </div>
        <div className="inputs">
          <label htmlFor="text">Description:</label>
          <input
            className="number2"
            type="text"
            onChange={descriptionHandler}
            value={description}
          />
        </div>
        <div className="title">
          <p>Title:</p>
          <select value={title} onChange={titleHandler} className="select">
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
            <option value="book">Books</option>
          </select>
        </div>
        <button className="expenseBtn" type="submit">
          Add Expense
        </button>
      </form>

      <section className="items">
        <ul>
          {expense.map((item) => {
            return (
              <li key={item.id} className="item">
                <div className="span">
                  <span>{item.title}</span>
                </div>
                <div className="span">
                  <span>{item.description}</span>
                </div>
                <div className="span">
                  <span>{item.price}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default ExpenseItems;
