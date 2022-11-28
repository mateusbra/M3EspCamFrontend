import React, { useEffect, useState } from 'react';
import './App.css';
import Api from "./Api";
import Badge from 'react-bootstrap/Badge';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [URL,setURL] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const [mode,setMode] = useState(false);
  const [detected,setDetected] = useState(false);

  const handleClickAlarm = async () => {
    await Api.setDetected(false);
  }

  const handleClick = async () => {
    await Api.setMode(!mode);
    setMode(!mode);
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
      <img src={"https://deltassis.com.br/assets/img/loading_icon.gif"} alt={"loading"}/>
    </div>
    ) : (
    <div>

      <div style={{maxWidth:"100%",height:"50vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <div style={{width:"50%",margin:"auto",textAlign:"center"}}>Úlimo registro capturado:</div>
        <div style={{width:"50%",maxWidth: "300px"}}>
          <img src={URL} alt={"record_from_esp"} style={{width:"100%"}}/>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"15vh",flexDirection:"column"}}>
        <div style={{marginBottom:"10vh"}}>Modo de operação:     <Badge bg="secondary">{mode ? "VIGILANTE" : "OCIOSO"}</Badge></div>
        <Button variant="primary" size="lg" onClick={handleClick}> {mode ? "DESLIGAR" : "LIGAR"} SISTEMA</Button>
        <Button style={{marginTop:"5vh"}}variant="danger" size="lg" onClick={handleClickAlarm}>DESATIVAR ALARME</Button>
      </div>
      
    </div>
    )}
    </>
  );
}

export default App;
