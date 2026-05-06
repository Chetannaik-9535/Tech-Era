import './index.css'
import Header from '../Header'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CourseDetails extends Component {
  state = {
    courseDetailsList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseDetailsList()
  }

  getCourseDetailsList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetailsList: updateData,
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
        onClick={this.getCourseDetailsList}
      >
        Retry
      </button>
    </div>
  )

  renderCourseDetailsList = () => {
    const {courseDetailsList} = this.state

    return (
      <div className="courseDetailsList-container">
        <img
          src={courseDetailsList.imageUrl}
          alt={courseDetailsList.name}
          className="image"
        />
        <div>
          <h1 className="name">{courseDetailsList.name}</h1>
          <p className="description">{courseDetailsList.description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.success:
        return this.renderCourseDetailsList()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link">
          <Header />
        </Link>
        <div className="CourseDetails-Container">
          {this.renderCourseDetails()}
        </div>
      </div>
    )
  }
}

export default CourseDetails
