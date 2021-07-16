import React from 'react';
import Navigation from '../Navigation';
import Header from '../Header';
export default function index() {
  return (
    <div className="App">
      <div className="main-flex">
        <Navigation />
        <Header />
      </div>
    </div>
  );
}
