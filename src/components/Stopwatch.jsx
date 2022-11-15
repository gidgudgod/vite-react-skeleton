function Stopwatch(props) {
  return (
    <div className="stopwatch">
      <h3>
        {props.hours.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}{' '}
        :{' '}
        {props.minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}{' '}
        :{' '}
        {props.seconds.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </h3>
    </div>
  );
}

export default Stopwatch;
