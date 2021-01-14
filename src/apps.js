import React from 'react';
import firebase from './config';
import './index.css';
import App from './App';
import Login from './Login';
// import {Box,Grid,Container} from '@material-ui/core';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class apps extends React.Component{
    constructor(props)
    {
      super(props);
      this.state={
        user : {}
      }
    }
    componentDidMount()
    {
      this.authListener();
    }
    authListener(){
      firebase.auth().onAuthStateChanged((user)=>{
        if(user)
        {
          this.setState({user})
        }
        else{
          this.setState({user : null})
        }
      })
    }
  
    render(){
      return (
          <body>
        <div className="apps" >
           {this.state.user ? (<App/>) : (<Login/>)}
          
    
        </div>
        </body>
      );
    }
  }
  
  export default apps;