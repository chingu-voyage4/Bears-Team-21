import React, { Component } from 'react'
import './Login.css'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      signup: false,
      login: true
    }
  }
  render () {
    return (
      <div className="loginbox">
        <LogIn />
      </div>
    )
  }
}
const LogIn = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <form>
        <input type="email" autocomplete="off" data-validate="required" placeholder="Email"></input>
        <input type="password" autocomplete="off" placeholder="Password"></input>
        <a href="#">Forgot Password ?</a>
        <input type="submit" className="button" name="" value="LOG IN" />
        <p><a href="#">Don't have an account yet?</a></p>
      </form>
    </div>
  )
}

const Signup = () => {
  return (
    <div>
      <h1>Get started!</h1>
      <form>
        <input type="email" autocomplete="off" required placeholder="Email"></input>
        <input type="text" autocomplete="off" required placeholder="Username"></input>
        <input type="password" autocomplete="off" required placeholder="Password"></input>
        <input type="password" autocomplete="off" required placeholder="Confirm password"></input>
        <input type="submit" className="button" name="" value="SIGN UP" />
      </form>
    </div>
  )
}


export default Login
