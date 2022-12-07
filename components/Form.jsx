import React from 'react';
import { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    race: '',
    weapon: {
      sword: false,
      claymore: false,
      bow: false,
    },
    gender: '',
    strength: 0,
  });

  const [result, setResult] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(formData);
  };

  const handleOnChange = (e) => {
    const { value, name, type } = e.target;
    console.log(value, type, name);
    if (type === 'checkbox') {
      const { checked } = e.target;

      setFormData((prevState) => ({
        ...prevState,
        weapon: { ...formData.weapon, [name]: checked },
      }));
      return;
    }

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  console.log(formData);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '20px',
        width: '768px',
        backgroundColor: 'aliceblue',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div className="name">
          <label htmlFor="name" style={{ display: 'block', fontSize: '14px' }}>
            Name
          </label>
          <input
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
            }}
            type="text"
            name="name"
            id="name"
            onChange={handleOnChange}
            value={formData.name}
          />
        </div>

        <div className="position">
          <label
            htmlFor="position"
            style={{ display: 'block', fontSize: '14px' }}
          >
            Position
          </label>
          <input
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
            }}
            type="text"
            name="position"
            id="position"
            onChange={handleOnChange}
            value={formData.position}
          />
        </div>

        <div className="race">
          <label htmlFor="race" style={{ display: 'block', fontSize: '14px' }}>
            Race
          </label>
          <select
            style={{
              width: '50%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
            }}
            name="race"
            id="race"
            value={formData.race}
            onChange={handleOnChange}
          >
            <option value="">Please select</option>
            <option value="Hobbit">Hobbit</option>
            <option value="Dwarf">Dwarf</option>
            <option value="Elf">Elf</option>
            <option value="Wizard">Wizard</option>
          </select>
        </div>

        <div className="weapon">
          <p style={{ display: 'block', fontSize: '14px' }}>Your Weapons</p>
          <div
            className="checkbox-wrapper"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '16px',
              fontSize: '16px',
            }}
          >
            <div className="input-group">
              <input
                type="checkbox"
                name="sword"
                id="sword"
                onChange={handleOnChange}
                checked={formData.weapon.sword}
                style={{ borderRadius: '5px' }}
              />
              <label htmlFor="sword">Sword</label>
            </div>

            <div className="input-group">
              <input
                type="checkbox"
                name="claymore"
                id="claymore"
                onChange={handleOnChange}
                checked={formData.weapon.claymore}
              />
              <label htmlFor="claymore">Claymore</label>
            </div>

            <div className="input-group">
              <input
                type="checkbox"
                name="bow"
                id="bow"
                onChange={handleOnChange}
                checked={formData.weapon.bow}
              />
              <label htmlFor="bow">Bow</label>
            </div>
          </div>
        </div>

        <div className="gender">
          <p style={{ display: 'block', fontSize: '14px' }}>Your Weapons</p>
          <div
            className="gender-wrapper"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '16px',
              fontSize: '16px',
            }}
          >
            <div className="input-group">
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleOnChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>

        <div className="strength">
          <p style={{ display: 'block', fontSize: '14px' }}>Strength</p>
          <input
            type="range"
            name="strength"
            id="strength"
            onChange={handleOnChange}
            value={formData.strength}
            style={{ width: '100%', height: '10px' }}
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          Submit
        </button>
      </form>

      {result !== '' && (
        <div
          style={{
            padding: '20px 40px',
            backgroundColor: 'yellow',
            width: '300px',
          }}
        >
          <h1
            style={{
              marginBottom: '6px',
              textTransform: 'uppercase',
              fontSize: '40px',
            }}
          >
            {result.name}
          </h1>
          <h2
            style={{
              color: 'blue',
              fontSize: '20px',
              textTransform: 'capitalize',
            }}
          >
            {result.position}
          </h2>
          <h3
            style={{
              display: 'flex',
              gap: '12px',
              fontSize: '16px',
              color: '#333',
              marginBottom: '10px',
              marginTop: '2px',
              textTransform: 'capitalize',
            }}
          >
            <span>{result.gender}</span>
            <span>-</span>
            <span>{result.race}</span>
          </h3>

          <div style={{ color: '#333' }}>
            <p style={{ display: 'block', fontSize: '14px' }}>My Weapons</p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                fontSize: '16px',
                color: '#333',
                marginTop: '2px',
                marginBottom: '10px',
                fontWeight: 'bold',
              }}
            >
              {result.weapon.sword && <span>Sword</span>}
              {result.weapon.claymore && <span>Claymore</span>}
              {result.weapon.bow && <span>Bow</span>}
            </div>
          </div>

          <p style={{ color: '#333' }}>Strength: {result.strength}%</p>
        </div>
      )}
    </div>
  );
}

export default Form;
