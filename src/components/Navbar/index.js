import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Navbar = () => (
  <nav className="navbar-container">
    <div className="logo-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dfthypiat/image/upload/v1771312433/Group_7399_ajucnq.png"
          className="logo"
          alt="website logo"
        />
      </Link>
    </div>

    <div className="sub-container">
      <div className="features">
        <ul className="nav-links-list">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/popular" className="nav-link">
              Popular
            </Link>
          </li>
        </ul>

        <div className="actions-container">
          <Link to="/search">
            <button type="button" className="search-button">
              <HiOutlineSearch className="search-icon" />
            </button>
          </Link>

          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dfthypiat/image/upload/v1771318618/Avatar_hdmewo.png"
              className="Avatar"
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar
// testid="searchButton"
