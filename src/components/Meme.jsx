import { useState } from "react";
import { useEffect } from "react";
// import memesData from "../data/memesData.js";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemeImages, setAllMemeImages] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

  //Async version of useEffect
  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const jsonData = await res.json();
      setAllMemes(jsonData.data.memes);
    }
    getMemes();
  }, []);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((jsonData) => {
        setAllMemeImages(jsonData.data.memes);
      });
  }, []);

  function getMemeImage() {
    const meme =
      allMemeImages[Math.floor(Math.random() * allMemeImages.length)];

    setMeme((prevState) => {
      return { ...prevState, randomImage: meme.url };
    });
  }
  return (
    <main>
      <div className="form">
        <input
          type="text"
          name="topText"
          onChange={handleChange}
          placeholder="Top text"
          className="form-input"
        />
        <input
          type="text"
          name="bottomText"
          onChange={handleChange}
          placeholder="Bottom text"
          className="form-input"
        />
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
        {meme.randomImage != 0 && (
          <img className="meme-image" src={meme.randomImage} alt="meme-image" />
        )}
      </div>
    </main>
  );
}

export default Meme;
