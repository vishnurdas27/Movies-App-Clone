import './index.css'
import {FaGoogle, FaYoutube, FaTwitter, FaInstagram} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <div className="footer-section">
      <FaGoogle className="footer-icon" />
      <FaTwitter className="footer-icon" />
      <FaInstagram className="footer-icon" />
      <FaYoutube className="footer-icon" />
    </div>
    <p className="contact-us-text">Contact Us</p>
  </div>
)

export default Footer
