import React, { useEffect, useState } from 'react';
import './App.css';
import Api from "./Api";


function App() {
  const [URL,setURL] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const [mode,setMode] = useState(false);




  const handleClick = async () => {
    await Api.setMode();
  }

  useEffect(() => {async function fetchURLAndMode(){
      let imageURL = await Api.getURL();
      setURL(imageURL);
      let bool_mode = await Api.getMode();
      setMode(bool_mode);
      setIsLoading(false);
  }

      fetchURLAndMode();
  },[]);
  return (
    <>
    { isLoading ? (
    <div style={{width:"100%",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <img src={"https://deltassis.com.br/assets/img/loading_icon.gif"}/>
    </div>
    ) : (
    <div style={{}}>
    <div style={{width:"100%",height:"70vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"65%"}}>
        <img src={URL} alt={"image"} style={{width:"100%"}}/>
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"15vh"}}>
      
      <button style={{width:"10vh",borderRadius:"8vh",height:"10vh"}} onClick={handleClick}> {mode ? "LIGAR" : "DESLIGAR"} SISTEMA</button>

    </div>
    </div>
    )}
    </>
  );
}

export default App;
