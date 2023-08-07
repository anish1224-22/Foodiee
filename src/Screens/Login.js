import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/LoginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });
    const json =await response.json();
        console.log(json);
        if(!json.success)
        {
            alert("ENTER VALID CREDENTIALS");
        }
        else{
          localStorage.setItem("userEmail",credentials.email)
          localStorage.setItem("authToken",json.authToken)
          console.log(json.authToken);
          window.location.href = "/";
        }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
    <div className="bg-success">
      <div className="container bg-success">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" style={{ color: "white" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              style={{ width: "40%",borderColor: "grey" }}
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-white">
              (Must be a valid email id)We'll never share your email with anyone
              else.
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" style={{ color: "white" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              style={{ width: "40%" }}
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary m-3 bg-cyan">
            Submit
          </button>
          <Link to="/CreateUser" className="btn btn-primary m-3 bg-danger">
            New Here
          </Link>
        </form>
      </div>
      </div>
    </>
  );
}
