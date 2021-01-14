import React from 'react';
import './App.css';
import firebase from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
class App extends React.Component{
  constructor(props){
    super(props);
    this.ref=firebase.firestore().collection("Products");
    this.unsubscribe=null;
    this.state={
      products : []
    };
  }
  componentDidMount(){
    this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);

  }
  onCollectionUpdate= (querySnapshot)=>{
    const products= [];
    querySnapshot.forEach((doc)=>{
      const{name,description,url}=doc.data();
      products.push({
        key:doc.id,
        doc,
        name,
        description,
        url
      });

    });
    this.setState({
      products
    });

  }
  logout(){
    firebase.auth().signOut();
}
  render(){
    const cardStyles = {
        
        width:'auto',
        height:'auto',
        backgroundColor: 'white',
        margin:'auto',
        display: 'block',
        marginTop: '0px',
        
        paddingTop: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        borderStyle: 'outset',
        borderLeft: '50px solid #143d59',
        borderradius:'20px' 
      
    }
    return(
      <div style={{backgroundColor:'#3b3a38'}}>
        <Card style = {cardStyles}>
          <div className="butn" style={{float:'right',height:'20px'}}>
            <button style={{backgroundColor:'red',color:'white',width:'80px'}} onClick={this.logout}>Logout</button>
          </div>

          <div class="container">
            <div class="panel panel-heading">
              <h2 class ="panel heading" style={{color:'#e71',marginTop:'-20px'}}><b>Product Details</b></h2>  
            </div>
          </div><br></br>
          <div class="panel-body">
            <table class="table table-script">
              <thead>
                <tr>
                  <th style={{}}>Product Name</th>
                  <th style={{textAlign:'center'}}>Description</th>
                  <th style={{}}>Image</th>
                </tr>
              </thead>
              <tbody style={{}}>  
                  {
                    this.state.products.map(product =>
                      <tr>
                          <td width='150px' style={{color:'#00154f'}}><b><Link to ={`/show/${product.key}`}>{product.name}</Link></b></td>
                          <b><td>{product.description}</td></b>
                          <td><img src={product.url} width="150px" height="150px" alt=""/></td>
                      </tr>

                    )}
              </tbody>
            </table>
          </div>
          <div className="Buttons">
                <Link to="/create">
                  <button style={{backgroundColor:'#e71'}} class="Add-Button" >Add Products</button>
                </Link>
          </div>
        </Card>
      </div>

    )
  }
}
export default App;