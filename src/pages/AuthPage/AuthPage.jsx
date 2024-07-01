import React, { useContext, useState } from "react";
import { auth, app } from "../../config/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { useNavigate } from "react-router";

import "./AuthPage.css";
import { AuthContext } from "../../context/AuthContext";

const AuthPage = () => {
  const { isNew, setUser } = useContext(AuthContext);
  const navigate = useNavigate("");

  const [action, setAction] = useState(isNew ? "Register" : "Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNew) {
      setAction("Register");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          setUser(user);
          onAuthStateChanged((user) => {
            if (!user) {
              window.location.href = "/login";
            }
          });
          navigate("/dashboardPage");
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    } else {
      setAction("Login");
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const auth = getAuth();
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
            } else {
              // User is signed out
              // ...
            }
          });
          navigate("/dashboardPage");
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  return (
    <div className="container-signin">
      <section className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-control">
            <input
              type="email"
              placeholder="Enter Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-control">
            <input
              type="password"
              placeholder="Enter Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            name="submit"
            className="input-submit"
            value={action}
          >
            {action}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AuthPage;
