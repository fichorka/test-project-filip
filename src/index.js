import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import rootStore from './Stores/RootStore';

const Root = (
    <Provider rootStore={rootStore}>
      <App />
    </Provider>
  );


ReactDOM.render(Root, document.getElementById('root'));