import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="notFound-container">
    <h1 className="title-notFound">Lost Your Way?</h1>
    <p>we are sorry the page you requested could not be found</p>
    <br />
    <p>Please go back to the homepage</p>
    <Link to="/">
      <button type="button" className="home-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
