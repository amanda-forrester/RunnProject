import React, { useState, useEffect } from "react";
import "./App.css";
<<<<<<< Updated upstream
=======
import ClientList from './ClientList';
import EmailList from './EmailList';
>>>>>>> Stashed changes

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
<<<<<<< Updated upstream
    <div className="App">
      <h1>{message}</h1>
=======
    <div>
      <h1>Runn Client List</h1>
        <ClientList />
        <EmailList />
>>>>>>> Stashed changes
    </div>
  );
}

export default App; 
