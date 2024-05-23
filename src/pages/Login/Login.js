import { useContext, useState } from "react";
import UserContext from "../../components/User/UserContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { getRoles } from "@testing-library/react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const login = () => {
    debugger
    if (!userName || !password) {
      alert("username or password are reqiure")
      return;
    }
    if (!userName || !password) {
      alert("username or password are reqiure")
      return;
    }
    userLogin({ userName, password })///
      .then(() => {
        if(password==1 && userName==1)
        navigate("/store");
        else
        navigate("/store2");

        
      })
      .catch((error) => {
        if (error.message === "unknown user") {
          navigate("/register");
        }
      });
  };

  return (
    <div className={styles.loginWrapper}>
      <input
        placeholder="User name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => login()}>Login</Button>
    </div>
  );
};

export default Login;
