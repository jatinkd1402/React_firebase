import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React from 'react';
import './App.css';
import firebase from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Card} from 'react-bootstrap';

import {Link} from 'react-router-dom';
class Login extends React.Component{
constructor(props)
{
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : ""
    }
}
login(e){
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}
signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}
handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}
render()
{
    return(
        <div style={{backgroundColor:'#3a3b38'}}>
            <br></br>
        <Container component="main" maxWidth="xs" style={{backgroundColor:'white'}}>
            <CssBaseline />
            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',marginTop:'60px'}}>
            <Avatar style={{marginTop:'40px',backgroundColor:'red'}}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form style={{width: '100%'}} noValidate >
                <TextField variant="standard" margin="dense" fullWidth required  label="Email Address" name="email" autoComplete="email"
                autoFocustype="email" id="email" placeholder="enter email address" onChange={this.handleChange}
                value={this.state.email} style={{}}
                />
                <br></br>
                <TextField
                variant="standard"
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                style={{height:'150px',lineHeight:'10px'}}
                onChange={this.handleChange}
                id="password"
                placeholder="enter password"
                value={this.state.password}
                />
                <br>
                </br><br></br>
                <button fullWidth variant="contained" color="primary" onClick={this.login} style={{backgroundColor:'#1976d2',color:'#fff',width:'100%',lineHeight:'42px',fontWeight:'500',fontSize:'19px'}}>Login</button>
                <Grid container justify="flex-end">
                
                    <Grid item style={{marginBottom:'20px'}}>
                        <br></br>
                        <Link to="/SignUp">
                         {"Don't have an account? Sign Up"}
                        </Link>
                        
                    </Grid>
                </Grid>
                
                
            </form>
            </div>
        </Container>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
    )
}
}
export default Login;