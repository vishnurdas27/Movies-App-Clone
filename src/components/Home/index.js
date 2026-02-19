import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import MovieSlider from '../movieSlider'
import Navbar from '../Navbar'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [trendingApiStatus, setTrendingApiStatus] = useState(
    apiStatusConstants.initial,
  )
  const [originalsApiStatus, setOriginalsApiStatus] = useState(
    apiStatusConstants.initial,
  )

  const [trendingMovies, setTrendingMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])
  const [randomHeroMovie, setRandomHeroMovie] = useState({})

  const getTrendingMovies = async () => {
    setTrendingApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(trendingUrl, options)
      if (response.ok) {
        const data = await response.json()
        setTrendingMovies(data.results)
        setTrendingApiStatus(apiStatusConstants.success)
      } else {
        setTrendingApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setTrendingApiStatus(apiStatusConstants.failure)
    }
  }

  const getOriginalsMovies = async () => {
    setOriginalsApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const originalsUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(originalsUrl, options)
      if (response.ok) {
        const data = await response.json()
        const randomIndex = Math.floor(Math.random() * data.results.length)

        setOriginalMovies(data.results)
        setRandomHeroMovie(data.results[randomIndex])
        setOriginalsApiStatus(apiStatusConstants.success)
      } else {
        setOriginalsApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setOriginalsApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getTrendingMovies()
    getOriginalsMovies()
  }, [])

  const renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderFailureView = retryFunction => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dfthypiat/image/upload/v1771411603/alert-triangle_bugp8h.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        className="try-again-button"
        type="button"
        onClick={retryFunction}
      >
        Try Again
      </button>
    </div>
  )

  const renderHeroSection = () => {
    switch (originalsApiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="Hero-container">
            <Navbar />
            {renderLoadingView()}
          </div>
        )

      case apiStatusConstants.success: {
        const heroBackgroundStyle = {
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url(${randomHeroMovie.backdrop_path})`,
        }
        return (
          <div className="Hero-container" style={heroBackgroundStyle}>
            <Navbar />
            <div className="hero-section">
              <h1 className="hero-title">{randomHeroMovie.title}</h1>
              <p className="hero-desc">{randomHeroMovie.overview}</p>
              <button className="play-btn" type="button">
                Play
              </button>
            </div>
          </div>
        )
      }
      case apiStatusConstants.failure:
        return (
          <div className="Hero-container">
            <Navbar />
            {renderFailureView(getOriginalsMovies)}
          </div>
        )
      default:
        return null
    }
  }

  const renderTrendingSlider = () => {
    switch (trendingApiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return <MovieSlider movies={trendingMovies} />
      case apiStatusConstants.failure:
        return renderFailureView(getTrendingMovies)
      default:
        return null
    }
  }

  const renderOriginalsSlider = () => {
    switch (originalsApiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return <MovieSlider movies={originalMovies} />
      case apiStatusConstants.failure:
        return renderFailureView(getOriginalsMovies)
      default:
        return null
    }
  }

  return (
    <div className="main-container">
      {renderHeroSection()}

      <div className="trending-container">
        <h1 className="slider-heading">Trending Now</h1>
        {renderTrendingSlider()}

        <h1 className="slider-heading">Originals</h1>
        {renderOriginalsSlider()}
      </div>

      <Footer />
    </div>
  )
}

export default Home
