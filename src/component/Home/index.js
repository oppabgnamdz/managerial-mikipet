import React from 'react';
import Navigation from '../Navigation';
import Header from '../Header';
import Table from '../Table';
export default function index() {
  return (
    <div className="App">
      <div className="main-flex">
        <Navigation />
        <div style={{ flexGrow: 1 }}>
          <Header />
          <Table />
        </div>
      </div>
    </div>
  );
}
