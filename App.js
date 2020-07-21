import React from 'react';
import {RecoilRoot} from 'recoil';
import App from './src/app';

const Main = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

export default Main;
