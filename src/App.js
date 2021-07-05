import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header'
import Display from './Components/Display';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/'>
        <Header/>
        </Route>
        <Route exact path='/video/:vid'>
          <Display/>
        </Route>
      </Switch>
    </Router>
     
    
    
    </>
  )
}

export default App
