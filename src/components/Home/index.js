import './index.css'
import Navbar from '../Navbar'

const Home = () => (
  <div className="main-container">
    <div className="Hero-container">
      <Navbar />
      <div className="hero-section">
        <h1 className="hero-title">Super Man</h1>
        <p className="hero-desc">
          Superman is a fictional superhero who first appeared in American Comic
          Books published by DC Comics
        </p>
        <button className="play-btn">Play</button>
      </div>
    </div>
  </div>
)

export default Home
