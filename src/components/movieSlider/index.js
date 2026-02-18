import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import './index.css'

const MoviesSlider = props => {
  const {movies} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {movies.map(movie => (
        <div className="movie-slider-item" key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="movie-poster"
            />
          </Link>
        </div>
      ))}
    </Slider>
  )
}

export default MoviesSlider
