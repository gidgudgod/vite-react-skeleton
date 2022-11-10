import "./CardTravel.css";

function CardTravel(props) {
  return (
    <div className="card-travel">
      <div className="card-photo">
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className="card-details">
        <span className="location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            fill="#665af5"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          &nbsp;{props.location}
        </span>
        <a href={props.googleMapsUrl} className="map-link" target="_blank">
          View on Google Maps
        </a>
        <h2 className="title">{props.title}</h2>
        <h3 className="dates">
          {props.startDate} - {props.endDate}
        </h3>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
}

export default CardTravel;
