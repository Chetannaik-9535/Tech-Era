import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './Components/Home'
import CourseDetails from './Components/CourseDetails'
import NotFound from './Components/NotFound'

// Replace your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses/:id" component={CourseDetails} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
