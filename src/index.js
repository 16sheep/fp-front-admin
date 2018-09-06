import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import registerServiceWorker from './registerServiceWorker';
import userReducer from './reducers/userReducer'
import festivalReducer from './reducers/festivalReducer'
import areaReducer from './reducers/areaReducer'
import eventReducer from './reducers/eventReducer'
import 'semantic-ui-css/semantic.min.css';

const rootReducer = combineReducers({session: userReducer, festival: festivalReducer, event: eventReducer, area: areaReducer})
const store = createStore(rootReducer)

ReactDOM.render(
<DragDropContextProvider backend={HTML5Backend}>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
</DragDropContextProvider>,
document.getElementById('root')
)
registerServiceWorker();
