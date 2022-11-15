import { useEffect, useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { useStopwatch } from 'react-timer-hook';
import Stopwatch from './components/Stopwatch';

function App() {
  const BEST_TIME_KEY = 'bestTime';
  const [diceArray, setDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollsCount, setRollsCount] = useState(0);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true });

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
      saveGame();
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
    setRollsCount((prevRolls) => prevRolls + 1);
  }

  function newGame() {
    reset();
    start();
    setTenzies(false);
    setDiceArray(allNewDice());
    setRollsCount(0);
  }

  function convertToSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
  }

  function getBestTime() {
    return JSON.parse(localStorage.getItem(BEST_TIME_KEY)) || null;
  }

  function setBestTime(hours, minutes, seconds) {
    const bestTime = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };

    localStorage.setItem(BEST_TIME_KEY, JSON.stringify(bestTime));
  }

  function saveGame() {
    pause();

    if (getBestTime() == null) {
      setBestTime(hours, minutes, seconds);
      console.log(`Best Time for now: ${hours}:${minutes}:${seconds}`);
      return;
    }

    const timeWinInSeconds = convertToSeconds(hours, minutes, seconds);
    const {
      hours: bestHours,
      minutes: bestMinutes,
      seconds: bestSeconds,
    } = getBestTime();
    const bestTimeInSeconds = convertToSeconds(
      bestHours,
      bestMinutes,
      bestSeconds
    );

    if (timeWinInSeconds <= bestTimeInSeconds) {
      console.log('You beat the best time record!');
      console.log(
        `Best Time previously: ${bestHours}:${bestMinutes}:${bestSeconds}`
      );
      setBestTime(hours, minutes, seconds);
    } else {
      console.log(
        `Best Time for now: ${bestHours}:${bestMinutes}:${bestSeconds}`
      );
    }
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

  const bestTimeElement = (
    <div className="bestTime-container">
      <p>Best Time</p>

      {getBestTime() != null ? (
        <p className="bestTime">
          {getBestTime().hours.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          :
          {getBestTime().minutes.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          :
          {getBestTime().seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
      ) : (
        <p className="bestTime">No Best Time Yet</p>
      )}
    </div>
  );

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
        <p>Rolls Count: {rollsCount}</p>
        <Stopwatch hours={hours} minutes={minutes} seconds={seconds} />
        {bestTimeElement}
      </main>
    </div>
  );
}

export default App;
