import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { subscribeToTimer, stopTimer } from './controllers/io-test'
import Login from '../src/components/Login/Login.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.subscribeToTimer = subscribeToTimer.bind(this);
    this.stopTimer = stopTimer.bind(this)
  }
  state = {
    timestamp: 'no timestamp yet'
  }
  render () {
    return (
      <div className="App">
        <button onClick={this.subscribeToTimer}>Test socket!</button>
        <button onClick={this.stopTimer}>Stop socket test!</button>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
        <Login />
      </div>
    )
  }
}

export default App
