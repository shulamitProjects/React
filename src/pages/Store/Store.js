
import "./store.css"; // Import the CSS file
import { useEffect } from "react";
import { Button, Dialog, colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getallService } from "../../services";
function Store() {
  const navigate = useNavigate()
  const [s, sets] = useState([]);

  var name, price, description, picture, password,only

  const [products, setproducts] = useState([]);
  const [b, setb] = useState();
  var ind = 0

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = () => {
    getallService().then((response) => setproducts(response.data))
      .catch(e => console.log(e))
  }
  const clear = () => {
    name = description = picture = ''
    price =password= 0
  }

  const remove = (p) => {
    var myHeaders = new Headers();
    var raw = "";
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://localhost:7940/api/games/${p._id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    getProduct()
  }

  const newGame = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": name,
      "password": password,
      "description": description,
      "price": price,
      "picture": picture,
      "only":only

    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:7940/api/games", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    document.getElementById("newGameDialog").close()

    getProduct()
    
    clear()
  }
  const dontSave = () => {
    navigate("/Store")
    document.getElementById("newGameDialog").close()
    clear()
  }

  const a = () => {
    navigate("/store2")
  }

  const window = (i) => {
    navigate("/window", { state: i })
  }

  return (
    <div className="product">
      <button onClick={() => a()}>user page</button>
      <Button onClick={() => document.getElementById("newGameDialog").showModal()}>add product</Button>
      {products && products.map(i => {
        return (
          <div className="border" key={i._id}>
            <img src={i.picture && `/${i.picture}`} style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}></img>
            <div>{i.name + "  |  " + i.price + "$" + " | " + i.description + " | barkod: " + i.password}</div>
            <Button onClick={() => window(i)}>update</Button>
            <Button onClick={() => remove(i)}>delete</Button>
            <dialog id="newGameDialog">
              <h1>🏓new product / edit product🏓</h1>
              <input id="name" placeholder="add a name" onBlur={(e) => name = e.target.value}></input>
              <br></br>
              <input id="price" type="number" placeholder="price" onBlur={(e) => price = e.target.value}></input>
              <br></br>
              <input id="password" placeholder="password" onBlur={(e) => password = e.target.value}></input>
              <br></br>
              <input id="description" placeholder="description" onBlur={(e) => description = e.target.value} ></input>
              <br></br>
              <input id=" picture" placeholder="url picture" onBlur={(e) => picture = e.target.value}></input>
              <br></br>
              <button onClick={() => newGame()}>שמירה </button>
              <button onClick={() => dontSave()}>ביטול </button>
            </dialog>


          </div>

        )
      })}

    </div>

  )
}
export default Store;
