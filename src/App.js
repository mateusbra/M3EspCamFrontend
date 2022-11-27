import React, { useEffect, useState } from 'react';
import './App.css';
import Api from "./Api";
import Badge from 'react-bootstrap/Badge';
import {Button,Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchToken, onMessageListener } from './firebase';





function App() {
  const [URL,setURL] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const [mode,setMode] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener().then(payload => {
    setNotification({title: payload.notification.title, body: payload.notification.body})
    setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  const onShowNotificationClicked = () => {
    setNotification({title: "Notification", body: "This is a test notification"})
    setShow(true);
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
    <div style={{}}>
    <div style={{width:"100%",height:"50vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"65%"}}>
        <img src={URL} alt={"record_from_esp"} style={{width:"100%"}}/>
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"15vh",flexDirection:"column"}}>
      <div style={{marginBottom:"10vh"}}>Modo de operação:     <Badge bg="secondary">{mode ? "VIGILANTE" : "OCIOSO"}</Badge></div>
      <Button variant="primary" size="lg" onClick={handleClick}> {mode ? "DESLIGAR" : "LIGAR"} SISTEMA</Button>

    </div>
    </div>
    )}


<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        
        <Button onClick={() => onShowNotificationClicked()}>Show Toast</Button>
      </header>
    </>
  );
}

export default App;
