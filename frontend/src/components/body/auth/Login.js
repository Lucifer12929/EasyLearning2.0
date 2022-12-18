import React, { useState } from "react";
import { Image, Form, Button } from "antd";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FiUser, AiFillLock } from "react-icons/all";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import "./Login.css"
import Logo from "./img/loginnew.svg";
// import "./auth.css";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { BiRightArrowAlt } from "react-icons/all";
import { isEmpty, isEmail } from "../../utils/validation/Validation";
const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};



const Login = () => {
  const [formDataUser, setFormDataUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, password, err, success } = formDataUser;
  const handleChangel = (e) => {
    //place of do that onChange={(e) => setEmail(e.target.value) for each field (input) we do that
    setFormDataUser({
      ...formDataUser,
      [e.target.name]: e.target.value,
      err: "",
      success: "",
    });
  };
  const handleSubmitl = async (e) => {
    e.preventDefault();
    if (isEmpty(email) | isEmpty(password))
      return setFormDataUser({
        ...formDataUser,
        err: "Please fill in all fields",
        success: "",
      });

    if (!isEmail(email))
      return setFormDataUser({
        ...formDataUser,
        err: "Invalid email",
        success: "",
      });
    try {
      const res = await axios.post("/user/login", { email, password });
      setFormDataUser({ ...formDataUser, err: "", success: res.data.msg }); // true
      dispatch(dispatchLogin());
      localStorage.setItem("firstLogin", true);

      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setFormDataUser({
          ...formDataUser,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  // sign_up_btn.forEach((signup)=>{signup.addEventListener("click", () => {
  //    container.classList.add("sign-up-mode");
  //   })
  // });
  inputs.forEach((inputa) => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });

  

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      
      <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form" onSubmit={handleSubmitl}>
            <h2 class="title">Sign in</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input name="email"
                    value={email}
                    type="text"
                    className="input"
                    placeholder="Email"
                    onChange={handleChangel}
                    required />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input  name="password"
                    value={password}
                    type="password"
                    className="input"
                    placeholder="Password"
                    onChange={handleChangel}
                    required />
            </div>
            <input type="submit" value="Login" class="btn solid" />
           
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
             Join us and build your success on your own.
            </p>
            <Link className="register" to="/register">
            <button class="btn transparent" id="sign-up-btn">
              Register
            </button>
                </Link>
            
          </div>
          <img src={Logo} class="image" alt="" />
        </div>
       
      </div>
    </div>
    </>
  );
};

export default Login;
