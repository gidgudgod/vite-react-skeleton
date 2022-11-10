import "./App.css";
import Navbar from "./components/Navbar";
import CardTravel from "./components/CardTravel";
import data from "./data/data.js";

function App() {
  const cardTravels = data.map(function (item) {
    return (
      <div className="wrapper">
        <CardTravel key={item.id} {...item} />
        <hr></hr>
      </div>
    );
  });
  console.log(cardTravels);
  return (
    <div className="App">
      <Navbar />
      <div className="travel-list">{cardTravels}</div>
    </div>
  );
}

export default App;
