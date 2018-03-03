import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { subscribeToTimer, stopTimer } from './controllers/io-test'

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.subscribeToTimer}>Test socket!</button>
        <button onClick={this.stopTimer}>Stop socket test!</button>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
      </div>
    )
  }
}

export default App
