import React from 'react';
import '../App.css';
import firebase from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Show extends React.Component{
    constructor(props){
        super(props);
        this.state={
            product:[],
            key:''
        };
    }

    componentDidMount(){
        const ref=firebase.firestore().collection('Products').doc(this.props.match.params.id);
        
        ref.get().then((doc)=>{
            
            if(doc.exists){
                this.setState({
                    product:doc.data(),
                    key:doc.id,
                    isLoading:false
                });
            }else{
                console.log("No such doc present !")
            }
        });
    }
    delete(id){
        var desertRef=firebase.storage().refFromURL(this.state.product.url)
        firebase.firestore().collection('Products').doc(id).delete().then(()=>{
           console.log("Document is Successfully deleted");
            this.props.history.push("/")
        }).catch((error)=>{
            console.error("Error is",error);
        });
        desertRef.delete().then(function(){
            console.log('file deleted')
        }).catch(function(error){
            console.log("error while deleting")
        });
    }
    render(){
        const cardStyles= {
            
            width: '48rem',
            height:'auto',
            backgroundColor:'white',
            margin:'auto',
            display:'block',
            marginTop:'40px',
            paddingBottom:'20px',  
            paddingTop:'5px',
            paddingLeft:'20px',
            paddingRight:'20px',
            borderStyle:'outset',
            borderLeft:'50px solid #143d59'
        }
        return(
            <body style={{}}>
            <div>
                <Card style={cardStyles}>
                <div className="Buttons">
                    <Link to="/">
                        <button class="Edit-Button" >Show Products</button>
                    </Link>
                </div><br></br><br></br>
                <div class="upload-data">
                    <img src={this.state.product.url} height="200" width="200" alt=""/>
                </div>
                <div class="container">
                    <div class="panel panel-default">
                    <h3 class="panel-title">{this.state.product.name}</h3>   
                    </div>
                    <br></br>
                    <div class="panel-body">
                        <dl>
                            <dt>Description:</dt>
                            <dd>{this.state.product.description}</dd>
                        </dl>
                        <Link to ={`/edit/${this.state.key}`} class = "btn btn-success" style={{width:'200px',marginRight:'60px'}}>Edit</Link>
                        <button onClick={this.delete.bind(this,this.state.key)} class ="btn btn-danger" style={{width:'200px',marginRight:'40px'}}>Delete</button>
                    </div>
                </div>
                </Card>
            </div>
            </body>
        )
    }
}
export default Show