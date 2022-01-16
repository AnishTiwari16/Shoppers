import React from 'react';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import productsReducer from './store/reducers/product';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ReduxThunk from 'redux-thunk';
import { LogBox } from 'react-native';


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <Provider store = {store}>
      <ShopNavigator />
    </Provider>
  );
} 
