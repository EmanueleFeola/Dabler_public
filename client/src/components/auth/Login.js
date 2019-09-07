import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import Button from "@material-ui/core/Button";
import "../../style/style.css";

const Login = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { isAuthenticated, login, error, clearErrors } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/modify"); // redirect to Dashboard
    }

    if (error === "Invalid credentials") {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, props.history, isAuthenticated]);

  const [user, setUser] = useState({
    name: "",
    password: ""
  });

  const { name, password } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    if (name === "" || password === "") {
      setAlert("Please fill in all fields");
    } else {
      login({
        name,
        password
      });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className='formContainer'>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              name='name'
              required
              placeholder='Username'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={onChange}
            />
          </div>
          <Button
            variant='outlined'
            type='submit'
            style={{ borderColor: "white", color: "white", margin: "20px" }}
          >
            <h3 className='title'>Login</h3>
          </Button>
        </form>
      </div>
      <Button
        variant='outlined'
        style={{
          borderColor: "black",
          color: "black",
          margin: "20px",
          fontFamily: "lightRoboto"
        }}
      >
        <Link to='/'>
          <h3>Back to Home</h3>
        </Link>
      </Button>
    </div>
  );
};

export default Login;
