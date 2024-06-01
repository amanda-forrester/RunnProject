import React, { useState, useEffect } from "react";
import "./App.css";
import ClientList from './ClientList';
import EmailList from './EmailList';

function App() {

  return (
    <div>
      <h1>Runn Client List</h1>
        <ClientList />
        <EmailList />
    </div>
  );
}

export default App; 
