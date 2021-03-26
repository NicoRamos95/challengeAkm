/* eslint-disable no-redeclare */
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register'
import Login from './components/Login'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from './redux/actions/userActions'
import { useState } from 'react'

function App(props) {
  const [reload, setReload] = useState(false)
  if (props.loggedUser) {
    var links = 
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
  } 
  else if (localStorage.getItem('token')) {
    props.logLS(localStorage.getItem('token'))
    .then(respuesta => {
      if (respuesta === '/') setReload(!reload)
    })
  }
  else {
    var links =  
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/register" component={Register}/>
      <Route path="/login"component={Login}/>
      <Redirect to="/" />
    </Switch>
  }
  return (
    <BrowserRouter>
      <Header />
      {links}
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userReducer.loggedUser
  }
}
const mapDispatchToProps = {
  logLS: userActions.logLS
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
