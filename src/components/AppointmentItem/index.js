import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleFav} = props
  const {id, title, date, isFav} = appointmentDetails

  const onFavClick = () => {
    toggleFav(id)
  }

  const imageUrl = isFav
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const dateObj = new Date(date)
  const formattedDateObj = {
    day: dateObj.getDate(),
    month: dateObj.toLocaleString('en-GB', {month: 'long'}),
    year: dateObj.getFullYear(),
    weekday: dateObj.toLocaleString('en-GB', {weekday: 'long'}),
  }

  return (
    <li className="appointment-to-add" id={id}>
      <div className="appointment-container">
        <div className="appointment-item">
          <p className="title">{title}</p>
          <button
            onClick={onFavClick}
            className="starred"
            alt="star"
            type="button"
            data-testid="star"
          >
            <img src={imageUrl} alt="star" />
          </button>
        </div>
        <p>
          Date: {formattedDateObj.day} {formattedDateObj.month}{' '}
          {formattedDateObj.year}, {formattedDateObj.weekday}
        </p>
      </div>
    </li>
  )
}

export default AppointmentItem
