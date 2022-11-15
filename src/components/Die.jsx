function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };
  const firstFace = (
    <div className="die-face first">
      <span className="die-dot"></span>
    </div>
  );
  const secondFace = (
    <div className="die-face second">
      <span className="die-dot"></span>
      <span className="die-dot"></span>
    </div>
  );
  const thirdFace = (
    <div className="die-face third">
      <span className="die-dot"></span>
      <span className="die-dot"></span>

      <span className="die-dot"></span>
    </div>
  );
  const fourthFace = (
    <div className="die-face fourth">
      <div className="die-column">
        <span className="die-dot"></span>
        <span className="die-dot"></span>
      </div>
      <div className="die-column">
        <span className="die-dot"></span>
        <span className="die-dot"></span>
      </div>
    </div>
  );
  const fifthFace = (
    <div className="die-face fifth">
      <div className="die-column">
        <span className="die-dot"></span>
        <span className="die-dot"></span>
      </div>
      <div className="die-column">
        <span className="die-dot"></span>
      </div>
      <div className="die-column">
        <span className="die-dot"></span>
        <span className="die-dot"></span>
      </div>
    </div>
  );
  const sixthFace = (
    <div className="die-face sixth">
      <div className="die-column">
        <span className="die-dot"></span>
        <span className="die-dot"></span>
        <span className="die-dot"></span>
      </div>
      <div className="die-column">
        <span className="die-dot"></span>
        <span className="die-dot"></span>
        <span className="die-dot"></span>
      </div>
    </div>
  );

  const dieNumberElement = () => {
    let component;
    switch (props.value) {
      case 1:
        component = firstFace;
        break;
      case 2:
        component = secondFace;
        break;
      case 3:
        component = thirdFace;
        break;
      case 4:
        component = fourthFace;
        break;
      case 5:
        component = fifthFace;
        break;
      case 6:
        component = sixthFace;
        break;
      default:
        component = firstFace;
        break;
    }
    return component;
  };

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      {/* <h2 className="die-number">{props.value}</h2> */}
      {dieNumberElement()}
    </div>
  );
}

export default Die;
