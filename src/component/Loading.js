import React from 'react';
import Loader from 'react-loader-spinner';
export default function Loading({ height, width }) {
  return (
    <Loader
      type="BallTriangle"
      color="#00BFFF"
      height={height || 100}
      width={width || 100}
      timeout={10000} //3 secs
    />
  );
}
