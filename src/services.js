
const loginService = async (user) => {
 
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

   var raw = JSON.stringify({
    "userName": user.userName,
    "password": user.password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

var res;

await fetch("http://localhost:7940/api/auth/login", requestOptions)
  .then(response => response.text())///
  .then(result => res=result)
  .catch(error => alert('error', error));
  debugger
var a = JSON.parse(res).message

// var a = res
  return new Promise((resolve, reject) => {  
    resolve({
      loginStatus:a=="Unauthorized"?"unknown":"ok",
      // loginStatus:a!=='{"message":""}'?"ok":"unknown",
        data: { id: user.password, name: user.userName, userToken:res }
      })
  });
};


const registerService = async (user) => {
  const response = await fetch("http://localhost:7940/api/auth/register",///כל הניתוב
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)//האובייקט שרוצים
    })
  if (response.ok) {
     alert(` נירשם${user.name} `);
     console.log("registered!");


  }
  else {
     alert(` ${user.name} existed!`);

  }
  console.log(response);

  // TODO: here call server by fetch
  console.log("registered!");
  return new Promise((resolve, reject) => {
    resolve({
      loginStatus: response.ok?"ok":"unknown",
      data: {response},
    });
  });

  
};
  const getallService = async () => {
    let products = await fetch("http://localhost:7940/api/games")
      .then(response => response.text())
      .then(result => result)
      .catch(error => console.log('error', error));
  
    return new Promise((resolve, reject) => {
      let productsArray = JSON.parse(products)
      console.log(productsArray);
      resolve({
        data: productsArray
      });
    });
  
  }
export { loginService, registerService,getallService };
