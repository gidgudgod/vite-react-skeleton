import { useMemo, useReducer, useState } from 'react';
import './App.css';

function UseCallback() {
  // useCallback used when passing a function prop to other components
  const addition = useCallback(() => {
    (a, b) => a + b;
  }, []);
}

function UseMemo() {
  const [numbers] = useState([10, 20, 50]);

  //Only re-render when numbers change. useMemo good for complex calculations
  const total = useMemo(() => {
    console.log('test');
    return numbers.reduce((acc, number) => acc + number, 0);
  }, [numbers]);

  const [names] = useState(['John', 'Paul', 'George']);

  const sortedNames = useMemo(() => [...names].sort(), [names]);

  return (
    <>
      <div>Total = {total}</div>
      <div>Names = {names.join(', ')}</div>
      <div>Sorted Names = {sortedNames.join(', ')}</div>
    </>
  );
}

function UserForm() {
  const [state, dispatch] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {
      first: '',
      last: '',
    }
  );
  return (
    <div>
      <input
        type="text"
        value={state.first}
        onChange={(e) => dispatch({ first: e.target.value })}
      />
      <input
        type="text"
        value={state.last}
        onChange={(e) => dispatch({ last: e.target.value })}
      />
      <h3>First = {state.first}</h3>
      <h3>Last = {state.last}</h3>
    </div>
  );
}

function NameList() {
  const [count, setCount] = useState(23);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_NAME':
          return { ...state, name: action.payload };
        case 'ADD_NAME':
          return {
            ...state,
            names: [...state.names, state.name],
            name: '',
          };
      }
    },
    {
      names: [],
      name: '',
    }
  );
  return (
    <div className="NameList">
      <div>
        {state.names.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          dispatch({
            type: 'SET_NAME',
            payload: e.target.value,
          })
        }
      />
      <button onClick={() => dispatch({ type: 'ADD_NAME' })}>Add Name</button>
      <div>Name = {state.name}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <UserForm />
      <NameList />
      <UseMemo />
    </div>
  );
}

export default App;
