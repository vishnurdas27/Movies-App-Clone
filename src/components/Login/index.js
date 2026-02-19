import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect, useHistory} from 'react-router-dom'
import './index.css'

const Login = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const history = useHistory()

  const onSubmitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/'})
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
      history.replace('/')
      setSubmitError(false)
      setErrorMsg('')
    } else {
      setSubmitError(true)
      setErrorMsg(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="Login-Main-Container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dfthypiat/image/upload/v1771312433/Group_7399_ajucnq.png"
          alt="login website logo"
          className="login-logo"
        />
      </div>
      <div className="login-container">
        <h2 className="title">Login</h2>
        <form onSubmit={onSubmitForm}>
          <div className="input-containers">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              value={username}
              type="text"
              className="input"
              id="username"
              placeholder="Username"
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="input-containers">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              value={password}
              type="password"
              className="input"
              id="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
