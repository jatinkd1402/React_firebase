import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import apps from './apps';
import SignUp from './SignUp'; 
import Login from './Login'; 
import reportWebVitals from './reportWebVitals';
import AddProduct from './Component/AddProduct';
import EditProduct from './Component/EditProduct';
import ShowProduct from './Component/ShowProduct';
import {BrowserRouter, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
 <BrowserRouter>
 <Route exact path="/" component={apps}></Route>
 <Route exact path="/Login" component={Login}></Route>
 <Route exact path="/SignUp" component={SignUp}></Route>
 <Route exact path="/App" component={App}></Route>
 <Route path="/create" component={AddProduct}></Route>
 <Route path="/edit/:id" component={EditProduct}></Route>
 <Route path="/show/:id" component={ShowProduct}></Route>
 </BrowserRouter>,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
