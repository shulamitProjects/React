import { Button } from "@mui/base";
import UserContext from "../../components/User/UserContext";
import { useContext, useEffect, useState } from "react";
import { getallService } from "../../services";
import UserProvider from "../../components/User/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import Basket from "./Basket";
const Userstore = () => {
  const { user } = useContext(UserContext);////
  const navigate = useNavigate();
  const token = user?.userToken
  const username = user?.name

  const [p, setp] = useState([]);

  useEffect(() => {
    get()
  }, [])

  const get = () => {
    getallService().then((response) => setp(response.data)).catch(e => console.log(e))
  }

  const createchar = (gameID) => {
    //  var token = localStorage.getItem('userToken');
    var myToken = "Bearer " + JSON.parse(token).accessToken/////
    var myHeaders = new Headers();
    myHeaders.append("Authorization", myToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "game": gameID._id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:7940/api/basket", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    alert(`${user?.name} ,this game add to your cart🛒`)
  }

  const cart = () => {
    navigate("/basket",
      //  {state:{productArray: p}}
    )

  }


  return (<>
    <div>Hello to {username}</div>
    <button onClick={() => cart()}>cart🛒</button>
    {p && p.map(i => {
      return (
        <div className="border" key={i._id}>
          <img src={i.name && `/${i.picture}`} style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}></img>
          <div>{i.price + " | " + i.price + "$"}</div>
          <Button onClick={() => createchar(i)}>add to cart</Button>

        </div>
      )
    })
    }

  </>)
}
export default Userstore;