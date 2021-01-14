import React from 'react';
import '../App.css';
import firebase from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.ref=firebase.firestore().collection('Products');
        this.state={
            name:'',
            description:'',
            url:'',
            image:null,
            check:0
        }
    }
    onChange = (e) =>
    {
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState(state);
    }
    handleChange = (e) =>
    {
        if(e.target.files[0]){
            this.setState({
                image: e.target.files[0]
            })
        }
        console.log(e.target.files[0]);
    }
    handleUpload = () =>
    {   
        this.setState({check:1});
        const {image} =this.state;
        const uploadTask=firebase.storage().ref(`images/${image.name}`).put(this.state.image)
        uploadTask.on('state_changed',(snapshot)=>{console.log('snapshot')},
        (err)=>{console.log(err);},
        ()=>{firebase.storage().ref('images').child(image.name).getDownloadURL().then(url=>this.setState({url}))})
    }
    onSubmit=(e)=>{
        if(this.state.check === 1){
            e.preventDefault();
            const {name,description}=this.state;
            this.ref.add({
                name,
                description,
                url:this.state.url
            }).then((docRef)=>{
                this.setState({
                    name:'',
                    description:'',
                    url:''
                });
                this.props.history.push("/")
            })
            .catch((error)=>{
                console.error("Error adding document",error);
            });
            this.setState({check:0})
        }else(
            alert("please upload image first")
        )
    }
    // #f4b41a
    render(){
        const {name, description} = this.state;
        const cardStyles= {
            width: '40rem',
            height:'auto',
            backgroundColor:'white',
            margin:'auto',
            display:'block',
            marginTop:'10px',
            marginBottom:'40px',
            color:'#f4b41a',
            paddingTop:'10px',
            paddingLeft:'20px',
            paddingRight:'20px',
            borderStyle:'outset',
            borderLeft:'50px solid #143d59'
        }
        return(
            <div style={{backgroundColor:'white'}}>
                
                <Card style={cardStyles}>
                <div className="Buttons">
                        <Link to="/">
                            <button class="Edit-Button" >Show Products</button>
                        </Link>
                    </div>    
                    <div>
                    <div>
                    <div class="form-group"></div>
                         <label for="name"style={{color:'#f4b41a'}}>Product Name:</label>
                         <input type="text" class="form-control" name="name" value={name} style={{backgroundColor:'whitesmoke'}} onChange={this.onChange} placeholder="please Enter Name"></input>   
                    </div>
                    <div>
                        <div class="form-group"></div>
                         <label for="description" style={{color:'#f4b41a'}}>Product Description:</label>
                        <textArea class="form-control" style={{backgroundColor:'whitesmoke'}} name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>   
                    </div>
                    </div>
                    <div class="upload-btn-wrapper">
                        <button class="file-btn" style={{marginTop:'10px',backgroundColor:'whitesmoke'}}>Choose a file</button>
                        <input type="file" onChange={this.handleChange}/>

                    </div>
                    <div class="upload-data">    
                        <img style={{backgroundColor:'whitesmoke'}} src={this.state.url} height="200" width="200" alt=""/>
                    </div>
                    <div className="Buttons">
                        <button class="Submit-Button" style={{backgroundColor:'#f4b41a'}} onClick={this.handleUpload}>Upload Image First</button>
                        <button class="Submit-Button" style={{backgroundColor:'#f4b41a'}} onClick={this.onSubmit}>Save All</button>
                    </div>
                </Card>
                <br></br>
            </div>
        )
    }
}
export default AddProduct