import React, { useState, useEffect } from "react";
import "./App.css";
import ClientList from './ClientList';
import EmailList from './EmailList';

function App() {

  return (
    <div>
      <h1>Time Off Requests</h1>
        <EmailList />
    </div>
  );
}

export default App; 
