import { useState } from "react";
import styles from "./Register.module.css";
import { registerService } from "../../services";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    registerService({ name, email, phone, userName, password })
    navigate("/login")
      

  };

  return (
    <div className={styles.registerWrapper}>
      <input
        placeholder="First name"
        onChange={(e) => setname(e.target.value)}
      />
 
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      <input
        placeholder="User name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={()=>register()}>Register</button>
    </div>

  );
};

export default Register;
