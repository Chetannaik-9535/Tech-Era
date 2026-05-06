import './index.css'
import Header from '../Header'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className='NotFound-container'>
    <Link to='/' className='Link'>
      <Header />
    </Link>
    <img
      className='img'
      src='https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png'
      alt='not found'
    />
    <h1 className='heading'>Page Not Found</h1>
    <p className='decription'>
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
