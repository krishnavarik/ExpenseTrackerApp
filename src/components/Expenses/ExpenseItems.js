import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ExpenseItems.css";

import { expenseActions } from "../store/expenseReducer";
import Premium from "../LoginPages/Premium";

function ExpenseItems() {
  const TotalExpense = useSelector((state) => state.expense.totalexpense);

  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");

  const [expense, setExpense] = useState([]);

  const [edit, setEdit] = useState(false);

  const [editId, setEditId] = useState("");

  const [premium, setPremium] = useState(false);
  const [premiumBtn, setPremiumBtn] = useState(false);
  const [premiumfeatures, setPremiumfeatures] = useState(false);

  const dispatch = useDispatch();

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
    };

    if (edit) {
      fetch(
        `https://expensetrackerapp-a816d-default-rtdb.firebaseio.com/expenses/${editId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            price: price,
            description: description,
            title: title,
          }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        if (res.ok) {
          alert("you edited successfully");
        } else {
          return res.json().then((data) => {
            console.log(data.error);
          });
        }
      });
    } else {
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
          dispatch(expenseActions.addingExpense(Expense));
          dispatch(expenseActions.totalExpense(Expense.price));
        });
    }

    setTitle("");
    setPrice("");
    setDescription("");
  };

  useEffect(() => {
    if (TotalExpense >= 10000) {
      setPremium(true);
      setPremiumBtn(true);
    } else {
      setPremium(false);
      setPremiumBtn(false);
    }
  }, [TotalExpense]);

  useEffect(() => {
    fetch(
      "https://expensetrackerapp-a816d-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
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
          dispatch(expenseActions.totalExpense(data[key].price));
        }
        setExpense(storedItems);
        dispatch(expenseActions.expense(storedItems));
      
      });
  }, [dispatch]);

  const deleteHandler = (id, price) => {
    console.log(id);
    dispatch(expenseActions.afterDeleteExpense(price));

    const updated = expense.filter((item) => {
      return item.id !== id;
    });

    setExpense(updated);

    fetch(
      `https://expensetrackerapp-a816d-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("item deleted");
        return res.json();
      } else {
        return res.json().then((data) => {
          console.log(data);
        });
      }
    });
  };

  const editHandler = (id) => {
    setEdit(true);

    setEditId(id);

    fetch(
      `https://expensetrackerapp-a816d-default-rtdb.firebaseio.com/expenses/${id}.json`,
      { method: "GET" }
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
        setDescription(data.description);
        setPrice(data.price);
        setTitle(data.title);
      });
  };

  const activatePremiumHandler = () => {
    setPremiumfeatures(true);
  };

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
            required
          />
        </div>
        <div className="inputs">
          <label htmlFor="text">Description:</label>
          <input
            className="number2"
            type="text"
            onChange={descriptionHandler}
            value={description}
            required
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
                <div>
                  <button
                    onClick={() => {
                      deleteHandler(item.id, item.price);
                    }}
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      editHandler(item.id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <div className="total">
        <h2>Total Expense: ${TotalExpense} </h2>
      </div>
      {/* {premium && <button className="premium">Active Premium</button>} */}
      {premiumBtn && premium && (
        <button type="button" onClick={activatePremiumHandler}>
          Activate Premium
        </button>
      )}
      {premiumfeatures && <Premium />}
    </div>
  );
}

export default ExpenseItems;
