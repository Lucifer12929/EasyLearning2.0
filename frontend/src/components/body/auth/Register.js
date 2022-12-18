import React, { useState } from "react";
import { Image, Input } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiUser, AiFillLock, MdEmail } from "react-icons/all";
import "./Login.css"
import axios from "axios";
import Logo from "./img/registe.svg";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { useDispatch } from "react-redux";
import {
  isEmpty,
  isEmail,
  isMatch,
  isLength,
} from "../../utils/validation/Validation";
import { Checkbox } from "antd";
import { useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  description: "",
  headline: "",
  err: "",
  success: "",
};

const Register = () => {
  const { TextArea } = Input;
  const [isTeacher, setisTeacher] = useState(false);
  const [formDataUser, setFormDataUser] = useState(initialState);
  const dispatch = useDispatch();

  const {
    name,
    email,
    password,
    cf_password,
    description,
    headline,
    err,
    success,
  } = formDataUser;
  const handleChange = (e) => {
    //place of do that onChange={(e) => setEmail(e.target.value) for each field (input) we do that
    setFormDataUser({
      ...formDataUser,
      [e.target.name]: e.target.value,
      err: "",
      success: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //default action that belongs to the event will not occur.
    if (isEmpty(name) | isEmpty(password))
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

    if (isLength(password))
      return setFormDataUser({
        ...formDataUser,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setFormDataUser({
        ...formDataUser,
        err: "Password did not match",
        success: "",
      });
    try {
      if (isTeacher) {
        const res = await axios.post("/user/register", {
          name,
          email,
          password,
          isTeacher,
          description,
          headline,
        });
        setFormDataUser({ ...formDataUser, err: "", success: res.data.msg });
      } else {
        const res = await axios.post("/user/register", {
          name,
          email,
          password,
        });
        setFormDataUser({ ...formDataUser, err: "", success: res.data.msg });
      }
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
    if (this.value === "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((inputa) => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });

  useEffect(() => {
    console.log(isTeacher);

    return () => {};
  }, [isTeacher]);

  return (
   <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form" onSubmit={handleSubmit}>
            <h2 class="title">Sign in</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input  name="name"
                    value={name}
                    type="text"
                    className="input"
                    placeholder="Enter Your Name"
                    onChange={handleChange} />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input  
                    name="email"
                    value={email}
                    type="text"
                    className="input"
                    placeholder="Enter Your Email"
                    onChange={handleChange} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input  name="password"
                    value={password}
                    type="password"
                    className="input"
                    placeholder="Enter Password"
                    onChange={handleChange} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input  name="cf_password"
                    value={cf_password}
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                    onChange={handleChange} />
            </div>
            <input type="submit" value="Register" class="btn solid" />
            <Checkbox onChange={(e) => setisTeacher(e.target.checked)}>
                Sign me up as a teacher
              </Checkbox>
              {isTeacher && (
                <div className="teacherdetails">
                  Description :{" "}
                  <TextArea
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    value={description}
                    placeholder="write about few lines"
                  />
                  Headline :{" "}
                  <TextArea
                    rows={2}
                    name="headline"
                    onChange={handleChange}
                    value={headline}
                    maxLength="30"
                    placeholder="give yourself a headline"
                  />
                </div>
              )}
          </form>
         
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Already a User?</h3>
            <p>
            Let's proceed further by signing in to Easy Learning.
            </p>
            <Link className="register" to="/login">
            <button class="btn transparent" id="sign-up-btn">
              Login
            </button>
                  
                </Link>
            {/* <button class="btn transparent" id="sign-up-btn">
              Sign up
            </button> */}
          </div>
          <img src={Logo} class="image" alt="" />
        </div>
       
      </div>
    </div>
    </>
  );
};

export default Register;
