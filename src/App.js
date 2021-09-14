import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Dashboard from './components/Dashboard';
import Footer from './components/Layout/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import EditorBar from './components/Layout/EditorBar';
import AddFeature from './components/Feature/AddFeature';
import {Provider} from "react-redux";
import store from "./store/store"
import UpdateFeature from './components/Feature/UpdateFeature';
import FeatureTaskItem from './components/Feature/FeatureTaskItem';
import AddProduct from './components/Product/AddProduct';
import ProductTask from './components/Product/ProductTask';
import AddProductTask from './components/Product/AddProductTask';
import ProductBoard from './components/Product/ProductBoard';
import AddAbout from './components/About/AddAbout';
import  About from './components/About/About';
import  UpdateAbout from './components/About/UpdateAbout';
import AddIntro from './components/Intro/AddIntro';
import UpdateIntro from './components/Intro/UpdateIntro';
import AddClient from './components/Client/AddClient';
import UpdateClient from './components/Client/UpdateClient';
import AddExtra from './components/Extra/AddExtra';
import UpdateProduct from './components/Product/UpdateProduct';
import UpdateExtra from './components/Extra/UpdateExtra';
import NavBar from './components/Layout/NavBar';
import UpdateProductTask from './components/Product/UpdateProductTask';
import Register from './components/Contact/Register';
import Login from './components/Contact/Login';
import jwt_decode from "jwt-decode";
import JwtToken from './components/Security/JwtToken';
import {SET_CURRENT_USER} from "./actions/types";
import { logout } from './actions/UserAction';
import SecuredRoute from './components/Security/SecuredRoute';
import ContactUs from './components/Contact/ContactUs';
import AllProducts from './components/Product/AllProducts';


const jwtToken = localStorage.jwtToken;


if(jwtToken){
  JwtToken(jwtToken)
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  })

  const currentTime = Date.now()/1000
  if(decoded_jwtToken.exp<currentTime){
    store.dispatch(logout())
    window.location.href = "/"
  }
}
class App extends Component {
  render(){
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
       <NavBar />



       <Route exact path="/" component={Dashboard} />
      
       <Route exact path="/login" component={Login} />
       <Route exact path="/featureTask/:id" component={FeatureTaskItem} />
       <Route exact path="/about" component={About} />
       <Route exact path="/productBoard/:id" component={ProductBoard} />
       <Route exact path="/contact" component={ContactUs} />
       <Route exact path="/service" component={AllProducts} />

      <SecuredRoute exact path="/addFeature" component={AddFeature} />
       <SecuredRoute exact path="/updateFeature/:id" component={UpdateFeature} />
       <SecuredRoute exact path="/register" component={Register} />
       <SecuredRoute exact path="/addProduct" component={AddProduct} />
       <SecuredRoute exact path="/updateProduct/:id" component={UpdateProduct} />
       <SecuredRoute exact path="/updateProductTask/:productlog_id/:pt_id" component={UpdateProductTask} />
       <SecuredRoute exact path="/addAbout" component={AddAbout} />
       <SecuredRoute exact path="/addIntro" component={AddIntro} />
       <SecuredRoute exact path="/addClient" component={AddClient} />
       <SecuredRoute exact path="/updateCLient/:id" component={UpdateClient} />
       <SecuredRoute exact path="/updateIntro/:id" component={UpdateIntro} />
       
       <SecuredRoute exact path="/updateAbout/:id" component={UpdateAbout} />
      
       <SecuredRoute exact path="/addProductTask/:id" component={AddProductTask} />
       <SecuredRoute exact path="/addExtra" component={AddExtra} />
       <SecuredRoute exact path="/updateExtra/:id" component={UpdateExtra} />
       
   <Footer/>
      </div>
      </Router>
      </Provider>
    );

  }
  
}

export default App;
