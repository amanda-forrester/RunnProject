import React, { useState, useEffect } from "react";
import "./App.css";
import ClientList from './ClientList';
import EmailList from './EmailList';

function App() {

  return (
    <div>
      <h1 class="text-3xl text-center font-bold text-gray-900 leading-tight mb-2 border-t-4 border-b-4 border-slate-600 py-4">
        Time Off Requests
      </h1>
      <EmailList />
    </div>
  );
}

export default App; 
