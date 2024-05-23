import { useContext, useEffect, useState } from "react";
import UserContext from "../../components/User/UserContext";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React from 'react';
import { useLocation } from "react-router-dom";

const Basket = () => {
  const [b, setb] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);////
  const token = user?.userToken;

  const location = useLocation(); // קבלת ה-location הנוכחי
  // const p = location.state. // שליפת ה-props מה-location
  // const p = props.data // 


  useEffect(() => {
    getbasket()
  }, [b])

  function getbasket() {
    debugger;

    var myHeaders = new Headers();
    const t = localStorage.getItem(`userToken`)
    var myToken = "Bearer " + JSON.parse(t).accessToken/////
    myHeaders.append("Authorization", myToken);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    var bas = fetch("http://localhost:7940/api/basket", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log({
          result

        });
        setb(result)
      })
      .catch(error => console.log('error', error));
  }

  const remove = (i) => {
    var myHeaders = new Headers();
    const t = localStorage.getItem(`userToken`)
    var myToken = "Bearer " + JSON.parse(t).accessToken/////
    myHeaders.append("Authorization", myToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": i
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:7940/api/basket", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    getbasket()
  }
  return (<>
    {b && b.map((item, i) => {
      return (
        <div className="border" key={i}>
          <img src={"http://localhost:3001/" + item.game.picture}></img>
          {/* <img src={item.game?.pictuer} style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}></img> */}

          <div>{"  |  " + item.game.price + "$"}</div>

          <button onClick={() => remove(item)}>remove</button>

        </div>

      )
    })}

  </>)

}

export default Basket
