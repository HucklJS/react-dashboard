import React from 'react';
import './App.css';

import Table from "./components/Table/Table";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Dashboard</h1>
        <div className="search-form">
          <input type="text" placeholder="What test are you looking for?"/>
        </div>
        <Table/>
      </div>
    </div>
  );
}

export default App;
