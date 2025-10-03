import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointment extends Component {
  state = {
    title: '',
    date: '',
    initialAppointment: [],
    isFav: false,
  }

  onchangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onchangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointmentItem = {
      id: uuidv4(),
      title,
      date,
      isFav: false,
    }

    this.setState(prevState => ({
      initialAppointment: [...prevState.initialAppointment, newAppointmentItem],
      title: '',
      date: '',
    }))
  }

  onclickFav = () => {
    this.setState(prev => ({isFav: !prev.isFav}))
  }

  toggleFav = id => {
    this.setState(prevState => ({
      initialAppointment: prevState.initialAppointment.map(item =>
        item.id === id ? {...item, isFav: !item.isFav} : item,
      ),
    }))
  }

  render() {
    const {title, date, initialAppointment, isFav} = this.state
    const filteredAppointments = isFav
      ? initialAppointment.filter(item => item.isFav)
      : initialAppointment

    return (
      <div className="container">
        <div className="card">
          <div className="top-container">
            <div className="left-container">
              <h1>Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <label htmlFor="title">Title</label>
                <br />
                <input
                  id="title"
                  value={title}
                  placeholder="Title"
                  onChange={this.onchangeTitle}
                  className="input"
                />
                <br />
                <label htmlFor="date">Date</label>
                <br />
                <input
                  id="date"
                  value={date}
                  placeholder="Date"
                  onChange={this.onchangeDate}
                  className="input"
                  type="date"
                />
                <button type="submit" className="sumbit-button">
                  Add
                </button>
              </form>
            </div>
            <div className="right-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="appointment-img"
                alt="appointments"
              />
            </div>
          </div>
          <ul>
            <hr />
            <li className="appointment-starred">
              <h3>Appointments</h3>
              <button
                type="button"
                onClick={this.onclickFav}
                alt="star"
                className={`starred-button ${isFav ? 'active' : 'inactive'}`}
              >
                Starred
              </button>
            </li>
            <li className="appointments">
              {filteredAppointments.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentDetails={eachItem}
                  toggleFav={this.toggleFav}
                />
              ))}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointment
