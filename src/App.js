import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Dashboard from './components/dashboard/Dashboard'
import TodoDetails from './components/todo/TodoDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateTodo from './components/todo/CreateTodo'
import EditTodo from './components/todo/EditTodo'

class App extends Component {
  render(){
    return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/todo/:id' component={TodoDetails} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/create' component={CreateTodo} />
          <Route path='/edit/:id' component={EditTodo} />
        </Switch>
      </div>
    </BrowserRouter>
    );

  }
}

export default App;
