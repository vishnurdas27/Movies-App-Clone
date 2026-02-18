import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'
import MovieSlider from '../movieSlider'
import Navbar from '../Navbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])
  const [randomHeroMovie, setRandomHeroMovie] = useState({})

  const getData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const originalsUrl = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const trendingResponse = await fetch(trendingUrl, options)
      const originalsResponse = await fetch(originalsUrl, options)

      if (trendingResponse.ok && originalsResponse.ok) {
        const trendingData = await trendingResponse.json()
        const originalsData = await originalsResponse.json()

        const randomIndex = Math.floor(
          Math.random() * originalsData.results.length,
        )
        const heroMovie = originalsData.results[randomIndex]

        setTrendingMovies(trendingData.results)
        setOriginalMovies(originalsData.results)
        setRandomHeroMovie(heroMovie)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      // Fixed small typo here: needs to be apiStatusConstants
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )
  // testid="loader"

  const renderFailureView = () => (
    <div className="failure-view-container">
      <p className="failure-text">Something went wrong. Please try again</p>
      <button className="try-again-button" type="button" onClick={getData}>
        Try Again
      </button>
    </div>
  )

  const renderSuccessView = () => {
    const heroBackgroundStyle = {
      backgroundImage: `url(${randomHeroMovie.backdrop_path})`,
    }

    return (
      <>
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

        <div className="trending-container">
          <h1 className="slider-heading">Trending Now</h1>
          <MovieSlider movies={trendingMovies} />

          <h1 className="slider-heading">Originals</h1>
          <MovieSlider movies={originalMovies} />
        </div>
      </>
    )
  }

  const renderHomeContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <div className="main-container">{renderHomeContent()}</div>
}

export default Home
