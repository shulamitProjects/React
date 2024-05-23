import { useEffect } from "react";
import { updateService } from "../../../../Api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Store(){
const navigate = useNavigate()
// const[name,setname]=useState("");
// const[price,setprice]=useState("");
// const[description,setdescriptio]=useState("");
// const[image,setimage]=useState("");

const [products,setproducts]=useState([]);


useEffect=()=>{
    // <Button onChange={()}>add new product</Button>
    setproducts( )
    navigate("/Storapi")//,{state:i}
}
,[]} 

const update=(i)=>{
    console.log(i);
    alert(" updateהגעת")
navigate("/window")//,{state:i}
}

return(
products && products.map(i=>{
    return<>
<div className="border" key={i}></div>
<img src={i.image} style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}></img>
<div>{i.name+"|"+ i.price+"|"+ i.description}</div>
<Button  onClick={update(i)}>update</Button>
    </>
}
))
// return(

//         <div className="border"key={i.name}>
//         <div>{`${i.price}`}</div>
//         <img src={i.image} style={{ heignt: "150px", width: "200px", fontFamily: "initial" }}></img>
//         <Button  onClick={navigate("/window")}>update</Button>
//         <Button  onClick={}>delete</Button>
// </div>));
// )





export default Store;