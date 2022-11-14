import { useEffect, useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    let isAllHeld = true;
    let isWin = true;
    for (const dice of diceArray) {
      if (!dice.isHeld) {
        isAllHeld = false;
        break;
      }
    }

    if (isAllHeld) {
      let number = diceArray[0].value;
      for (const dice of diceArray) {
        if (dice.value !== number) {
          isWin = false;
          break;
        }
      }
    }

    if (isAllHeld && isWin) {
      setTenzies(true);
      console.log('You won!');
    }

    // Alternative Way to check if wins
    // const allHeld = dice.every((die) => die.isHeld);
    // const firstValue = dice[0].value;
    // const allSameValue = dice.every((die) => die.value === firstValue);
    // if (allHeld && allSameValue) {
    //   setTenzies(true);
    //   console.log('You won!');
    // }
  }, [diceArray]);

  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.floor(Math.random() * 6) + 1);
    }
    const diceArrayObject = diceArray.map((d) => {
      return { id: nanoid(), value: d, isHeld: false };
    });
    return diceArrayObject;
  }

  function holdDice(event, id) {
    setDiceArray((prevDiceArray) => {
      return prevDiceArray.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }

  function rollDice() {
    setDiceArray((prevDiceArray) => {
      return prevDiceArray.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.floor(Math.random() * 6) + 1, id: nanoid() };
      });
    });
  }

  function newGame() {
    setTenzies(false);
    setDiceArray(allNewDice());
  }

  const diceElements = diceArray.map((d) => {
    return (
      <Die
        key={d.id}
        value={d.value}
        isHeld={d.isHeld}
        holdDice={(event) => holdDice(event, d.id)}
      />
    );
  });

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="container">{diceElements}</div>
        <button className="roll-button" onClick={tenzies ? newGame : rollDice}>
          {tenzies ? 'New Game' : 'Roll Dice'}
        </button>
      </main>
    </div>
  );
}

export default App;
