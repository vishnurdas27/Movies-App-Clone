import './index.css'
import {useState, useEffect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const getPopularMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        setPopularMovies(data.results)
        setLoading(false)
        console.log(data)
      } else {
        setLoading(true)
      }
    } catch (error) {
      console.log(error.error_msg)
      setLoading(true)
    }
  }
}
