import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseList: [],
  }

  componentDidMount() {
    this.getCodingLanguages()
  }

  getCodingLanguages = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'Get',
    }

    const response = await fetch(apiUrl, options)
    //console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      //console.log(data)
      const formattedData = data.courses.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        logoUrl: eachData.logo_url,
      }))
      this.setState({
        courseList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="heading">Oops! Something Went Wrong </h1>
      <p className="description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="button"
        type="button"
        onClick={this.getCodingLanguages}
      >
        Retry
      </button>
    </div>
  )

  renderCourseList = () => {
    const {courseList} = this.state

    return (
      <ul className="courseList-container">
        {courseList.map(eachItem => (
          <li key={eachItem.id} className="list-items">
            <Link to={`/courses/${eachItem.id}`} className="link">
              <img
                src={eachItem.logoUrl}
                alt={eachItem.name}
                className="logo-image"
              />
              <p className="corse-name">{eachItem.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.success:
        return this.renderCourseList()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="AppContainer">
        <Link to="/" className="link">
          <Header />
        </Link>
        <h1 className="heading">Courses</h1>
        <div className="CodeLanguageContainer">{this.renderDetails()}</div>
      </div>
    )
  }
}

export default Home
