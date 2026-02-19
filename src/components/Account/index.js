import './index.css'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Account = () => {
  const history = useHistory()

  const onClicklogOut = () => {
    Cookies.remove('jwt_token')
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    history.replace('/login')
  }

  const username = localStorage.getItem('username') || ''
  const password = localStorage.getItem('password') || ''

  const maskedPassword = '*'.repeat(password.length)

  return (
    <div className="Account-container">
      <Navbar />
      <div className="account-section">
        <h1 className="account-title">Account</h1>
        <hr />
        <div className="membership-details">
          <p className="para-head">Member ship</p>
          <div>
            <p>{username}@gmail.com</p>
            <p className="password">Password: {maskedPassword}</p>
          </div>
        </div>
        <hr />
        <div className="plan-details">
          <p className="para-head">Plan details</p>
          <div className="plan">
            <p>Premium</p>
            <p className="ultra">Ultra HD</p>
          </div>
        </div>
        <hr />
        <div className="btn-container">
          <button type="submit" className="logout-btn" onClick={onClicklogOut}>
            Log Out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
