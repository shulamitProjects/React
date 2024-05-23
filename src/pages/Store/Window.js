import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Window = () => {
  const navigate = useNavigate();
  const data = useLocation();
  const game = data.state;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    setName(game.name);
    setPrice(game.price);
    setDescription(game.description);
    setPicture(game.picture);
  }, [game]);

  const save = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "_id": game._id, 
      "password": game.password, 
      "name": name,
      "description": description,
      "price": price,
      "picture": picture,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://localhost:7940/api/games/${game._id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      navigate("/store");
      navigate("/store");

  }

  const cancel = () => {
    navigate("/store");
  }

  return (
    <div>
      <h1>
        <input defaultValue={name} onBlur={(e) => setName(e.target.value)} /><label>name</label><br />
        <input defaultValue={price} onBlur={(e) => setPrice(e.target.value)} /><label>price</label><br />
        <input defaultValue={description} onBlur={(e) => setDescription(e.target.value)} /><label>description </label><br />
        <input defaultValue={picture} onBlur={(e) => setPicture(e.target.value)} /><label>picture</label><br />
        <button onClick={save}>save</button>
        <button onClick={cancel}>cancel</button>
      </h1>
    </div>
  );
};

export default Window;