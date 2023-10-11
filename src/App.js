import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';


netlifyIdentity.init();

const encode = (data) => {
   const formData=new FormData()
   for (const key of Object.keys(data)){
    formData.append(key,data[key])
   }
   return formData
}



function App() {


  


  const [value, setValue]=useState("");
  // useEffect (()=>{
  //   fetch(".netlify/functions/note-fetch-test")
  //   .then(x=>x.json())
  //   .then(data=>setValue(data))
  // }, [])

  // useEffect (()=>{
  //   fetch(".netlify/functions/hello-world")
  //   .then(x=>x.json())
  //   .then(data=>console.log(data))
  // }, [])


  useEffect (()=>{
    fetch(".netlify/functions/Hello-TypeScript")
    .then(x=>x.json())
    .then(data=>console.log(data))
  }, [])
  const handleSubmit=e=>{
    e.preventDefault();
    const form=e.target;
    fetch("/",{
      method: "POST",
      body: encode({
        "form-name": "contact",
        name: form.name.value,
        email: form.email.value
      })
    })
    .then(()=>alert("success"))
    .catch(error=>alert(error));




  };

const openWidget=()=>{
  netlifyIdentity.open('login'); // open the modal to the login tab
  
}

const callFunction=()=>{
  const user=netlifyIdentity.currentUser() 
  console.log(user)
  fetch("/.netlify/functions/protected-function-test", user && {
    headers: {
      Authorization: "Bearer "+user.token.access_token
    }
  })
  .then(x=>{
    return x.json()
  })
  // .then (data=>{
  //   // console.log(data)
  // })
  .then(res=>{
    if (res.data==="NOT ALLOWED"){
      netlifyIdentity.open('login');

    }
    else 
      alert(res.data)
  })
}

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React, I dont know how to learn it static
    //       here is my environment variable, let me guess is it: {process.env.REACT_APP_MY_KEY} , {process.env.MY_KEY}
    //       Let me guess what you got:  {value.msg}
    //     </a>
    //   </header>
    //   <form name="contact" netlify action="/thank-you" >
    //       <p>
    //         <label>Name <input type="text" name="name" /></label>
    //       </p>
    //       <p>
    //         <label>Email <input type="email" name="email" /></label>
    //       </p>
    //       <p>
    //         <label>File <input type="file" name="file" /></label>
    //       </p>
    //       <p>
    //         <button type="submit">Send</button>
    //       </p>
    //     </form>
    // </div>
    // netlify form
  <>
 
  <form  onSubmit={handleSubmit} >
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>Your Name: <input type="text" name="name"/></label>
          </p>
          <p>
            <label>Your Email: <input type="email" name="email"/></label>
          </p>
          <p>
            <label>Message: <textarea name="message"></textarea></label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
        <button onClick={openWidget}>Test login</button>
        <button onClick={callFunction}>{"Call Function"}</button>

  </>
    
        
        
  );
}

export default App;
