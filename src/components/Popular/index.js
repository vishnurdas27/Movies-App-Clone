import './index.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Popular = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [popularMovies, setPopularMovies] = useState([])

  const getPopularMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        setPopularMovies(data.results)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getPopularMovies()
  }, [])

  const renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="YOUR_FAILURE_VIEW_IMAGE_URL"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        className="try-again-button"
        type="button"
        onClick={getPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <div className="movies-container">
      {popularMovies.map(movie => (
        <div className="movie-item" key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={movie.poster_path} // Changed to poster_path (vertical) for grids!
              alt={movie.title} // FIX 2: Required by tests!
              className="poster"
            />
          </Link>
        </div>
      ))}
    </div>
  )

  const renderPopularContent = () => {
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

  return (
    <div className="Popular-container">
      <Navbar />
      <div className="popular-content-wrapper">{renderPopularContent()}</div>
      <Footer />
    </div>
  )
}

export default Popular
